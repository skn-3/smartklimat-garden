import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const boosts = [
  { emoji: "🚀", name: "Turbo", desc: "2x poäng på nästa 5 planteringar — aktivera när du vill.", tag: "×2" },
  { emoji: "🔥", name: "Eldstreak", desc: "Sälj ett träd i veckan och elden växer, vecka för vecka.", tag: "🔥4" },
  { emoji: "🧊", name: "Streakfrys", desc: "Missar du en vecka? Frysen räddar elden. Ingen skuld.", tag: "1 kvar" },
];

const rows = [
  { pos: 1, emoji: "🦅", bg: "#F6B27A", name: "Vera", guild: "Lag Ekarna", buffs: "🚀×2 🔥4", pts: 128 },
  { pos: 2, emoji: "🐆", bg: "#9FD9B6", name: "Melvin", guild: "Trädkramarna, Umeå", buffs: "🔥7", pts: 96 },
  { pos: 3, emoji: "🐝", bg: "#DCBE6E", name: "Alice", guild: "Klass 5B Sollentuna", buffs: "⚽", pts: 81 },
];

export function TurboShowcase() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-boost], [data-row], [data-ts-copy]", { opacity: 1, y: 0, scale: 1, rotate: 0 });
        return;
      }
      gsap.set("[data-boost]", { opacity: 0, y: 34, scale: 0.85, rotate: -3 });
      gsap.set("[data-row]", { opacity: 0, x: -26 });
      gsap.set("[data-ts-copy]", { opacity: 0, y: 22 });
      gsap.to("[data-ts-copy]", {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
      });
      gsap.to("[data-boost]", {
        opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.75, stagger: 0.13, ease: "back.out(1.9)",
        scrollTrigger: { trigger: "[data-boost-grid]", start: "top 78%", once: true },
      });
      gsap.to("[data-row]", {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: "[data-board]", start: "top 80%", once: true },
      });
      gsap.to("[data-float]", { y: -4, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div data-ts-copy>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#C4762B]">Nytt i Smaarty</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
            Turbo-läget: boosts, streaks — och hela Sveriges topplista.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#52705F]">
            Sälj träd, lås upp boosts och aktivera dem när det passar dig bäst. Håll elden vid liv vecka
            för vecka, samla märken — och se laget bakom ditt namn på riksscenen, som din guild.
            Loggen tickar live när kompisarna låser upp något nytt.
          </p>
        </div>

        <div data-boost-grid className="mt-12 grid gap-4 sm:grid-cols-3">
          {boosts.map((b) => (
            <div key={b.name} data-boost className="rounded-2xl border border-linje bg-papper p-6">
              <div className="flex items-start justify-between">
                <span data-float className="inline-block text-4xl">{b.emoji}</span>
                <span className="font-mono text-xs font-bold tracking-wider text-guld">{b.tag}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-skogsgron">{b.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#52705F]">{b.desc}</p>
            </div>
          ))}
        </div>

        <div data-board className="mt-6 rounded-3xl border border-linje bg-mintpapper/70 p-6 md:p-8">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-xl font-bold text-skogsgron">Sverige just nu</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6E9483]">Vecka · Totalt</span>
          </div>
          <div className="mt-5 space-y-3">
            {rows.map((r) => (
              <div key={r.pos} data-row className="flex items-center gap-4 rounded-2xl border border-linje bg-white px-4 py-3">
                <span className="w-5 text-center font-display text-sm font-bold text-[#52705F]">{r.pos}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full text-xl ring-2 ring-white" style={{ backgroundColor: r.bg }}>{r.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-base font-bold text-skogsgron">{r.name}</span>
                  <span className="block truncate text-xs font-semibold text-[#B08D3E]">‹{r.guild}›</span>
                </span>
                <span data-float className="hidden text-base sm:block">{r.buffs}</span>
                <span className="text-right">
                  <span className="block font-display text-lg font-bold text-smaragd-dark">{r.pts}</span>
                  <span className="block text-[10px] text-[#6E9483]">poäng</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-[#52705F]">
            Profilbild som på Discord, förnamn och laget som guild — aldrig mer än så.
          </p>
        </div>
      </div>
    </section>
  );
}
