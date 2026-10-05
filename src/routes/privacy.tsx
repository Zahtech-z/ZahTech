import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeFooter } from "@/components/site/HomeFooter";
import { Nav } from "@/components/site/Nav";
import { SkipLink } from "@/components/site/SkipLink";
import { useLang } from "@/lib/i18n";
import { privacyCopy } from "@/lib/privacy-copy";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: privacyCopy.en.seoTitle },
      { name: "description", content: privacyCopy.en.seoDescription },
      { property: "og:title", content: privacyCopy.en.seoTitle },
      { property: "og:description", content: privacyCopy.en.seoDescription },
      { property: "og:url", content: "https://zahtech.org/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/privacy" }],
  }),
});

function PrivacyPage() {
  const { lang } = useLang();
  const copy = privacyCopy[lang];
  return (
    <>
      <SkipLink />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="border-b border-border bg-background pb-14 pt-28 text-foreground sm:pb-20 sm:pt-36"
      >
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <header className="border-b border-border pb-10 sm:pb-14">
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-secondary-foreground">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-primary" />
              {copy.eyebrow}
            </p>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 text-sm text-secondary-foreground">{copy.effective}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {copy.introduction}
            </p>
          </header>
          <div className="divide-y divide-border">
            {copy.sections.map((section) => (
              <section key={section.title} className="py-9 sm:py-12">
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-base leading-relaxed text-muted-foreground"
                  >
                    {paragraph.includes("contact@zahtech.net") ? (
                      <>
                        {paragraph.split("contact@zahtech.net")[0]}
                        <a
                          href="mailto:contact@zahtech.net"
                          className="underline underline-offset-4 hover:text-foreground"
                        >
                          contact@zahtech.net
                        </a>
                        {paragraph.split("contact@zahtech.net")[1]}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground marker:text-primary-text">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <p className="pt-2 text-sm text-muted-foreground">
            <Link to="/contact" className="underline underline-offset-4 hover:text-foreground">
              {lang === "en"
                ? "Start a project"
                : lang === "fr"
                  ? "Démarrer un projet"
                  : "Iniciar un proyecto"}
            </Link>
          </p>
        </article>
      </main>
      <HomeFooter />
    </>
  );
}
