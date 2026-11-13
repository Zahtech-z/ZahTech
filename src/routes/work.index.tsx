import { createFileRoute } from "@tanstack/react-router";
import { ProjectPreview } from "@/components/work/ProjectPreview";
import { WorkCta } from "@/components/work/WorkCta";
import { useLang } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { workCopy } from "@/lib/work-copy";
import { BrandReveal } from "@/components/site/BrandReveal";

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
      <BrandReveal as="header" className="work-page__header" selector="h1, p">
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </BrandReveal>
      <div className="work-page__projects">
        {projects.map((project) => (
          <ProjectPreview key={project.slug} project={project} />
        ))}
      </div>
      <BrandReveal selector="h2, a">
        <WorkCta editorial />
      </BrandReveal>
    </>
  );
}
