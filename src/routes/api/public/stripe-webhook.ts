import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";

// Publik webhook för Stripe.
// Verifierar signaturen med STRIPE_WEBHOOK_SECRET och normaliserar
// checkout.session.completed till en purchase-payload.
//
// OBS: Detta projekt har ingen egen databas, värdebevis-generator eller
// mailutskick. Där "befintligt köpflöde" ska köras är markerat med TODO
// nedan — koppla in kod eller kalla din befintliga backend där.

export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.STRIPE_SECRET_KEY;
        const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!secret || !whSecret) {
          return new Response("stripe_not_configured", { status: 500 });
        }

        const signature = request.headers.get("stripe-signature");
        if (!signature) return new Response("missing_signature", { status: 400 });

        const rawBody = await request.text();
        const stripe = new Stripe(secret);

        let event: Stripe.Event;
        try {
          event = await stripe.webhooks.constructEventAsync(rawBody, signature, whSecret);
        } catch (err) {
          console.error("stripe_webhook_bad_signature", err);
          return new Response("invalid_signature", { status: 400 });
        }

        if (event.type === "checkout.session.completed") {
          const session = event.data.object as Stripe.Checkout.Session;

          const type = (session.metadata?.type ?? "engang") as "engang" | "manad" | "gava";
          const quantity = Number(session.metadata?.quantity ?? 1);

          const customFields = session.custom_fields ?? [];
          const mottagare = customFields.find((f) => f.key === "mottagare")?.text?.value ?? null;
          const halsning = customFields.find((f) => f.key === "halsning")?.text?.value ?? null;

          const customerEmail =
            session.customer_details?.email ?? session.customer_email ?? null;
          const customerName = session.customer_details?.name ?? null;

          const recipientName = type === "gava" ? mottagare : customerName;
          const recipientEmail = customerEmail;

          const purchase = {
            stripe_session_id: session.id,
            status: "paid" as const,
            type,
            quantity,
            amount_total: session.amount_total,
            currency: session.currency,
            recipient_name: recipientName,
            recipient_email: recipientEmail,
            gift_greeting: halsning,
            payer_name: customerName,
            payer_email: customerEmail,
            created_at: new Date(event.created * 1000).toISOString(),
          };

          try {
            // TODO: koppla in det befintliga köpflödet här:
            //   1) skapa purchase (paid) i din DB med `quantity` ur metadata
            //   2) generera värdebevis
            //   3) skicka bevismailet till recipientEmail
            // Återanvänd exakt samma funktioner som ditt nuvarande
            // Supabase-flöde på app.smartklimat.org använder.
            console.log("stripe_purchase_paid", purchase);
          } catch (err) {
            console.error("stripe_purchase_handler_failed", err, purchase);
            // Returnera 500 så Stripe försöker igen.
            return new Response("handler_failed", { status: 500 });
          }
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
