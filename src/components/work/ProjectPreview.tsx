import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { PortfolioProject } from "@/lib/projects";
import { workCopy } from "@/lib/work-copy";
import { ProjectImage } from "./ProjectImage";
import { BrandReveal } from "@/components/site/BrandReveal";

export function ProjectPreview({
  project,
  headingLevel = 2,
  imageReveal = false,
}: {
  project: PortfolioProject;
  headingLevel?: 2 | 3;
  imageReveal?: boolean;
}) {
  const { lang } = useLang();
  const copy = workCopy[lang];
  const presentation = copy.projects[project.slug];
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const firstView = project.views[0];
  return (
    <article className="work-project" aria-labelledby={`work-project-${project.slug}`}>
      <div className="work-project__label">
        <p>
          <span aria-hidden="true" />
          {copy.ownership}
        </p>
        {project.status && <p>{presentation.status}</p>}
      </div>
      {firstView && (
        <BrandReveal className="work-project__visual">
          <ProjectImage
            project={project}
            view={firstView}
            loading="eager"
            interactive
            reveal={imageReveal}
          />
        </BrandReveal>
      )}
      <BrandReveal
        className="work-project__details"
        selector=".work-project__identity, .work-project__summary"
      >
        <div className="work-project__identity">
          <Heading id={`work-project-${project.slug}`}>{project.name}</Heading>
          {project.category && <p>{presentation.category}</p>}
          <ul aria-label={copy.engineering}>
            {project.featuredTechnologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
        <div className="work-project__summary">
          <p>{presentation.shortDescription}</p>
          <Link to={`/work/${project.slug}`} className="work-project__link">
            {copy.caseStudy}
            <span className="sr-only"> — {project.name}</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </BrandReveal>
    </article>
  );
}
