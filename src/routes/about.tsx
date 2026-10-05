import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { HomeFooter } from "@/components/site/HomeFooter";
import { SkipLink } from "@/components/site/SkipLink";
import { useLang } from "@/lib/i18n";
import { aboutCopy } from "@/lib/about-copy";
import { heroCopy } from "@/lib/hero-copy";
import { HomepageReveal } from "@/components/site/HomepageReveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: aboutCopy.en.seoTitle },
      { name: "description", content: aboutCopy.en.seoDescription },
      { property: "og:title", content: aboutCopy.en.seoTitle },
      { property: "og:description", content: aboutCopy.en.seoDescription },
      { property: "og:url", content: "https://zahtech.org/about" },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/about" }],
  }),
});

function AboutPage() {
  const { lang } = useLang();
  const copy = aboutCopy[lang];
  return (
    <>
      <SkipLink />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="bg-background pt-28 text-foreground sm:pt-36"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomepageReveal as="header" className="pb-14 sm:pb-20" entrance>
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-secondary-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-primary" />
              {copy.eyebrow}
            </p>
            <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {copy.heading[0]}
              <br />
              {copy.heading[1]}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy.introduction}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {copy.statement}
            </p>
          </HomepageReveal>
          <section aria-labelledby="thinking-heading" className="pb-14 sm:pb-20">
            <h2
              id="thinking-heading"
              className="mb-8 font-display text-3xl font-semibold sm:text-4xl"
            >
              {copy.thinking}
            </h2>
            <ol className="border-t border-border">
              {copy.principles.map((principle, index) => (
                <HomepageReveal
                  key={index}
                  as="li"
                  delay={index * 45}
                  className="grid grid-cols-1 items-start gap-y-4 border-b border-border py-9 md:grid-cols-[2rem_minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-x-8 md:py-12 lg:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-x-12"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-primary-text md:pt-1.5"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="min-w-0 text-balance font-display text-2xl font-semibold leading-snug">
                    {principle.title}
                  </h3>
                  <p className="min-w-0 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </HomepageReveal>
              ))}
            </ol>
          </section>
          <HomepageReveal
            as="section"
            ariaLabelledby="disciplines-heading"
            className="grid gap-8 pb-14 sm:pb-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-16"
          >
            <div>
              <h2
                id="disciplines-heading"
                className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl"
              >
                {copy.disciplinesHeading[0]}
                <br />
                {copy.disciplinesHeading[1]}
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                {copy.disciplinesIntro}
              </p>
            </div>
            <dl className="border-t border-border">
              {copy.disciplines.map((discipline, index) => (
                <div
                  key={index}
                  className="grid gap-3 border-b border-border py-7 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] sm:gap-6"
                >
                  <dt className="min-w-0 font-display text-xl font-semibold">{discipline.title}</dt>
                  <dd className="min-w-0 text-base leading-relaxed text-muted-foreground">
                    {discipline.description}
                  </dd>
                </div>
              ))}
            </dl>
          </HomepageReveal>
          <HomepageReveal
            as="section"
            ariaLabelledby="location-heading"
            className="grid gap-6 border-t border-border py-14 sm:py-20 md:grid-cols-2 md:gap-12"
          >
            <h2
              id="location-heading"
              className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl"
            >
              {copy.locationHeading[0]}
              <br />
              {copy.locationHeading[1]}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {copy.location}
            </p>
          </HomepageReveal>
        </div>
        <section
          aria-labelledby="project-heading"
          className="border-y border-border py-12 sm:py-16"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
            <h2
              id="project-heading"
              className="text-balance font-display text-3xl font-semibold sm:text-4xl"
            >
              {copy.cta}
            </h2>
            <Link
              to="/contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              {heroCopy[lang].project}
            </Link>
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  );
}
