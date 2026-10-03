import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { PortfolioProject } from "@/lib/projects";
import { workCopy } from "@/lib/work-copy";
import { ProjectImage } from "./ProjectImage";

export function ProjectPreview({
  project,
  headingLevel = 2,
}: {
  project: PortfolioProject;
  headingLevel?: 2 | 3;
}) {
  const { lang } = useLang();
  const copy = workCopy[lang];
  const presentation = copy.projects[project.slug];
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const firstView = project.views[0];
  return (
    <article className="grid items-start gap-6 border-t border-border pt-6 sm:pt-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      <div className="min-w-0 lg:pt-1">
        <p className="mb-3 flex items-center gap-2 text-xs text-secondary-foreground">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-primary" />
          {copy.ownership}
        </p>
        <Heading className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.name}
        </Heading>
        {project.category && <p className="mt-3 text-sm font-medium">{presentation.category}</p>}
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          {presentation.shortDescription}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-secondary-foreground">
          {project.featuredTechnologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <Link
          to={`/work/${project.slug}`}
          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          {copy.caseStudy}
          <span className="sr-only"> — {project.name}</span>
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
        </Link>
      </div>
      {firstView && <ProjectImage project={project} view={firstView} />}
    </article>
  );
}
