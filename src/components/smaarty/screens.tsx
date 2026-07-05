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
            <div
              className="h-full rounded-full bg-guld transition-[width] duration-1000 [transition-timing-function:var(--ease-smart)]"
              style={{ width: active ? "86%" : "58%" }}
            />
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

        <div className="rounded-2xl border border-linje bg-white p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path d="M5 8.5 L6.4 18 L13.6 18 L15 8.5 Z" fill="#F6B27A" />
                <path d="M7.4 8.5 L8 18 M10 8.5 L10 18 M12.6 8.5 L12 18" stroke="#fff" strokeWidth="1.4" />
                <circle cx="6.6" cy="6.6" r="2.3" fill="#FBE3C0" />
                <circle cx="10" cy="5.4" r="2.6" fill="#fff" />
                <circle cx="13.4" cy="6.6" r="2.3" fill="#FBE3C0" />
                <circle cx="10" cy="5" r="0.7" fill="#DCBE6E" />
              </svg>
              <div>
                <p className="text-[10.5px] font-medium text-skogsgron">Biobiljett</p>
                <p className="text-[8.5px] text-skogsgron/50">260 poäng kvar</p>
              </div>
            </div>
            <p className="font-mono text-[8.5px] text-smaragd-dark tabular-nums">1 240/1 500</p>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-mint">
            <div
              className="h-full rounded-full bg-smaragd transition-[width] duration-1000 [transition-timing-function:var(--ease-smart)]"
              style={{ width: active ? "83%" : "52%" }}
            />
          </div>
        </div>
      </div>
      <style>{`@keyframes wiggle { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(5deg) scale(1.06)} }`}</style>
    </div>
  );
}

export function ScreenTeam({ active = false }: { active?: boolean }) {
  const members = ["Vera", "Melvin", "Aisha", "Otis"];
  return (
    <div className="flex h-full flex-col bg-mintpapper">
      <AppHeader sub="Klass 5B · Björkskolan" />
      <div className="flex-1 space-y-2 p-3">
        <p className="px-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-smaragd-dark">
          Säljare i laget
        </p>
        {members.map((m, i) => (
          <div
            key={m}
            className={`flex items-center gap-2.5 rounded-2xl border border-linje bg-white p-2.5 transition-all duration-500 [transition-timing-function:var(--ease-smart)] ${active ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-40"}`}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
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
            className={`flex items-center gap-2.5 rounded-2xl border border-linje bg-white p-2.5 transition-all duration-700 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] ${
              active ? "translate-x-0 opacity-100" : "translate-x-2 opacity-40"
            } ${active && r.nr === 1 ? "-translate-y-0.5 scale-[1.02] border-guld" : ""}`}
            style={{ transitionDelay: `${(r.nr - 1) * 90}ms` }}
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
          <img
            src="/brand/logo-stamp-guld.png"
            alt=""
            className={`mx-auto mt-3 h-12 w-12 transition-all duration-700 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] ${active ? "rotate-0 scale-100 opacity-100" : "-rotate-12 scale-50 opacity-0"}`}
            style={{ transitionDelay: "250ms" }}
          />
          <p className="mt-3 font-mono text-[7.5px] text-skogsgron/45">Verifiera: /v/8f2k1</p>
        </div>
      </div>
    </div>
  );
}


export function ScreenStats({ active = false }: { active?: boolean }) {
  const bars = [4, 7, 5, 9, 6, 11, 8];
  const max = Math.max(...bars);
  return (
    <div className="flex h-full flex-col bg-mintpapper">
      <AppHeader sub="Lagets vecka" />
      <div className="flex-1 space-y-2.5 p-3">
        <div className="rounded-2xl border border-linje bg-white p-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smaragd-dark">
              Veckomål
            </p>
            <p className="font-mono text-[10px] font-semibold text-skogsgron tabular-nums">31/40 träd</p>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-mint">
            <div
              className="h-full rounded-full bg-guld transition-[width] duration-1000 [transition-timing-function:var(--ease-smart)]"
              style={{ width: active ? "78%" : "40%" }}
            />
          </div>
          <p className="mt-1.5 text-[8.5px] text-skogsgron/55">Alla får +5 poäng när ni når det</p>
        </div>

        <div className="rounded-2xl border border-linje bg-white p-3">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-smaragd-dark">
            Träd per dag
          </p>
          <div className="mt-2 flex h-[64px] items-end gap-1.5">
            {bars.map((b, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-t-md bg-smaragd transition-transform duration-700 [transition-timing-function:var(--ease-smart)]"
                style={{
                  height: `${(b / max) * 100}%`,
                  transform: active ? "scaleY(1)" : "scaleY(0.12)",
                  transitionDelay: `${i * 70}ms`,
                  opacity: 0.55 + (b / max) * 0.45,
                }}
              />
            ))}
          </div>
          <div className="mt-1 flex gap-1.5">
            {["M", "T", "O", "T", "F", "L", "S"].map((d, i) => (
              <p key={i} className="flex-1 text-center font-mono text-[7px] text-skogsgron/45">{d}</p>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-linje bg-white p-3">
          <p className="text-[10px] font-medium text-skogsgron">214 träd totalt</p>
          <p className="font-mono text-[8.5px] text-smaragd-dark">12 aktiva säljare</p>
        </div>
      </div>
    </div>
  );
}
