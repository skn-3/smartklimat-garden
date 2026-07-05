import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Gift, Repeat, TreePine } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/plantera")({
  validateSearch: (search: Record<string, unknown>) => {
    const n = Number(search.antal);
    return { antal: Number.isFinite(n) && n >= 1 ? Math.min(500, Math.round(n)) : undefined };
  },
  head: () => ({
    meta: [
      { title: "Plantera träd — SmartKlimat" },
      {
        name: "description",
        content:
          "Plantera själv, bli månadsplanterare eller ge bort träd i gåva. 35 kr per träd, planterat i granskade WeForest-projekt.",
      },
      { property: "og:title", content: "Plantera träd — SmartKlimat" },
      { property: "og:url", content: "/plantera" },
    ],
    links: [{ rel: "canonical", href: "/plantera" }],
  }),
  component: PlanteraPage,
});

const PRICE = 35;
const KG_PER_TREE = 20;
const CHECKOUT_URL = "https://app.smartklimat.org/functions/v1/create-checkout";
const SWISH_URL = "https://app.smartklimat.org/functions/v1/create-swish-payment";

type Mode = "engang" | "manad" | "gava";

const MODES: Array<{ id: Mode; icon: React.ReactNode; title: string; body: string; badge?: string }> = [
  {
    id: "engang",
    icon: <TreePine className="h-5 w-5" strokeWidth={1.8} />,
    title: "Plantera själv",
    body: "En engångsplantering i ditt namn — med personligt värdebevis.",
  },
  {
    id: "manad",
    icon: <Repeat className="h-5 w-5" strokeWidth={1.8} />,
    title: "Månadsplanterare",
    body: "Samma antal träd, varje månad. Avsluta när du vill.",
    badge: "Gör störst skillnad",
  },
  {
    id: "gava",
    icon: <Gift className="h-5 w-5" strokeWidth={1.8} />,
    title: "Ge bort träd",
    body: "Tillägna träden någon annan — beviset skapas i mottagarens namn.",
  },
];

const QUICK = [1, 3, 5, 10];

function PlanteraPage() {
  const { antal } = Route.useSearch();
  const [mode, setMode] = useState<Mode>("engang");
  const [qty, setQty] = useState(antal ?? 3);
  const [busy, setBusy] = useState<"stripe" | "swish" | null>(null);
  const [fallback, setFallback] = useState<"stripe" | "swish" | null>(null);

  const kr = qty * PRICE;
  const kg = qty * KG_PER_TREE;

  const mailHref = useMemo(() => {
    const label = mode === "manad" ? "månadsplantering" : mode === "gava" ? "gåva" : "engångsplantering";
    const body = encodeURIComponent(
      `Hej!\n\nJag vill plantera ${qty} träd (${label}).\n\nSäg till mig när kassan öppnar.\n`,
    );
    return `mailto:kontakt@smartklimat.org?subject=${encodeURIComponent("Plantera träd — SmartKlimat")}&body=${body}`;
  }, [mode, qty]);

  async function pay(method: "stripe" | "swish") {
    setBusy(method);
    try {
      const res = await fetch(method === "swish" ? SWISH_URL : CHECKOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: mode, quantity: qty }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { url?: string };
      if (!data.url) throw new Error("saknar url");
      window.location.href = data.url;
    } catch {
      setFallback(method);
      setBusy(null);
    }
  }

  return (
    <>
      <PageIntro
        eyebrow="Plantera träd"
        title="Plantera skog. På ditt sätt."
        lead="35 kronor per träd, planterat i granskade WeForest-projekt — med ett personligt värdebevis som går att verifiera. Välj hur du vill plantera."
      />

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-4xl">
          {/* LÄGEN */}
          <div className="grid gap-4 md:grid-cols-3">
            {MODES.map((m, i) => {
              const active = mode === m.id;
              return (
                <FadeUp key={m.id} delay={i * 60}>
                  <button
                    type="button"
                    onClick={() => setMode(m.id)}
                    aria-pressed={active}
                    className={`relative h-full w-full rounded-[1.8rem] p-1.5 text-left transition-colors duration-500 ${
                      active ? "bg-mint" : "bg-mintpapper"
                    }`}
                  >
                    <span
                      className={`flex h-full flex-col gap-2.5 rounded-[1.4rem] border bg-white p-6 transition-all duration-500 [transition-timing-function:var(--ease-smart)] ${
                        active ? "border-smaragd shadow-[0_12px_30px_-18px_rgba(30,158,106,0.5)]" : "border-linje"
                      }`}
                    >
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-500 ${
                          active ? "bg-smaragd text-white" : "bg-mintpapper text-smaragd-dark"
                        }`}
                      >
                        {m.icon}
                      </span>
                      <span className="mt-1 font-display text-lg font-bold text-skogsgron">{m.title}</span>
                      <span className="text-sm leading-relaxed text-skogsgron/70">{m.body}</span>
                      {m.badge ? (
                        <span className="mt-auto w-fit rounded-full bg-guld/20 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8A6A1F]">
                          {m.badge}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </FadeUp>
              );
            })}
          </div>

          {/* ANTAL + SUMMERING */}
          <FadeUp delay={180}>
            <div className="mt-8 rounded-[2rem] bg-mintpapper p-1.5">
              <div className="rounded-[1.6rem] border border-linje bg-white p-8 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="text-sm text-skogsgron/70">Antal träd{mode === "manad" ? " per månad" : ""}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        aria-label="Färre träd"
                        className="grid h-11 w-11 place-items-center rounded-full border border-linje text-xl text-skogsgron transition-colors hover:bg-mintpapper"
                      >
                        –
                      </button>
                      <p className="w-20 text-center font-mono text-5xl font-semibold text-skogsgron tabular-nums">
                        {qty}
                      </p>
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.min(500, q + 1))}
                        aria-label="Fler träd"
                        className="grid h-11 w-11 place-items-center rounded-full border border-linje text-xl text-skogsgron transition-colors hover:bg-mintpapper"
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {QUICK.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setQty(n)}
                          className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                            qty === n
                              ? "border-smaragd bg-mintpapper text-smaragd-dark"
                              : "border-linje text-skogsgron/60 hover:border-smaragd/50"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-[200px] border-l border-linje pl-6">
                    <p className="font-mono text-4xl font-semibold text-smaragd tabular-nums">
                      {kr.toLocaleString("sv-SE")} kr{mode === "manad" ? "/mån" : ""}
                    </p>
                    <p className="mt-2 text-sm text-skogsgron/60">
                      binder ≈ {kg.toLocaleString("sv-SE")} kg CO₂ per år
                    </p>
                    {mode === "gava" ? (
                      <p className="mt-3 max-w-[240px] text-xs text-skogsgron/55">
                        Mottagarens namn och en hälsning fyller du i i kassan — värdebeviset skapas med det.
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-8 border-t border-linje pt-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => pay("stripe")}
                      disabled={busy !== null}
                      className="group inline-flex items-center gap-3 rounded-full bg-skogsgron py-1.5 pl-7 pr-1.5 text-[15px] font-medium text-papper transition-transform duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      <span className="py-2">{busy === "stripe" ? "Öppnar kassan…" : "Kort · Apple Pay · Google Pay"}</span>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-smaragd text-white transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5">
                        <ArrowRight className="h-4 w-4" strokeWidth={2} />
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => pay("swish")}
                      disabled={busy !== null || mode === "manad"}
                      className="rounded-full border border-linje px-7 py-3 text-[15px] font-medium text-skogsgron transition-all duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5 hover:border-smaragd disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:border-linje"
                    >
                      {busy === "swish" ? "Öppnar Swish…" : "Betala med Swish"}
                    </button>
                  </div>

                  {mode === "manad" ? (
                    <p className="mt-3 text-xs text-skogsgron/50">
                      Månadsplantering dras via kort — Swish stödjer inte återkommande betalningar.
                    </p>
                  ) : null}

                  {fallback ? (
                    <div className="mt-4 rounded-2xl border border-guld/50 bg-guld/10 px-5 py-4">
                      <p className="text-sm font-medium text-skogsgron">
                        {fallback === "swish" ? "Swish aktiveras inom kort." : "Kassan öppnar inom kort."}
                      </p>
                      <p className="mt-1 text-sm text-skogsgron/70">
                        Lämna din mail så säger vi till —{" "}
                        <a href={mailHref} className="font-medium text-smaragd-dark underline underline-offset-4">
                          ett klick, allt förifyllt
                        </a>
                        .
                      </p>
                    </div>
                  ) : null}

                  <p className="mt-4 text-xs text-skogsgron/50">
                    Säker betalning via Stripe eller Swish · beviset skapas direkt efter köpet
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={240}>
            <p className="mt-8 text-center text-sm text-skogsgron/55">
              Osäker på hur många? <a href="/kalkylator" className="font-medium text-smaragd-dark underline underline-offset-4">Räkna på din resa i kalkylatorn</a> — den skickar hit rätt antal.
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
