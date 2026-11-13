import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useLang, type Lang } from "@/lib/i18n";
import { heroCopy } from "@/lib/hero-copy";
import "./home-first-screen.css";
import "./liquid-nav.css";

export function Nav({
  floating = false,
  liquidGlass = false,
}: {
  floating?: boolean;
  liquidGlass?: boolean;
}) {
  const { lang, setLang, t } = useLang();
  const copy = heroCopy[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const host = headerRef.current;
    if (!liquidGlass || !floating || !host) return;
    const preferences = [
      "(prefers-reduced-motion: reduce)",
      "(prefers-reduced-transparency: reduce)",
      "(prefers-contrast: more)",
    ].map((query) => matchMedia(query));
    let disposed = false;
    let timer = 0;
    let release: (() => void) | undefined;
    let generation = 0;
    const update = () => {
      const current = ++generation;
      clearTimeout(timer);
      release?.();
      release = undefined;
      host.dataset.glassState = "fallback";
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection;
      if (preferences.some((preference) => preference.matches) || connection?.saveData) return;
      timer = window.setTimeout(() => {
        void import("./liquid-nav")
          .then((module) => {
            if (!disposed && current === generation) release = module.mountLiquidNavigation(host);
          })
          .catch(() => {
            host.dataset.glassState = "fallback";
          });
      }, 1000);
    };
    update();
    preferences.forEach((preference) => preference.addEventListener("change", update));
    return () => {
      disposed = true;
      clearTimeout(timer);
      release?.();
      preferences.forEach((preference) => preference.removeEventListener("change", update));
    };
  }, [floating, liquidGlass]);

  useEffect(() => {
    if (!menuOpen) return;
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [menuOpen]);

  const items = [
    { label: t.nav.services, to: "/services" as const },
    { label: t.nav.work, to: "/work" as const },
    { label: t.nav.about, to: "/about" as const },
    { label: t.nav.blog, to: "/blog" as const },
  ];
  const links = items.map((item) => (
    <Link
      key={item.label}
      to={item.to}
      onClick={() => setMenuOpen(false)}
      className={
        floating
          ? "home-nav__link"
          : "flex min-h-11 items-center px-2 text-sm font-medium text-secondary-foreground underline-offset-8 hover:underline"
      }
      activeOptions={{ exact: true, includeHash: true }}
      activeProps={{ className: "underline" }}
    >
      {item.label}
    </Link>
  ));
  const cta = floating
    ? "home-nav__contact"
    : "min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover motion-reduce:transition-none";

  return (
    <header
      ref={headerRef}
      className={
        floating
          ? `home-nav${liquidGlass ? " home-nav--liquid" : ""}`
          : "fixed inset-x-0 top-0 z-50 border-b border-border bg-background text-foreground"
      }
      data-menu-open={menuOpen}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
      }}
    >
      <div
        className={
          floating
            ? "home-nav__bar"
            : "mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6"
        }
      >
        <Link
          to="/"
          aria-label="ZahTech"
          onClick={() => setMenuOpen(false)}
          className="flex min-h-11 shrink-0 items-center"
        >
          <Logo variant={floating ? "inverse" : "accent"} />
        </Link>
        <nav aria-label={copy.navigation} className="hidden items-center gap-4 lg:flex">
          {links}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <label className="relative">
            <span className="sr-only">{copy.language}</span>
            <select
              value={lang}
              onChange={(event) => setLang(event.target.value as Lang)}
              className={
                floating
                  ? "home-nav__language"
                  : "min-h-11 w-[76px] cursor-pointer rounded-md border border-border bg-background px-2 text-sm text-foreground"
              }
            >
              <option value="en" lang="en">
                EN
              </option>
              <option value="fr" lang="fr">
                FR
              </option>
              <option value="es" lang="es">
                ES
              </option>
            </select>
          </label>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={`hidden sm:inline-flex ${cta}`}
          >
            {floating ? t.nav.contact : copy.project}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className={
              floating
                ? "home-nav__menu-button lg:hidden"
                : "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border lg:hidden"
            }
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        aria-label={copy.navigation}
        hidden={!menuOpen}
        className={
          floating
            ? "home-nav__mobile lg:hidden"
            : "max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border px-4 py-4 sm:px-6 lg:hidden"
        }
      >
        <div className="flex flex-col gap-2">
          {links}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={`mt-2 inline-flex ${cta}`}
          >
            {floating ? t.nav.contact : copy.project}
          </Link>
        </div>
      </nav>
    </header>
  );
}
