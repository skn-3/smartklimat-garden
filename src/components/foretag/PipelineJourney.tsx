import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SceneDeal, SceneSystem, SceneTrees, SceneCert } from "./scenes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Företagssidans hjärta: pinnad sektion där en affär reser genom systemet.
 * Samma beprövade mekanik som Smaartys telefonresa (--pp + CSS-trapets).
 */

const BEATS = [
  { key: "deal", nr: "01", title: "Affären signeras", sub: "Ingenting ändras i ert flöde — säljaren gör exakt som vanligt.", Scene: SceneDeal },
  { key: "system", nr: "02", title: "Systemet tar emot", sub: "Ordern når vår gateway i samma sekund. Verifierad, registrerad, klar.", Scene: SceneSystem },
  { key: "trees", nr: "03", title: "Träden planteras", sub: "Åtta fönster blir åtta träd i något av våra projekt — och räknaren tickar.", Scene: SceneTrees },
  { key: "cert", nr: "04", title: "Kunden får beviset", sub: "Ett personligt värdebevis med ert varumärke och egen verifieringslänk.", Scene: SceneCert },
] as const;

const N = BEATS.length;

function windowFor(i: number): [number, number] {
  const a = i / N;
  const b = (i + 1) / N;
  return [i === 0 ? -0.25 : a - 0.02, i === N - 1 ? 1.25 : b + 0.02];
}

function beatStyle(i: number): React.CSSProperties {
  const [a, b] = windowFor(i);
  const k = (5 / (b - a)).toFixed(3);
  return {
    opacity: `min(calc((var(--pp, 0) - ${a}) * ${k}), calc((${b} - var(--pp, 0)) * ${k}), 1)` as unknown as number,
    willChange: "opacity",
  };
}

export function PipelineJourney() {
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
        root.style.setProperty("--pp", self.progress.toFixed(4));
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
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
          {BEATS.map((b) => (
            <div key={b.key} className="text-center">
              <div className="min-h-[300px] rounded-[2rem] bg-mintpapper p-1.5">
                <div className="h-full rounded-[1.6rem] border border-linje bg-white/60">
                  <b.Scene active />
                </div>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">{b.nr}</p>
              <p className="mt-1 font-display text-lg font-bold text-skogsgron">{b.title}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div ref={rootRef} className="relative h-[340vh] md:h-[380vh]" style={{ ["--pp" as string]: 0 }}>
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 px-6 md:grid-cols-2 md:gap-16">
          {/* Scenpanelen */}
          <div className="mx-auto w-full max-w-[420px] md:justify-self-end">
            <div className="rounded-[2rem] bg-mintpapper p-1.5">
              <div className="relative aspect-[4/4.4] overflow-hidden rounded-[1.6rem] border border-linje bg-white/60 md:aspect-[4/4.2]">
                {BEATS.map((b, i) => (
                  <div key={b.key} className="absolute inset-0" style={beatStyle(i)}>
                    <b.Scene active={beat === i} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text-beats */}
          <div className="relative h-[150px] md:h-[220px]">
            {BEATS.map((b, i) => (
              <div key={b.key} className="absolute inset-0 text-center md:text-left" style={beatStyle(i)}>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-guld">
                  {b.nr} <span className="text-smaragd-dark">/ 04</span>
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-skogsgron md:text-5xl">
                  {b.title}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-[15px] text-skogsgron/70 md:mx-0 md:text-base">
                  {b.sub}
                </p>
              </div>
            ))}
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
