const TEMAN = [
  { id: "klassisk", namn: "Klassiskt", prick: "#0B3D2E", sub: "Det gröna originalet" },
  { id: "kalaset", namn: "Kalaset", prick: "#F6B27A", sub: "Konfetti och grattis" },
  { id: "midnattsskogen", namn: "Midnattsskogen", prick: "#082B21", sub: "Stjärnhimmel och guld" },
  { id: "djurfaddern", namn: "Djurfaddern", prick: "#DCBE6E", sub: "Djuren i huvudrollen" },
  { id: "original", namn: "Original — klassiska beviset", prick: "#1E9E6A", sub: "Rent och tidlöst" },
  { id: "fodelsedag", namn: "Födelsedag", bild: "/kort/kort-fodelsedag.jpg" },
  { id: "morsdag", namn: "Morsdag", bild: "/kort/kort-morsdag.jpg" },
  { id: "farsdag", namn: "Farsdag", bild: "/kort/kort-farsdag.jpg" },
  { id: "pask", namn: "Glad Påsk", bild: "/kort/kort-pask.jpg" },
  { id: "jul", namn: "God Jul", bild: "/kort/kort-jul.jpg" },
  { id: "sommar", namn: "Glad sommar", bild: "/kort/kort-sommar.jpg" },
  { id: "semester", namn: "Ha en skön semester", bild: "/kort/kort-semester.jpg" },
  { id: "resa", namn: "Trevlig resa", bild: "/kort/kort-resa.jpg" },
  { id: "hjartans", namn: "Alla hjärtans dag", bild: "/kort/kort-hjartans.jpg" },
  { id: "environment", namn: "Environment Day", bild: "/kort/kort-environment.jpg" },
] as const;

export type TemaId = (typeof TEMAN)[number]["id"];

export const TEMA_IDS = TEMAN.map((t) => t.id) as readonly TemaId[];

const ALLOWS_GREETING: ReadonlySet<TemaId> = new Set([
  "klassisk",
  "kalaset",
  "midnattsskogen",
  "djurfaddern",
]);

export function isTemaId(v: unknown): v is TemaId {
  return typeof v === "string" && (TEMA_IDS as readonly string[]).includes(v);
}

export function TemaVal({ theme, setTheme, halsning, setHalsning }: {
  theme: TemaId; setTheme: (t: TemaId) => void;
  halsning: string; setHalsning: (s: string) => void;
}) {
  const allowsGreeting = ALLOWS_GREETING.has(theme);
  return (
    <div className="mt-8 border-t border-linje pt-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-smaragd-dark">Välj din hälsning</p>
      <p className="mt-1.5 text-sm text-skogsgron/60">
        Temat klär hela värdebeviset och bevismailet. Namn, antal träd och koordinater är alltid officiella.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {TEMAN.map((t) => {
          const active = theme === t.id;
          const hasImage = "bild" in t;
          return (
            <button key={t.id} type="button" onClick={() => setTheme(t.id)}
              className={`rounded-2xl border p-2 text-left transition-all ${
                active ? "border-smaragd bg-mintpapper ring-1 ring-smaragd" : "border-linje bg-white hover:border-smaragd/50"}`}>
              {hasImage ? (
                <span className="block aspect-[4/5] w-full overflow-hidden rounded-xl bg-mintpapper">
                  <img src={t.bild} alt="" loading="lazy" className="h-full w-full object-cover" />
                </span>
              ) : (
                <span className="flex aspect-[4/5] w-full items-center justify-center rounded-xl" style={{ background: `${t.prick}12` }}>
                  <span className="h-12 w-12 rounded-full ring-1 ring-black/10" style={{ background: t.prick }} />
                </span>
              )}
              <span className="mt-2 block px-1 font-display text-[14px] font-bold leading-tight text-skogsgron">{t.namn}</span>
              {"sub" in t && t.sub ? (
                <span className="mt-0.5 block px-1 pb-1 text-xs text-skogsgron/55">{t.sub}</span>
              ) : null}
            </button>
          );
        })}
      </div>
      {allowsGreeting ? (
        <div className="mt-4">
          <label htmlFor="halsning" className="text-sm font-medium text-skogsgron">Personlig hälsning <span className="text-skogsgron/50">(valfritt)</span></label>
          <textarea id="halsning" value={halsning} maxLength={120} rows={2}
            onChange={(e) => setHalsning(e.target.value)}
            placeholder="Grattis på födelsedagen — här är träd som växer i decennier!"
            className="mt-1.5 w-full rounded-2xl border border-linje bg-white p-3.5 text-[15px] text-skogsgron outline-none transition-colors placeholder:text-skogsgron/35 focus:border-smaragd" />
          <p className="mt-1 text-right font-mono text-[11px] text-skogsgron/45">{halsning.length}/120 · visas i mailet och som rad på beviset</p>
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-linje bg-mintpapper/40 px-4 py-3 text-sm text-skogsgron/65">
          Temafrasen är inbakad i designen.
        </p>
      )}
    </div>
  );
}
