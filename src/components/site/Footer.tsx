import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Engineering excellence for businesses that ship.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm md:grid-cols-3">
          <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Services</a>
          <a href="#stack" className="text-muted-foreground transition-colors hover:text-foreground">Stack</a>
          <a href="#experience" className="text-muted-foreground transition-colors hover:text-foreground">Experience</a>
          <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Privacy</a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Terms</a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-border px-6 pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} ZahTech. All rights reserved.
      </div>
    </footer>
  );
}
