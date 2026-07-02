import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FadeUpProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "header" | "li" | "article";
}

// Mjuk fade-up via IntersectionObserver — endast transform/opacity.
export function FadeUp({ children, delay = 0, className, as = "div", ...rest }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = window.setTimeout(() => {
              el.classList.remove("fade-up-init");
              el.classList.add("fade-up-in");
            }, delay);
            io.disconnect();
            return () => window.clearTimeout(t);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Tag = as as "div";
  return (
    <Tag ref={ref as never} className={cn("fade-up-init", className)} {...rest}>
      {children}
    </Tag>
  );
}
