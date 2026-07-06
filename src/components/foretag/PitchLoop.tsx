import { useEffect, useRef } from "react";
import gsap from "gsap";

const STEPS = ["SKIFTET", "KEDJAN", "BEVISET", "MÄRKET"];

export function PitchLoop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-scene]", { opacity: 0 });
        gsap.set("[data-p4]", { opacity: 1 });
        gsap.set("[data-stamp]", { opacity: 1, scale: 1 });
        return;
      }
      const D = 3.4;
      const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "power3.out" } });
      const scenes = ["[data-p1]", "[data-p2]", "[data-p3]", "[data-p4]"];
      scenes.forEach((s, i) => {
        const t0 = i * D;
        tl.to(`[data-plbl="${i}"]`, { fill: "#F4FAF5", duration: 0.3 }, t0)
          .to(`[data-pdot="${i}"]`, { attr: { r: 6 }, fill: "#DCBE6E", duration: 0.3 }, t0)
          .to(`[data-plbl="${i}"]`, { fill: "#6E9483", duration: 0.3 }, t0 + D - 0.3)
          .to(`[data-pdot="${i}"]`, { attr: { r: 4 }, fill: "#2E5D4B", duration: 0.3 }, t0 + D - 0.3)
          .fromTo(s, { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" }, t0)
          .to(s, { opacity: 0, scale: 0.9, duration: 0.35, ease: "power2.in" }, t0 + D - 0.35);
      });

      // Akt 1: påståendet stryks, domen stämplas
      tl.fromTo("[data-strike]", { attr: { x2: 210 } }, { attr: { x2: 510 }, duration: 0.5, ease: "power2.inOut" }, 0.7)
        .fromTo("[data-verdict]", { scale: 0, rotate: -14, transformOrigin: "50% 50%" },
          { scale: 1, rotate: -8, duration: 0.5, ease: "back.out(2.2)" }, 1.3)
        .fromTo("[data-kravs]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 2.1);

      // Akt 2: pulsen vandrar, noder tänds
      tl.fromTo("[data-pulse]", { attr: { cx: 150 } }, { attr: { cx: 570 }, duration: 1.8, ease: "power1.inOut" }, D + 0.5);
      [0, 1, 2].forEach((k) => {
        tl.fromTo(`[data-node="${k}"]`, { scale: 0.6, transformOrigin: "50% 50%" },
          { scale: 1, duration: 0.4, ease: "back.out(2)" }, D + 0.5 + k * 0.85);
      });

      // Akt 3: beviset poppar, badgen landar
      tl.fromTo("[data-cert]", { y: 16 }, { y: 0, duration: 0.5 }, 2 * D + 0.2)
        .fromTo("[data-vbadge]", { scale: 0, transformOrigin: "50% 50%" },
          { scale: 1, duration: 0.45, ease: "back.out(2.4)" }, 2 * D + 1.1);

      // Akt 4: sigillet — ring, stämpel, kapsel
      tl.fromTo("[data-ring]", { attr: { r: 40 }, opacity: 0 }, { attr: { r: 86 }, opacity: 1, duration: 0.6 }, 3 * D + 0.15)
        .fromTo("[data-stamp]", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, 3 * D + 0.45)
        .fromTo("[data-year]", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, ease: "back.out(2.4)" }, 3 * D + 1.0);

      tl.fromTo("[data-pprog]", { attr: { width: 0 } }, { attr: { width: 560 }, duration: 4 * D, ease: "none" }, 0);

      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()), { threshold: 0.25 });
      io.observe(el);
      return () => io.disconnect();
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-skogsgron px-6 py-24 md:py-32">
      <style>{`
        .pitch-spin { animation: pitchspin 36s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .pitch-spin { animation: none; } }
        @keyframes pitchspin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-salvia">Hela idén, på tolv sekunder</p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-papper md:text-4xl">
          Från påstående till stämpel.
        </h2>

        <div className="relative mx-auto mt-8 w-full max-w-2xl">
          <svg data-pstage viewBox="0 0 720 330" className="w-full" aria-hidden>
            {/* Akt 1: SKIFTET */}
            <g data-scene data-p1 opacity="0">
              <rect x="200" y="80" width="320" height="60" rx="30" fill="#0F4438" stroke="#2E5D4B" strokeWidth="2" />
              <text x="360" y="118" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="19" letterSpacing="3" fill="#9FD9B6">KLIMATNEUTRAL</text>
              <line data-strike x1="210" y1="110" x2="210" y2="110" stroke="#F6B27A" strokeWidth="5" strokeLinecap="round" />
              <g data-verdict>
                <rect x="240" y="150" width="240" height="46" rx="10" fill="none" stroke="#F6B27A" strokeWidth="3" transform="rotate(-8 360 173)" />
                <text x="360" y="180" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="16" letterSpacing="2" fontWeight="700" fill="#F6B27A" transform="rotate(-8 360 173)">FÖRBJUDS 2026</text>
              </g>
              <text data-kravs x="360" y="240" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="24" fontWeight="700" fill="#DCBE6E">Bevis krävs.</text>
            </g>

            {/* Akt 2: KEDJAN */}
            <g data-scene data-p2 opacity="0">
              <line x1="150" y1="130" x2="570" y2="130" stroke="#2E5D4B" strokeWidth="3" />
              <circle data-pulse cx="150" cy="130" r="7" fill="#DCBE6E" />
              {[["AFFÄR", 150], ["TRÄD", 360], ["BEVIS", 570]].map(([lbl, x], k) => (
                <g data-node={k} key={String(lbl)}>
                  <circle cx={Number(x)} cy="130" r="17" fill={k === 2 ? "#DCBE6E" : "#1E9E6A"} />
                  <circle cx={Number(x)} cy="130" r="27" fill="none" stroke="#2E5D4B" strokeWidth="2" />
                  <text x={Number(x)} y="185" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" letterSpacing="3" fontWeight="600" fill="#9FD9B6">{lbl}</text>
                </g>
              ))}
              <text x="360" y="240" textAnchor="middle" fontFamily="Familjen Grotesk, sans-serif" fontSize="17" fill="#9FD9B6">Signerad order räcker — resten sker av sig självt.</text>
            </g>

            {/* Akt 3: BEVISET */}
            <g data-scene data-p3 opacity="0">
              <g data-cert>
                <rect x="245" y="45" width="230" height="185" rx="16" fill="#F4FAF5" />
                <rect x="245" y="45" width="230" height="46" rx="16" fill="#0B3D2E" />
                <text x="360" y="74" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="4" fill="#9FD9B6">VÄRDEBEVIS</text>
                <text x="360" y="125" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="19" fontWeight="700" fill="#0B3D2E">Familjen Ek</text>
                <text x="360" y="170" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="34" fontWeight="700" fill="#1E9E6A">8 träd</text>
                <line x1="285" y1="192" x2="435" y2="192" stroke="#DCBE6E" strokeWidth="2" />
                <text x="360" y="214" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2" fill="#6E9483">MED ER LOGGA</text>
              </g>
              <g data-vbadge>
                <rect x="290" y="248" width="140" height="38" rx="19" fill="#1E9E6A" />
                <text x="360" y="272" textAnchor="middle" fontFamily="Familjen Grotesk, sans-serif" fontSize="14" fontWeight="700" fill="#fff">Verifierat äkta</text>
              </g>
            </g>

            {/* Akt 4: MÄRKET */}
            <g data-scene data-p4 opacity="0">
              <circle cx="360" cy="145" r="96" fill="#0F4438" />
              <circle data-ring cx="360" cy="145" r="86" fill="none" stroke="#DCBE6E" strokeWidth="2" />
              <defs>
                <path id="pitchring" d="M360,145 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
              </defs>
              <g className="pitch-spin" style={{ transformOrigin: "360px 145px" }}>
                <text fontFamily="JetBrains Mono, monospace" fontSize="10.5" letterSpacing="3" fill="#9FD9B6" fontWeight="600">
                  <textPath href="#pitchring">KLIMATKOMPENSERAD · VIA SMARTKLIMAT · VERIFIERBART ·&#160;</textPath>
                </text>
              </g>
              <g data-year>
                <rect x="334" y="216" width="52" height="22" rx="11" fill="#DCBE6E" />
                <text x="360" y="231" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="12" fontWeight="700" fill="#0B3D2E">2026</text>
              </g>
              <text x="360" y="290" textAnchor="middle" fontFamily="Familjen Grotesk, sans-serif" fontSize="17" fill="#9FD9B6">Ett märke ni får bära — med belägg bakom.</text>
            </g>

            {/* etiketter + progress */}
            {STEPS.map((s, i) => (
              <g key={s}>
                <circle data-pdot={i} cx={135 + i * 150} cy={308} r="4" fill="#2E5D4B" />
                <text data-plbl={i} x={135 + i * 150} y={328} textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2.5" fill="#6E9483" fontWeight="600">{s}</text>
              </g>
            ))}
          </svg>
          <img data-stamp src="/brand/logo-stamp-vit.png" alt="" className="pointer-events-none absolute opacity-0"
            style={{ width: 84, height: 84, left: "50%", top: "40%", transform: "translate(-50%,-50%)" }} />
          <svg viewBox="0 0 720 10" className="mt-2 w-full" aria-hidden>
            <rect x="80" y="3" width="560" height="3" rx="1.5" fill="#2E5D4B" />
            <rect data-pprog x="80" y="3" width="0" height="3" rx="1.5" fill="#DCBE6E" />
          </svg>
        </div>

        <a href="mailto:hej@smartklimat.org?subject=Demo%20-%2020%20minuter"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-guld px-8 py-4 font-display font-bold text-skogsgron transition-transform hover:scale-[1.03]">
          Boka 20-minutersdemon →
        </a>
      </div>
    </section>
  );
}
