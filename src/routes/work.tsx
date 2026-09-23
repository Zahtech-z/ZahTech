import { createFileRoute } from "@tanstack/react-router";
import { Github, Hammer } from "lucide-react";
import { PageShell, Eyebrow, PageCta } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Our Work | ZahTech" },
      {
        name: "description",
        content:
          "Selected projects by ZahTech LLC: cloud-native SaaS platforms, microservices, and business apps built and deployed for real clients.",
      },
      { property: "og:title", content: "Our Work | ZahTech" },
      { property: "og:url", content: "https://zahtech.org/work" },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/work" }],
  }),
});

type Project = {
  title: string;
  client: string | null;
  status: "Live" | "In Progress";
  description: string | null;
  tags: string[];
  github: string | null;
};

const projects: Project[] = [
  {
    title: "BetAction: AI Sports Prediction SaaS",
    client: "Smart DMV",
    status: "Live",
    description:
      "Cloud-native SaaS platform built with 4 FastAPI microservices, Next.js frontend, PostgreSQL, Redis, and Nginx API Gateway. Deployed on AWS ECS Fargate with Terraform IaC and GitHub Actions CI/CD.",
    tags: ["Next.js", "AWS", "Terraform", "Docker", "FastAPI", "CI/CD"],
    github: "https://github.com/anicethermannzie/betaction",
  },
  {
    title: "SimuWork: Business Management App",
    client: null,
    status: "In Progress",
    description: null,
    tags: [],
    github: null,
  },
];

const badgeCls: Record<Project["status"], string> = {
  Live: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  "In Progress": "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

function WorkPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pt-40 pb-16">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>Portfolio</Eyebrow>
          <h1 className="font-display text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            Our Work
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal
              key={p.title}
              as="article"
              delay={i * 0.1}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-surface-elevated"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeCls[p.status]}`}
                >
                  {p.status}
                </span>
                {p.client && (
                  <span className="text-xs text-muted-foreground">
                    Client: <span className="text-foreground/80">{p.client}</span>
                  </span>
                )}
              </div>
              <h2 className="text-balance font-display text-2xl font-bold">{p.title}</h2>

              {p.description ? (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              ) : (
                <div className="mt-4 flex items-center gap-3 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                  <Hammer className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.6} />
                  Details coming soon.
                </div>
              )}

              {p.tags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground/70"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-[#22d3ee] transition-opacity hover:opacity-80"
                >
                  <Github className="h-4 w-4" />
                  github.com/anicethermannzie/betaction
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <PageCta title="Have a project in mind?" label="Let's build it →" />
    </PageShell>
  );
}
