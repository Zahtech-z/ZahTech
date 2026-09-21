import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n";

type FooterLink =
  | { label: string; to: "/" | "/work" | "/about" | "/blog"; hash?: string }
  | { label: string; href: string; external?: boolean };

export function Footer() {
  const { lang, t } = useLang();
  const founderText = {
    en: "Founded and led by Anicet Hermann Zie, CEO of ZahTech.",
    fr: "Fondée et dirigée par Anicet Hermann Zie, PDG de ZahTech.",
    es: "Fundada y dirigida por Anicet Hermann Zie, CEO de ZahTech.",
  }[lang];

  const cols: { title: string; links: FooterLink[] }[] = [
    {
      title: t.footer.services,
      links: t.services.items.slice(0, 4).map((s) => ({ label: s.title, to: "/" as const, hash: "services" })),
    },
    {
      title: t.footer.company,
      links: [
        { label: t.footer.about, to: "/about" },
        { label: t.nav.work, to: "/work" },
        { label: t.footer.blog, to: "/blog" },
        { label: t.nav.process, to: "/", hash: "process" },
        { label: t.nav.contact, to: "/", hash: "contact" },
      ],
    },
    {
      title: t.footer.connect,
      links: [
        { label: "contact@zahtech.net", href: "mailto:contact@zahtech.net" },
        { label: "GitHub", href: "https://github.com/Zahtech-z", external: true },
        { label: "LinkedIn", href: "https://linkedin.com/in/anicetzt", external: true },
        { label: "X / Twitter", href: "https://x.com/ZahTech_z", external: true },
      ],
    },
  ];

  const linkCls = "text-muted-foreground transition-colors hover:text-foreground";

  return (
    <footer className="py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t.footer.tagline}</p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
            <a
              href="https://linkedin.com/in/anicetzt"
              target="_blank"
              rel="me noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {founderText}
            </a>
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
              {c.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {c.links.map((l, i) => (
                <li key={`${l.label}-${i}`}>
                  {"to" in l ? (
                    <Link to={l.to} hash={l.hash} className={linkCls}>
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={linkCls}
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-border px-6 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>{t.footer.copyright}</span>
        <span>{t.footer.established}</span>
      </div>
    </footer>
  );
}
