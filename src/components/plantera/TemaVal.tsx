const TEMAN = [
  { id: "standard", namn: "Klassiskt", prick: "#0B3D2E", sub: "Det gröna originalet" },
  { id: "kalaset", namn: "Kalaset", prick: "#F6B27A", sub: "Konfetti och grattis" },
  { id: "midnattsskogen", namn: "Midnattsskogen", prick: "#082B21", sub: "Stjärnhimmel och guld" },
  { id: "djurfaddern", namn: "Djurfaddern", prick: "#DCBE6E", sub: "Djuren i huvudrollen" },
  { id: "vintergavan", namn: "Vintergåvan", prick: "#0A3328", sub: "Snö och gran" },
  { id: "tack", namn: "Tack", prick: "#1E9E6A", sub: "Ett tack som växer" },
] as const;

export type TemaId = (typeof TEMAN)[number]["id"];

export function TemaVal({ theme, setTheme, halsning, setHalsning }: {
  theme: TemaId; setTheme: (t: TemaId) => void;
  halsning: string; setHalsning: (s: string) => void;
}) {
  return (
    <div className="mt-8 border-t border-linje pt-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-smaragd-dark">Välj din hälsning</p>
      <p className="mt-1.5 text-sm text-skogsgron/60">Temat klär bevismailet — beviset i sig är alltid det officiella.</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {TEMAN.map((t) => (
          <button key={t.id} type="button" onClick={() => setTheme(t.id)}
            className={`rounded-2xl border p-3.5 text-left transition-all ${
              theme === t.id ? "border-smaragd bg-mintpapper ring-1 ring-smaragd" : "border-linje bg-white hover:border-smaragd/50"}`}>
            <span className="flex items-center gap-2.5">
              <span className="h-5 w-5 shrink-0 rounded-full ring-1 ring-black/10" style={{ background: t.prick }} />
              <span className="font-display text-[15px] font-bold text-skogsgron">{t.namn}</span>
            </span>
            <span className="mt-1 block text-xs text-skogsgron/55">{t.sub}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        <label htmlFor="halsning" className="text-sm font-medium text-skogsgron">Personlig hälsning <span className="text-skogsgron/50">(valfritt)</span></label>
        <textarea id="halsning" value={halsning} maxLength={120} rows={2}
          onChange={(e) => setHalsning(e.target.value)}
          placeholder="Grattis på födelsedagen — här är träd som växer så länge du finns!"
          className="mt-1.5 w-full rounded-2xl border border-linje bg-white p-3.5 text-[15px] text-skogsgron outline-none transition-colors placeholder:text-skogsgron/35 focus:border-smaragd" />
        <p className="mt-1 text-right font-mono text-[11px] text-skogsgron/45">{halsning.length}/120 · visas i mailet och som rad på beviset</p>
      </div>
    </div>
  );
}
