import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();

  const cols = [
    {
      title: t.footer.services,
      links: t.services.items.slice(0, 4).map((s) => ({ label: s.title, href: "#services" })),
    },
    {
      title: t.footer.company,
      links: [
        { label: t.nav.process, href: "#process" },
        { label: t.nav.work, href: "#work" },
        { label: t.nav.contact, href: "#contact" },
      ],
    },
    {
      title: t.footer.connect,
      links: [
        { label: "contact@zahtech.org", href: "mailto:contact@zahtech.org" },
        { label: "GitHub", href: "https://github.com/Zahtech-z" },
        { label: "LinkedIn", href: "#" },
        { label: "X / Twitter", href: "https://x.com/ZahTech_z" },
      ],
    },
  ];

  return (
    <footer className="py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t.footer.tagline}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
              {c.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-border px-6 pt-6 text-xs text-muted-foreground">
        {t.footer.copyright}
      </div>
    </footer>
  );
}
