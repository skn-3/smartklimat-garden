import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/PageIntro";
import { DoubleFrame } from "@/components/DoubleFrame";
import { FadeUp } from "@/components/FadeUp";
import { Eyebrow } from "@/components/Eyebrow";
import { CtaButton } from "@/components/CtaButton";
import { ProjectCard } from "@/components/projekt/Parts";

export const Route = createFileRoute("/projekt/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://smartklimat.org/projekt" }],
    meta: [
      { title: "Våra projekt — SmartKlimat" },
      {
        name: "description",
        content:
          "Tre platser, tre lokalsamhällen, en partner i fält. Khasi Hills, Copperbelt och Pontal — planterat, mätt och skyddat.",
      },
      { property: "og:title", content: "Våra projekt — SmartKlimat" },
      {
        property: "og:description",
        content:
          "Tre platser, tre lokalsamhällen, en partner i fält. Khasi Hills, Copperbelt och Pontal.",
      },
      { property: "og:url", content: "/projekt" },
    ],
  }),
  component: ProjektOversikt,
});

const principles = [
  { title: "Vetenskapligt mätt", body: "uppföljning i fält, art för art" },
  { title: "Lokalt ägt", body: "byar och bönder driver arbetet" },
  { title: "Externt granskat", body: "Preferred by Nature-certifiering" },
];

function ProjektOversikt() {
  return (
    <>
      <PageIntro
        eyebrow="Våra projekt"
        title="Skogen vi bygger"
        lead="Tre platser, tre lokalsamhällen, en partner i fält. Varje träd går in i ett av projekten nedan — planterat, mätt och skyddat tillsammans med människorna som bor där."
      />

      {/* WeForest-band */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <DoubleFrame innerClassName="px-6 py-10 md:px-14 md:py-16">
              <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
                <div>
                  <Eyebrow>Partner i fält</Eyebrow>
                  <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-skogsgron">
                    I partnerskap med WeForest
                  </h2>
                  <p className="mt-6 text-base md:text-lg text-skogsgron/80 max-w-xl">
                    Restaurering på vetenskaplig grund: varje hektar följs upp i
                    fält, varje metod väljs efter platsen, och arbetet leds av
                    människorna som äger marken.
                  </p>
                </div>
                <ul className="flex flex-col gap-6 md:pt-4">
                  {principles.map((p) => (
                    <li key={p.title} className="flex gap-4">
                      <span
                        aria-hidden
                        className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-guld"
                      />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-skogsgron">
                          {p.title}
                        </p>
                        <p className="mt-1 text-sm text-skogsgron/75">{p.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </DoubleFrame>
          </FadeUp>
        </div>
      </section>

      {/* Tre projektkort */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-6xl flex flex-col gap-8">
          <ProjectCard
            to="/projekt/khasi-hills"
            image="/projekt/kh-1.jpg"
            eyebrow="Indien · Meghalaya"
            title="Khasi Hills"
            body="Urfolksstyrd restaurering av molnskog i en av jordens våtaste och artrikaste trakter."
            stats={["3 150 ha molnskog", "59 byar · 12 Hima"]}
          />
          <ProjectCard
            to="/projekt/copperbelt"
            image="/projekt/cb-1.jpg"
            eyebrow="Zambia · Copperbelt"
            title="Copperbelt"
            body="Bondens skog: familjer återställer miombo, och bikupor i dungarna gör skogen till inkomst."
            stats={["800+ familjer", "70 trädarter i återväxten"]}
          />
          <ProjectCard
            to="/projekt/pontal"
            image="/projekt/po-1.jpg"
            eyebrow="Brasilien · São Paulo"
            title="Pontal"
            body="Korridorer genom Atlantskogen som återkopplar reservaten — för tamarin, jaguar och myrslok."
            stats={["Korridorer för 25+ arter", "Mångfald följs med AI"]}
          />
        </div>
      </section>

      {/* CTA-band */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <DoubleFrame innerClassName="px-6 py-12 md:px-14 md:py-20">
              <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
                <div>
                  <Eyebrow>Kom igång</Eyebrow>
                  <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-skogsgron">
                    Vill du plantera här?
                  </h2>
                  <p className="mt-6 max-w-xl text-base md:text-lg text-skogsgron/75">
                    Räkna på ditt avtryck eller koppla planteringen till era
                    affärer.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <CtaButton to="/kalkylator">Kalkylatorn</CtaButton>
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
