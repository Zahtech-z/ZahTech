import { useEffect, useRef, useState } from "react";

/**
 * A progressive-enhancement reveal for homepage sections. SSR content remains
 * visible; JavaScript only prepares sections that begin outside the viewport.
 */
export function HomepageReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
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
      { rootMargin: "0px 0px -12%", threshold: 0.01 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-home-reveal={state}>
      {children}
    </div>
  );
}
