import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

const menus = ["Services", "Process", "Stack", "Work", "Contact"];

export function Nav() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-foreground/80 md:flex">
          {menus.map((m) => (
            <a
              key={m}
              href={`#${m.toLowerCase()}`}
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              {m}
              <ChevronDown className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden text-sm text-foreground/80 transition-colors hover:text-foreground sm:inline"
          >
            Log in
          </a>
          <a
            href="#contact"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
