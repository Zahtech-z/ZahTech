import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#services" className="transition-colors hover:text-foreground">Services</a>
          <a href="#stack" className="transition-colors hover:text-foreground">Stack</a>
          <a href="#experience" className="transition-colors hover:text-foreground">Experience</a>
          <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
        <a href="#contact" className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90">
          Get started
        </a>
      </div>
    </header>
  );
}
