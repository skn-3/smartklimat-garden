import { useEffect, useRef } from "react";
import gsap from "gsap";

type Variant = "foretag" | "smaarty";

const FLOWS: Record<Variant, { nodes: { label: string; sub: string }[]; eyebrow: string; title: string }> = {
  foretag: {
    eyebrow: "Automatiken, live",
    title: "Från affär till bevis — utan att någon lyfter ett finger.",
    nodes: [
      { label: "AFFÄR", sub: "signeras" },
      { label: "SMARTKLIMAT", sub: "tar emot" },
      { label: "TRÄD", sub: "planteras" },
      { label: "BEVIS", sub: "till kunden" },
    ],
  },
  smaarty: {
    eyebrow: "Loopen",
    title: "Sälj. Plantera. Levla.",
    nodes: [
      { label: "SÄLJ", sub: "du knackar på" },
      { label: "TRÄD", sub: "växer på riktigt" },
      { label: "POÄNG", sub: "du levlar" },
    ],
  },
};

export function FlowPulse({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLDivElement>(null);
  const flow = FLOWS[variant];
  const n = flow.nodes.length;
  const W = 720, H = 150, pad = 70;
  const step = (W - pad * 2) / (n - 1);
  const cy = 66;
  const xs = flow.nodes.map((_, i) => pad + i * step);
  const d = `M ${xs[0]} ${cy} ` + xs.slice(1).map((x) => `L ${x} ${cy}`).join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = el.querySelector<SVGPathElement>("[data-line]");
    const dot = el.querySelector<SVGCircleElement>("[data-dot]");
    if (!path || !dot) return;
    if (reduce) { dot.setAttribute("opacity", "0"); return; }

    const len = path.getTotalLength();
    const state = { t: 0 };
    const tl = gsap.timeline({ repeat: -1, paused: true });
    tl.to(state, {
      t: 1, duration: 3.2, ease: "none",
      onUpdate: () => {
        const p = path.getPointAtLength(state.t * len);
        dot.setAttribute("cx", String(p.x));
        dot.setAttribute("cy", String(p.y));
      },
    });
    // nodpuls när pulsen passerar
    el.querySelectorAll<SVGCircleElement>("[data-node]").forEach((c, i) => {
      tl.to(c, { attr: { r: 9 }, duration: 0.16, ease: "power2.out" }, (i / (n - 1)) * 3.2)
        .to(c, { attr: { r: 6.5 }, duration: 0.4, ease: "power2.in" }, (i / (n - 1)) * 3.2 + 0.16);
    });

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); tl.kill(); };
  }, [n]);

  return (
    <div ref={ref} className="mx-auto max-w-3xl px-6">
      <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.25em] text-smaragd-dark">{flow.eyebrow}</p>
      <h3 className="mt-3 text-center font-display text-2xl font-bold tracking-tight text-skogsgron md:text-3xl">{flow.title}</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full" role="img" aria-label={flow.title}>
        <path data-line d={d} fill="none" stroke="#D9EBE0" strokeWidth="2" />
        <path d={d} fill="none" stroke="#DCBE6E" strokeWidth="2" strokeDasharray="2 8" opacity="0.7" />
        {xs.map((x, i) => (
          <g key={i}>
            <circle data-node cx={x} cy={cy} r="6.5" fill={i === n - 1 ? "#DCBE6E" : "#1E9E6A"} />
            <circle cx={x} cy={cy} r="12" fill="none" stroke="#D9EBE0" strokeWidth="1.5" />
            <text x={x} y={cy + 34} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10.5" letterSpacing="2" fill="#0B3D2E" fontWeight="600">{flow.nodes[i].label}</text>
            <text x={x} y={cy + 50} textAnchor="middle" fontFamily="Familjen Grotesk, sans-serif" fontSize="9.5" fill="#6E9483">{flow.nodes[i].sub}</text>
          </g>
        ))}
        <circle data-dot cx={xs[0]} cy={cy} r="4.5" fill="#0B3D2E" />
      </svg>
    </div>
  );
}
