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
    links: [{ rel: "canonical", href: "https://smartklimat.org/om-oss" }],
    meta: [
      { title: "Om oss — SmartKlimat" },
      {
        name: "description",
        content:
          "Ett gemensamt klimat. Vi planterar, mäter och visar varje träd — klimatkompensation byggd som teknik.",
      },
      { property: "og:title", content: "Om oss — SmartKlimat" },
      {
        property: "og:description",
        content:
          "Ett gemensamt klimat. Vi planterar, mäter och visar varje träd.",
      },
      { property: "og:url", content: "/om-oss" },
    ],
  }),
  component: OmOssPage,
});

const MANIFEST = [
  { text: "Viljan att göra rätt finns överallt.", accent: false },
  { text: "Friktionen vinner för ofta.", accent: false },
  { text: "Så vi byggde bort friktionen.", accent: true },
];

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

const FOTON = [
  { src: "/projekt/kh-2.jpg", alt: "Plantering i Khasi Hills", rot: "-rotate-2" },
  { src: "/projekt/cb-4.jpg", alt: "Miomboskog i Copperbelt", rot: "rotate-1" },
  { src: "/projekt/po-4.jpg", alt: "Fältarbete i Pontal", rot: "rotate-2" },
];

function OmOssPage() {
  return (
    <>
      <PageIntro
        eyebrow="Om oss"
        title="Ett gemensamt klimat"
        lead="Alla har ett ekologiskt avtryck. Frågan är vilket avtryck du vill sätta. Vi byggde SmartKlimat för att svaret ska kunna vara inbyggt i vardagen — inte tillagt efteråt."
      />

      {/* MANIFEST */}
      <section className="px-6 pb-20 pt-4 md:pb-28">
        <div className="mx-auto w-full max-w-4xl">
          {MANIFEST.map((m, i) => (
            <FadeUp key={m.text} delay={i * 120}>
              <p
                className={`font-display text-3xl font-bold leading-[1.12] tracking-tight md:text-5xl ${
                  m.accent ? "text-smaragd" : "text-skogsgron"
                } ${i > 0 ? "mt-3 md:mt-4" : ""}`}
              >
                {m.text}
              </p>
            </FadeUp>
          ))}
          <FadeUp delay={420}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-skogsgron/75 md:text-lg">
              Idag planteras träd automatiskt när affärer signeras, när lag samlar in och när någon
              räknar på sin resa — och varje träd går att följa, från rad i vårt system till rot i
              marken.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FOTOSTRIP */}
      <section className="overflow-hidden px-6 pb-24 md:pb-32">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-3 gap-4 md:gap-6">
          {FOTON.map((f, i) => (
            <FadeUp key={f.src} delay={i * 90}>
              <div
                className={`overflow-hidden rounded-[1.4rem] border border-linje bg-white transition-transform duration-700 [transition-timing-function:var(--ease-smart)] hover:rotate-0 md:rounded-[1.8rem] ${f.rot}`}
              >
                <img
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover md:aspect-[4/3]"
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* TREKLANGEN */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-3">
          {TREKLANG.map((t, i) => (
            <FadeUp key={t.eyebrow} delay={i * 80}>
              <DoubleFrame innerClassName="h-full p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">
                  {t.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold leading-tight text-skogsgron">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-skogsgron/70">{t.body}</p>
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

      {/* KONTAKT */}
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
                    Skriv några rader så återkommer vi inom kort.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <a
                    href="mailto:kontakt@smartklimat.org"
                    className="group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-transform duration-500 [transition-timing-function:var(--ease-smart)] bg-skogsgron text-papper hover:-translate-y-0.5"
                  >
                    <span className="py-2 font-mono text-xs">kontakt@smartklimat.org</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-smaragd text-white transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </a>
                  <CtaButton to="/kontakt" variant="secondary">
                    Alla kontaktvägar
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
