import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

interface Props {
  to: ComponentProps<typeof Link>["to"];
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

// Primär: mörk pill med smaragd-cirkel som håller pilen längst till höger.
export function CtaButton({ to, children, variant = "primary", className }: Props) {
  const base =
    "group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium transition-[transform,opacity] duration-500 [transition-timing-function:var(--ease-smart)] will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-skogsgron text-papper hover:-translate-y-0.5"
      : "bg-white text-skogsgron ring-1 ring-linje hover:-translate-y-0.5";
  const circle =
    variant === "primary"
      ? "bg-smaragd text-white"
      : "bg-mintpapper text-skogsgron";

  return (
    <Link to={to} className={cn(base, styles, className)}>
      <span className="py-2">{children}</span>
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:translate-x-0.5",
          circle,
        )}
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </Link>
  );
}
