import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";

const ALLOWED_ORIGIN = "https://smartklimat.org";
const UNIT_AMOUNT = 3500; // 35 SEK per träd, i öre
const PRODUCT_NAME = "Träd — SmartKlimat";
const SUCCESS_URL = "https://smartklimat.org/plantera?tack=1";
const CANCEL_URL = "https://smartklimat.org/plantera";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
};

type Mode = "engang" | "manad" | "gava";

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export const Route = createFileRoute("/api/public/create-checkout")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS_HEADERS }),
      POST: async ({ request }) => {
        const secret = process.env.STRIPE_SECRET_KEY;
        if (!secret) return json(500, { error: "stripe_not_configured" });

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json(400, { error: "invalid_json" });
        }

        const body = payload as { type?: unknown; quantity?: unknown };
        const type = body.type as Mode | undefined;
        const quantity = Number(body.quantity);

        if (type !== "engang" && type !== "manad" && type !== "gava") {
          return json(400, { error: "invalid_type" });
        }
        if (!Number.isFinite(quantity) || quantity < 1 || quantity > 500) {
          return json(400, { error: "invalid_quantity" });
        }
        const qty = Math.round(quantity);

        const stripe = new Stripe(secret);

        const isSubscription = type === "manad";
        const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
          currency: "sek",
          unit_amount: UNIT_AMOUNT,
          product_data: { name: PRODUCT_NAME },
          ...(isSubscription ? { recurring: { interval: "month" } } : {}),
        };

        const params: Stripe.Checkout.SessionCreateParams = {
          mode: isSubscription ? "subscription" : "payment",
          line_items: [{ price_data: priceData, quantity: qty }],
          success_url: SUCCESS_URL,
          cancel_url: CANCEL_URL,
          metadata: { type, quantity: String(qty) },
          ...(isSubscription
            ? { subscription_data: { metadata: { type, quantity: String(qty) } } }
            : {}),
        };

        if (type === "gava") {
          params.custom_fields = [
            {
              key: "mottagare",
              label: { type: "custom", custom: "Mottagarens namn" },
              type: "text",
              optional: false,
            },
            {
              key: "halsning",
              label: { type: "custom", custom: "Hälsning" },
              type: "text",
              optional: true,
            },
          ];
        }

        try {
          const session = await stripe.checkout.sessions.create(params);
          if (!session.url) return json(502, { error: "no_session_url" });
          return json(200, { url: session.url });
        } catch (err) {
          console.error("stripe_create_checkout_failed", err);
          return json(502, { error: "stripe_error" });
        }
      },
    },
  },
});
