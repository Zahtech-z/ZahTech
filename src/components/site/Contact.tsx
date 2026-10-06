import { Link } from "@tanstack/react-router";
import { heroCopy } from "@/lib/hero-copy";
import { homeCopy } from "@/lib/home-copy";
import { useLang } from "@/lib/i18n";

/** The homepage closes with the authoritative project-inquiry path. */
export function Contact() {
  const { lang } = useLang();
  const copy = homeCopy[lang];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-b border-border py-14 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-end gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="max-w-2xl">
          <h2
            id="contact-heading"
            className="text-balance font-display text-3xl font-semibold sm:text-4xl"
          >
            {copy.contactHeading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.contactIntro}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            {copy.contactEmail}{" "}
            <a
              href="mailto:contact@zahtech.net"
              className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-foreground"
            >
              contact@zahtech.net
            </a>
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover motion-reduce:transition-none"
        >
          {heroCopy[lang].project}
        </Link>
      </div>
    </section>
  );
}
