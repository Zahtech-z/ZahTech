import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { HomeFooter } from "@/components/site/HomeFooter";
import { SkipLink } from "@/components/site/SkipLink";
import { HomepageReveal } from "@/components/site/HomepageReveal";
import { heroCopy } from "@/lib/hero-copy";
import { useLang } from "@/lib/i18n";
import { serviceIds, servicesCopy } from "@/lib/services-copy";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: servicesCopy.en.seoTitle },
      { name: "description", content: servicesCopy.en.introduction },
      { property: "og:title", content: servicesCopy.en.seoTitle },
      { property: "og:description", content: servicesCopy.en.introduction },
      { property: "og:url", content: "https://zahtech.org/services" },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/services" }],
  }),
});

function ServicesPage() {
  const { lang } = useLang();
  const copy = servicesCopy[lang];
  return (
    <>
      <SkipLink />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen border-b border-border bg-background pb-14 pt-28 text-foreground sm:pb-20 sm:pt-36"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomepageReveal as="header" className="pb-10 sm:pb-14" entrance>
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-secondary-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-primary" />
              {copy.eyebrow}
            </p>
            <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {copy.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy.introduction}
            </p>
          </HomepageReveal>
          <section aria-labelledby="capabilities-heading">
            <h2 id="capabilities-heading" className="sr-only">
              {copy.overview}
            </h2>
            <ol className="border-t border-border">
              {serviceIds.map((id, index) => (
                <HomepageReveal
                  key={id}
                  as="li"
                  delay={index * 40}
                  className="grid grid-cols-1 items-start gap-y-4 border-b border-border py-9 md:grid-cols-[2rem_minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-x-8 md:py-12 lg:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-x-12"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-primary-text md:col-start-1 md:row-start-1 md:pt-1.5"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="min-w-0 text-balance font-display text-2xl font-semibold leading-snug md:col-start-2 md:row-start-1">
                    {copy.services[id].title}
                  </h3>
                  <p className="min-w-0 max-w-[60ch] text-base leading-relaxed text-muted-foreground md:col-start-3 md:row-start-1">
                    {copy.services[id].description}
                  </p>
                </HomepageReveal>
              ))}
            </ol>
          </section>
          <HomepageReveal
            as="section"
            ariaLabelledby="services-project-heading"
            className="flex flex-col items-start justify-between gap-6 border-t border-border py-12 sm:py-16 md:flex-row md:items-center"
          >
            <div className="max-w-2xl">
              <h2
                id="services-project-heading"
                className="text-balance font-display text-3xl font-semibold sm:text-4xl"
              >
                {copy.ctaHeading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {copy.ctaDescription}
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              {heroCopy[lang].project}
            </Link>
          </HomepageReveal>
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
