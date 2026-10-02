import { useLang } from "@/lib/i18n";
import { homeCopy } from "@/lib/home-copy";

export function TechnicalProof() {
  const { lang } = useLang();
  const copy = homeCopy[lang];
  return (
    <section
      id="stack"
      aria-labelledby="engineering-heading"
      className="border-b border-border py-14 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {copy.engineering}
          </p>
          <h2
            id="engineering-heading"
            className="max-w-lg text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl"
          >
            {copy.engineeringTitle}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            {copy.engineeringIntro}
          </p>
        </div>
        <ol className="dark divide-y divide-border rounded-md border border-border bg-background px-5 py-2 text-foreground sm:px-8">
          {copy.layers.map((layer, i) => (
            <li
              key={layer}
              className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-2 py-5 sm:grid-cols-[1.5rem_1fr_1.2fr]"
            >
              <span className="pt-0.5 font-mono text-xs text-primary-text">0{i + 1}</span>
              <h3 className="text-sm font-medium">{layer}</h3>
              <p className="col-start-2 text-xs leading-relaxed text-muted-foreground sm:col-start-auto">
                {copy.layerDetails[i]}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
