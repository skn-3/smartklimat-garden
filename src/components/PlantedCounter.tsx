import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "./Eyebrow";

/**
 * Beat 7: räknaren. Talet är hårdkodat tills den publika stats-endpointen finns.
 * TODO (integration): hämta från SmartKlimat-backendens public-stats-funktion
 * (SUM(tree_count) över betalda köp) och räkna upp till det talet istället.
 */
const PLANTED = 27393;
const CO2_TON = Math.round((PLANTED * 20) / 1000); // 20 kg per träd och år

export function PlantedCounter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(PLANTED);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * PLANTED));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="px-6 py-24 md:py-32">
      <div ref={ref} className="mx-auto w-full max-w-6xl">
        <Eyebrow>Planterat, hittills</Eyebrow>
        <p className="mt-6 font-mono text-[clamp(3.2rem,10vw,6.5rem)] font-semibold leading-none tracking-tight text-skogsgron tabular-nums">
          {value.toLocaleString("sv-SE").replace(/\u00a0/g, " ")}
        </p>
        <p className="mt-3 text-base text-skogsgron/75 md:text-lg">
          träd planterade — live från systemet
        </p>
        <p className="mt-6 border-t border-linje pt-6 font-mono text-sm text-skogsgron/60">
          ≈ {CO2_TON} ton koldioxid bundet — varje år
        </p>
      </div>
    </section>
  );
}
