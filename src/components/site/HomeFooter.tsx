import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n";
import { homeCopy } from "@/lib/home-copy";

/** Homepage footer; inner-page footers remain unchanged. */
export function HomeFooter() {
  const { lang, t } = useLang();
  const linkClass =
    "inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4";
  return (
    <footer className="py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <Link to="/" aria-label="ZahTech" className="inline-flex min-h-11 items-center">
              <Logo size={28} />
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{homeCopy[lang].footerLine}</p>
          </div>
          <nav aria-label={t.footer.company} className="flex flex-wrap gap-x-6 gap-y-1">
            <Link to="/work" className={linkClass}>
              {t.nav.work}
            </Link>
            <Link to="/about" className={linkClass}>
              {t.nav.about}
            </Link>
            <Link to="/blog" className={linkClass}>
              {t.nav.blog}
            </Link>
            <Link to="/contact" className={linkClass}>
              {t.nav.contact}
            </Link>
          </nav>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center">
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap gap-x-5">
            <a
              href="https://github.com/Zahtech-z"
              className="inline-flex min-h-11 items-center hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/anicetzt"
              className="inline-flex min-h-11 items-center hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/ZahTech_z"
              className="inline-flex min-h-11 items-center hover:text-foreground"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
