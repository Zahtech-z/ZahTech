import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Eyebrow } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog | ZahTech" },
      {
        name: "description",
        content: "Engineering notes from ZahTech LLC on cloud, DevOps and shipping software fast.",
      },
      { property: "og:title", content: "Blog | ZahTech" },
      { property: "og:url", content: "https://zahtech.org/blog" },
    ],
    links: [{ rel: "canonical", href: "https://zahtech.org/blog" }],
  }),
});

const posts = [
  {
    title: "How we built BetAction on AWS ECS Fargate with Terraform",
    author: "Anicet Hermann Zie",
    date: "July 2026",
    tags: ["AWS", "Terraform", "DevOps"],
    excerpt:
      "A look at the architecture behind BetAction: four FastAPI microservices, an Nginx gateway, and a fully automated Terraform and GitHub Actions pipeline on ECS Fargate. Full article coming soon.",
  },
];

function BlogPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden pt-40 pb-16">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="font-display text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            Notes from the build
          </h1>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-3xl space-y-6 px-6">
          {posts.map((post) => (
            <Reveal
              key={post.title}
              as="article"
              className="rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:border-primary/50 hover:bg-surface-elevated"
            >
              <ul className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <h2 className="text-balance font-display text-2xl font-bold md:text-3xl">
                {post.title}
              </h2>
              <p className="mt-2 text-xs text-muted-foreground">
                {post.author} · <time dateTime="2026-07">{post.date}</time>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <span className="mt-5 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary">
                Coming soon
              </span>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
