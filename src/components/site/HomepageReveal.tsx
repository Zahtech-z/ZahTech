import { useEffect, useRef, useState } from "react";

/**
 * A progressive-enhancement reveal for editorial content. SSR content remains
 * visible; JavaScript only prepares content that begins outside the viewport.
 */
export function HomepageReveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  entrance = false,
  ariaLabelledby,
}: {
  children: React.ReactNode;
  as?: "div" | "article" | "header" | "li" | "section";
  className?: string;
  delay?: number;
  entrance?: boolean;
  ariaLabelledby?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"visible" | "pending" | "revealed">("visible");

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!("IntersectionObserver" in window)) return;

    if (element.getBoundingClientRect().top < window.innerHeight * 0.85) {
      setState("revealed");
      return;
    }

    setState("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("revealed");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -4%", threshold: 0.01 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`${entrance ? "page-intro-enter " : ""}${className ?? ""}`.trim()}
      data-home-reveal={state}
      aria-labelledby={ariaLabelledby}
      style={{ "--site-reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
