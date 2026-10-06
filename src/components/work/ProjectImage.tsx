import { useLang } from "@/lib/i18n";
import type { PortfolioProject } from "@/lib/projects";
import { workCopy } from "@/lib/work-copy";

export function ProjectImage({
  project,
  view,
  loading = "lazy",
  interactive = false,
  reveal = false,
}: {
  project: PortfolioProject;
  view: PortfolioProject["views"][number];
  loading?: "eager" | "lazy";
  interactive?: boolean;
  reveal?: boolean;
}) {
  const { lang } = useLang();
  const copy = workCopy[lang];
  const label = copy.projects[project.slug].views[view.id];
  const fullSizeLabel = {
    en: "View full-size image",
    fr: "Voir l’image en taille réelle",
    es: "Ver imagen a tamaño completo",
  }[lang];
  return (
    <figure className="min-w-0">
      {view.image ? (
        <div className={reveal ? "project-image-reveal-frame" : undefined}>
          <img
            src={view.image.src}
            alt={view.image.alt[lang]}
            width={view.image.width}
            height={view.image.height}
            loading={loading}
            decoding="async"
            className={`h-auto w-full rounded-sm border border-border object-contain ${
              interactive
                ? "transition-transform duration-500 ease-out hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100"
                : ""
            }`}
          />
        </div>
      ) : (
        <div className="flex aspect-[8/5] max-h-80 min-h-40 items-center justify-center rounded-md border border-border bg-background px-5 py-8 text-center">
          <div className="max-w-xs">
            <p className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.name}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {copy.pendingImage}
            </p>
          </div>
        </div>
      )}
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 text-xs leading-relaxed text-muted-foreground">
        <span>{label}</span>
        {view.image && (
          <a
            href={view.image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${fullSizeLabel}: ${label}`}
            className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-foreground"
          >
            {fullSizeLabel}{" "}
            <span aria-hidden="true" className="ml-1">
              ↗
            </span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}
