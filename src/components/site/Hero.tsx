import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { heroCopy } from "@/lib/hero-copy";
import { EngineeringVisual } from "./EngineeringVisual";

export function Hero() {
  const { lang } = useLang();
  const copy = heroCopy[lang];
  return (
    <section
      id="main-content"
      tabIndex={-1}
      aria-labelledby="hero-heading"
      className="border-b border-border bg-background text-foreground"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12 lg:pb-20 lg:pt-40">
        <div className="min-w-0">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-secondary-foreground">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-primary" />
            {copy.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="text-balance font-display text-[clamp(2.125rem,4.5vw,4rem)] font-semibold leading-[1.08] tracking-tight"
          >
            {copy.heading1}
            <br />
            {copy.heading2}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-secondary-foreground sm:text-lg">
            {copy.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
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
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {copy.location}
          </p>
        </div>
        <EngineeringVisual />
      </div>
    </section>
  );
}
