import { Link } from "@tanstack/react-router";
import { motion, stagger, useAnimate, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { homeHeroCopy } from "@/lib/hero-copy";
import "./home-first-screen.css";

export function Hero() {
  const { lang } = useLang();
  const copy = homeHeroCopy[lang];
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // SSR stays visible, including when JavaScript is unavailable.
    const reveal = animate(
      "[data-hero-reveal]",
      reducedMotion ? { opacity: 1, y: 0 } : { opacity: [0, 1], y: [40, 0] },
      {
        duration: reducedMotion ? 0 : 0.8,
        delay: reducedMotion ? 0 : stagger(0.085),
        ease: [0.22, 1, 0.36, 1],
      },
    );
    return () => reveal.stop();
  }, [animate, reducedMotion]);

  return (
    <section
      ref={scope}
      id="main-content"
      tabIndex={-1}
      aria-labelledby="hero-heading"
      className="home-hero"
    >
      <div className="home-hero__light" aria-hidden="true" />
      <div className="home-hero__content">
        <p className="home-hero__eyebrow" data-hero-reveal>
          <span aria-hidden="true" />
          {copy.eyebrow}
        </p>
        <h1 id="hero-heading" className="home-hero__heading">
          <span className="home-hero__line">
            <span data-hero-reveal>{copy.heading1}</span>
          </span>{" "}
          <span className="home-hero__line">
            <span data-hero-reveal>
              {copy.heading2} <em>{copy.headingAccent}</em>
            </span>
          </span>
        </h1>
        <p className="home-hero__description" data-hero-reveal>
          {copy.description}
        </p>
        <div className="home-hero__actions" data-hero-reveal>
          <motion.div
            whileHover={reducedMotion ? undefined : { y: -2 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          >
            <Link to="/contact" className="home-hero__primary">
              {copy.project}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={reducedMotion ? undefined : { y: -2 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          >
            <Link to="/work" className="home-hero__secondary">
              {copy.work}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="home-hero__footnote">
        <p>{copy.location}</p>
        <a href="#selected-work" className="home-hero__discover">
          {copy.discover}
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
