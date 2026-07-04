import type { ReactNode } from "react";

/**
 * Enhetsram för Smaartys app-mockups. Skärmarna är React-komponenter
 * (aldrig skärmdumpar) så innehållet kan animeras.
 */
export function PhoneFrame({
  children,
  className = "",
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
      className={`relative aspect-[10/20.5] select-none ${className}`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[2.6rem] bg-[#0E1B16] shadow-[0_24px_60px_-20px_rgba(11,61,46,0.45)]" />
      <div className="absolute inset-[5px] overflow-hidden rounded-[2.3rem] bg-papper">
        {children}
      </div>
      <div className="absolute left-1/2 top-[13px] h-[6px] w-[28%] -translate-x-1/2 rounded-full bg-[#0E1B16]/60" />
    </div>
  );
}
