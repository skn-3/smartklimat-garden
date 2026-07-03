import { createFileRoute } from "@tanstack/react-router";

import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { PageIntro } from "@/components/PageIntro";
import { DoubleFrame } from "@/components/DoubleFrame";
import { FadeUp } from "@/components/FadeUp";
import { CtaButton } from "@/components/CtaButton";
import { cn } from "@/lib/utils";
import { calcFlight, type Klass } from "@/lib/flight";

export const Route = createFileRoute("/kalkylator")({
  head: () => ({
    meta: [
      { title: "Kalkylatorn — SmartKlimat" },
      {
        name: "description",
        content:
          "Räkna på flygresans koldioxid och plantera träden som binder den. Myclimate-metodik, svensk precision.",
      },
      { property: "og:title", content: "Kalkylatorn — SmartKlimat" },
      {
        property: "og:description",
        content:
          "Räkna på flygresans koldioxid och plantera träden som binder den. Myclimate-metodik, svensk precision.",
      },
      { property: "og:url", content: "/kalkylator" },
    ],
    links: [{ rel: "canonical", href: "/kalkylator" }],
  }),
  component: KalkylatorPage,
});

const SNABBVAL: { label: string; km: number }[] = [
  { label: "Stockholm–London ≈ 1 460", km: 1460 },
  { label: "Stockholm–Madrid ≈ 2 600", km: 2600 },
  { label: "Stockholm–New York ≈ 6 300", km: 6300 },
  { label: "Stockholm–Bangkok ≈ 8 300", km: 8300 },
];

const KLASSER: { key: Klass; label: string }[] = [
  { key: "economy", label: "Economy" },
  { key: "premium", label: "Premium" },
  { key: "business", label: "Business" },
  { key: "first", label: "First" },
];

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-mono transition-[background,color,transform] duration-300 [transition-timing-function:var(--ease-smart)]",
        active
          ? "bg-skogsgron text-papper"
          : "bg-white text-skogsgron ring-1 ring-linje hover:-translate-y-0.5",
      )}
    >
      {children}
    </button>
  );
}

function formatTon(ton: number) {
  return ton.toFixed(3).replace(".", ",");
}

function KalkylatorPage() {
  const [kmInput, setKmInput] = useState<string>("");
  const [turRetur, setTurRetur] = useState<boolean>(true);
  const [klass, setKlass] = useState<Klass>("economy");

  const km = useMemo(() => {
    const parsed = parseInt(kmInput.replace(/\D/g, ""), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [kmInput]);

  const result = useMemo(() => {
    if (km < 100) return null;
    return calcFlight(km, klass, turRetur);
  }, [km, klass, turRetur]);

  const mailtoBody = result
    ? `mailto:kontakt@smartklimat.org?subject=${encodeURIComponent(
        "Plantera träd — kalkylatorn",
      )}&body=${encodeURIComponent(
        `Jag vill plantera ${result.trees} träd (resa: ${km} km, ${klass}, ${
          turRetur ? "tur och retur" : "enkel"
        }).`,
      )}`
    : "#";

  return (
    <>
      <PageIntro
        eyebrow="Kalkylatorn"
        title="Räkna på ditt avtryck"
        lead="Flyget först — det är oftast den största enskilda posten. Skriv in sträckan, välj klass, och se vad resan väger."
      />

      <section className="px-6 pb-24">
        <div className="mx-auto w-full max-w-[760px]">
          <FadeUp>
            <DoubleFrame innerClassName="p-6 md:p-10">
              {/* Sträcka */}
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-widest text-skogsgron/60">
                  Sträcka
                </span>
                <div className="mt-3 flex items-baseline gap-3 border-b border-linje pb-3">
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={kmInput}
                    onChange={(e) => setKmInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="0"
                    className="w-full bg-transparent font-mono text-4xl md:text-5xl font-medium text-skogsgron outline-none placeholder:text-skogsgron/20"
                  />
                  <span className="font-mono text-sm text-skogsgron/60 whitespace-nowrap">
                    km enkel väg
                  </span>
                </div>
              </label>

              {/* Snabbval */}
              <div className="mt-5 flex flex-wrap gap-2">
                {SNABBVAL.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setKmInput(String(s.km))}
                    className="rounded-full bg-mintpapper px-3 py-1.5 font-mono text-xs text-skogsgron/80 ring-1 ring-linje transition-transform duration-300 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Resa */}
              <div className="mt-8">
                <span className="font-mono text-xs uppercase tracking-widest text-skogsgron/60">
                  Resa
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill active={!turRetur} onClick={() => setTurRetur(false)}>
                    Enkel
                  </Pill>
                  <Pill active={turRetur} onClick={() => setTurRetur(true)}>
                    Tur och retur
                  </Pill>
                </div>
              </div>

              {/* Klass */}
              <div className="mt-6">
                <span className="font-mono text-xs uppercase tracking-widest text-skogsgron/60">
                  Klass
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {KLASSER.map((k) => (
                    <Pill key={k.key} active={klass === k.key} onClick={() => setKlass(k.key)}>
                      {k.label}
                    </Pill>
                  ))}
                </div>
              </div>

              {/* Resultat */}
              <div
                aria-live="polite"
                className={cn(
                  "mt-8 border-t border-linje pt-8 transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-smart)]",
                  result
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none",
                )}
              >
                {result && (
                  <>
                    <div className="font-mono text-5xl md:text-6xl font-medium leading-none text-skogsgron">
                      {formatTon(result.ton)}
                      <span className="ml-2 font-mono text-lg text-skogsgron/60">ton</span>
                    </div>
                    <div className="mt-2 font-mono text-xs uppercase tracking-widest text-skogsgron/60">
                      koldioxid för resan
                    </div>
                    <div className="mt-6 font-mono text-sm text-skogsgron/80">
                      ≈ {result.trees} träd binder detta på ett år
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <a
                        href={mailtoBody}
                        className="group inline-flex items-center gap-3 rounded-full bg-skogsgron pl-6 pr-1.5 py-1.5 text-sm font-medium text-papper transition-transform duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5"
                      >
                        <span className="py-2">Plantera {result.trees} träd</span>
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-smaragd text-white transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5">
                          <ArrowRight className="h-4 w-4" strokeWidth={2} />
                        </span>
                      </a>
                      <CtaButton to="/projekt" variant="secondary">
                        Se projekten
                      </CtaButton>
                    </div>
                  </>
                )}
              </div>
            </DoubleFrame>
          </FadeUp>

          <FadeUp delay={120}>
            <p className="mt-6 px-2 font-mono text-xs leading-relaxed text-skogsgron/55">
              Beräkningen följer myclimates flygmetodik: bränslepolynom per distansband,
              kabinfaktor, klassvikter och höghöjdsfaktor (M 3,0). Ett träd binder ungefär
              20 kg koldioxid per år.
            </p>
          </FadeUp>

          <FadeUp delay={180}>
            <p className="mt-3 px-2 font-mono text-xs text-skogsgron/50">
              Fler kalkyler är på väg — bil, boende och vardag.
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

// Referens för routern
void Link;
