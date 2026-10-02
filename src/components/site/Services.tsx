import { useLang } from "@/lib/i18n";
import { homeCopy } from "@/lib/home-copy";

export function Services() {
  const { t, lang } = useLang();
  const copy = homeCopy[lang];
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-border py-14 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {copy.capabilities}
          </p>
          <h2
            id="services-heading"
            className="max-w-sm text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl"
          >
            {copy.services}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {copy.servicesIntro}
          </p>
        </div>
        <div className="border-t border-border">
          {[0, 1, 3, 4, 2, 5].map((serviceIndex, position) => (
            <article
              key={serviceIndex}
              className="grid gap-2 border-b border-border py-5 sm:grid-cols-[2rem_1fr_1.3fr] sm:gap-5 sm:py-6"
            >
              <span className="font-mono text-xs text-muted-foreground">0{position + 1}</span>
              <h3 className="text-lg font-semibold leading-snug">
                {t.services.items[serviceIndex].title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {copy.serviceDescriptions[serviceIndex]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
