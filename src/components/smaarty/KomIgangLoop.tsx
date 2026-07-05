import { useEffect, useRef } from "react";
import gsap from "gsap";

const STEPS = ["INSTALLERA", "GÅ MED", "PLANTERA"];
const CONF = [
  [-64, -38, -14], [58, -46, 20], [-40, -70, -30], [44, -74, 12],
  [-74, 6, -8], [70, -6, 24], [-18, -84, 6], [16, -80, -18],
];

export function KomIgangLoop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-scene]", { opacity: 1, scale: 1 });
        gsap.set("[data-static-row]", { opacity: 1 });
        gsap.set("[data-stage]", { opacity: 0 });
        return;
      }
      gsap.set("[data-static-row]", { opacity: 0 });
      const D = 3; // sekunder per steg
      const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "power3.out" } });

      const scenes = ["[data-s1]", "[data-s2]", "[data-s3]"];
      scenes.forEach((s, i) => {
        const t0 = i * D;
        // etikett + punkt tänds
        tl.to(`[data-lbl="${i}"]`, { fill: "#0B3D2E", duration: 0.3 }, t0)
          .to(`[data-dot="${i}"]`, { attr: { r: 6 }, fill: "#1E9E6A", duration: 0.3 }, t0)
          .to(`[data-lbl="${i}"]`, { fill: "#9BB3A6", duration: 0.3 }, t0 + D - 0.3)
          .to(`[data-dot="${i}"]`, { attr: { r: 4 }, fill: "#D9EBE0", duration: 0.3 }, t0 + D - 0.3);
        // scen in/ut
        tl.fromTo(s, { opacity: 0, scale: 0.7, transformOrigin: "50% 60%" },
          { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.8)" }, t0)
          .to(s, { opacity: 0, scale: 0.85, duration: 0.35, ease: "power2.in" }, t0 + D - 0.35);
      });

      // steg 1: UI-rader + plus
      tl.fromTo("[data-row]", { scaleX: 0, transformOrigin: "0 50%" },
        { scaleX: 1, duration: 0.35, stagger: 0.1 }, 0.25)
        .fromTo("[data-plus]", { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2.4)" }, 0.85)
        .fromTo("[data-plusring]", { attr: { r: 20 }, opacity: 0.6 },
          { attr: { r: 40 }, opacity: 0, duration: 0.7 }, 0.95);

      // steg 2: badge poppar
      tl.fromTo("[data-six]", { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2.4)" }, D + 0.5);

      // steg 3: träd växer, konfetti, +10
      tl.fromTo("[data-grow]", { scale: 0, transformOrigin: "50% 100%" },
        { scale: 1, duration: 0.7, ease: "back.out(1.9)" }, 2 * D + 0.15);
      CONF.forEach(([dx, dy, rot], k) => {
        tl.fromTo(`[data-c="${k}"]`, { x: 0, y: 0, opacity: 1, rotate: 0 },
          { x: dx, y: dy, rotate: rot, opacity: 0, duration: 0.9, ease: "power2.out" }, 2 * D + 0.55);
      });
      tl.fromTo("[data-pts]", { y: 12, opacity: 0 }, { y: -14, opacity: 1, duration: 0.5 }, 2 * D + 0.7)
        .to("[data-pts]", { y: -30, opacity: 0, duration: 0.5, ease: "power2.in" }, 2 * D + 1.5);

      // progress
      tl.fromTo("[data-prog]", { attr: { width: 0 } }, { attr: { width: 560 }, duration: 3 * D, ease: "none" }, 0);

      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()), { threshold: 0.25 });
      io.observe(el);
      return () => io.disconnect();
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-mintpapper/60 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-smaragd-dark">Så kommer ni igång</p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
          Tre steg. Fem minuter.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-[#52705F]">
          Ingen app store, inga blanketter — bara en lagkod och ett första träd.
        </p>

        <svg data-stage viewBox="0 0 720 320" className="mx-auto mt-8 w-full max-w-2xl" aria-hidden>
          {/* scen 1: telefonen */}
          <g data-scene data-s1 opacity="0">
            <rect x="308" y="30" width="104" height="176" rx="18" fill="#0B3D2E" />
            <rect x="316" y="40" width="88" height="156" rx="12" fill="#ffffff" />
            <rect x="344" y="46" width="32" height="6" rx="3" fill="#C9D9CE" />
            <rect data-row x="328" y="66" width="64" height="10" rx="5" fill="#9FD9B6" />
            <rect data-row x="328" y="84" width="46" height="10" rx="5" fill="#EAF7EE" />
            <rect data-row x="328" y="102" width="56" height="10" rx="5" fill="#9FD9B6" />
            <rect data-row x="328" y="128" width="64" height="24" rx="12" fill="#1E9E6A" />
            <circle data-plusring cx="404" cy="196" r="20" fill="none" stroke="#DCBE6E" strokeWidth="2" opacity="0" />
            <g data-plus>
              <circle cx="404" cy="196" r="19" fill="#DCBE6E" />
              <text x="404" y="204" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="22" fontWeight="700" fill="#0B3D2E">+</text>
            </g>
          </g>

          {/* scen 2: lagkoden */}
          <g data-scene data-s2 opacity="0">
            <rect x="272" y="92" width="176" height="56" rx="28" fill="#ffffff" stroke="#D9EBE0" strokeWidth="2" />
            <text x="360" y="128" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="22" letterSpacing="4" fontWeight="600" fill="#15784F">EKARNA</text>
            <g data-six>
              <circle cx="448" cy="88" r="17" fill="#DCBE6E" />
              <text x="448" y="95" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="16" fontWeight="700" fill="#0B3D2E">6</text>
            </g>
            <text x="360" y="176" textAnchor="middle" fontFamily="Familjen Grotesk, sans-serif" fontSize="14" fill="#6E9483">koden du får av lagledaren</text>
          </g>

          {/* scen 3: trädet */}
          <g data-scene data-s3 opacity="0">
            <g data-grow>
              <path d="M360 200 q4 -34 0 -58" stroke="#15784F" strokeWidth="6" fill="none" />
              <ellipse cx="344" cy="158" rx="17" ry="11" fill="#1E9E6A" transform="rotate(-26 344 158)" />
              <ellipse cx="377" cy="146" rx="17" ry="11" fill="#9FD9B6" transform="rotate(24 377 146)" />
              <ellipse cx="360" cy="128" rx="14" ry="9" fill="#1E9E6A" />
            </g>
            {CONF.map((_, k) => (
              <rect key={k} data-c={k} x="355" y="150" width="11" height="6" rx="2.5"
                fill={["#1E9E6A", "#DCBE6E", "#F6B27A"][k % 3]} />
            ))}
            <text data-pts x="360" y="96" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="24" fontWeight="700" fill="#1E9E6A" opacity="0">+10</text>
          </g>

          {/* statisk fallback (reduced motion) */}
          <g data-static-row opacity="0">
            <rect x="150" y="90" width="64" height="110" rx="12" fill="#0B3D2E" />
            <rect x="156" y="97" width="52" height="96" rx="8" fill="#fff" />
            <rect x="300" y="122" width="120" height="42" rx="21" fill="#fff" stroke="#D9EBE0" strokeWidth="2" />
            <text x="360" y="149" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" letterSpacing="3" fill="#15784F">EKARNA</text>
            <g transform="translate(540,180)">
              <path d="M0 0 q4 -28 0 -46" stroke="#15784F" strokeWidth="5" fill="none" />
              <ellipse cx="-13" cy="-34" rx="13" ry="8" fill="#1E9E6A" transform="rotate(-26 -13 -34)" />
              <ellipse cx="13" cy="-25" rx="13" ry="8" fill="#9FD9B6" transform="rotate(24 13 -25)" />
            </g>
          </g>

          {/* etiketter + progress */}
          {STEPS.map((s, i) => (
            <g key={s}>
              <circle data-dot={i} cx={160 + i * 200} cy={252} r="4" fill="#D9EBE0" />
              <text data-lbl={i} x={160 + i * 200} y={278} textAnchor="middle"
                fontFamily="JetBrains Mono, monospace" fontSize="12" letterSpacing="3" fill="#9BB3A6" fontWeight="600">{s}</text>
            </g>
          ))}
          <rect x="80" y="298" width="560" height="3" rx="1.5" fill="#D9EBE0" />
          <rect data-prog x="80" y="298" width="0" height="3" rx="1.5" fill="#DCBE6E" />
        </svg>

        <a href="https://app.smartklimat.org/skapa-lag"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-skogsgron px-8 py-4 font-display font-bold text-papper transition-transform hover:scale-[1.03]">
          Starta ett lag →
        </a>
      </div>
    </section>
  );
}
