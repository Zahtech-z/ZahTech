import { Logo } from "./Logo";

const cols = [
  { title: "Services", links: ["App Development", "Cloud & DevOps", "AI-Powered Build", "MVP Launch"] },
  { title: "Company", links: ["About", "Process", "Work", "Contact"] },
  { title: "Connect", links: ["contact@zahtech.net", "GitHub", "LinkedIn", "X / Twitter"] },
];

export function Footer() {
  return (
    <footer className="py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Tech for businesses. Built fast, shipped right.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">{c.title}</h4>
            <ul className="space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="text-muted-foreground transition-colors hover:text-foreground">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-border px-6 pt-6 text-xs text-muted-foreground">
        © 2026 ZahTech LLC · contact@zahtech.net
      </div>
    </footer>
  );
}
