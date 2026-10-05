import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectImage } from "@/components/work/ProjectImage";
import { WorkCta } from "@/components/work/WorkCta";
import { useLang } from "@/lib/i18n";
import { matchWise } from "@/lib/projects";
import { workCopy } from "@/lib/work-copy";
import { HomepageReveal } from "@/components/site/HomepageReveal";

const seoTitle = `${matchWise.name} — ${workCopy.en.caseStudySeo} | ZahTech`;
const seoDescription = workCopy.en.projects[matchWise.slug].seoDescription;

export const Route = createFileRoute("/work/matchwise")({
  component: MatchWisePage,
  head: () => ({
    meta: [
      { title: seoTitle },
      { name: "description", content: seoDescription },
      { property: "og:title", content: seoTitle },
      { property: "og:description", content: seoDescription },
      { property: "og:url", content: "https://zahtech.org/work/matchwise" },
      { name: "twitter:title", content: seoTitle },
      { name: "twitter:description", content: seoDescription },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/work/matchwise" }],
  }),
});

const headingClass = "font-display text-2xl font-semibold tracking-tight sm:text-3xl";
const sectionClass = "border-t border-border py-10 sm:py-14";

function MatchWisePage() {
  const { lang } = useLang();
  const copy = workCopy[lang];
  const project = copy.projects[matchWise.slug];
  const landingView = matchWise.views.find((view) => view.id === "landing");
  const applicationViews = matchWise.views.filter((view) => view.id !== "landing");
  return (
    <>
      <article className="mx-auto max-w-7xl px-4 sm:px-6">
        <HomepageReveal as="header" className="pb-10 sm:pb-14" entrance>
          <Link
            to="/work"
            className="mb-6 inline-flex min-h-11 items-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            <span aria-hidden="true" className="mr-2">
              ←
            </span>
            {copy.back}
          </Link>
          <p className="mb-4 text-xs font-medium text-secondary-foreground">{copy.ownership}</p>
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            {matchWise.name}
          </h1>
          <p className="mt-5 text-xl leading-snug sm:text-2xl">{project.category}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.shortDescription}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-secondary-foreground">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-primary" />
            {project.status}
          </p>
          {landingView && (
            <div className="mt-8 sm:mt-10">
              <ProjectImage project={matchWise} view={landingView} loading="eager" interactive />
            </div>
          )}
        </HomepageReveal>
        <HomepageReveal
          as="section"
          className={`${sectionClass} grid gap-8 lg:grid-cols-2 lg:gap-16`}
        >
          <section aria-labelledby="product-heading">
            <h2 id="product-heading" className={headingClass}>
              {copy.product}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>
          </section>
          <section aria-labelledby="role-heading">
            <h2 id="role-heading" className={headingClass}>
              {copy.role}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {project.role}
            </p>
          </section>
        </HomepageReveal>
        <HomepageReveal
          as="section"
          ariaLabelledby="capabilities-heading"
          className={`${sectionClass} grid gap-7 lg:grid-cols-[1fr_1.6fr] lg:gap-16`}
        >
          <h2 id="capabilities-heading" className={headingClass}>
            {copy.capabilities}
          </h2>
          <dl className="divide-y divide-border border-t border-border">
            {matchWise.capabilities.map((id) => (
              <div key={id} className="grid gap-2 py-4 sm:grid-cols-2 sm:gap-5">
                <dt className="text-sm font-semibold">{project.capabilities[id].title}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {project.capabilities[id].description}
                </dd>
              </div>
            ))}
          </dl>
        </HomepageReveal>
        <HomepageReveal
          as="section"
          ariaLabelledby="engineering-heading"
          className={`${sectionClass} grid gap-7 lg:grid-cols-[1fr_1.6fr] lg:gap-16`}
        >
          <div>
            <h2 id="engineering-heading" className={headingClass}>
              {copy.engineering}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {copy.engineeringIntro}
            </p>
          </div>
          <dl className="divide-y divide-border border-t border-border">
            {matchWise.engineering.map((layer) => (
              <div key={layer.id} className="grid gap-2 py-4 sm:grid-cols-[1fr_2fr] sm:gap-5">
                <dt className="text-sm font-semibold">{copy.layers[layer.id]}</dt>
                <dd className="text-sm leading-relaxed text-secondary-foreground">
                  {layer.items.join(" / ")}
                </dd>
              </div>
            ))}
          </dl>
        </HomepageReveal>
        <HomepageReveal as="section" ariaLabelledby="gallery-heading" className={sectionClass}>
          <h2 id="gallery-heading" className={headingClass}>
            {copy.gallery}
          </h2>
          <div className="mt-7 grid gap-x-8 gap-y-7 lg:grid-cols-2">
            {applicationViews.map((view) => (
              <div
                key={view.id}
                className={view.id === "matches" ? "min-w-0 lg:col-span-2" : "min-w-0"}
              >
                <ProjectImage project={matchWise} view={view} interactive />
              </div>
            ))}
          </div>
        </HomepageReveal>
        <HomepageReveal
          as="section"
          ariaLabelledby="stage-heading"
          className={`${sectionClass} grid gap-5 lg:grid-cols-[1fr_1.6fr] lg:gap-16`}
        >
          <h2 id="stage-heading" className={headingClass}>
            {copy.stage}
          </h2>
          <div>
            <h3 className="text-base font-semibold">{project.status}</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {project.stageDescription}
            </p>
          </div>
        </HomepageReveal>
      </article>
      <WorkCta />
    </>
  );
}
