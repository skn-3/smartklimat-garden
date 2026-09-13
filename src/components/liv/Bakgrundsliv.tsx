import { cn } from "@/lib/utils";

export type LivPreset =
  | "home-hero"
  | "home-paths"
  | "home-steps"
  | "home-counter"
  | "dark-teaser"
  | "intro-branch"
  | "intro-leaf"
  | "soft-apricot"
  | "foretag-hero"
  | "single-salvia"
  | "warm-case"
  | "dark-glow"
  | "smaarty-hero"
  | "manifest"
  | "triad"
  | "contact-card"
  | "stat-subtle";

type Item = {
  kind: "blob" | "branch" | "asterisk" | "leaf";
  className: string;
  tone?: "salvia" | "guld" | "apricot" | "smaragd" | "salvia-dark" | "apricot-dark";
  flip?: boolean;
};

const PRESETS: Record<LivPreset, Item[]> = {
  "home-hero": [
    { kind: "blob", tone: "salvia", className: "-left-36 -top-24 h-[420px] w-[420px] liv-drift-a" },
    { kind: "blob", tone: "apricot", className: "-right-40 top-[18%] h-[460px] w-[460px] liv-drift-b" },
    { kind: "blob", tone: "guld", className: "bottom-[-220px] left-[28%] h-[440px] w-[440px] liv-drift-c" },
    { kind: "branch", className: "right-5 top-24 md:right-12" },
    { kind: "asterisk", className: "left-[7%] top-[35%]" },
    { kind: "leaf", tone: "salvia", className: "bottom-[25%] left-[12%] liv-sway-a" },
    { kind: "leaf", tone: "guld", className: "right-[14%] top-[48%] liv-sway-b" },
  ],
  "home-paths": [
    { kind: "blob", tone: "salvia", className: "-right-44 top-10 h-[400px] w-[400px] liv-drift-b" },
    { kind: "asterisk", className: "bottom-14 left-[7%] text-[18px]" },
  ],
  "home-steps": [
    { kind: "blob", tone: "salvia", className: "-right-36 -top-24 h-[390px] w-[390px] liv-drift-a" },
    { kind: "blob", tone: "apricot", className: "-bottom-48 left-[30%] h-[430px] w-[430px] liv-drift-c" },
    { kind: "branch", flip: true, className: "-bottom-8 left-4 md:left-10" },
    { kind: "leaf", tone: "smaragd", className: "right-[12%] top-[38%] liv-sway-a" },
  ],
  "home-counter": [
    { kind: "blob", tone: "salvia", className: "-right-40 -top-28 h-[420px] w-[420px] liv-drift-b" },
    { kind: "leaf", tone: "guld", className: "bottom-14 left-[8%] liv-sway-b" },
  ],
  "dark-teaser": [
    { kind: "blob", tone: "apricot-dark", className: "-bottom-52 -right-36 h-[430px] w-[430px] liv-drift-c" },
    { kind: "blob", tone: "salvia-dark", className: "-left-44 -top-44 h-[420px] w-[420px] liv-drift-a" },
    { kind: "asterisk", className: "right-[8%] top-12 text-[22px]" },
  ],
  "intro-branch": [
    { kind: "blob", tone: "salvia", className: "-left-44 -top-24 h-[430px] w-[430px] liv-drift-a" },
    { kind: "blob", tone: "apricot", className: "-right-44 top-24 h-[420px] w-[420px] liv-drift-b" },
    { kind: "branch", className: "right-5 top-28 md:right-12" },
  ],
  "intro-leaf": [
    { kind: "blob", tone: "salvia", className: "-left-40 -top-24 h-[410px] w-[410px] liv-drift-a" },
    { kind: "blob", tone: "apricot", className: "-right-44 top-20 h-[420px] w-[420px] liv-drift-b" },
    { kind: "leaf", tone: "guld", className: "right-[9%] bottom-[18%] liv-sway-a" },
  ],
  "soft-apricot": [
    { kind: "blob", tone: "apricot", className: "-right-36 top-[20%] h-[430px] w-[430px] liv-drift-b" },
  ],
  "foretag-hero": [
    { kind: "blob", tone: "salvia", className: "-left-40 -top-24 h-[420px] w-[420px] liv-drift-a" },
    { kind: "blob", tone: "apricot", className: "-right-40 top-10 h-[430px] w-[430px] liv-drift-b" },
    { kind: "asterisk", className: "bottom-12 left-[8%]" },
  ],
  "single-salvia": [
    { kind: "blob", tone: "salvia", className: "-right-40 top-0 h-[400px] w-[400px] liv-drift-a" },
  ],
  "warm-case": [
    { kind: "blob", tone: "apricot", className: "-right-36 -bottom-44 h-[440px] w-[440px] liv-drift-c" },
    { kind: "leaf", tone: "guld", className: "left-[7%] top-[24%] liv-sway-b" },
  ],
  "dark-glow": [
    { kind: "blob", tone: "apricot-dark", className: "-bottom-56 right-[8%] h-[450px] w-[450px] liv-drift-c" },
  ],
  "smaarty-hero": [
    { kind: "blob", tone: "salvia", className: "-left-40 -top-24 h-[420px] w-[420px] liv-drift-a" },
    { kind: "blob", tone: "apricot", className: "-right-40 top-12 h-[430px] w-[430px] liv-drift-b" },
    { kind: "branch", className: "right-4 top-24 md:right-10" },
    { kind: "leaf", tone: "smaragd", className: "bottom-12 left-[8%] liv-sway-a" },
  ],
  manifest: [
    { kind: "blob", tone: "salvia", className: "-left-40 -top-32 h-[420px] w-[420px] liv-drift-a" },
    { kind: "blob", tone: "apricot", className: "-right-44 bottom-0 h-[430px] w-[430px] liv-drift-b" },
    { kind: "asterisk", className: "right-[10%] top-[18%]" },
  ],
  triad: [
    { kind: "blob", tone: "salvia", className: "-right-36 -top-24 h-[390px] w-[390px] liv-drift-b" },
    { kind: "leaf", tone: "smaragd", className: "bottom-6 left-[7%] liv-sway-a" },
  ],
  "contact-card": [
    { kind: "blob", tone: "salvia", className: "-left-40 top-0 h-[400px] w-[400px] liv-drift-a" },
  ],
  "stat-subtle": [
    { kind: "blob", tone: "salvia", className: "-right-44 -top-40 h-[400px] w-[400px] liv-drift-b opacity-70" },
  ],
};

const TONE_CLASS: Record<NonNullable<Item["tone"]>, string> = {
  salvia: "liv-blob-salvia",
  guld: "liv-blob-guld",
  apricot: "liv-blob-apricot",
  smaragd: "text-smaragd",
  "salvia-dark": "liv-blob-salvia-dark",
  "apricot-dark": "liv-blob-apricot-dark",
};

function Branch({ className, flip }: { className: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 90 150" className={cn("liv-branch absolute h-[90px] w-[54px] md:h-[150px] md:w-[90px]", flip && "rotate-180", className)}>
      <path d="M45 145C44 103 52 71 71 23" fill="none" stroke="var(--salvia)" strokeWidth="2" strokeLinecap="round" />
      <path d="M49 105C27 100 19 87 20 73C36 75 48 86 49 105Z" fill="var(--mint)" />
      <path d="M57 73C71 64 79 51 78 38C63 42 55 55 57 73Z" fill="var(--salvia)" />
      <path d="M43 126C29 120 23 111 25 100C37 103 44 113 43 126Z" fill="var(--salvia)" />
      <circle cx="72" cy="20" r="4" fill="var(--guld)" />
    </svg>
  );
}

function Leaf({ className, tone = "salvia" }: { className: string; tone?: Item["tone"] }) {
  return (
    <svg viewBox="0 0 28 28" className={cn("absolute h-5 w-5 opacity-40 md:h-6 md:w-6", TONE_CLASS[tone ?? "salvia"], className)}>
      <path d="M24 4C12 4 4 10 4 20c7 3 17-1 20-16Z" fill="currentColor" />
      <path d="M7 21c4-6 8-10 14-14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Bakgrundsliv({ preset }: { preset: LivPreset }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {PRESETS[preset].map((item, index) => {
        if (item.kind === "blob") {
          return <span key={index} className={cn("liv-blob absolute rounded-full", item.tone && TONE_CLASS[item.tone], item.className)} />;
        }
        if (item.kind === "branch") return <Branch key={index} className={item.className} flip={item.flip} />;
        if (item.kind === "leaf") return <Leaf key={index} className={item.className} tone={item.tone} />;
        return <span key={index} className={cn("liv-asterisk absolute font-display text-[24px] text-guld opacity-85", item.className)}>✳</span>;
      })}
    </div>
  );
}