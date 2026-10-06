import { useLang } from "@/lib/i18n";
import { homeCopy } from "@/lib/home-copy";

export function Process() {
  const { t, lang } = useLang();
  const copy = homeCopy[lang];
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-b border-border py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {copy.process}
        </p>
        <h2
          id="process-heading"
          className="max-w-2xl text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl"
        >
          {copy.processTitle}
        </h2>
        <ol className="process-progression mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {t.process.steps.map((step, i) => (
            <li
              key={i}
              className={`process-progression-step process-progression-step-${i + 1} border-t border-border pt-5`}
            >
              <span className="font-mono text-xs text-primary-text">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
