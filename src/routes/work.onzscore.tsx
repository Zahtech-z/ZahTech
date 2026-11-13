import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";
import { BrandReveal } from "@/components/site/BrandReveal";
import { OnzProductScene } from "@/components/work/OnzProductScene";
import { useLang } from "@/lib/i18n";
import { onzScore } from "@/lib/projects";
import { workCopy } from "@/lib/work-copy";
import { onzscoreCaseCopy, onzScreen } from "@/lib/onzscore-case-copy";
import "@/components/work/onzscore-case.css";

const description =
  "OnzScore is live. Explore the football product designed and built by ZahTech: mobile-first match analysis, a bilingual experience and the engineering behind it.";
export const Route = createFileRoute("/work/onzscore")({
  component: OnzScorePage,
  head: () => ({
    meta: [
      { title: "OnzScore — A live product, built by ZahTech" },
      { name: "description", content: description },
      { property: "og:title", content: "OnzScore — Product design & engineering | ZahTech" },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://zahtech.org/work/onzscore" },
      { name: "twitter:title", content: "OnzScore — Product design & engineering | ZahTech" },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/work/onzscore" }],
  }),
});

function ExternalLink({
  children,
  href = "https://onzscore.com/",
  className = "onz-button",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}

function OnzScorePage() {
  const { lang } = useLang();
  const copy = onzscoreCaseCopy[lang];
  const [active, setActive] = useState(0);
  const screen = copy.screens[active];
  return (
    <article className="onz-case">
      <div className="onz-container">
        <Link to="/work" className="onz-back">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          {workCopy[lang].back}
        </Link>
        <div className="onz-hero">
          <BrandReveal as="header" className="onz-hero__copy" selector="p, h1, .onz-hero__actions">
            <p className="onz-eyebrow">{copy.label}</p>
            <h1>
              <span className="onz-hero__name">OnzScore</span>
              <span>{copy.headline}</span>
            </h1>
            <p className="onz-lead">{copy.introduction}</p>
            <div className="onz-hero__actions">
              <ExternalLink>{copy.visit}</ExternalLink>
              <a href="#product-heading" className="onz-text-link">
                {copy.explore}
                <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </BrandReveal>
          <OnzProductScene />
        </div>
        <dl className="onz-facts">
          <div>
            <dt>{copy.role}</dt>
            <dd>{copy.roleValue}</dd>
          </div>
          <div>
            <dt>{copy.platform}</dt>
            <dd>{copy.platformValue}</dd>
          </div>
          <div>
            <dt>OnzScore</dt>
            <dd className="onz-live">
              <span aria-hidden="true" />
              {copy.status}
            </dd>
          </div>
        </dl>
        <BrandReveal
          as="section"
          className="onz-section onz-brief"
          ariaLabelledby="product-heading"
          selector=".onz-section__intro, .onz-brief__response"
        >
          <div className="onz-section__intro">
            <p className="onz-eyebrow">{copy.briefLabel}</p>
            <h2 id="product-heading">{copy.briefTitle}</h2>
            <p>{copy.briefBody}</p>
          </div>
          <div className="onz-brief__response">
            <span className="onz-cross" aria-hidden="true">
              +
            </span>
            <h3>{copy.responseTitle}</h3>
            <p>{copy.responseBody}</p>
          </div>
        </BrandReveal>
        <section className="onz-section onz-experience" aria-labelledby="experience-heading">
          <BrandReveal className="onz-section__intro" selector="p, h2">
            <p className="onz-eyebrow">{copy.experienceLabel}</p>
            <h2 id="experience-heading">{copy.experienceTitle}</h2>
            <p>{copy.experienceBody}</p>
          </BrandReveal>
          <div className="onz-explorer">
            <div className="onz-explorer__choices" role="group" aria-label={copy.experienceLabel}>
              {copy.screens.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="onz-explorer__choice"
                  aria-pressed={active === index}
                  aria-controls="onz-product-preview"
                  onClick={() => setActive(index)}
                >
                  <span className="onz-explorer__number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span>
                    <span className="onz-explorer__title">{item.title}</span>
                    <span className="onz-explorer__body">{item.body}</span>
                  </span>
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </button>
              ))}
            </div>
            <noscript>
              <ul className="onz-noscript">
                {copy.screens.map((item) => (
                  <li key={item.id}>
                    <a href={onzScreen(item.id, lang)}>{item.title} ↗</a>
                  </li>
                ))}
              </ul>
            </noscript>
            <figure id="onz-product-preview" className="onz-explorer__preview" aria-live="polite">
              <div className="onz-explorer__stage">
                <span className="onz-explorer__index" aria-hidden="true">
                  0{active + 1}
                </span>
                <a
                  key={`${lang}-${screen.id}`}
                  href={onzScreen(screen.id, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.enlarge}: ${screen.title}`}
                >
                  <img
                    src={onzScreen(screen.id, lang)}
                    width={390}
                    height={844}
                    alt={screen.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>
              <figcaption>
                <p className="onz-explorer__description">{screen.body}</p>
                <span>{copy.imageNote}</span>
                <a href={onzScreen(screen.id, lang)} target="_blank" rel="noopener noreferrer">
                  {copy.enlarge}
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
      <section className="onz-mobile" aria-labelledby="mobile-heading">
        <div className="onz-container onz-mobile__layout">
          <BrandReveal className="onz-section__intro" selector="p, h2, ul">
            <p className="onz-eyebrow">{copy.mobileLabel}</p>
            <h2 id="mobile-heading">{copy.mobileTitle}</h2>
            <p>{copy.mobileBody}</p>
            <ul>
              {copy.mobileDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </BrandReveal>
          <OnzProductScene mobile />
        </div>
      </section>
      <div className="onz-container">
        <section className="onz-section onz-engineering" aria-labelledby="engineering-heading">
          <BrandReveal className="onz-section__intro" selector="p, h2">
            <p className="onz-eyebrow">{copy.engineeringLabel}</p>
            <h2 id="engineering-heading">{copy.engineeringTitle}</h2>
            <p>{copy.engineeringBody}</p>
          </BrandReveal>
          <BrandReveal className="onz-system" selector=".onz-system__node">
            <ol className="onz-system__layers">
              {onzScore.engineering
                .filter((layer) => layer.id !== "gateway")
                .map((layer, index) => (
                  <li className="onz-system__node" key={layer.id}>
                    <span className="onz-system__index" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <h3>{copy.architecture[index]}</h3>
                    <ul>
                      {layer.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ol>
            <div className="onz-system__base">
              <span>Nginx / {workCopy[lang].layers.gateway}</span>
              <span>OnzScore × ZahTech</span>
            </div>
            <p className="onz-system__note">{copy.architectureNote}</p>
          </BrandReveal>
        </section>
        <BrandReveal
          as="section"
          className="onz-section onz-outcome"
          ariaLabelledby="outcome-heading"
          selector=".onz-section__intro, .onz-outcome__links"
        >
          <div className="onz-section__intro">
            <p className="onz-eyebrow">{copy.outcomeLabel}</p>
            <h2 id="outcome-heading">{copy.outcomeTitle}</h2>
            <p>{copy.outcomeBody}</p>
          </div>
          <div className="onz-outcome__links">
            <ExternalLink>{copy.visit}</ExternalLink>
            <ExternalLink href="https://onzscore.com/track-record" className="onz-text-link">
              {copy.record}
            </ExternalLink>
          </div>
        </BrandReveal>
        <section className="onz-cta" aria-labelledby="onz-cta-heading">
          <h2 id="onz-cta-heading">{copy.next}</h2>
          <Link to="/contact" className="onz-button">
            {copy.project}
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </article>
  );
}
