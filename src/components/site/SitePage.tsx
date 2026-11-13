import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "./Nav";
import { HomeFooter } from "./HomeFooter";
import { SkipLink } from "./SkipLink";
import { BrandReveal } from "./BrandReveal";
import "./brand-motion.css";
import "./home-accessibility.css";
import "./site-page.css";

export function SitePage({
  page,
  children,
}: {
  page: "about" | "blog" | "contact" | "privacy";
  children: ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <Nav floating />
      <main
        id="main-content"
        tabIndex={-1}
        className={`site-page site-page--${page}`}
        data-site-page={page}
      >
        {children}
      </main>
      <HomeFooter dark />
    </>
  );
}

export function PageIntro({
  eyebrow,
  title,
  introduction,
  note,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  introduction: string;
  note?: string;
  meta?: string;
}) {
  return (
    <BrandReveal as="header" className="site-page__header" selector="p, h1">
      <p className="site-page__eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {meta && <p className="site-page__meta">{meta}</p>}
      <p className="site-page__lead">{introduction}</p>
      {note && <p className="site-page__note">{note}</p>}
    </BrandReveal>
  );
}

export function PageCta({ heading, label }: { heading: string; label: string }) {
  return (
    <BrandReveal
      as="section"
      className="site-cta"
      ariaLabelledby="project-heading"
      selector="h2, a"
    >
      <div className="site-page__container">
        <h2 id="project-heading">{heading}</h2>
        <Link to="/contact" className="site-button">
          {label}
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </BrandReveal>
  );
}
