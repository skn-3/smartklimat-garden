import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { OpeningSequence } from "@/components/OpeningSequence";
import { AvtryckTeaser } from "@/components/AvtryckTeaser";
import { PlantedCounter } from "@/components/PlantedCounter";
import { FadeUp } from "@/components/FadeUp";
import { Eyebrow } from "@/components/Eyebrow";
import { PhoneFrame } from "@/components/smaarty/PhoneFrame";
import { ScreenHome } from "@/components/smaarty/screens";
import { CertCard } from "@/components/foretag/scenes";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://smartklimat.org/" }],
    meta: [
      { title: "SmartKlimat — plantera träd med spårbart värdebevis" },
      { name: "description", content: "Plantera träd i granskade WeForest-projekt — från 35 kr, med spårbart värdebevis i ditt namn. Klimatkompensation byggd som teknik, för privatpersoner och företag." },
    ],
  }),
  component: Home,
});

/** Aktiverar barnets animationer när elementet syns i viewporten. */
function InView({ children }: { children: (seen: boolean) => React.ReactNode }) {
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
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref}>{children(seen)}</div>;
}

const STEPS = [
  { nr: "01", title: "En affär eller ett sälj", body: "Ett fönster installeras, en klass säljer, någon räknar på sin resa — startpunkten är er vardag, inte ett formulär." },
  { nr: "02", title: "Ett träd i marken", body: "Trädet planteras i något av våra tre WeForest-projekt och registreras som en rad i systemet, med tid och plats." },
  { nr: "03", title: "Ett bevis i handen", body: "Mottagaren får ett personligt värdebevis med egen verifieringslänk — öppet att kontrollera för vem som helst." },
];

const PROJECTS = [
  { to: "/projekt/khasi-hills" as const, img: "/projekt/kh-1.jpg", land: "Indien", title: "Khasi Hills", line: "Urfolksstyrd molnskog i molnens boning." },
  { to: "/projekt/copperbelt" as const, img: "/projekt/cb-1.jpg", land: "Zambia", title: "Copperbelt", line: "Bondens skog — bin, honung och miombo." },
  { to: "/projekt/pontal" as const, img: "/projekt/po-1.jpg", land: "Brasilien", title: "Pontal", line: "Vilddjurens korridorer genom Atlantskogen." },
];

const TRUST = [
  "Planterat med WeForest",
  "Externt granskat — Preferred by Nature",
  "Spårbart ner till projektet",
  "Live-data, direkt ur systemet",
];

const TEMANKORT = [
  { slug: "fodelsedag", label: "Födelsedag" },
  { slug: "morsdag", label: "Mors dag" },
  { slug: "farsdag", label: "Fars dag" },
  { slug: "pask", label: "Påsk" },
  { slug: "jul", label: "Jul" },
  { slug: "sommar", label: "Sommar" },
  { slug: "semester", label: "Semester" },
  { slug: "resa", label: "Resa" },
  { slug: "hjartans", label: "Hjärtans" },
  { slug: "environment", label: "Environment" },
];

function Home() {
  return (
    <>
      <OpeningSequence />

      <PlantedCounter />

      {/* TVÅ VÄGAR IN */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <Eyebrow>Två vägar in</Eyebrow>
          </FadeUp>
          <FadeUp delay={60}>
            <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-skogsgron md:text-5xl">
              Byggt för affärer. Byggt för lag.
            </h2>
          </FadeUp>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <FadeUp delay={100}>
              <Link to="/foretag" className="group block h-full">
                <div className="h-full rounded-[2rem] bg-mintpapper p-1.5">
                  <div className="flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[1.6rem] border border-linje bg-white p-8 transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:-translate-y-1">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">För företag</p>
                      <h3 className="mt-3 font-display text-2xl font-bold text-skogsgron md:text-3xl">
                        Gör varje affär till skog.
                      </h3>
                      <p className="mt-3 max-w-sm text-sm text-skogsgron/70">
                        Automatisk klimatkompensation i ert orderflöde — kunden får ett verifierbart bevis med ert varumärke.
                      </p>
                    </div>
                    <div className="relative flex items-end justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mintpapper text-skogsgron transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <div className="w-[180px] rotate-3 transition-transform duration-700 [transition-timing-function:var(--ease-smart)] group-hover:rotate-1">
                        <InView>{(seen) => <CertCard active={seen} />}</InView>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>

            <FadeUp delay={160}>
              <Link to="/smaarty" className="group block h-full">
                <div className="h-full rounded-[2rem] bg-mintpapper p-1.5">
                  <div className="flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[1.6rem] border border-linje bg-white p-8 transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:-translate-y-1">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">Smaarty · Lag och skolor</p>
                      <h3 className="mt-3 font-display text-2xl font-bold text-skogsgron md:text-3xl">
                        Insamlingen som planterar skog.
                      </h3>
                      <p className="mt-3 max-w-sm text-sm text-skogsgron/70">
                        Barnen säljer träd, poängen tickar, laget ser skogen växa — inga kartonger, inga kontanter.
                      </p>
                    </div>
                    <div className="relative flex items-end justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mintpapper text-skogsgron transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <div className="w-[150px] -mb-16 rotate-[-4deg] transition-transform duration-700 [transition-timing-function:var(--ease-smart)] group-hover:rotate-[-2deg]">
                        <InView>
                          {(seen) => (
                            <PhoneFrame className="w-full">
                              <ScreenHome active={seen} />
                            </PhoneFrame>
                          )}
                        </InView>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* GE BORT ETT TRÄD — TEMANKORT */}
      <section className="bg-papper px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <h2 className="font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
              Ge bort ett träd — välj ditt kort
            </h2>
          </FadeUp>
          <FadeUp delay={60}>
            <p className="mt-4 max-w-2xl font-sans text-lg text-skogsgron/80">
              Femton kort, femton tillfällen — alla planterar riktiga träd i Zambia
            </p>
          </FadeUp>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {TEMANKORT.map((kort, i) => (
              <FadeUp key={kort.slug} delay={i * 60}>
                <a
                  href={`https://app.smartklimat.org?tema=${kort.slug}`}
                  className="group block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-linje/50 transition-all duration-500 [transition-timing-function:var(--ease-smart)] group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-md">
                    <img
                      src={`/kort/kort-${kort.slug}.jpg`}
                      alt={kort.label}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <p className="mt-3 text-center text-sm font-medium text-skogsgron/90">
                    {kort.label}
                  </p>
                </a>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="mt-12 flex justify-center">
              <a
                href="https://app.smartklimat.org"
                className="inline-flex items-center gap-2 rounded-full bg-smaragd px-7 py-3.5 text-sm font-medium text-white transition-all duration-500 [transition-timing-function:var(--ease-smart)] hover:bg-smaragd-dark hover:-translate-y-0.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Se alla teman i appen
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SÅ FUNKAR DET */}
      <AvtryckTeaser />

      <section className="bg-mintpapper/60 px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <h2 className="font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
              Från vardag till skog, i tre steg.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <FadeUp key={s.nr} delay={i * 80}>
                <div className="h-full rounded-[2rem] bg-white p-1.5 ring-1 ring-linje">
                  <div className="h-full rounded-[1.6rem] bg-white p-7">
                    <p className="font-mono text-3xl font-semibold text-smaragd">{s.nr}</p>
                    <h3 className="mt-4 font-display text-xl font-bold text-skogsgron">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-skogsgron/70">{s.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PROJEKTEN */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <FadeUp>
                <Eyebrow>Våra projekt</Eyebrow>
              </FadeUp>
              <FadeUp delay={60}>
                <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
                  Skogen vi bygger.
                </h2>
              </FadeUp>
            </div>
            <FadeUp delay={100}>
              <Link
                to="/projekt"
                className="group inline-flex items-center gap-2 text-sm font-medium text-smaragd-dark"
              >
                Alla projekt
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-mintpapper transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </Link>
            </FadeUp>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <FadeUp key={p.to} delay={i * 80}>
                <Link to={p.to} className="group block">
                  <div className="rounded-[2rem] bg-mintpapper p-1.5">
                    <div className="overflow-hidden rounded-[1.6rem] border border-linje bg-white">
                      <div className="overflow-hidden">
                        <img
                          src={p.img}
                          alt={p.title}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-smart)] group-hover:scale-[1.05]"
                        />
                      </div>
                      <div className="p-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">{p.land}</p>
                        <h3 className="mt-2 font-display text-xl font-bold text-skogsgron">{p.title}</h3>
                        <p className="mt-1.5 text-sm text-skogsgron/70">{p.line}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST-RAD */}
      <section className="px-6 pb-24 md:pb-32">
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
    </>
  );
}
