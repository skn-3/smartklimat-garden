import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/projekt", label: "Projekt" },
  { to: "/foretag", label: "För företag" },
  { to: "/smaarty", label: "Smaarty" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/kalkylator", label: "Kalkylator" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 mt-6">
        <nav
          className={cn(
            "pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4",
            "rounded-full bg-white/70 backdrop-blur-xl ring-1 ring-linje",
            "pl-5 pr-2 py-2 shadow-[0_1px_0_rgba(11,61,46,0.04)]",
          )}
        >
          <Link to="/" className="font-display text-lg font-bold tracking-tight text-skogsgron">
            SmartKlimat
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-4 py-2 text-sm text-skogsgron/80 transition-colors hover:text-skogsgron hover:bg-mintpapper"
                activeProps={{ className: "bg-mintpapper text-skogsgron" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative grid h-10 w-10 place-items-center rounded-full bg-skogsgron text-papper"
          >
            <span
              className={cn(
                "absolute h-[1.5px] w-4 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-smart)]",
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "absolute h-[1.5px] w-4 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-smart)]",
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
        </nav>
      </header>

      {/* Helskärms-overlay på mobil */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden bg-papper transition-opacity duration-500 [transition-timing-function:var(--ease-smart)]",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex min-h-[100dvh] flex-col items-start justify-center gap-2 px-8 pt-24">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "font-display text-4xl font-bold text-skogsgron transition-[transform,opacity] duration-700 [transition-timing-function:var(--ease-smart)]",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
