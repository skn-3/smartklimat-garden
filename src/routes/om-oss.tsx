import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { FadeUp } from "@/components/FadeUp";
import { Eyebrow } from "@/components/Eyebrow";
import { DoubleFrame } from "@/components/DoubleFrame";
import { CtaButton } from "@/components/CtaButton";
import { StatBand } from "@/components/projekt/Parts";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss — SmartKlimat" },
      {
        name: "description",
        content:
          "Ett gemensamt klimat. Vi återställer, engagerar och mäter — klimatkompensation byggd som teknik.",
      },
      { property: "og:title", content: "Om oss — SmartKlimat" },
      {
        property: "og:description",
        content:
          "Ett gemensamt klimat. Vi återställer, engagerar och mäter — klimatkompensation byggd som teknik.",
      },
      { property: "og:url", content: "/om-oss" },
    ],
    links: [{ rel: "canonical", href: "/om-oss" }],
  }),
  component: OmOssPage,
});

const TREKLANG = [
  {
    eyebrow: "VI ÅTERSTÄLLER",
    title: "Skog där den gör mest nytta",
    body:
      "Tre projekt på tre kontinenter tillsammans med WeForest — molnskog i Indien, miombo i Zambia, vilddjurskorridorer i Brasilien.",
  },
  {
    eyebrow: "VI ENGAGERAR",
    title: "Från säljteam till skolklasser",
    body:
      "Företag bygger in planteringen i sina affärer. Lag och skolor samlar in genom Smaarty. Alla ser samma träd växa.",
  },
  {
    eyebrow: "VI MÄTER",
    title: "Varje träd är en rad i systemet",
    body:
      "Planterat, tidsstämplat och spårbart. Räknaren på förstasidan är inte marknadsföring — den är databasen.",
  },
];

function OmOssPage() {
  return (
    <>
      <PageIntro
        eyebrow="Om oss"
        title="Ett gemensamt klimat"
        lead="Alla har ett ekologiskt avtryck. Frågan är vilket avtryck du vill sätta. Vi byggde SmartKlimat för att svaret ska kunna vara inbyggt i vardagen — inte tillagt efteråt."
      />

      {/* Berättelsen */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-[65ch] text-center">
          <FadeUp>
            <p className="font-display text-2xl md:text-3xl font-semibold leading-[1.25] tracking-tight text-skogsgron">
              SmartKlimat började med en enkel observation: viljan att göra rätt
              finns överallt, men friktionen vinner. Så vi byggde bort
              friktionen. Idag planteras träd automatiskt när affärer signeras,
              när lag samlar in och när någon räknar på sin resa — och varje
              träd går att följa, från rad i vårt system till rot i marken.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Treklangen */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl grid gap-6 md:grid-cols-3">
          {TREKLANG.map((c, i) => (
            <FadeUp key={c.eyebrow} delay={i * 80}>
              <DoubleFrame innerClassName="px-6 py-8 md:px-8 md:py-10 h-full">
                <div className="flex h-full flex-col">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">
                    {c.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-2xl md:text-[1.75rem] font-bold leading-[1.1] tracking-tight text-skogsgron">
                    {c.title}
                  </h3>
                  <p className="mt-5 text-base text-skogsgron/75">{c.body}</p>
                </div>
              </DoubleFrame>
            </FadeUp>
          ))}
        </div>
      </section>

      <StatBand
        items={[
          { value: "27 393", label: "Träd planterade" },
          { value: "548 ton", label: "Koldioxid bundet, varje år" },
          { value: "3", label: "Projekt på tre kontinenter" },
          { value: "1", label: "Gemensamt klimat" },
        ]}
      />

      {/* Kontakt */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <DoubleFrame innerClassName="px-6 py-12 md:px-14 md:py-20">
              <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
                <div>
                  <Eyebrow>Kontakt</Eyebrow>
                  <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-skogsgron">
                    Hör av dig.
                  </h2>
                  <p className="mt-6 max-w-xl text-base md:text-lg text-skogsgron/75">
                    Företag, skola eller nyfiken — vi svarar inom kort.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <a
                    href="mailto:kontakt@smartklimat.org"
                    className="group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-transform duration-500 [transition-timing-function:var(--ease-smart)] bg-skogsgron text-papper hover:-translate-y-0.5"
                  >
                    <span className="py-2 font-mono text-xs">
                      kontakt@smartklimat.org
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-smaragd text-white transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </a>
                  <CtaButton to="/foretag" variant="secondary">
                    För företag
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
