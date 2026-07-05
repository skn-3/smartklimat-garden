import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GrowingTrees() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set("[data-tree]", { scale: 1, opacity: 1 }); return; }
      gsap.set("[data-tree]", { scale: 0, opacity: 0, transformOrigin: "50% 100%" });
      gsap.to("[data-tree]", {
        scale: 1, opacity: 1, duration: 0.7, stagger: 0.11, ease: "back.out(2.2)",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
      gsap.to("[data-sway]", { rotate: 2.5, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.35, transformOrigin: "50% 100%" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const trees = [0.7, 1, 0.85, 1.15, 0.9, 1.05, 0.75];
  return (
    <div ref={ref} aria-hidden className="mx-auto flex max-w-lg items-end justify-center gap-5 px-6">
      {trees.map((s, i) => (
        <svg key={i} data-tree width={26 * s} height={44 * s} viewBox="0 0 26 44">
          <g data-sway>
            <path d="M13 44 Q14 28 13 16" stroke="#15784F" strokeWidth="2.6" fill="none" />
            <ellipse cx="8" cy="16" rx="7" ry="4.4" fill={i % 2 ? "#1E9E6A" : "#9FD9B6"} transform="rotate(-26 8 16)" />
            <ellipse cx="18" cy="11" rx="7" ry="4.4" fill={i % 2 ? "#9FD9B6" : "#1E9E6A"} transform="rotate(22 18 11)" />
            <ellipse cx="13" cy="6" rx="5.5" ry="3.6" fill="#1E9E6A" />
          </g>
        </svg>
      ))}
    </div>
  );
}
