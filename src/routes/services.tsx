import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { HomeFooter } from "@/components/site/HomeFooter";
import { SkipLink } from "@/components/site/SkipLink";
import { BrandReveal } from "@/components/site/BrandReveal";
import { ArrowUpRight } from "lucide-react";
import "@/components/site/brand-motion.css";
import "@/components/site/home-accessibility.css";
import "@/components/site/services-page.css";
import { homeHeroCopy } from "@/lib/hero-copy";
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
      <Nav floating />
      <main id="main-content" tabIndex={-1} className="services-page">
        <div className="services-page__container">
          <BrandReveal as="header" className="services-page__header" selector="p, h1">
            <p className="services-page__eyebrow">
              <span aria-hidden="true" />
              {copy.eyebrow}
            </p>
            <h1>{copy.heading}</h1>
            <p className="services-page__intro">{copy.introduction}</p>
          </BrandReveal>
          <section aria-labelledby="capabilities-heading">
            <h2 id="capabilities-heading" className="sr-only">
              {copy.overview}
            </h2>
            <ol className="services-page__list">
              {serviceIds.map((id, index) => (
                <BrandReveal
                  key={id}
                  as="li"
                  id={`service-${id}`}
                  className="services-page__item"
                  selector=".services-page__number, h3, p"
                >
                  <span className="services-page__number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{copy.services[id].title}</h3>
                  <p>{copy.services[id].description}</p>
                </BrandReveal>
              ))}
            </ol>
          </section>
          <BrandReveal
            as="section"
            ariaLabelledby="services-project-heading"
            className="services-page__contact"
            selector="div, a"
          >
            <div>
              <h2 id="services-project-heading">{copy.ctaHeading}</h2>
              <p>{copy.ctaDescription}</p>
            </div>
            <Link to="/contact" className="services-page__cta">
              {homeHeroCopy[lang].project}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </BrandReveal>
        </div>
      </main>
      <HomeFooter dark />
    </>
  );
}
