import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
import { Utensils, Car, Plane, Home, ShoppingBag } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";

gsap.registerPlugin(ScrollTrigger);

const IKONER = [Utensils, Car, Plane, Home, ShoppingBag];

export function AvtryckTeaser() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-ai]", { opacity: 1, scale: 1 });
        gsap.set("[data-abar]", { scaleX: 1 });
        return;
      }
      gsap.set("[data-ai]", { opacity: 0, scale: 0.5 });
      gsap.set("[data-abar]", { scaleX: 0, transformOrigin: "0 50%" });
      const st = { trigger: ref.current, start: "top 75%", once: true };
      gsap.to("[data-ai]", { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)", scrollTrigger: st });
      gsap.to("[data-abar]", { scaleX: 1, duration: 0.9, stagger: 0.15, ease: "power3.out", delay: 0.3, scrollTrigger: st });
      gsap.to("[data-apulse]", { opacity: 0.55, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-skogsgron px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <FadeUp>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-guld">Nytt · Avtryckskalkylatorn</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-papper md:text-4xl">
            Hur stort är ditt år?
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-salvia">
            Fem frågor om vardagen — mat, bil, flyg, boende, shopping — och du ser
            din storleksordning mot Sverigesnittet. Inga konton, inga pekpinnar.
          </p>
          <Link to="/avtryck"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-guld px-8 py-4 font-display font-bold text-skogsgron transition-transform hover:scale-[1.03]">
            Räkna ditt avtryck →
          </Link>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
            <div className="flex items-center gap-4">
              {IKONER.map((I, k) => (
                <span key={k} data-ai className="grid h-11 w-11 place-items-center rounded-full bg-[#10493A]">
                  <I className="h-5 w-5 text-salvia" aria-hidden />
                </span>
              ))}
            </div>
            <div className="mt-7 space-y-4">
              <div>
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-salvia">
                  <span>Du</span><span data-apulse>? ton</span>
                </div>
                <div className="mt-1.5 h-3 w-full rounded-full bg-[#10493A]">
                  <div data-abar data-apulse className="h-3 w-[58%] rounded-full bg-guld" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-salvia">
                  <span>Sverigesnittet</span><span>8 ton</span>
                </div>
                <div className="mt-1.5 h-3 w-full rounded-full bg-[#10493A]">
                  <div data-abar className="h-3 w-full rounded-full bg-[#2E5D4B]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-wider text-salvia">
                  <span>Hållbar nivå 2050</span><span>1 ton</span>
                </div>
                <div className="mt-1.5 h-3 w-full rounded-full bg-[#10493A]">
                  <div data-abar className="h-3 w-[12%] rounded-full bg-smaragd" />
                </div>
              </div>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6E9483]">
              Två minuter · fem frågor · en ärlig siffra
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
