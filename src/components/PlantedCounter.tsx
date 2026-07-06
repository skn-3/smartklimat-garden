import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "./Eyebrow";
import { usePlantedTotal } from "@/lib/planted";

const KG_PER_TREE_YEAR = 20;

export function PlantedCounter() {
  const planted = usePlantedTotal();
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(planted);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const dur = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + eased * (planted - from)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, planted]);

  const co2Ton = Math.round((planted * KG_PER_TREE_YEAR) / 1000);

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
          ≈ {co2Ton.toLocaleString("sv-SE").replace(/\u00a0/g, " ")} ton koldioxid bundet — varje år
        </p>
      </div>
    </section>
  );
}
