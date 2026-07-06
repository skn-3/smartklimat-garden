import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Utensils, Car, Plane, Home, ShoppingBag, ArrowLeft, RotateCcw } from "lucide-react";
import { FadeUp } from "@/components/FadeUp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/avtryck")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://smartklimat.org/avtryck" }],
    meta: [
      { title: "Ditt klimatavtryck — SmartKlimat" },
      { name: "description", content: "Fem frågor om din vardag — mat, bil, flyg, boende och shopping — och du ser ditt ungefärliga klimatavtryck, jämfört med Sverigesnittet. Sen planterar du för resten." },
      { property: "og:title", content: "Ditt klimatavtryck — SmartKlimat" },
      { property: "og:description", content: "Fem frågor. Ett ärligt svar. Räkna ut ditt klimatavtryck och se vad träden kan väga upp." },
      { property: "og:url", content: "/avtryck" },
    ],
  }),
  component: AvtryckPage,
});

const BAS_KG = 2000; // offentlig konsumtion: vård, skola, infrastruktur

const FRAGOR = [
  { id: "mat", Icon: Utensils, rubrik: "Maten", fraga: "Vad hamnar oftast på tallriken?",
    val: [
      { label: "Veganskt", sub: "växtbaserat, punkt", kg: 500 },
      { label: "Vegetariskt", sub: "ägg och mejeri, inget kött", kg: 800 },
      { label: "Blandkost", sub: "kött några gånger i veckan", kg: 1300 },
      { label: "Mycket kött", sub: "kött nästan varje dag", kg: 1900 },
    ]},
  { id: "bil", Icon: Car, rubrik: "Bilen", fraga: "Hur ser din bilvardag ut?",
    val: [
      { label: "Ingen bil", sub: "cykel, gång, kollektivt", kg: 0 },
      { label: "Elbil", sub: "laddad på svensk el", kg: 400 },
      { label: "Bensin eller diesel", sub: "under 1 000 mil om året", kg: 1300 },
      { label: "Bensin eller diesel, mycket", sub: "över 1 000 mil om året", kg: 2700 },
    ]},
  { id: "flyg", Icon: Plane, rubrik: "Flyget", fraga: "Hur mycket flyger du på ett år?",
    val: [
      { label: "Ingenting", sub: "marken duger", kg: 0 },
      { label: "Någon Europaresa", sub: "en eller två kortare tur och retur", kg: 800 },
      { label: "En långresa", sub: "utanför Europa, tur och retur", kg: 2000 },
      { label: "Flera långresor", sub: "långt bort, flera gånger", kg: 4500 },
    ]},
  { id: "boende", Icon: Home, rubrik: "Boendet", fraga: "Hur bor du?",
    val: [
      { label: "Lägenhet", sub: "fjärrvärme eller gemensam värme", kg: 600 },
      { label: "Villa med värmepump", sub: "eller fjärrvärme", kg: 1200 },
      { label: "Villa med direktverkande el", sub: "elen gör jobbet", kg: 1800 },
      { label: "Villa med olja eller gas", sub: "fossil uppvärmning", kg: 3200 },
    ]},
  { id: "shopping", Icon: ShoppingBag, rubrik: "Shoppingen", fraga: "Hur ofta blir det nytt — kläder, prylar, möbler?",
    val: [
      { label: "Sparsamt", sub: "köper sällan, lagar hellre", kg: 800 },
      { label: "Lagom", sub: "som folk gör mest", kg: 1500 },
      { label: "Ofta nytt", sub: "shopping är en hobby", kg: 3000 },
    ]},
] as const;

function AvtryckPage() {
  const [steg, setSteg] = useState(0);
  const [svar, setSvar] = useState<Record<string, number>>({});
  const klar = steg >= FRAGOR.length;
  const summaKg = BAS_KG + Object.values(svar).reduce((a, b) => a + b, 0);
  const ton = summaKg / 1000;
  const trad = Math.round(summaKg / 20);
  const SNITT = 8000, MAL = 1000;
  const maxBar = Math.max(summaKg, SNITT);
  const pct = (v: number) => Math.max(4, Math.round((v / maxBar) * 100));

  const valj = (id: string, kg: number) => {
    setSvar((s) => ({ ...s, [id]: kg }));
    setSteg((s) => s + 1);
  };

  return (
    <>
      <section className="bg-papper px-6 pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-2xl">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-smaragd-dark">Avtryckskalkylatorn</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-skogsgron md:text-5xl">
              Fem frågor om din vardag.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[#52705F]">
              Mat, bil, flyg, boende, shopping — så får du ditt ungefärliga klimatavtryck,
              jämfört med Sverigesnittet. Inga konton, inga rätt svar. Bara en ärlig storleksordning.
            </p>
          </FadeUp>

          {!klar && (
            <FadeUp key={steg} delay={60}>
              <div className="mt-10 rounded-3xl border border-linje bg-white p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => { const I = FRAGOR[steg].Icon; return <I className="h-6 w-6 text-smaragd-dark" aria-hidden />; })()}
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-smaragd-dark">
                      {FRAGOR[steg].rubrik} · {steg + 1} av {FRAGOR.length}
                    </p>
                  </div>
                  {steg > 0 && (
                    <button onClick={() => setSteg((s) => s - 1)}
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#6E9483] hover:text-skogsgron">
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Tillbaka
                    </button>
                  )}
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-skogsgron">{FRAGOR[steg].fraga}</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {FRAGOR[steg].val.map((v) => (
                    <button key={v.label} onClick={() => valj(FRAGOR[steg].id, v.kg)}
                      className="group rounded-2xl border border-linje bg-mintpapper/60 p-5 text-left transition-all hover:border-smaragd hover:bg-mintpapper">
                      <span className="block font-display text-lg font-bold text-skogsgron">{v.label}</span>
                      <span className="mt-1 block text-sm text-[#6E9483]">{v.sub}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-center gap-2">
                  {FRAGOR.map((_, i) => (
                    <span key={i} className={cn("h-2 rounded-full transition-all",
                      i < steg ? "w-2 bg-guld" : i === steg ? "w-6 bg-skogsgron" : "w-2 bg-linje")} />
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          {klar && (
            <FadeUp delay={60}>
              <div className="mt-10 overflow-hidden rounded-3xl border border-linje bg-white">
                <div className="bg-skogsgron px-6 py-10 text-center md:px-10">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-salvia">Ditt ungefärliga avtryck</p>
                  <p className="mt-3 font-display text-6xl font-bold text-papper md:text-7xl">
                    {ton.toLocaleString("sv-SE", { maximumFractionDigits: 1 })} <span className="text-3xl text-salvia">ton CO₂ per år</span>
                  </p>
                </div>
                <div className="space-y-3 px-6 py-8 md:px-10">
                  {[["Du", summaKg, "bg-smaragd"], ["Sverigesnittet", SNITT, "bg-linje"], ["Hållbar nivå 2050", MAL, "bg-guld"]].map(([lbl, v, col]) => (
                    <div key={String(lbl)}>
                      <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-[#6E9483]">
                        <span>{lbl}</span><span>{((v as number) / 1000).toLocaleString("sv-SE", { maximumFractionDigits: 1 })} ton</span>
                      </div>
                      <div className="mt-1 h-3 w-full rounded-full bg-papper">
                        <div className={cn("h-3 rounded-full", String(col))} style={{ width: `${pct(v as number)}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    {FRAGOR.map((f) => (
                      <div key={f.id} className="flex justify-between border-b border-linje/60 py-2 text-sm">
                        <span className="text-[#52705F]">{f.rubrik}</span>
                        <span className="font-mono text-[#3D5648]">{(svar[f.id] ?? 0).toLocaleString("sv-SE")} kg</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 text-sm">
                      <span className="text-[#52705F]">Din del av det gemensamma — vård, skola, vägar</span>
                      <span className="font-mono text-[#3D5648]">{BAS_KG.toLocaleString("sv-SE")} kg</span>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-mintpapper p-6">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-smaragd-dark">Vad träden kan göra</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#3D5648]">
                      Ett träd binder ungefär 20 kg koldioxid per år — att väga upp ett år som ditt
                      kräver alltså runt <strong>{trad.toLocaleString("sv-SE")} träds årsarbete</strong>. Ingen planterar
                      sig fri: minska där du kan, och plantera för det som blir kvar. Varje träd räknas, bokstavligen.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link to="/plantera"
                        className="inline-flex items-center gap-2 rounded-full bg-skogsgron px-7 py-3.5 font-display font-bold text-papper transition-transform hover:scale-[1.03]">
                        Plantera träd →
                      </Link>
                      <Link to="/kalkylator"
                        className="inline-flex items-center gap-2 rounded-full border border-linje bg-white px-7 py-3.5 font-display font-bold text-skogsgron transition-colors hover:border-smaragd">
                        Räkna på en flygresa
                      </Link>
                      <button onClick={() => { setSteg(0); setSvar({}); }}
                        className="inline-flex items-center gap-2 px-4 py-3.5 font-mono text-xs uppercase tracking-wider text-[#6E9483] hover:text-skogsgron">
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Börja om
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-6 px-2 font-mono text-xs leading-relaxed text-skogsgron/55">
                Förenklad modell med schablonvärden i nivå med svenska konsumtionsberäkningar
                (Naturvårdsverket, SEI). Exakta tal kräver mer data — det här visar storleksordningen,
                och den räcker för att fatta bra beslut.
              </p>
            </FadeUp>
          )}
        </div>
      </section>
    </>
  );
}
