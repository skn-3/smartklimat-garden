import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-linje bg-white/70 px-3 py-1",
        "font-mono uppercase tracking-[0.2em] text-[10px] text-smaragd-dark",
      )}
    >
      {children}
    </span>
  );
}
