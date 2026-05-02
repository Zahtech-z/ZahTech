import { Cpu, Database, Cloud, Code2, Box, Zap, Server, GitBranch, Layers, ChevronRight } from "lucide-react";

export function Hero() {
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
    <section className="relative min-h-screen overflow-hidden">
      {/* Resend-style ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute -bottom-32 left-1/4 h-64 w-[60%] rotate-[-3deg] bg-gradient-to-r from-transparent via-primary/15 to-transparent blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-40 pb-32 lg:grid-cols-2 lg:pt-48">
        {/* Left: copy */}
        <div className="animate-float-in">
          <a href="#services" className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-foreground/90 backdrop-blur">
            <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">Announcing ZahTech AI</span>
            <ChevronRight className="h-3 w-3 text-primary" />
          </a>
          <h1 className="text-balance font-display text-6xl font-medium leading-[0.95] tracking-tight text-foreground/95 md:text-7xl lg:text-[88px]">
            Tech for
            <br />
            <span className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">businesses</span>
          </h1>
          <p className="mt-8 max-w-md text-base text-muted-foreground md:text-lg">
            The best way to ship software, infrastructure, and AI. Build production-grade systems at scale.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <a href="#contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90">
              Get started
            </a>
            <a href="#services" className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
              Documentation
            </a>
          </div>
        </div>

        {/* Right: assembly cube */}
        <div className="relative h-[420px] w-full lg:h-[500px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-primary/40 bg-surface-elevated shadow-[0_0_80px_-10px_oklch(0.74_0.14_280/0.7)] animate-assemble"
              style={{ ["--tx" as never]: "0px", ["--ty" as never]: "0px" }}
            >
              <Cpu className="h-12 w-12 text-primary" strokeWidth={1.2} />
            </div>
          </div>
          {nodes.map(({ Icon, x, y, delay }, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-surface-elevated/80 backdrop-blur animate-assemble"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                ["--tx" as never]: `${x * 1.5}px`,
                ["--ty" as never]: `${y * 1.5}px`,
                animationDelay: `${delay}s`,
              }}
            >
              <Icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.4} />
            </div>
          ))}
          <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
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
