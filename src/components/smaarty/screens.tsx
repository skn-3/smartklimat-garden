import { useEffect, useRef, useState } from "react";

/**
 * Smaartys skärmar, återskapade ur appens riktiga vyer (saljare.tsx):
 * nivåträdet (Skott -> Fullvuxet träd), Eldsjäl-streaken, helg-sprinten,
 * säljflödet (mottagarens namn + e-post), topplistan med Veckans hjälte,
 * och köparens värdebevis. Studsig rörelse är tillåten HÄR — appens värld.
 */

function AppHeader({ sub }: { sub: string }) {
  return (
    <div className="bg-smaragd px-4 pb-3 pt-7 text-white">
      <p className="font-display text-[15px] font-bold leading-none">Smaarty</p>
      <p className="mt-1 text-[10px] text-mint">{sub}</p>
    </div>
  );
}

function MiniTree({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} aria-hidden="true">
      <rect x="20.7" y="26" width="2.6" height="12" rx="1.3" fill="#15784F" />
      <circle cx="22" cy="19" r="8.5" fill="#1E9E6A" />
      <circle cx="16" cy="24" r="5.5" fill="#3CB680" />
      <circle cx="28" cy="24" r="5.5" fill="#15784F" />
    </svg>
  );
}

function Flame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 26" className={className} aria-hidden="true">
      <path
        d="M10 1 C15 7 14.5 12 10 16 C5.5 12 5 7 10 1 Z M10 10 C12.4 13 12 15.6 10 17.6 C8 15.6 7.6 13 10 10 Z"
        fill="#F6B27A"
      />
      <path d="M10 9 C12.2 12 11.8 14.8 10 16.6 C8.2 14.8 7.8 12 10 9 Z" fill="#DCBE6E" />
    </svg>
  );
}

export function ScreenHome({ active = false }: { active?: boolean }) {
  const [pts, setPts] = useState(1135);
  const ran = useRef(false);
  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    const start = performance.now();
    const raf = { id: 0 };
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      setPts(Math.round(1135 + (1 - Math.pow(1 - t, 3)) * 105));
      if (t < 1) raf.id = requestAnimationFrame(tick);
    };
    raf.id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.id);
  }, [active]);

  return (
    <div className="flex h-full flex-col bg-mintpapper">
      <AppHeader sub="Hej Vera" />
      <div className="flex-1 space-y-2.5 p-3">
        <div className="rounded-2xl border border-linje bg-white p-3">
          <div className="flex items-center gap-3">
            <MiniTree />
            <div className="min-w-0">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smaragd-dark">
                Ungt träd
              </p>
              <p className="font-mono text-[17px] font-semibold leading-tight text-skogsgron tabular-nums">
                {pts.toLocaleString("sv-SE")} poäng
              </p>
              <p className="text-[9.5px] text-skogsgron/60">
                3 träd kvar till <span className="font-medium text-skogsgron">Stort träd</span>
              </p>
            </div>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-mint">
            <div className="h-full w-[86%] rounded-full bg-guld transition-[width] duration-700" />
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-2xl border border-linje bg-white p-3">
          <Flame className={`h-6 w-5 ${active ? "animate-[wiggle_1.6s_ease-in-out_infinite]" : ""}`} />
          <div>
            <p className="text-[11px] font-medium text-skogsgron">7 dagar i rad</p>
            <p className="text-[9px] text-skogsgron/55">Eldsjäl-märket är ditt</p>
          </div>
        </div>

        <div className="rounded-2xl bg-apricot-1 p-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#8A5A2E]">
            Helg-sprint
          </p>
          <p className="mt-0.5 text-[10.5px] font-medium text-[#5C3E1E]">
            5 träd i helgen → +10 poäng
          </p>
        </div>
      </div>
      <style>{`@keyframes wiggle { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(5deg) scale(1.06)} }`}</style>
    </div>
  );
}

export function ScreenTeam() {
  const members = ["Vera", "Melvin", "Aisha", "Otis"];
  return (
    <div className="flex h-full flex-col bg-mintpapper">
      <AppHeader sub="Klass 5B · Björkskolan" />
      <div className="flex-1 space-y-2 p-3">
        <p className="px-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-smaragd-dark">
          Säljare i laget
        </p>
        {members.map((m, i) => (
          <div key={m} className="flex items-center gap-2.5 rounded-2xl border border-linje bg-white p-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-mint font-display text-[11px] font-bold text-skogsgron">
              {m[0]}
            </div>
            <p className="flex-1 text-[11px] font-medium text-skogsgron">{m}</p>
            <span className="font-mono text-[8.5px] uppercase tracking-wide text-smaragd-dark">
              {i === 3 ? "Inbjuden" : "Aktiv"}
            </span>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-smaragd-light bg-white/60 p-2.5 text-center text-[10px] font-medium text-smaragd-dark">
          + Bjud in fler
        </div>
      </div>
    </div>
  );
}

export function ScreenSell() {
  return (
    <div className="flex h-full flex-col bg-mintpapper">
      <AppHeader sub="Nytt sälj" />
      <div className="flex-1 space-y-2.5 p-3">
        {[
          ["Mottagarens namn", "Farmor Ingrid"],
          ["Mottagarens e-post", "ingrid@exempel.se"],
          ["Antal träd", "3 · 105 kr"],
        ].map(([lab, val]) => (
          <div key={lab} className="rounded-2xl border border-linje bg-white p-3">
            <p className="text-[8.5px] text-skogsgron/50">{lab}</p>
            <p className="mt-0.5 text-[12px] font-medium text-skogsgron">{val}</p>
          </div>
        ))}
        <div className="rounded-full bg-skogsgron py-2.5 text-center text-[11.5px] font-medium text-papper">
          Registrera sälj
        </div>
      </div>
    </div>
  );
}

export function ScreenTop({ active = false }: { active?: boolean }) {
  const rows = [
    { nr: 1, name: "Vera", pts: 23, medal: "bg-guld" },
    { nr: 2, name: "Melvin", pts: 19, medal: "bg-[#C9CFCC]" },
    { nr: 3, name: "Aisha", pts: 15, medal: "bg-[#D9A87C]" },
    { nr: 4, name: "Otis", pts: 11, medal: "bg-linje" },
  ];
  return (
    <div className="flex h-full flex-col bg-mintpapper">
      <AppHeader sub="Topplistan" />
      <div className="flex-1 space-y-2 p-3">
        <div className="flex gap-1.5">
          <span className="rounded-full bg-skogsgron px-3 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white">
            Veckans
          </span>
          <span className="rounded-full border border-linje bg-white px-3 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-skogsgron/50">
            Totalt
          </span>
        </div>
        {rows.map((r) => (
          <div
            key={r.name}
            className={`flex items-center gap-2.5 rounded-2xl border border-linje bg-white p-2.5 transition-transform duration-700 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] ${
              active && r.nr === 1 ? "-translate-y-0.5 scale-[1.02] border-guld" : ""
            }`}
          >
            <div className={`flex h-6 w-6 items-center justify-center rounded-full ${r.medal} font-display text-[10px] font-bold text-skogsgron`}>
              {r.nr}
            </div>
            <p className="flex-1 text-[11px] font-medium text-skogsgron">{r.name}</p>
            <p className="font-mono text-[10.5px] text-smaragd-dark tabular-nums">{r.pts} träd</p>
          </div>
        ))}
        <div className="rounded-full border border-guld bg-guld/15 px-3 py-1.5 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-[#8A6A1F]">
          Veckans hjälte: Vera
        </div>
      </div>
    </div>
  );
}

export function ScreenCert({ active = false }: { active?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-sand">
      <div className="flex flex-1 items-center justify-center p-4">
        <div
          className={`w-full rounded-2xl border border-linje bg-papper p-4 text-center shadow-sm transition-all duration-700 [transition-timing-function:var(--ease-smart)] ${
            active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-90"
          }`}
        >
          <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-smaragd-dark">
            Värdebevis
          </p>
          <p className="mt-3 font-display text-[15px] font-bold text-skogsgron">Farmor Ingrid</p>
          <p className="mt-2 font-display text-[44px] font-bold leading-none text-smaragd">3</p>
          <p className="text-[10px] text-skogsgron/60">träd planterade</p>
          <div className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-guld">
            <p className="font-mono text-[6px] uppercase tracking-[0.1em] text-guld">
              Smart
              <br />
              Klimat
            </p>
          </div>
          <p className="mt-3 font-mono text-[7.5px] text-skogsgron/45">Verifiera: /v/8f2k1</p>
        </div>
      </div>
    </div>
  );
}
