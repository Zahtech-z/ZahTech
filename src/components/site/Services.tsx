import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BrandReveal } from "./BrandReveal";
import { useLang } from "@/lib/i18n";
import { homeCopy } from "@/lib/home-copy";
import { homeHeroCopy } from "@/lib/hero-copy";
import "./home-services.css";

const serviceOrder = [0, 1, 3, 4, 2, 5] as const;

export function Services() {
  const { t, lang } = useLang();
  const copy = homeCopy[lang];
  return (
    <section id="services" aria-labelledby="services-heading" className="home-services">
      <div className="home-services__container">
        <header className="home-services__intro">
          <p className="home-services__eyebrow">
            <span aria-hidden="true" />
            {copy.capabilities}
          </p>
          <h2 id="services-heading">{copy.services}</h2>
          <p className="home-services__description">{copy.servicesIntro}</p>
          <div className="home-services__actions">
            <Link to="/contact" className="home-services__contact">
              {homeHeroCopy[lang].project}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/services" className="home-services__all">
              {copy.servicesLink}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </header>
        <ol className="home-services__list">
          {serviceOrder.map((serviceIndex, position) => (
            <BrandReveal as="li" className="home-services__item" key={serviceIndex}>
              <span className="home-services__number" aria-hidden="true">
                0{position + 1}
              </span>
              <h3>{t.services.items[serviceIndex].title}</h3>
              <p>{copy.serviceDescriptions[serviceIndex]}</p>
            </BrandReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
