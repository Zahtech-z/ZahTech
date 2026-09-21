import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, Globe, Menu, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (!langMenuRef.current?.contains(e.target as Node)) setLangOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLangOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [langOpen]);

  type NavItem = { key: string; label: string } & ({ hash: string } | { to: "/work" | "/about" });
  const navItems: NavItem[] = [
    { key: "services", label: t.nav.services, hash: "services" },
    { key: "process", label: t.nav.process, hash: "process" },
    { key: "stack", label: t.nav.stack, hash: "stack" },
    { key: "work", label: t.nav.work, to: "/work" },
    { key: "about", label: t.nav.about, to: "/about" },
    { key: "contact", label: t.nav.contact, hash: "contact" },
  ];
  const linkCls = "flex items-center gap-1 transition-colors hover:text-foreground";
  const renderItem = (m: NavItem, onClick?: () => void, chevron = true) => {
    const inner = (
      <>
        {m.label}
        {chevron && <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />}
      </>
    );
    return "to" in m ? (
      <Link key={m.key} to={m.to} onClick={onClick} className={linkCls} activeProps={{ className: "text-foreground" }}>
        {inner}
      </Link>
    ) : (
      <Link key={m.key} to="/" hash={m.hash} onClick={onClick} className={linkCls}>
        {inner}
      </Link>
    );
  };

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" aria-label="ZahTech">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-foreground/80 md:flex">
          {navItems.map((m) => renderItem(m))}
        </nav>
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-foreground/70 transition-colors hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{current.flag} {current.code.toUpperCase()}</span>
              <ChevronDown className="h-3 w-3 opacity-60" strokeWidth={2} />
            </button>
            {langOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-1.5 min-w-[130px] overflow-hidden rounded-lg border border-border bg-background shadow-lg"
              >
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    role="option"
                    aria-selected={lang === l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-surface-elevated ${
                      lang === l.code ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                    {lang === l.code && <Check className="ml-auto h-3 w-3 text-primary" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/"
            hash="contact"
            className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:inline-block"
          >
            {t.nav.cta}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" className="border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm text-foreground/80">
            {navItems.map((m) => renderItem(m, () => setMenuOpen(false), false))}
            <Link
              to="/"
              hash="contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-full bg-foreground px-4 py-2.5 text-center font-medium text-background"
            >
              {t.nav.cta}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
