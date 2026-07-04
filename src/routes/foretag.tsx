import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/Eyebrow";
import { CtaButton } from "@/components/CtaButton";
import { FadeUp } from "@/components/FadeUp";
import { FaqList } from "@/components/Faq";
import { CertCard } from "@/components/foretag/scenes";
import { PipelineJourney } from "@/components/foretag/PipelineJourney";

export const Route = createFileRoute("/foretag")({
  head: () => ({
    meta: [
      { title: "För företag — SmartKlimat" },
      {
        name: "description",
        content:
          "Gör varje affär till skog. Automatisk klimatkompensation med spårbara värdebevis till era kunder.",
      },
    ],
  }),
  component: ForetagPage,
});

const PLANS = [
  {
    eb: "Starter",
    title: "Kom igång utan integration",
    body: "Manuell rapportering månadsvis, samlade värdebevis och er logotyp på plats. Uppstart samma vecka.",
  },
  {
    eb: "Integrerad",
    title: "Automatiskt, affär för affär",
    body: "Vår gateway kopplas till ert affärsflöde — bevis i realtid och live-statistik för er marknadsföring.",
  },
  {
    eb: "Skräddarsytt",
    title: "För volym och kampanjer",
    body: "Egna certifikatdesigner, kampanjupplägg och dedikerad kontakt. Vi räknar på ert flöde.",
  },
];

const TRUST = [
  "Planterat med WeForest",
  "Externt granskat — Preferred by Nature",
  "Spårbart ner till projektet",
  "Live-data, direkt ur systemet",
];

const FAQ_ITEMS: Array<[string, string]> = [
  ["Hur lång är uppstarten?", "Dagar, inte månader. Starter kräver ingen integration alls — vi lägger upp er samma vecka och första rapporteringen kan ske direkt."],
  ["Måste vi integrera tekniskt?", "Nej. Starter bygger på enkel månadsrapportering av era affärer. När ni vill växla upp kopplar vi vår gateway till ert flöde — då sker allt automatiskt."],
  ["Vad får våra kunder?", "Ett personligt värdebevis med sitt namn, ert varumärke och en egen verifieringslänk som de kan kontrollera och dela när som helst."],
  ["Vad kostar det?", "Prissättningen följer volymen. Berätta hur många affärer ni gör i månaden, så återkommer vi med ett konkret upplägg."],
  ["Var planteras träden?", "I våra tre WeForest-projekt — molnskogen i Khasi Hills, miombon i Copperbelt och vilddjurskorridorerna i Pontal. Arbetet granskas externt av Preferred by Nature."],
  ["Kan beviset bära vårt varumärke?", "Ja. Er logotyp och avsändare är standard i alla upplägg, och i Skräddarsytt designar vi certifikatet helt efter er profil."],
];

function CertInView({ large = false, tilt = 0 }: { large?: boolean; tilt?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}>
      <CertCard large={large} active={seen} />
    </div>
  );
}

function ForetagPage() {
  return (
    <>
      {/* HERO */}
      <section className="overflow-hidden px-6 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <FadeUp>
              <Eyebrow>För företag</Eyebrow>
            </FadeUp>
            <FadeUp delay={60}>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-skogsgron md:text-6xl">
                Gör varje affär <span className="text-smaragd">till skog.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={120}>
              <p className="mx-auto mt-6 max-w-md text-lg text-skogsgron/70 md:mx-0">
                Automatisk klimatkompensation, inbyggd i era affärer. Era kunder får spårbara bevis på planterade träd — ni får en klimatberättelse som är sann.
              </p>
            </FadeUp>
            <FadeUp delay={180}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <a
                  href="mailto:kontakt@smartklimat.org?subject=F%C3%B6retagsuppl%C3%A4gg%20%E2%80%94%20SmartKlimat"
                  className="rounded-full bg-skogsgron px-7 py-3 text-[15px] font-medium text-papper transition-transform duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5"
                >
                  Boka ett samtal
                </a>
                <CtaButton to="/projekt" variant="secondary">Se projekten</CtaButton>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={140}>
            <div className="mx-auto w-full max-w-[340px]">
              <CertInView tilt={5} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-skogsgron md:text-5xl">
              Era kunder litar inte på löften.
              <br />
              <span className="text-smaragd">De litar på bevis.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-skogsgron/70">
              Varje träd hos oss får ett verifierbart värdebevis med en egen länk — som kunden kan kontrollera själv, när som helst. Ingen årsrapport i en byrålåda. Ett kvitto i handen.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* PIPELINE-RESAN */}
      <section className="bg-mintpapper/60">
        <div className="px-6 pt-20 text-center md:pt-28">
          <FadeUp>
            <Eyebrow>Så funkar det</Eyebrow>
          </FadeUp>
          <FadeUp delay={60}>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-skogsgron md:text-5xl">
              Följ en affär genom systemet.
            </h2>
          </FadeUp>
        </div>
        <PipelineJourney />
      </section>

      {/* CASE */}
      <section className="bg-sand px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A7A52]">Ur verkligheten</p>
          </FadeUp>
          <FadeUp delay={60}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#3D3524] md:text-4xl">
              En rikstäckande fönsterkedja planterar ett träd per installerat fönster —
            </h2>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-4 max-w-2xl text-lg text-[#5C5238]">
              automatiskt i samma stund som affären signeras. Säljarna säljer som vanligt. Kunderna får ett bevis de kan visa upp. Skogen växer i takt med orderboken.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* UPPLÄGG */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <h2 className="font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
              Tre vägar in.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PLANS.map((p, i) => (
              <FadeUp key={p.eb} delay={i * 70}>
                <div className="group h-full rounded-[2rem] bg-mintpapper p-1.5">
                  <div className="flex h-full flex-col rounded-[1.6rem] border border-linje bg-white p-7 transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:-translate-y-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">{p.eb}</p>
                    <h3 className="mt-3 font-display text-xl font-bold text-skogsgron">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-skogsgron/70">{p.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={240}>
            <p className="mt-8 text-center text-sm text-skogsgron/55">
              Prissättning efter volym — berätta om ert flöde så återkommer vi med ett upplägg.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* VÄRDEBEVISET */}
      <section className="bg-mintpapper/60 px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <FadeUp>
            <div className="mx-auto w-full max-w-sm md:justify-self-end">
              <CertInView large />
            </div>
          </FadeUp>
          <div>
            <FadeUp>
              <Eyebrow>Beviset</Eyebrow>
            </FadeUp>
            <FadeUp delay={60}>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
                Det era kunder faktiskt får.
              </h2>
            </FadeUp>
            <ul className="mt-8 space-y-4">
              {[
                "Personligt — kundens namn och antal träd",
                "Ert varumärke som avsändare",
                "Egen verifieringslänk, öppen för alla",
                "Genereras i samma sekund som affären",
              ].map((p, i) => (
                <FadeUp key={p} delay={100 + i * 60}>
                  <li className="flex items-start gap-3 text-[15.5px] text-skogsgron/80">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-guld" />
                    {p}
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TRUST-RAD */}
      <section className="px-6 py-16 md:py-20">
        <FadeUp>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 border-y border-linje py-10 sm:grid-cols-2 md:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-guld" />
                <p className="text-sm font-medium text-skogsgron/80">{t}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
              Bra att veta.
            </h2>
          </FadeUp>
          <div className="mt-10">
            <FaqList items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28">
        <FadeUp>
          <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-skogsgron px-8 py-16 text-center md:py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight text-papper md:text-5xl">
              Berätta om ert flöde.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-salvia">
              Hur många affärer gör ni i månaden? Vi återkommer inom kort med ett konkret upplägg.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:kontakt@smartklimat.org?subject=F%C3%B6retagsuppl%C3%A4gg%20%E2%80%94%20SmartKlimat"
                className="rounded-full bg-smaragd px-7 py-3 text-[15px] font-medium text-white transition-transform duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5"
              >
                Boka ett samtal
              </a>
              <Link
                to="/projekt"
                className="rounded-full border border-salvia/50 px-7 py-3 text-[15px] font-medium text-salvia transition-colors duration-500 hover:border-salvia"
              >
                Se projekten
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
