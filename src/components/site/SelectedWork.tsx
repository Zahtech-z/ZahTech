import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { workCopy } from "@/lib/work-copy";
import { homeHeroCopy } from "@/lib/hero-copy";
import { onzScore } from "@/lib/projects";
import { ProjectImage } from "@/components/work/ProjectImage";
import "./selected-work.css";

export function SelectedWork() {
  const { lang } = useLang();
  const copy = workCopy[lang];
  const presentation = copy.projects[onzScore.slug];
  const firstView = onzScore.views[0];

  return (
    <section id="selected-work" aria-labelledby="work-heading" className="selected-work">
      <div className="selected-work__container">
        <header className="selected-work__header">
          <div>
            <h2 id="work-heading">{copy.title}</h2>
            <p className="selected-work__intro">{copy.intro}</p>
          </div>
          <Link to="/work" className="selected-work__all">
            {homeHeroCopy[lang].work}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </header>

        <article className="selected-work__project" aria-labelledby="selected-project-heading">
          {firstView && (
            <div className="selected-work__image">
              <ProjectImage project={onzScore} view={firstView} interactive />
            </div>
          )}
          <div className="selected-work__details">
            <div className="selected-work__identity">
              <p className="selected-work__ownership">{copy.ownership}</p>
              <h3 id="selected-project-heading">{onzScore.name}</h3>
              <p className="selected-work__category">{presentation.category}</p>
              <p className="selected-work__status">
                <span aria-hidden="true" />
                {presentation.status}
              </p>
            </div>
            <div className="selected-work__summary">
              <p>{presentation.shortDescription}</p>
              <ul className="selected-work__technologies">
                {onzScore.featuredTechnologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
            <Link to="/work/onzscore" className="selected-work__case-study">
              {copy.caseStudy}
              <span className="sr-only"> — {onzScore.name}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
          <p className="selected-work__note">{presentation.galleryNote}</p>
        </article>
      </div>
    </section>
  );
}
