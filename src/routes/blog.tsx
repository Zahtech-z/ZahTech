import { createFileRoute } from "@tanstack/react-router";

import { useLang } from "@/lib/i18n";
import { blogCopy } from "@/lib/blog-copy";
import { heroCopy } from "@/lib/hero-copy";
import { BrandReveal } from "@/components/site/BrandReveal";
import { SitePage, PageIntro, PageCta } from "@/components/site/SitePage";

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
    <SitePage page="blog">
      <div className="site-page__container">
        <PageIntro eyebrow={copy.eyebrow} title={copy.heading} introduction={copy.introduction} />
        <section aria-labelledby="publication-heading" className="site-section site-split">
          <h2 id="publication-heading">{copy.statusHeading}</h2>
          <div className="site-prose">
            <p>{copy.statusBody}</p>
            <p>{copy.statusNote}</p>
          </div>
        </section>
        <section aria-labelledby="topics-heading" className="site-section">
          <h2 id="topics-heading" className="site-section__heading">
            {copy.topicsHeading}
          </h2>
          <ol className="site-page__list">
            {copy.topics.map((topic, index) => (
              <BrandReveal key={topic.title} as="li" className="site-page__row" selector="h3, p">
                <span className="site-page__number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </BrandReveal>
            ))}
          </ol>
        </section>
      </div>
      <PageCta heading={copy.cta} label={heroCopy[lang].project} />
    </SitePage>
  );
}
