import { Link } from "@tanstack/react-router";
import { SkipLink } from "./SkipLink";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/** Shared chrome for inner pages (About, Work, Blog). */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

/** Small uppercase label used above page/section headings. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 bg-gradient-to-r from-primary to-[#22d3ee] bg-clip-text text-xs font-semibold uppercase tracking-[0.2em] text-transparent">
      {children}
    </p>
  );
}

/** Purple/cyan gradient closing call-to-action shared by inner pages. */
export function PageCta({ title, label }: { title?: string; label: string }) {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        {title && (
          <h2 className="mb-8 text-balance font-display text-3xl font-bold md:text-4xl">{title}</h2>
        )}
        <Link
          to="/"
          hash="contact"
          className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
