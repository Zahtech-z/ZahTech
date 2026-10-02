import { useLang, type Lang } from "@/lib/i18n";
import { homeCopy } from "@/lib/home-copy";

type ProductProof = {
  name: string;
  description?: Record<Lang, string>;
  capabilities?: string[];
  screenshot?: { src: string; alt: Record<Lang, string> };
  projectUrl?: string;
};

// Ownership is supplied by the brief. Product specifics await confirmation;
// do not infer MatchWise's features, stack, launch status, or URL from its name.
const matchWise: ProductProof = { name: "MatchWise" };

export function SelectedWork() {
  const { lang } = useLang();
  const copy = homeCopy[lang];
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
          {copy.selected}
        </h2>
        <article className="mt-7 grid items-start gap-6 border-t border-border pt-6 sm:mt-8 sm:pt-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="min-w-0 lg:pt-1">
            <p className="mb-3 flex items-center gap-2 text-xs text-secondary-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-primary" />
              {copy.product}
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {matchWise.name}
            </h3>
            {matchWise.description && (
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                {matchWise.description[lang]}
              </p>
            )}
            {matchWise.capabilities && (
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-secondary-foreground">
                {matchWise.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            )}
            {matchWise.projectUrl && (
              <a
                href={matchWise.projectUrl}
                className="mt-5 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
              >
                {matchWise.name}
              </a>
            )}
          </div>
          <figure className="min-w-0">
            {matchWise.screenshot ? (
              <img
                src={matchWise.screenshot.src}
                alt={matchWise.screenshot.alt[lang]}
                loading="lazy"
                width={960}
                height={600}
                className="aspect-[8/5] w-full rounded-md border border-border object-contain"
              />
            ) : (
              <div className="relative flex aspect-[8/5] max-h-80 w-full items-center justify-center overflow-hidden rounded-md border border-border bg-background p-5 sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-4 border-x border-border sm:inset-6"
                />
                <div className="relative max-w-xs text-center">
                  <p className="font-sans text-2xl font-semibold tracking-tight sm:text-4xl">
                    {matchWise.name}
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    {copy.preview}
                  </p>
                </div>
              </div>
            )}
            {!matchWise.screenshot && (
              <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {copy.previewNote}
              </figcaption>
            )}
          </figure>
        </article>
      </div>
    </section>
  );
}
