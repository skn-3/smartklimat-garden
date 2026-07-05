import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FadeUp } from "@/components/FadeUp";

gsap.registerPlugin(ScrollTrigger);

function Fotboll() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
      <g data-ball style={{ transformOrigin: "32px 34px" }}>
        <circle cx="32" cy="34" r="24" fill="#fff" stroke="#0B3D2E" strokeWidth="2.5" />
        <polygon points="32,24 41,31 37.5,41 26.5,41 23,31" fill="#0B3D2E" />
        {[0, 72, 144, 216, 288].map((a) => (
          <line key={a} x1="32" y1="34" x2={32 + 21 * Math.cos(((a - 90) * Math.PI) / 180)} y2={34 + 21 * Math.sin(((a - 90) * Math.PI) / 180)}
            stroke="#0B3D2E" strokeWidth="2" transform={`rotate(36 32 34)`} opacity="0.9" />
        ))}
      </g>
    </svg>
  );
}
function Biobiljetter() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
      <g data-ticket2 style={{ transformOrigin: "20px 44px" }}>
        <rect x="10" y="22" width="44" height="24" rx="5" fill="#F6B27A" transform="rotate(-10 32 34)" />
      </g>
      <g data-ticket style={{ transformOrigin: "20px 44px" }}>
        <rect x="12" y="26" width="44" height="24" rx="5" fill="#DCBE6E" transform="rotate(4 32 38)" />
        <line x1="40" y1="26" x2="40" y2="50" stroke="#0B3D2E" strokeWidth="1.6" strokeDasharray="3 3" transform="rotate(4 32 38)" />
        <text x="25" y="42" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" fill="#0B3D2E" transform="rotate(4 32 38)">BIO</text>
      </g>
    </svg>
  );
}
function Elsparkcykel() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
      <g data-scoot>
        <line data-speed x1="4" y1="30" x2="14" y2="30" stroke="#9FD9B6" strokeWidth="2.5" strokeLinecap="round" />
        <line data-speed x1="2" y1="38" x2="12" y2="38" stroke="#9FD9B6" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="20" y="44" width="26" height="5" rx="2.5" fill="#0B3D2E" />
        <line x1="44" y1="46" x2="52" y2="18" stroke="#0B3D2E" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="45" y1="18" x2="59" y2="18" stroke="#0B3D2E" strokeWidth="3.5" strokeLinecap="round" />
        <g data-wheel style={{ transformOrigin: "20px 52px" }}>
          <circle cx="20" cy="52" r="7" fill="none" stroke="#0B3D2E" strokeWidth="3" />
          <line x1="20" y1="46.5" x2="20" y2="57.5" stroke="#1E9E6A" strokeWidth="2" />
        </g>
        <g data-wheel style={{ transformOrigin: "50px 52px" }}>
          <circle cx="50" cy="52" r="7" fill="none" stroke="#0B3D2E" strokeWidth="3" />
          <line x1="50" y1="46.5" x2="50" y2="57.5" stroke="#1E9E6A" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}

const REWARDS = [
  { Icon: Fotboll, name: "Fotboll", pts: "450 p", sold: false },
  { Icon: Biobiljetter, name: "Biobiljetter ×2", pts: "300 p", sold: false },
  { Icon: Elsparkcykel, name: "Elsparkcykel", pts: "2 500 p", sold: true },
];

export function RewardShowcase() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set("[data-rw]", { opacity: 1, y: 0, rotate: 0 }); return; }
      gsap.set("[data-rw]", { opacity: 0, y: 30, rotate: -2 });
      gsap.to("[data-rw]", {
        opacity: 1, y: 0, rotate: 0, duration: 0.7, stagger: 0.12, ease: "back.out(1.8)",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      gsap.to("[data-ball]", { rotate: 24, y: -3, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("[data-ticket]", { rotate: 7, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("[data-ticket2]", { rotate: -5, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.2 });
      gsap.to("[data-wheel]", { rotate: 360, duration: 1.1, ease: "none", repeat: -1 });
      gsap.to("[data-scoot]", { x: 3, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("[data-speed]", { opacity: 0.2, x: -3, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.15 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#C4762B]">Belöningarna</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
              Poängen blir priser. På riktigt.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#52705F]">
              Varje sålt träd ger poäng — och poängen spenderas i appens belöningsbutik.
              Fotbollar, biobiljetter, elsparkcyklar. Aldrig pengar, alltid poäng.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-[#52705F]">
              Och utdelningen? Den sker på träningen. Priserna skickas till lagledaren,
              som delar ut inför hela laget — jubel ingår.
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-[#6E9483]">
              Märken samlar du · priser köper du · elden håller du vid liv
            </p>
          </FadeUp>

          <div className="space-y-3">
            {REWARDS.map(({ Icon, name, pts, sold }) => (
              <div key={name} data-rw
                className={`flex items-center gap-4 rounded-2xl border border-linje p-5 ${sold ? "bg-papper" : "bg-mintpapper/70"}`}>
                <Icon />
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-bold text-skogsgron">{name}</span>
                  <span className="block font-mono text-xs tracking-wider text-smaragd-dark">{pts}</span>
                </span>
                {sold ? (
                  <span className="rounded-full bg-linje px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#6E9483]">Slutsåld</span>
                ) : (
                  <span className="rounded-full bg-smaragd px-5 py-2.5 font-display text-sm font-bold text-white">Beställ</span>
                )}
              </div>
            ))}
            <p className="pt-1 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[#9BB3A6]">
              Exempel ur belöningsbutiken — utbudet väljer vi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
