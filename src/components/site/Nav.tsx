import { useState } from "react";
import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Globe } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { key: "services", label: t.nav.services },
    { key: "process", label: t.nav.process },
    { key: "stack", label: t.nav.stack },
    { key: "work", label: t.nav.work },
    { key: "contact", label: t.nav.contact },
  ];

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-foreground/80 md:flex">
          {navItems.map((m) => (
            <a
              key={m.key}
              href={`#${m.key}`}
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              {m.label}
              <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-foreground/70 transition-colors hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{current.flag} {current.code.toUpperCase()}</span>
              <ChevronDown className="h-3 w-3 opacity-60" strokeWidth={2} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1.5 min-w-[130px] overflow-hidden rounded-lg border border-border bg-background shadow-lg">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-surface-elevated ${
                      lang === l.code ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                    {lang === l.code && <span className="ml-auto text-primary">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            href="#contact"
            className="hidden text-sm text-foreground/80 transition-colors hover:text-foreground sm:inline"
          >
            {t.nav.login}
          </a>
          <a
            href="#contact"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
