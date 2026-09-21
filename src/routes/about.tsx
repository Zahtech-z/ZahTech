import { createFileRoute } from "@tanstack/react-router";
import { Gauge, ShieldCheck, Eye, TrendingUp, User } from "lucide-react";
import { PageShell, Eyebrow, PageCta } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About ZahTech | Meet the Team" },
      {
        name: "description",
        content:
          "Meet the team behind ZahTech LLC, a Maryland-based tech consulting company founded in 2026 by DevOps engineer Anicet Hermann Zie.",
      },
      { property: "og:title", content: "About ZahTech | Meet the Team" },
      { property: "og:url", content: "https://zahtech.org/about" },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/about" }],
  }),
});

const values = [
  {
    icon: Gauge,
    title: "Speed",
    desc: "We ship in weeks, not months. AI-assisted workflows and battle-tested pipelines keep momentum high.",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    desc: "Production-grade code, automated tests and infrastructure as code. Built to last, not just to demo.",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "Weekly demos, clear scope and fixed quotes. You always know where your project stands.",
  },
  {
    icon: TrendingUp,
    title: "Impact",
    desc: "We measure success by your outcomes: revenue, efficiency and users, not lines of code.",
  },
];

function AboutPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>About</Eyebrow>
          <h1 className="text-balance font-display text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            Meet the team behind{" "}
            <span className="bg-gradient-to-r from-primary to-[#22d3ee] bg-clip-text text-transparent">
              ZahTech
            </span>
          </h1>
        </div>
      </section>

      {/* CEO */}
      <section className="border-t border-border py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-[320px_1fr]">
          <Reveal>
            {/* Replace this placeholder with <img src="/anicet.jpg" alt="Anicet Hermann Zie" /> once a photo is available */}
            <div
              role="img"
              aria-label="Photo of Anicet Hermann Zie coming soon"
              className="flex aspect-square w-full max-w-[320px] items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-[#1a1030] to-[#0a0a0e] shadow-[0_0_60px_-15px_oklch(0.74_0.14_280/0.6)]"
            >
              <User className="h-24 w-24 text-primary/50" strokeWidth={1} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-bold">Anicet Hermann Zie</h2>
            <p className="mt-2 text-sm font-medium text-[#22d3ee]">Founder &amp; CEO</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              DevOps engineer and builder based in Germantown, MD. I founded ZahTech to help
              businesses build and ship great tech, fast.
            </p>
            <div className="mt-6 flex gap-5 text-sm">
              <a
                href="https://linkedin.com/in/anicetzt"
                target="_blank"
                rel="me noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Zahtech-z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-border py-20">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <Eyebrow>Our story</Eyebrow>
          <p className="text-balance font-display text-2xl leading-snug md:text-3xl">
            ZahTech was founded in 2026 with one mission: make great tech accessible to every
            business, regardless of size.
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="mb-12 text-center font-display text-4xl font-bold">What we stand for</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal
                key={title}
                delay={i * 0.08}
                className="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-elevated"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-elevated text-primary transition-colors group-hover:border-primary/50">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageCta title="Want to work with us?" label="Get a quote →" />
    </PageShell>
  );
}
