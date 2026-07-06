import { useEffect, useRef, useState } from "react";

/**
 * "Varför träd" — levande slideshow. Fem sanna kort ur projekten som
 * auto-roterar (paus på hover), med tonskiftande bakgrund och punkter.
 * Reduced motion => alla kort staplade statiskt.
 */

type Slide = {
  chip: string;
  head: string;
  body: string;
  tone: string;
  icon: React.ReactNode;
};

const SLIDES: Slide[] = [
  {
    chip: "Klimat",
    head: "20 kg om året.",
    body: "Ett växande träd binder ungefär 20 kilo koldioxid — varje år, år efter år, i decennier.",
    tone: "#EAF7EE",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <rect x="12.6" y="15" width="2.8" height="10" rx="1.4" fill="#15784F" />
        <circle cx="14" cy="10" r="7" fill="#1E9E6A" />
        <circle cx="8.5" cy="14" r="4.5" fill="#3CB680" />
        <circle cx="19.5" cy="14" r="4.5" fill="#15784F" />
      </svg>
    ),
  },
  {
    chip: "Mångfald",
    head: "Skog är hem.",
    body: "I Pontal syns svart lejontamarin och jaguar i kamerafällorna igen. I Copperbelt är kronörnen tillbaka.",
    tone: "#F4FAF5",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <ellipse cx="14" cy="17.5" rx="6" ry="5" fill="#0B3D2E" />
        <circle cx="7.5" cy="11" r="2.6" fill="#0B3D2E" />
        <circle cx="12" cy="8.5" r="2.6" fill="#0B3D2E" />
        <circle cx="16.5" cy="8.5" r="2.6" fill="#0B3D2E" />
        <circle cx="20.5" cy="11" r="2.6" fill="#0B3D2E" />
      </svg>
    ),
  },
  {
    chip: "Människor",
    head: "Skog är inkomst.",
    body: "Biodlaren Alfred i Luanshya tar en sjättedel av familjens kontantinkomst ur kupor som hänger i trädkronorna.",
    tone: "#EFE9DC",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <ellipse cx="14" cy="15" rx="7.5" ry="9" fill="#DCBE6E" />
        <rect x="6.5" y="10.5" width="15" height="2.2" rx="1.1" fill="#0B3D2E" opacity="0.85" />
        <rect x="6.5" y="15" width="15" height="2.2" rx="1.1" fill="#0B3D2E" opacity="0.85" />
        <rect x="7.8" y="19.5" width="12.4" height="2.2" rx="1.1" fill="#0B3D2E" opacity="0.85" />
      </svg>
    ),
  },
  {
    chip: "Vatten",
    head: "Skog håller vattnet.",
    body: "Molnskogen i Khasi Hills fångar regnet åt 59 byar — försvinner träden, försvinner vattnet.",
    tone: "#EAF7EE",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <path d="M14 3 C19 10 22 13.5 22 17.5 A8 8 0 1 1 6 17.5 C6 13.5 9 10 14 3 Z" fill="#1E9E6A" />
        <path d="M11 17.5 A3.5 3.5 0 0 0 14.5 21" stroke="#EAF7EE" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    chip: "Tech",
    head: "Varje träd är en rad.",
    body: "Varje planterat träd får en rad i databasen — tidsstämplad, spårbar och länkad till projektet i fält.",
    tone: "#F4FAF5",
    icon: (
      <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
        <rect x="3.5" y="6" width="21" height="16" rx="3.5" fill="#0B3D2E" />
        <path d="M8 12 L11 14.5 L8 17" stroke="#3CB680" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13" y="15.7" width="6.5" height="1.8" rx="0.9" fill="#9FD9B6" />
      </svg>
    ),
  },
];

export function VarforTrad() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const hoverRef = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const id = window.setInterval(() => {
      if (!hoverRef.current) setActive((v) => (v + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  if (reduced) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {SLIDES.map((s) => (
          <div key={s.chip} className="rounded-[1.6rem] border border-linje bg-white p-6">
            <div className="flex items-center gap-3">
              {s.icon}
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">{s.chip}</p>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold text-skogsgron">{s.head}</h3>
            <p className="mt-2 text-sm text-skogsgron/70">{s.body}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="rounded-[2rem] bg-mintpapper p-1.5"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div
        className="relative overflow-hidden rounded-[1.6rem] border border-linje transition-colors duration-700"
        style={{ backgroundColor: SLIDES[active].tone }}
      >
        <div className="relative min-h-[280px] md:min-h-[250px]">
          {SLIDES.map((s, i) => (
            <div
              key={s.chip}
              className={`absolute inset-0 flex flex-col justify-center px-8 py-10 transition-all duration-700 [transition-timing-function:var(--ease-smart)] md:px-14 ${
                i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              <div className="flex items-center gap-3">
                {s.icon}
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-smaragd-dark">{s.chip}</p>
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-skogsgron md:text-4xl">
                {s.head}
              </h3>
              <p className="mt-3 max-w-xl text-[15px] text-skogsgron/75 md:text-base">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-5 left-8 flex gap-2 md:left-14">
          {SLIDES.map((s, i) => (
            <button
              key={s.chip}
              type="button"
              aria-label={`Visa: ${s.head}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 [transition-timing-function:var(--ease-smart)] ${
                i === active ? "w-6 bg-smaragd" : "w-1.5 bg-skogsgron/20 hover:bg-skogsgron/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
