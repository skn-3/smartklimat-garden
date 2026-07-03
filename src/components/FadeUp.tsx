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

    el.classList.add("fade-up-ready");

    if (!("IntersectionObserver" in window)) {
      el.classList.remove("fade-up-ready");
      el.classList.add("fade-up-in");
      return;
    }

    let timeout: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeout = window.setTimeout(() => {
              el.classList.remove("fade-up-ready");
              el.classList.add("fade-up-in");
            }, delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timeout) window.clearTimeout(timeout);
    };
  }, [delay]);

  const Tag = as as "div";
  return (
    <Tag ref={ref as never} className={className} {...rest}>
      {children}
    </Tag>
  );
}
