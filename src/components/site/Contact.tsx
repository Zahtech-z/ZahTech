import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { homeHeroCopy } from "@/lib/hero-copy";
import { homeCopy } from "@/lib/home-copy";
import { useLang } from "@/lib/i18n";
import "./home-contact-footer.css";

/** The homepage closes with the existing project-inquiry path. */
export function Contact() {
  const { lang, t } = useLang();
  const copy = homeCopy[lang];
  return (
    <section id="contact" aria-labelledby="contact-heading" className="home-contact">
      <div className="home-contact__container">
        <p className="home-contact__eyebrow">
          <span aria-hidden="true" />
          {t.nav.contact}
        </p>
        <h2 id="contact-heading">{copy.contactHeading}</h2>
        <p className="home-contact__description">{copy.contactIntro}</p>
        <Link to="/contact" className="home-contact__project">
          {homeHeroCopy[lang].project}
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
        <p className="home-contact__email">
          <span>{copy.contactEmail}</span>
          <a href="mailto:contact@zahtech.net">contact@zahtech.net</a>
        </p>
      </div>
    </section>
  );
}
