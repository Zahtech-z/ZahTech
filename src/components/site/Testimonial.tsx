import { Star } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Testimonial() {
  const { t } = useLang();
  const { heading, quote, name, company, stars } = t.testimonial;

  return (
    <section id="testimonials" className="border-b border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="mb-12 text-balance text-center font-display text-4xl font-bold md:text-5xl">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_40px_-12px_oklch(0.74_0.14_280/0.35)] md:p-10">
            <div className="mb-5 flex gap-1" role="img" aria-label={stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#22d3ee] text-[#22d3ee]" aria-hidden />
              ))}
            </div>
            <blockquote className="text-balance text-xl leading-relaxed text-foreground/90 md:text-2xl">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#22d3ee] font-display text-sm font-bold text-primary-foreground">
                SD
              </div>
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground">{company}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
