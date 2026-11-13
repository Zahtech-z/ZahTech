import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { heroCopy } from "@/lib/hero-copy";
import { workCopy } from "@/lib/work-copy";

export function WorkCta({ editorial = false }: { editorial?: boolean }) {
  const { lang } = useLang();
  return (
    <section className={editorial ? "work-cta" : "border-y border-border py-12 sm:py-16"}>
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
        <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">
          {workCopy[lang].cta}
        </h2>
        <Link
          to="/contact"
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          {heroCopy[lang].project}
        </Link>
      </div>
    </section>
  );
}
