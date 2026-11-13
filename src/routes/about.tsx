import { createFileRoute } from "@tanstack/react-router";

import { useLang } from "@/lib/i18n";
import { aboutCopy } from "@/lib/about-copy";
import { heroCopy } from "@/lib/hero-copy";
import { BrandReveal } from "@/components/site/BrandReveal";
import { SitePage, PageIntro, PageCta } from "@/components/site/SitePage";

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
    <SitePage page="about">
      <div className="site-page__container">
        <PageIntro
          eyebrow={copy.eyebrow}
          title={
            <>
              {copy.heading.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </>
          }
          introduction={copy.introduction}
          note={copy.statement}
        />
        <BrandReveal
          as="section"
          ariaLabelledby="founder-heading"
          className="site-section site-split about-founder"
          selector="h2, p"
        >
          <div>
            <p className="site-page__eyebrow">{copy.founder.eyebrow}</p>
            <h2 id="founder-heading">{copy.founder.name}</h2>
            <p className="about-founder__role">{copy.founder.role}</p>
          </div>
          <div className="site-prose">
            <p>{copy.founder.description}</p>
          </div>
        </BrandReveal>
        <section aria-labelledby="thinking-heading" className="site-section">
          <h2 id="thinking-heading" className="site-section__heading">
            {copy.thinking}
          </h2>
          <ol className="site-page__list">
            {copy.principles.map((principle, index) => (
              <BrandReveal
                key={principle.title}
                as="li"
                className="site-page__row"
                selector="h3, p"
              >
                <span className="site-page__number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </BrandReveal>
            ))}
          </ol>
        </section>
        <section aria-labelledby="disciplines-heading" className="site-section site-split">
          <div className="site-prose">
            <h2 id="disciplines-heading">
              {copy.disciplinesHeading[0]}
              <br />
              {copy.disciplinesHeading[1]}
            </h2>
            <p>{copy.disciplinesIntro}</p>
          </div>
          <dl className="site-definitions">
            {copy.disciplines.map((discipline) => (
              <div key={discipline.title}>
                <dt>{discipline.title}</dt>
                <dd>{discipline.description}</dd>
              </div>
            ))}
          </dl>
        </section>
        <BrandReveal
          as="section"
          ariaLabelledby="location-heading"
          className="site-section site-split"
          selector="h2, p"
        >
          <h2 id="location-heading">
            {copy.locationHeading[0]}
            <br />
            {copy.locationHeading[1]}
          </h2>
          <div className="site-prose">
            <p>{copy.location}</p>
          </div>
        </BrandReveal>
      </div>
      <PageCta heading={copy.cta} label={heroCopy[lang].project} />
    </SitePage>
  );
}
