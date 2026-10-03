import { useLang } from "@/lib/i18n";
import { workCopy } from "@/lib/work-copy";
import { matchWise } from "@/lib/projects";
import { ProjectPreview } from "@/components/work/ProjectPreview";

export function SelectedWork() {
  const { lang } = useLang();
  return (
    <section
      id="selected-work"
      aria-labelledby="work-heading"
      className="border-b border-border bg-surface py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2
          id="work-heading"
          className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl"
        >
          {workCopy[lang].title}
        </h2>
        <div className="mt-7 sm:mt-8">
          <ProjectPreview project={matchWise} headingLevel={3} />
        </div>
      </div>
    </section>
  );
}
