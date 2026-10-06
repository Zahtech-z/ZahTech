import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { heroCopy } from "@/lib/hero-copy";
import { EngineeringVisual } from "./EngineeringVisual";

export function Hero() {
  const { lang } = useLang();
  const copy = heroCopy[lang];
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    let isIntersecting = false;
    let listening = false;
    let frame = 0;

    const reset = () => {
      hero.style.removeProperty("--hero-copy-scroll-y");
      hero.style.removeProperty("--hero-copy-scroll-opacity");
      hero.style.removeProperty("--hero-visual-scroll-y");
      hero.style.removeProperty("--hero-visual-scroll-opacity");
      hero.style.removeProperty("--hero-visual-scroll-scale");
    };
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / Math.max(rect.height * 0.85, 1), 0), 1);
      hero.style.setProperty("--hero-copy-scroll-y", `${progress * -17}px`);
      hero.style.setProperty("--hero-copy-scroll-opacity", `${1 - progress * 0.18}`);
      hero.style.setProperty("--hero-visual-scroll-y", `${progress * -34}px`);
      hero.style.setProperty("--hero-visual-scroll-opacity", `${1 - progress * 0.28}`);
      hero.style.setProperty("--hero-visual-scroll-scale", `${1 - progress * 0.015}`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const stop = (shouldReset = false) => {
      if (listening) window.removeEventListener("scroll", schedule);
      listening = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      if (shouldReset) reset();
    };
    const sync = () => {
      const canAnimate = desktop.matches && !reducedMotion.matches;
      if (!canAnimate || !isIntersecting) {
        stop(!canAnimate);
        return;
      }
      if (!listening) {
        window.addEventListener("scroll", schedule, { passive: true });
        listening = true;
      }
      schedule();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    desktop.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      stop(true);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="main-content"
      tabIndex={-1}
      aria-labelledby="hero-heading"
      className="border-b border-border bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12 lg:pb-20 lg:pt-40">
        <div className="hero-scroll-copy min-w-0">
          <p className="homepage-hero-enter homepage-hero-enter-1 mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-secondary-foreground">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-primary" />
            {copy.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="homepage-hero-enter homepage-hero-enter-2 text-balance font-display text-[clamp(2.125rem,4.5vw,4rem)] font-semibold leading-[1.08] tracking-tight"
          >
            {copy.heading1}
            <br />
            {copy.heading2}
          </h1>
          <p className="homepage-hero-enter homepage-hero-enter-3 mt-6 max-w-lg text-base leading-relaxed text-secondary-foreground sm:text-lg">
            {copy.description}
          </p>
          <div className="homepage-hero-enter homepage-hero-enter-4 mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover motion-reduce:transition-none"
            >
              {copy.project}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              to="/work"
              className="inline-flex min-h-12 items-center justify-center px-3 py-3 text-sm font-medium underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground motion-reduce:transition-none"
            >
              {copy.work}
            </Link>
          </div>
          <p className="homepage-hero-enter homepage-hero-enter-5 mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {copy.location}
          </p>
        </div>
        <div className="hero-scroll-visual homepage-hero-enter homepage-hero-enter-4">
          <EngineeringVisual />
        </div>
      </div>
    </section>
  );
}
