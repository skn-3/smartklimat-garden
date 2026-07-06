const BITAR = [
  [-90, -18, "#1E9E6A"], [78, -30, "#DCBE6E"], [-58, -64, "#F6B27A"], [52, -70, "#1E9E6A"],
  [-104, 22, "#DCBE6E"], [96, 14, "#F6B27A"], [-24, -88, "#DCBE6E"], [20, -92, "#1E9E6A"],
  [-76, 48, "#F6B27A"], [66, 52, "#DCBE6E"],
] as const;

export function BevisReveal() {
  return (
    <div className="relative mx-auto h-32 w-32">
      <style>{`
        @keyframes br-pop { 0% { transform: scale(0); } 70% { transform: scale(1.12); } 100% { transform: scale(1); } }
        @keyframes br-fly { 0% { transform: translate(0,0) rotate(0); opacity: 1; } 100% { transform: translate(var(--dx), var(--dy)) rotate(140deg); opacity: 0; } }
        .br-stamp { animation: br-pop 0.7s cubic-bezier(.34,1.56,.64,1) both 0.15s; }
        .br-bit { animation: br-fly 1.1s ease-out both 0.35s; }
        @media (prefers-reduced-motion: reduce) { .br-stamp { animation: none; } .br-bit { display: none; } }
      `}</style>
      {BITAR.map(([dx, dy, c], i) => (
        <span key={i} className="br-bit absolute left-1/2 top-1/2 h-2 w-3 rounded-sm"
          style={{ background: c, ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px` }} />
      ))}
      <img src="/brand/logo-stamp-guld.png" alt="" className="br-stamp h-32 w-32" />
    </div>
  );
}
