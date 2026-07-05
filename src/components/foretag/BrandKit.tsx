import { FadeUp } from "@/components/FadeUp";

function Sigill({ size = 190 }: { size?: number }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-label="Klimatkompenserad via SmartKlimat">
      <defs>
        <path id="sigillring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="#0B3D2E" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#DCBE6E" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#DCBE6E" strokeWidth="1" opacity="0.7" />
      <g className="sigill-spin" style={{ transformOrigin: "100px 100px" }}>
        <text fontFamily="JetBrains Mono, monospace" fontSize="11.5" letterSpacing="3.5" fill="#9FD9B6" fontWeight="600">
          <textPath href="#sigillring">KLIMATKOMPENSERAD · VIA SMARTKLIMAT · VERIFIERBART ·&#160;</textPath>
        </text>
      </g>
      <path d="M100 128 q5 -26 0 -44" stroke="#9FD9B6" strokeWidth="4" fill="none" />
      <ellipse cx="88" cy="94" rx="13" ry="8" fill="#1E9E6A" transform="rotate(-26 88 94)" />
      <ellipse cx="113" cy="85" rx="13" ry="8" fill="#9FD9B6" transform="rotate(24 113 85)" />
      <ellipse cx="100" cy="72" rx="10" ry="7" fill="#1E9E6A" />
      <text x="100" y="152" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="700" fill="#F4FAF5">2026</text>
    </svg>
  );
}

export function BrandKit() {
  return (
    <section className="overflow-hidden bg-skogsgron px-6 py-24 md:py-32">
      <style>{`
        .sigill-spin { animation: sigillspin 36s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .sigill-spin { animation: none; } }
        @keyframes sigillspin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <FadeUp>
            <div className="mx-auto"><Sigill /></div>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-salvia">Mervärdet</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-papper md:text-4xl">
              Ett märke att bära.<br />Innehåll att synas med.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-salvia">
              Tänk kreditvärdighetens AAA — fast för klimatansvar, och bättre: varje gång ni bär märket
              står spårbara bevis bakom. Kunden kan verifiera med ett klick. Det gör det tryggt att skylta,
              på riktigt.
            </p>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <FadeUp>
            <div className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-guld">På produkten</p>
              <div className="mt-4 rounded-xl bg-papper p-4">
                <div className="h-2.5 w-3/4 rounded-full bg-linje" />
                <div className="mt-2 h-2.5 w-1/2 rounded-full bg-linje" />
                <div className="mt-4 flex items-center gap-2">
                  <Sigill size={44} />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-smaragd-dark">Klimatkompenserad</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-salvia">Märk produkter, förpackningar och offerter — varje såld enhet planterar och kan bevisa det.</p>
            </div>
          </FadeUp>
          <FadeUp delay={80}>
            <div className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-guld">I mailsignaturen</p>
              <div className="mt-4 rounded-xl bg-papper p-4">
                <p className="font-display text-sm font-bold text-skogsgron">Anna Lindqvist</p>
                <p className="text-xs text-[#6E9483]">Säljchef</p>
                <div className="mt-3 flex items-center gap-2 border-t border-linje pt-3">
                  <Sigill size={30} />
                  <span className="text-[11px] font-semibold text-smaragd-dark">Klimatkompenserat företag — verifiera vår skog</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-salvia">Varje mail från varje medarbetare bär märket — med länk rakt till er liveräknare.</p>
            </div>
          </FadeUp>
          <FadeUp delay={160}>
            <div className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-guld">På er sajt</p>
              <div className="mt-4 rounded-xl bg-papper p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-2.5 w-20 rounded-full bg-linje" />
                    <div className="mt-2 h-2.5 w-14 rounded-full bg-linje" />
                  </div>
                  <Sigill size={52} />
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-salvia">Footer-badge med klickbar verifiering — er hållbarhetssida får äntligen substans.</p>
            </div>
          </FadeUp>
        </div>

        <FadeUp>
          <div className="mt-14 rounded-3xl bg-white/[0.06] p-8 ring-1 ring-white/10 md:p-10">
            <div className="md:flex md:items-start md:justify-between md:gap-10">
              <div className="max-w-xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-guld">Vi gör materialet åt er</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-papper">Content och profilering ingår.</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-salvia">
                  Ni ska inte behöva en byrå för att berätta det här. I partnerskapet ingår färdigt material,
                  byggt i er grafiska profil — samma hantverk som bakom våra egna bevis.
                </p>
              </div>
              <ul className="mt-6 grid gap-2.5 text-[15px] text-papper md:mt-1 md:min-w-[300px]">
                {["Märket i alla format — tryck, webb, signatur","Bevismail och certifikat i er profil","Casefilm och sociala inlägg om er skog","Pressunderlag när ni når milstolpar","Liveräknare att bädda in på er sajt"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-guld" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
