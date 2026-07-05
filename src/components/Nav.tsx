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
  { to: "/kontakt", label: "Kontakt" },
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
          <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-skogsgron">
            <img src="/brand/logo-stamp-ink.png" alt="" className="h-9 w-9" />
            <span>SmartKlimat</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-3.5 py-2 text-sm text-skogsgron/80 transition-colors hover:text-skogsgron hover:bg-mintpapper"
                activeProps={{ className: "bg-mintpapper text-skogsgron" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/plantera"
              className="group ml-2 inline-flex items-center gap-2.5 rounded-full bg-skogsgron py-1 pl-4 pr-1 text-sm font-medium text-papper transition-transform duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5"
            >
              <span className="py-1.5">Plantera träd</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
            </Link>
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
          <img
            src="/brand/logo-stamp-ink.png"
            alt=""
            className={cn(
              "mb-6 h-16 w-16 transition-[transform,opacity] duration-700 [transition-timing-function:var(--ease-smart)]",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          />
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
          <Link
            to="/plantera"
            onClick={() => setOpen(false)}
            className={cn(
              "group mt-8 inline-flex items-center gap-3 rounded-full bg-skogsgron py-1.5 pl-6 pr-1.5 text-base font-medium text-papper transition-[transform,opacity] duration-700 [transition-timing-function:var(--ease-smart)]",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: open ? `${120 + links.length * 60}ms` : "0ms" }}
          >
            <span className="py-2">Plantera träd</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-smaragd text-white">
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
