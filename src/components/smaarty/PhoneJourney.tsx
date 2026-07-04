import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneFrame } from "./PhoneFrame";
import { ScreenTeam, ScreenSell, ScreenHome, ScreenTop, ScreenCert } from "./screens";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Sidans hjärta: pinnad sektion där telefonen står stilla medan skärmen
 * växlar genom appens flöde i scroll-takt. Samma trapets-mönster som
 * öppningssekvensen (--jp + CSS min()). Reduced motion => staplad statisk lista.
 */

const BEATS = [
  { key: "team", nr: "01", title: "Laget skapas", sub: "Ledaren lägger upp klassen och bjuder in säljarna. Klart på en dag.", Screen: ScreenTeam },
  { key: "sell", nr: "02", title: "Ett träd säljs", sub: "Mottagarens namn och e-post — resten sköter appen. Inga kontanter.", Screen: ScreenSell },
  { key: "points", nr: "03", title: "Poängen tickar", sub: "+105 poäng, streaken flammar och nivåträdet växer mot nästa stadium.", Screen: ScreenHome },
  { key: "top", nr: "04", title: "Topplistan lever", sub: "Veckans hjälte koras, och lagets veckomål ger alla bonus.", Screen: ScreenTop },
  { key: "cert", nr: "05", title: "Beviset landar", sub: "Köparen får sitt personliga värdebevis — och trädet planteras.", Screen: ScreenCert },
] as const;

const N = BEATS.length;

function windowFor(i: number): [number, number] {
  const a = i / N;
  const b = (i + 1) / N;
  // första skärmen fullt synlig redan när pinnen tar vid, sista följer med ut
  return [i === 0 ? -0.25 : a - 0.02, i === N - 1 ? 1.25 : b + 0.02];
}

function beatStyle(i: number): React.CSSProperties {
  const [a, b] = windowFor(i);
  const k = (5 / (b - a)).toFixed(3);
  return {
    opacity: `min(calc((var(--jp, 0) - ${a}) * ${k}), calc((${b} - var(--jp, 0)) * ${k}), 1)` as unknown as number,
    willChange: "opacity",
  };
}

export function PhoneJourney() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [beat, setBeat] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    let current = 0;
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        root.style.setProperty("--jp", self.progress.toFixed(4));
        const idx = Math.min(N - 1, Math.floor(self.progress * N));
        if (idx !== current) {
          current = idx;
          setBeat(idx);
        }
      },
    });
    const doRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", doRefresh);
    const settle = window.setTimeout(doRefresh, 700);
    return () => {
      st.kill();
      window.removeEventListener("load", doRefresh);
      clearTimeout(settle);
    };
  }, []);

  if (reduced) {
    return (
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-5">
          {BEATS.map((b) => (
            <div key={b.key} className="text-center">
              <PhoneFrame className="mx-auto w-[180px]">
                <b.Screen active />
              </PhoneFrame>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">{b.nr}</p>
              <p className="mt-1 font-display text-lg font-bold text-skogsgron">{b.title}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div ref={rootRef} className="relative h-[380vh] md:h-[420vh]" style={{ ["--jp" as string]: 0 }}>
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 px-6 md:grid-cols-2 md:gap-16">
          {/* Telefonen */}
          <div className="mx-auto w-[52vw] max-w-[230px] md:w-full md:max-w-[290px] md:justify-self-end">
            <div className="relative">
              <PhoneFrame className="w-full">
                <div className="relative h-full w-full">
                  {BEATS.map((b, i) => (
                    <div key={b.key} className="absolute inset-0" style={beatStyle(i)}>
                      <b.Screen active={beat === i} />
                    </div>
                  ))}
                </div>
              </PhoneFrame>
            </div>
          </div>

          {/* Text-beats */}
          <div className="relative h-[150px] md:h-[220px]">
            {BEATS.map((b, i) => (
              <div key={b.key} className="absolute inset-0 text-center md:text-left" style={beatStyle(i)}>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-guld">
                  {b.nr} <span className="text-smaragd-dark">/ 05</span>
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-skogsgron md:text-5xl">
                  {b.title}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-[15px] text-skogsgron/70 md:mx-0 md:text-base">
                  {b.sub}
                </p>
              </div>
            ))}
            {/* progresspunkter */}
            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2 md:left-0 md:translate-x-0">
              {BEATS.map((b, i) => (
                <span
                  key={b.key}
                  className={`h-1.5 rounded-full transition-all duration-500 [transition-timing-function:var(--ease-smart)] ${
                    beat === i ? "w-6 bg-smaragd" : "w-1.5 bg-linje"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
