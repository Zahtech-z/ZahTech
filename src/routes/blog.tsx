import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { HomeFooter } from "@/components/site/HomeFooter";
import { SkipLink } from "@/components/site/SkipLink";
import { useLang } from "@/lib/i18n";
import { blogCopy } from "@/lib/blog-copy";
import { heroCopy } from "@/lib/hero-copy";
import { HomepageReveal } from "@/components/site/HomepageReveal";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: blogCopy.en.seoTitle },
      { name: "description", content: blogCopy.en.seoDescription },
      { property: "og:title", content: blogCopy.en.seoTitle },
      { property: "og:description", content: blogCopy.en.seoDescription },
      { property: "og:url", content: "https://zahtech.org/blog" },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/blog" }],
  }),
});

function BlogPage() {
  const { lang } = useLang();
  const copy = blogCopy[lang];
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
              {copy.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy.introduction}
            </p>
          </HomepageReveal>
          <HomepageReveal>
            <section
              aria-labelledby="publication-heading"
              className="grid gap-6 border-t border-border py-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-12 sm:py-16"
            >
              <h2
                id="publication-heading"
                className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl"
              >
                {copy.statusHeading}
              </h2>
              <div className="max-w-[60ch]">
                <p className="text-base leading-relaxed text-muted-foreground">{copy.statusBody}</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {copy.statusNote}
                </p>
              </div>
            </section>
            <section aria-labelledby="topics-heading" className="pb-14 sm:pb-20">
              <h2
                id="topics-heading"
                className="mb-8 font-display text-3xl font-semibold sm:text-4xl"
              >
                {copy.topicsHeading}
              </h2>
              <ol className="border-t border-border">
                {copy.topics.map((topic, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-1 items-start gap-y-4 border-b border-border py-9 md:grid-cols-[2rem_minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-x-8 md:py-12 lg:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-x-12"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs text-primary-text md:pt-1.5"
                    >
                      0{index + 1}
                    </span>
                    <h3 className="min-w-0 text-balance font-display text-2xl font-semibold leading-snug">
                      {topic.title}
                    </h3>
                    <p className="min-w-0 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                      {topic.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
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
