import { useEffect, useRef, useState } from "react";

/**
 * Scenerna i företagets pipeline-resa: en affär följs från signering,
 * genom systemet (mono-loggen — tech möter klimat), till planterade träd
 * och kundens värdebevis. CertCard är vårt riktiga bevis som komponent.
 */

export function CertCard({
  name = "Villa Ek, Täby",
  trees = 8,
  active = false,
  large = false,
  brand,
}: {
  name?: string;
  trees?: number;
  active?: boolean;
  large?: boolean;
  brand?: string;
}) {
  return (
    <div
      className={`mx-auto w-full rounded-3xl border border-linje bg-papper text-center shadow-sm ${
        large ? "max-w-sm p-8" : "max-w-[260px] p-6"
      }`}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-smaragd-dark">Värdebevis</p>
      <p className={`mt-4 font-display font-bold text-skogsgron ${large ? "text-2xl" : "text-lg"}`}>{name}</p>
      <p className={`mt-2 font-display font-bold leading-none text-smaragd ${large ? "text-7xl" : "text-6xl"}`}>
        {trees}
      </p>
      <p className="mt-1 text-xs text-skogsgron/60">träd planterade</p>
      <img
        src="/brand/logo-stamp-guld.png"
        alt=""
        className={`mx-auto mt-4 transition-all duration-700 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] ${
          large ? "h-20 w-20" : "h-16 w-16"
        } ${active ? "rotate-0 scale-100 opacity-100" : "-rotate-12 scale-50 opacity-0"}`}
        style={{ transitionDelay: "220ms" }}
      />
      <p className="mt-4 font-mono text-[9px] text-skogsgron/45">Verifiera: smartklimat.org/v/8f2k1</p>
      <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.18em] text-skogsgron/35">
        {brand ?? "Ert varumärke här"}
      </p>
    </div>
  );
}

export function SceneDeal({ active = false }: { active?: boolean }) {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-3xl border border-linje bg-white p-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-skogsgron/40">Ert affärssystem</p>
        <div className="mt-4 space-y-3">
          <div>
            <p className="text-[11px] text-skogsgron/50">Order</p>
            <p className="font-mono text-lg font-semibold text-skogsgron">#4821</p>
          </div>
          <div>
            <p className="text-[11px] text-skogsgron/50">Kund</p>
            <p className="font-medium text-skogsgron">Villa Ek, Täby</p>
          </div>
          <div>
            <p className="text-[11px] text-skogsgron/50">Omfattning</p>
            <p className="font-medium text-skogsgron">8 fönster</p>
          </div>
        </div>
        <div
          className={`mt-5 inline-flex items-center gap-2 rounded-full bg-mintpapper px-4 py-1.5 transition-all duration-600 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] ${
            active ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-smaragd">
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" aria-hidden="true">
              <path d="M2 6.2 L4.8 9 L10 3.2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[12px] font-medium text-skogsgron">Signerad</span>
        </div>
      </div>
    </div>
  );
}

const LOG_LINES = [
  "→ mottagen: order #4821",
  "→ säljare verifierad",
  "→ 8 träd registrerade",
  "→ värdebevis genererat",
];

export function SceneSystem({ active = false }: { active?: boolean }) {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-3xl bg-skogsgron p-6 shadow-[0_24px_60px_-24px_rgba(11,61,46,0.5)]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-salvia/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-salvia/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-salvia/40" />
          <p className="ml-2 font-mono text-[9px] uppercase tracking-[0.2em] text-salvia/70">SmartKlimat · gateway</p>
        </div>
        <div className="mt-5 space-y-2.5 font-mono text-[12px]">
          {LOG_LINES.map((line, i) => (
            <p
              key={line}
              className={`text-smaragd-light transition-all duration-500 [transition-timing-function:var(--ease-smart)] ${
                active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 160}ms` }}
            >
              {line}
            </p>
          ))}
          <p
            className={`pt-1 text-guld transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "720ms" }}
          >
            200 OK · 41 ms
          </p>
        </div>
      </div>
    </div>
  );
}

export function SceneTrees({ active = false }: { active?: boolean }) {
  const [count, setCount] = useState(27393);
  const ran = useRef(false);
  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 800);
      setCount(Math.round(27393 + (1 - Math.pow(1 - t, 3)) * 8));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-3xl border border-linje bg-white p-6 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-smaragd-dark">Copperbelt · Zambia</p>
        <div className="mt-4 flex items-end justify-center gap-1.5">
          {[14, 20, 17, 24, 19, 22, 16, 21].map((h, i) => (
            <svg
              key={i}
              viewBox="0 0 20 30"
              className={`transition-all duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] ${
                active ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-75 opacity-0"
              }`}
              style={{ width: 18, height: h + 8, transitionDelay: `${i * 80}ms` }}
              aria-hidden="true"
            >
              <rect x="8.8" y="16" width="2.4" height="12" rx="1.2" fill="#15784F" />
              <circle cx="10" cy="11" r="8" fill={i % 2 ? "#1E9E6A" : "#3CB680"} />
            </svg>
          ))}
        </div>
        <p className="mt-4 text-sm text-skogsgron/70">8 träd planterade i ert namn</p>
        <div className="mt-4 border-t border-linje pt-4">
          <p className="font-mono text-2xl font-semibold text-skogsgron tabular-nums">
            {count.toLocaleString("sv-SE")}
          </p>
          <p className="mt-1 text-[11px] text-skogsgron/55">träd totalt — live från systemet</p>
        </div>
      </div>
    </div>
  );
}

export function SceneCert({ active = false }: { active?: boolean }) {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div
        className={`w-full transition-all duration-700 [transition-timing-function:var(--ease-smart)] ${
          active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-80"
        }`}
      >
        <CertCard active={active} />
      </div>
    </div>
  );
}


const FLOW_STEPS = [
  {
    label: "Sälj",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <rect x="5" y="3.5" width="14" height="17" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8.5 8.5 H15.5 M8.5 12 H15.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M8.5 15.8 L10.3 17.6 L14.2 13.7" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Fönster",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 4.5 V19.5 M4.5 12 H19.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    label: "Träd",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <rect x="11" y="14" width="2" height="7" rx="1" fill="currentColor" />
        <circle cx="12" cy="9.5" r="5" fill="currentColor" opacity="0.9" />
        <circle cx="8.2" cy="12.5" r="3.2" fill="currentColor" opacity="0.7" />
        <circle cx="15.8" cy="12.5" r="3.2" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
];

/** Mini-pipeline för kundcaset: pulsen vandrar Sälj -> Fönster -> Träd. */
export function CaseFlow() {
  return (
    <div className="case-flow relative max-w-md" aria-label="Sälj, fönster, träd — flödet">
      <div className="absolute left-[10%] right-[10%] top-7 h-[2px] rounded-full bg-[#D9CBA8]" />
      <span className="case-flow-dot absolute top-[24px] h-2.5 w-2.5 rounded-full bg-smaragd shadow-[0_0_0_4px_rgba(30,158,106,0.18)]" />
      <div className="relative flex items-start justify-between">
        {FLOW_STEPS.map((st, i) => (
          <div key={st.label} className="flex w-20 flex-col items-center gap-2.5">
            <span
              className={`case-flow-node case-flow-node-${i} grid h-14 w-14 place-items-center rounded-full border border-[#D9CBA8] bg-white text-[#6B5C33]`}
            >
              {st.icon}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#8A7A52]">{st.label}</span>
          </div>
        ))}
      </div>
      <style>{`
        .case-flow-dot { animation: cfDot 5.2s linear infinite; }
        @keyframes cfDot {
          0%   { left: 9%;  opacity: 0; }
          4%   { opacity: 1; }
          33%  { left: 48.5%; }
          66%  { left: 88%; opacity: 1; }
          74%  { left: 88%; opacity: 0; }
          100% { left: 88%; opacity: 0; }
        }
        .case-flow-node { transition: none; animation: cfNode 5.2s ease-in-out infinite; }
        .case-flow-node-1 { animation-delay: 1.72s; }
        .case-flow-node-2 { animation-delay: 3.44s; }
        @keyframes cfNode {
          0%, 2% { border-color: #D9CBA8; color: #6B5C33; transform: scale(1); box-shadow: none; }
          7%, 16% { border-color: #1E9E6A; color: #15784F; transform: scale(1.08); box-shadow: 0 0 0 5px rgba(30,158,106,0.14); }
          24%, 100% { border-color: #D9CBA8; color: #6B5C33; transform: scale(1); box-shadow: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .case-flow-dot { animation: none; opacity: 0; }
          .case-flow-node { animation: none; border-color: #1E9E6A; color: #15784F; }
        }
      `}</style>
    </div>
  );
}
