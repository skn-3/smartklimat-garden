import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { FadeUp } from "@/components/FadeUp";
import { Eyebrow } from "@/components/Eyebrow";
import { DoubleFrame } from "@/components/DoubleFrame";
import { CtaButton } from "@/components/CtaButton";
import { StatBand } from "@/components/projekt/Parts";

export const Route = createFileRoute("/smaarty")({
  head: () => ({
    meta: [
      { title: "Smaarty — för lag och skolor — SmartKlimat" },
      {
        name: "description",
        content:
          "Insamlingen som planterar skog. Barnen säljer träd, köparna får bevis, laget ser skogen växa.",
      },
      { property: "og:title", content: "Smaarty — för lag och skolor — SmartKlimat" },
      {
        property: "og:description",
        content:
          "Insamlingen som planterar skog. Barnen säljer träd, köparna får bevis, laget ser skogen växa.",
      },
      { property: "og:url", content: "/smaarty" },
    ],
    links: [{ rel: "canonical", href: "/smaarty" }],
  }),
  component: SmaartyPage,
});

const STEG = [
  {
    n: "1",
    title: "Ledaren skapar laget",
    body: "Vi lägger upp ert lag eller er klass och bjuder in säljarna. Klart på en dag.",
  },
  {
    n: "2",
    title: "Barnen säljer träd",
    body:
      "Var och en har sitt eget konto i Smaarty. Varje sålt träd ger poäng, milstolpar och en plats på lagets topplista.",
  },
  {
    n: "3",
    title: "Köparen får beviset",
    body:
      "Ett personligt värdebevis med köparens namn — och trädet planteras i något av våra projekt.",
  },
];

const APP_FEATURES = [
  {
    eyebrow: "POÄNG",
    title: "Milstolpar och streaks",
    body: "Varje sälj räknas, varje vecka kan bli en ny toppnotering.",
  },
  {
    eyebrow: "TOPPLISTA",
    title: "Veckans säljare",
    body: "Laget tävlar tillsammans — och firar tillsammans.",
  },
  {
    eyebrow: "BELÖNINGAR",
    title: "Poängen blir priser",
    body: "Säljarna löser in sina poäng mot belöningar i appen.",
  },
  {
    eyebrow: "LIVE",
    title: "Lagets skog växer",
    body: "Alla ser samma räknare ticka — träd för träd.",
  },
];

const LEADER_BENEFITS = [
  "Full översikt över försäljning och aktivitet",
  "Inga kontanter — allt sker digitalt",
  "Inget att beställa hem, lagra eller dela ut",
  "Kontona skapas av er som ledare, inte av barnen",
];

function SmaartyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Smaarty"
        title="För lag och skolor"
        lead="Insamlingen som planterar skog. Inga kartonger att dela ut, inget att leverera — barnen säljer träd, köparna får bevis, och hela laget ser skogen växa."
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

      {/* Appen */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <Eyebrow>Appen</Eyebrow>
          </FadeUp>
          <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6">
            {APP_FEATURES.map((f, i) => (
              <FadeUp key={f.eyebrow} delay={i * 60}>
                <DoubleFrame innerClassName="px-5 py-6 md:px-7 md:py-8 h-full">
                  <div className="flex h-full flex-col">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">
                      {f.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-lg md:text-xl font-bold leading-[1.15] tracking-tight text-skogsgron">
                      {f.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-base text-skogsgron/75">{f.body}</p>
                  </div>
                </DoubleFrame>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* För dig som ledare */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <Eyebrow>För dig som ledare</Eyebrow>
          </FadeUp>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {LEADER_BENEFITS.map((b, i) => (
              <FadeUp key={b} delay={i * 60} as="li">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-guld"
                  />
                  <p className="text-base md:text-lg text-skogsgron/80">{b}</p>
                </div>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <StatBand
        items={[
          { value: "20 kg", label: "Koldioxid binder ett träd, varje år" },
          { value: "3", label: "Projekt på tre kontinenter" },
          { value: "27 393", label: "Träd planterade hittills" },
        ]}
      />

      {/* Avslutande CTA */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <DoubleFrame innerClassName="px-6 py-12 md:px-14 md:py-20">
              <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
                <div>
                  <Eyebrow>Smaarty</Eyebrow>
                  <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-skogsgron">
                    Starta ert lag.
                  </h2>
                  <p className="mt-6 max-w-xl text-base md:text-lg text-skogsgron/75">
                    Berätta vilket lag eller vilken klass det gäller, så hör vi av oss med allt ni behöver för att komma igång.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <a
                    href="mailto:kontakt@smartklimat.org?subject=Smaarty — lag/skola"
                    className="group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-transform duration-500 [transition-timing-function:var(--ease-smart)] bg-skogsgron text-papper hover:-translate-y-0.5"
                  >
                    <span className="py-2">Kom igång</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-smaragd text-white transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </a>
                  <CtaButton to="/projekt" variant="secondary">
                    Våra projekt
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
