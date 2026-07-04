import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/Eyebrow";
import { CtaButton } from "@/components/CtaButton";
import { FadeUp } from "@/components/FadeUp";
import { PhoneFrame } from "@/components/smaarty/PhoneFrame";
import { ScreenHome, ScreenTop } from "@/components/smaarty/screens";
import { PhoneJourney } from "@/components/smaarty/PhoneJourney";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/smaarty")({
  head: () => ({
    meta: [
      { title: "Smaarty — för lag och skolor — SmartKlimat" },
      {
        name: "description",
        content:
          "Insamlingen som planterar skog. Barnen säljer träd, köparna får bevis, laget ser skogen växa.",
      },
    ],
  }),
  component: SmaartyPage,
});

/* Problemet: rader som stryks över i scroll-takt */
function ProblemSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.style.setProperty("--sp", "1");
      return;
    }
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      end: "top 22%",
      scrub: 0.4,
      onUpdate: (self) => el.style.setProperty("--sp", self.progress.toFixed(4)),
    });
    return () => st.kill();
  }, []);

  const struck = ["Kartonger att dela ut", "Leveranser att jaga", "Kontanter att räkna"];

  return (
    <section ref={ref} className="px-6 py-24 md:py-32" style={{ ["--sp" as string]: 0 }}>
      <div className="mx-auto max-w-2xl text-center">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
            Insamling utan allt det där.
          </h2>
        </FadeUp>
        <div className="mt-10 space-y-3">
          {struck.map((label, i) => {
            const a = i * 0.22;
            return (
              <div key={label} className="relative rounded-2xl border border-linje bg-white px-6 py-4">
                <p className="text-skogsgron/55">{label}</p>
                <span
                  className="absolute left-1/2 top-1/2 h-[2.5px] w-[62%] origin-left -translate-x-1/2 -translate-y-1/2 rounded-full bg-apricot-2"
                  style={{
                    transform: `translate(-50%,-50%) scaleX(clamp(0, calc((var(--sp, 0) - ${a}) * 4), 1))`,
                  }}
                />
              </div>
            );
          })}
          <div
            className="rounded-2xl border border-smaragd-light bg-mintpapper px-6 py-4 transition-all duration-700 [transition-timing-function:var(--ease-smart)]"
            style={{
              opacity: `min(1, calc((var(--sp, 0) - 0.66) * 4))` as unknown as number,
              transform: `translateY(clamp(0px, calc((0.9 - var(--sp, 0)) * 40px), 12px))`,
            }}
          >
            <p className="flex items-center justify-center gap-3 font-medium text-skogsgron">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-smaragd text-white">
                <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                  <path d="M2 6.2 L4.8 9 L10 3.2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Träd som planteras
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { eb: "Nivåer", title: "Från Skott till Fullvuxet träd", body: "Varje sålt träd växer säljarens eget nivåträd — fem stadier, från första skottet till fullvuxen krona." },
  { eb: "Märken", title: "Grön tumme, Skogshjälte, Eldsjäl", body: "Riktiga milstolpar med riktiga namn — och Veckans hjälte koras i varje lag, varje vecka." },
  { eb: "Laget", title: "Veckomål som ger alla bonus", body: "När laget når målet tillsammans får varenda säljare poäng. Helg-sprintar håller tempot uppe." },
  { eb: "Belöningar", title: "Poängen blir priser", body: "Säljarna löser in sina poäng mot belöningar direkt i appen. Motivationen sköter sig själv." },
];

const LEADER_POINTS = [
  "Full översikt över försäljning och aktivitet",
  "Inga kontanter — allt sker digitalt",
  "Inget att beställa hem, lagra eller dela ut",
  "Kontona skapas av dig som ledare, inte av barnen",
];

function SmaartyPage() {
  return (
    <>
      {/* HERO */}
      <section className="overflow-hidden px-6 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <FadeUp>
              <Eyebrow>Smaarty · För lag och skolor</Eyebrow>
            </FadeUp>
            <FadeUp delay={60}>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-skogsgron md:text-6xl">
                Insamlingen som <span className="text-smaragd">planterar skog.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={120}>
              <p className="mx-auto mt-6 max-w-md text-lg text-skogsgron/70 md:mx-0">
                Inga kartonger. Ingen leverans. Barnen säljer träd, köparna får bevis, och hela laget ser skogen växa.
              </p>
            </FadeUp>
            <FadeUp delay={180}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <CtaButton to="/smaarty" variant="primary">Starta ert lag</CtaButton>
                <CtaButton to="/projekt" variant="secondary">Våra projekt</CtaButton>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={140}>
            <div className="mx-auto w-[62vw] max-w-[260px] md:max-w-[300px]">
              <HeroPhone />
            </div>
          </FadeUp>
        </div>
      </section>

      <ProblemSection />

      {/* TELEFONRESAN */}
      <section className="bg-mintpapper/60">
        <div className="px-6 pt-20 text-center md:pt-28">
          <FadeUp>
            <Eyebrow>Så funkar det</Eyebrow>
          </FadeUp>
          <FadeUp delay={60}>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-skogsgron md:text-5xl">
              Hela resan, i din hand.
            </h2>
          </FadeUp>
        </div>
        <PhoneJourney />
      </section>

      {/* FUNKTIONER */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <h2 className="font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
              Byggd för att kännas som ett spel.
            </h2>
          </FadeUp>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {FEATURES.map((f, i) => (
              <FadeUp key={f.eb} delay={i * 70}>
                <div className="group rounded-[2rem] bg-mintpapper p-1.5">
                  <div className="rounded-[1.6rem] border border-linje bg-white p-7 transition-transform duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">{f.eb}</p>
                    <h3 className="mt-3 font-display text-xl font-bold text-skogsgron">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-skogsgron/70">{f.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FÖR LEDAREN */}
      <section className="bg-sand px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <FadeUp>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A7A52]">Ur ledarens sits</p>
            </FadeUp>
            <FadeUp delay={60}>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#3D3524] md:text-4xl">
                Du har full koll. Barnen har kul.
              </h2>
            </FadeUp>
            <ul className="mt-8 space-y-4">
              {LEADER_POINTS.map((p, i) => (
                <FadeUp key={p} delay={100 + i * 60}>
                  <li className="flex items-start gap-3 text-[15.5px] text-[#5C5238]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-guld" />
                    {p}
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>
          <FadeUp delay={120}>
            <div className="mx-auto w-[58vw] max-w-[250px]">
              <PhoneFrame className="w-full" tilt={-4}>
                <ScreenTop active />
              </PhoneFrame>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* KLIMATNYTTAN */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <FadeUp>
            <h2 className="font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
              Och allt detta planterar skog.
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <div className="mt-12 border-y border-linje py-10">
              <div className="grid gap-10 md:grid-cols-3">
                {[
                  ["20 kg", "koldioxid per träd, varje år"],
                  ["3", "projekt på tre kontinenter"],
                  ["27 393", "träd planterade hittills"],
                ].map(([a, b]) => (
                  <div key={a}>
                    <p className="font-mono text-4xl font-semibold text-skogsgron tabular-nums">{a}</p>
                    <p className="mt-2 text-sm text-skogsgron/60">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={140}>
            <p className="mx-auto mt-10 max-w-xl text-skogsgron/70">
              Träden går in i samma projekt som allt annat vi planterar — Khasi Hills, Copperbelt och Pontal. Klassen kan läsa om sitt.
            </p>
          </FadeUp>
          <FadeUp delay={180}>
            <div className="mt-8">
              <CtaButton to="/projekt" variant="secondary">Se projekten</CtaButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28">
        <FadeUp>
          <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-skogsgron px-8 py-16 text-center md:py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight text-papper md:text-5xl">
              Starta ert lag.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-salvia">
              Berätta vilket lag eller vilken klass det gäller, så hör vi av oss med allt ni behöver.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:kontakt@smartklimat.org?subject=Smaarty%20—%20lag/skola"
                className="rounded-full bg-smaragd px-7 py-3 text-[15px] font-medium text-white transition-transform duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5"
              >
                Kom igång
              </a>
              <Link
                to="/projekt"
                className="rounded-full border border-salvia/50 px-7 py-3 text-[15px] font-medium text-salvia transition-colors duration-500 hover:border-salvia"
              >
                Våra projekt
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}

function HeroPhone() {
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
    <div ref={ref}>
      <PhoneFrame className="w-full" tilt={5}>
        <ScreenHome active={seen} />
      </PhoneFrame>
    </div>
  );
}
