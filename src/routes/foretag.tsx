import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { FadeUp } from "@/components/FadeUp";
import { Eyebrow } from "@/components/Eyebrow";
import { DoubleFrame } from "@/components/DoubleFrame";
import { CtaButton } from "@/components/CtaButton";

export const Route = createFileRoute("/foretag")({
  head: () => ({
    meta: [
      { title: "För företag — SmartKlimat" },
      {
        name: "description",
        content:
          "Gör varje affär till skog. Automatisk klimatkompensation med spårbara värdebevis till era kunder.",
      },
      { property: "og:title", content: "För företag — SmartKlimat" },
      {
        property: "og:description",
        content:
          "Gör varje affär till skog. Automatisk klimatkompensation med spårbara värdebevis till era kunder.",
      },
      { property: "og:url", content: "/foretag" },
    ],
    links: [{ rel: "canonical", href: "/foretag" }],
  }),
  component: ForetagPage,
});

const STEG = [
  {
    n: "1",
    title: "Vi kopplar in oss",
    body:
      "En teknisk koppling till ert affärsflöde, eller ett enkelt manuellt upplägg om ni hellre börjar där. Uppstarten tar dagar, inte månader.",
  },
  {
    n: "2",
    title: "Varje affär planterar",
    body:
      "När en affär signeras planteras träd automatiskt i något av våra projekt. Inga listor att komma ihåg, inget extra arbete för era säljare.",
  },
  {
    n: "3",
    title: "Kunden får beviset",
    body:
      "Ett personligt, verifierbart värdebevis med ert varumärke — kunden kan följa sitt träd via en egen länk.",
  },
];

const UPPLAGG = [
  {
    eyebrow: "STARTER",
    title: "Kom igång utan integration",
    body:
      "Manuell rapportering månadsvis, samlade värdebevis, er logotyp på plats.",
  },
  {
    eyebrow: "INTEGRERAD",
    title: "Automatiskt, affär för affär",
    body:
      "Teknisk koppling till ert flöde, bevis i realtid, live-statistik för er marknadsföring.",
  },
  {
    eyebrow: "SKRÄDDARSYTT",
    title: "För volym och kampanjer",
    body:
      "Egna certifikatdesigner, kampanjupplägg, dedikerad kontakt. Vi räknar på ert flöde.",
  },
];

const TRUST = [
  "Planterat med WeForest",
  "Externt granskat — Preferred by Nature",
  "Spårbart ner till projektet",
  "Live-data, direkt ur systemet",
];

function ForetagPage() {
  return (
    <>
      <PageIntro
        eyebrow="För företag"
        title="Gör varje affär till skog"
        lead="Automatisk klimatkompensation, inbyggd i era affärer. Era kunder får spårbara bevis på planterade träd — ni får en klimatberättelse som är sann."
      />

      {/* Så funkar det */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <Eyebrow>Så funkar det</Eyebrow>
          </FadeUp>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {STEG.map((s, i) => (
              <FadeUp key={s.n} delay={i * 80}>
                <div className="h-full rounded-[28px] bg-white ring-1 ring-linje px-7 py-10 md:px-8 md:py-12">
                  <div className="font-mono text-5xl md:text-6xl font-semibold tracking-tight text-smaragd-dark">
                    {s.n}
                  </div>
                  <h3 className="mt-6 font-display text-2xl md:text-[1.75rem] font-bold leading-[1.1] tracking-tight text-skogsgron">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-base text-skogsgron/75">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Case — sandfärgat berättelsekort */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl">
          <FadeUp>
            <div className="rounded-[2rem] bg-sand px-7 py-10 md:px-14 md:py-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-skogsgron/70">
                UR VERKLIGHETEN
              </p>
              <h3 className="mt-5 font-display text-2xl md:text-4xl font-bold leading-[1.15] tracking-tight text-skogsgron max-w-3xl">
                En rikstäckande fönsterkedja planterar ett träd per installerat
                fönster —
              </h3>
              <p className="mt-6 text-base md:text-lg text-skogsgron/80 max-w-3xl">
                automatiskt i samma stund som affären signeras. Säljarna säljer
                som vanligt. Kunderna får ett bevis de kan visa upp. Skogen
                växer i takt med orderboken.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Upplägg */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <Eyebrow>Upplägg</Eyebrow>
          </FadeUp>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {UPPLAGG.map((u, i) => (
              <FadeUp key={u.eyebrow} delay={i * 80}>
                <DoubleFrame innerClassName="px-6 py-8 md:px-8 md:py-10 h-full">
                  <div className="flex h-full flex-col">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">
                      {u.eyebrow}
                    </p>
                    <h3 className="mt-4 font-display text-xl md:text-2xl font-bold leading-[1.15] tracking-tight text-skogsgron">
                      {u.title}
                    </h3>
                    <p className="mt-5 text-base text-skogsgron/75">{u.body}</p>
                  </div>
                </DoubleFrame>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={240}>
            <p className="mt-8 font-mono text-xs text-skogsgron/60">
              Prissättning efter volym — berätta om ert flöde så återkommer vi
              med ett upplägg.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Trust-rad */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl border-y border-linje py-8 md:py-10">
          <ul className="flex flex-wrap gap-x-10 gap-y-4">
            {TRUST.map((t, i) => (
              <FadeUp key={t} delay={i * 60}>
                <li className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-skogsgron">
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-full bg-guld"
                  />
                  {t}
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      {/* Intresseanmälan */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <DoubleFrame innerClassName="px-6 py-12 md:px-14 md:py-20">
              <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
                <div>
                  <Eyebrow>Intresseanmälan</Eyebrow>
                  <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-skogsgron">
                    Berätta om ert flöde.
                  </h2>
                  <p className="mt-6 max-w-xl text-base md:text-lg text-skogsgron/75">
                    Hur många affärer gör ni i månaden? Vi återkommer inom kort
                    med ett konkret upplägg.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <a
                    href="mailto:kontakt@smartklimat.org?subject=Företagsupplägg — SmartKlimat"
                    className="group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-transform duration-500 [transition-timing-function:var(--ease-smart)] bg-skogsgron text-papper hover:-translate-y-0.5"
                  >
                    <span className="py-2">Boka ett samtal</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-smaragd text-white transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </a>
                  <CtaButton to="/projekt" variant="secondary">
                    Se projekten
                  </CtaButton>
                </div>
              </div>
            </DoubleFrame>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
