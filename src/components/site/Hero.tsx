import { Cpu, Database, Cloud, Code2, Box, Zap, Server, GitBranch, Layers } from "lucide-react";

export function Hero() {
  // Assembly nodes with random start offsets
  const nodes = [
    { Icon: Code2, x: -180, y: -80, delay: 0 },
    { Icon: Database, x: 200, y: -120, delay: 0.08 },
    { Icon: Cloud, x: -240, y: 60, delay: 0.16 },
    { Icon: Server, x: 220, y: 80, delay: 0.24 },
    { Icon: GitBranch, x: -100, y: 140, delay: 0.32 },
    { Icon: Layers, x: 140, y: -180, delay: 0.4 },
    { Icon: Box, x: -260, y: -40, delay: 0.48 },
    { Icon: Zap, x: 280, y: 0, delay: 0.56 },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-radial-fade" />

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-muted-foreground animate-float-in">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-slow" />
            Engineering excellence, delivered.
          </div>
          <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Tech for <span className="italic text-primary">businesses</span>
            <br />that ship.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            ZahTech assembles modern software, infrastructure, and AI into products your customers love — and your team can maintain.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a href="#contact" className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Start a project
            </a>
            <a href="#services" className="rounded-md border border-border bg-surface-elevated px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Explore services
            </a>
          </div>
        </div>

        {/* Assembly animation */}
        <div className="relative mx-auto mt-20 h-[320px] w-full max-w-2xl">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-primary/40 bg-surface-elevated shadow-[0_0_60px_-10px_oklch(0.74_0.14_280/0.6)] animate-assemble"
              style={{ ["--tx" as never]: "0px", ["--ty" as never]: "0px" }}
            >
              <Cpu className="h-10 w-10 text-primary" strokeWidth={1.3} />
            </div>
          </div>
          {nodes.map(({ Icon, x, y, delay }, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-border bg-surface-elevated animate-assemble"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                ["--tx" as never]: `${x * 1.5}px`,
                ["--ty" as never]: `${y * 1.5}px`,
                animationDelay: `${delay}s`,
              }}
            >
              <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
          ))}
          {/* connecting lines via SVG */}
          <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
            {nodes.map((n, i) => (
              <line
                key={i}
                x1="50%" y1="50%"
                x2={`calc(50% + ${n.x}px)`} y2={`calc(50% + ${n.y}px)`}
                stroke="oklch(0.74 0.14 280)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
