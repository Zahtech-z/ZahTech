import { createFileRoute, Link } from "@tanstack/react-router";

import { useLang } from "@/lib/i18n";
import { privacyCopy } from "@/lib/privacy-copy";
import { SitePage, PageIntro } from "@/components/site/SitePage";

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
    <SitePage page="privacy">
      <article className="site-legal">
        <PageIntro
          eyebrow={copy.eyebrow}
          title={copy.title}
          meta={copy.effective}
          introduction={copy.introduction}
        />
        {copy.sections.map((section) => (
          <section key={section.title} className="site-legal__section site-prose">
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>
                {paragraph.includes("contact@zahtech.net") ? (
                  <>
                    {paragraph.split("contact@zahtech.net")[0]}
                    <a href="mailto:contact@zahtech.net">contact@zahtech.net</a>
                    {paragraph.split("contact@zahtech.net")[1]}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <p className="site-legal__contact site-prose">
          <Link to="/contact">
            {lang === "en"
              ? "Start a project"
              : lang === "fr"
                ? "Démarrer un projet"
                : "Iniciar un proyecto"}
          </Link>
        </p>
      </article>
    </SitePage>
  );
}
