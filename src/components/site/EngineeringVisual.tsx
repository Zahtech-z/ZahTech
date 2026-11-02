import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { heroCopy } from "@/lib/hero-copy";
import { LogoMark } from "./Logo";
import "./zahtech-motion.css";

/** Brand motion: a luminous build engine surrounded by floating capabilities. */
export function EngineeringVisual() {
  const { lang } = useLang();
  const [paused, setPaused] = useState(false);
  const copy = heroCopy[lang];
  const labels =
    lang === "fr"
      ? ["Logiciel", "Intelligence IA", "Cloud"]
      : lang === "es"
        ? ["Software", "Inteligencia IA", "Cloud"]
        : ["Software", "AI intelligence", "Cloud"];
  const toggleLabel =
    lang === "fr"
      ? paused
        ? "Reprendre l’animation"
        : "Mettre l’animation en pause"
      : lang === "es"
        ? paused
          ? "Reanudar animación"
          : "Pausar animación"
        : paused
          ? "Resume animation"
          : "Pause animation";

  return (
    <figure className={`zah-motion${paused ? " zah-motion--paused" : ""}`}>
      <div className="zah-motion__scene" aria-hidden="true">
        <div className="zah-motion__horizon" />
        <span className="zah-motion__dust zah-motion__dust--one" />
        <span className="zah-motion__dust zah-motion__dust--two" />
        <span className="zah-motion__dust zah-motion__dust--three" />
        <span className="zah-motion__dust zah-motion__dust--four" />
        <div className="zah-motion__engine">
          <div className="zah-motion__aura" />
          <div className="zah-motion__ribbons">
            <span />
            <span />
            <span />
          </div>
          <div className="zah-motion__core" />
          <LogoMark size={48} variant="inverse" label="" className="zah-motion__mark" />
        </div>
        {labels.map((label, index) => (
          <div className={`zah-motion__satellite zah-motion__satellite--${index + 1}`} key={label}>
            <span className="zah-motion__sphere" />
            <span className="zah-motion__label">{label}</span>
          </div>
        ))}
        <span className="zah-motion__signature">
          ZahTech<span>®</span>
        </span>
      </div>
      <figcaption className="zah-motion__caption">
        <span>
          <span className="zah-motion__status" />
          {copy.progression}
        </span>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={toggleLabel}
          aria-pressed={paused}
          className="zah-motion__toggle"
        >
          {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        </button>
      </figcaption>
    </figure>
  );
}
