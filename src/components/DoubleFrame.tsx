import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// Dubbel-ram: yttre skal (svag bg + hairline) med inre kärna.
export function DoubleFrame({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[2rem] bg-mintpapper/70 p-1.5 ring-1 ring-linje",
        className,
      )}
    >
      <div className={cn("rounded-[1.5rem] bg-white p-6", innerClassName)}>{children}</div>
    </div>
  );
}
