import { useEffect, useState } from "react";
import {
  readConsent,
  saveConsent,
  type ConsentState,
} from "@/lib/analytics";

type View = "hidden" | "banner" | "settings";

export function CookieBanner() {
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setView("banner");
    } else {
      setAnalytics(existing.analytics);
      setAds(existing.ads);
    }
  }, []);

  function commit(next: Omit<ConsentState, "ts">) {
    saveConsent(next);
    setAnalytics(next.analytics);
    setAds(next.ads);
    setView("hidden");
  }

  if (view === "hidden") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-inställningar"
      className="fixed inset-x-3 bottom-3 z-[60] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-[440px]"
    >
      <div className="rounded-2xl bg-skogsgron p-1.5 shadow-[0_20px_50px_-20px_rgba(11,61,46,0.55)]">
        <div className="rounded-[1.1rem] bg-papper p-5 md:p-6">
          {view === "banner" ? (
            <>
              <p className="font-display text-lg font-bold text-skogsgron">
                Vi använder cookies för att förstå vad som funkar
              </p>
              <p className="mt-2 text-sm leading-relaxed text-skogsgron/70">
                Nödvändiga cookies laddas alltid. Med ditt samtycke använder vi
                också analys och annonsering för att mäta hur sidan används.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => commit({ analytics: true, ads: true })}
                  className="rounded-full bg-smaragd px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  Acceptera alla
                </button>
                <button
                  type="button"
                  onClick={() => commit({ analytics: false, ads: false })}
                  className="rounded-full border border-linje bg-white px-4 py-2 text-sm font-medium text-skogsgron transition-colors hover:border-smaragd"
                >
                  Endast nödvändiga
                </button>
                <button
                  type="button"
                  onClick={() => setView("settings")}
                  className="rounded-full px-4 py-2 text-sm font-medium text-smaragd-dark underline underline-offset-4"
                >
                  Inställningar
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="font-display text-lg font-bold text-skogsgron">
                Cookie-inställningar
              </p>
              <div className="mt-4 space-y-3">
                <Row title="Nödvändiga" desc="Krävs för att sajten ska fungera." forcedOn />
                <Row
                  title="Analys"
                  desc="Hjälper oss förstå vilka sidor som funkar."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <Row
                  title="Annonsering"
                  desc="Mäter effekt av kampanjer och möjliggör remarketing."
                  checked={ads}
                  onChange={setAds}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => commit({ analytics, ads })}
                  className="rounded-full bg-smaragd px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  Spara val
                </button>
                <button
                  type="button"
                  onClick={() => commit({ analytics: true, ads: true })}
                  className="rounded-full border border-linje bg-white px-4 py-2 text-sm font-medium text-skogsgron transition-colors hover:border-smaragd"
                >
                  Acceptera alla
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  title,
  desc,
  checked,
  onChange,
  forcedOn,
}: {
  title: string;
  desc: string;
  checked?: boolean;
  onChange?: (v: boolean) => void;
  forcedOn?: boolean;
}) {
  const isOn = forcedOn ? true : !!checked;
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-linje bg-white p-3">
      <div>
        <p className="text-sm font-medium text-skogsgron">{title}</p>
        <p className="mt-0.5 text-xs text-skogsgron/60">{desc}</p>
      </div>
      <button
        type="button"
        disabled={forcedOn}
        aria-pressed={isOn}
        onClick={() => onChange?.(!isOn)}
        className={`mt-0.5 h-6 w-10 shrink-0 rounded-full transition-colors ${
          isOn ? "bg-smaragd" : "bg-linje"
        } ${forcedOn ? "opacity-60" : ""}`}
      >
        <span
          className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition-transform ${
            isOn ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
