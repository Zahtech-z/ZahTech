import { createFileRoute } from "@tanstack/react-router";
import { ProjectPreview } from "@/components/work/ProjectPreview";
import { WorkCta } from "@/components/work/WorkCta";
import { useLang } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { workCopy } from "@/lib/work-copy";
import { HomepageReveal } from "@/components/site/HomepageReveal";

export const Route = createFileRoute("/work/")({
  component: WorkIndex,
  head: () => ({
    meta: [
      { title: workCopy.en.seoTitle },
      { name: "description", content: workCopy.en.seoDescription },
      { property: "og:title", content: workCopy.en.seoTitle },
      { property: "og:description", content: workCopy.en.seoDescription },
      { property: "og:url", content: "https://zahtech.org/work" },
      { name: "twitter:title", content: workCopy.en.seoTitle },
      { name: "twitter:description", content: workCopy.en.seoDescription },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/work" }],
  }),
});

function WorkIndex() {
  const { lang } = useLang();
  const copy = workCopy[lang];
  return (
    <>
      <HomepageReveal as="header" className="mx-auto max-w-7xl px-4 pb-9 sm:px-6 sm:pb-12" entrance>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {copy.intro}
        </p>
      </HomepageReveal>
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-10 sm:px-6 sm:pb-14">
        {projects.map((project) => (
          <HomepageReveal key={project.slug}>
            <ProjectPreview project={project} />
          </HomepageReveal>
        ))}
      </div>
      <WorkCta />
    </>
  );
}
