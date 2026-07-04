import { useState } from "react";
import { FadeUp } from "./FadeUp";

/**
 * Delad FAQ: samma mönster som Smaarty-sidans frågor
 * (grid-template-rows-animation, plus-ikon som roterar).
 */

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-linje bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-skogsgron">{q}</span>
        <span
          className={`text-xl leading-none text-smaragd-dark transition-transform duration-500 [transition-timing-function:var(--ease-smart)] ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-500 [transition-timing-function:var(--ease-smart)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-skogsgron/70">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqList({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="space-y-3">
      {items.map(([q, a], i) => (
        <FadeUp key={q} delay={i * 50}>
          <FaqItem q={q} a={a} />
        </FadeUp>
      ))}
    </div>
  );
}
