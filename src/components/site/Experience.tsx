export function Experience() {
  return (
    <section id="experience" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">Experience</p>
          <h2 className="text-balance text-4xl font-bold md:text-5xl">
            A first-class experience, end to end.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-80" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold md:text-3xl">Built for engineers</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
                Clean APIs, typed contracts, and infrastructure-as-code. We write the kind of software we'd want to inherit.
              </p>

              <div className="mt-8 rounded-lg border border-border bg-background/60 p-5 font-mono text-xs text-muted-foreground">
                <div><span className="text-primary">$</span> zah deploy --env=production</div>
                <div className="mt-2 text-foreground/80">✓ Build complete in 12.4s</div>
                <div className="text-foreground/80">✓ 0 vulnerabilities</div>
                <div className="text-primary">→ https://yourapp.com</div>
              </div>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10">
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold md:text-3xl">Loved by teams</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
                Async-first, transparent updates, and real handoffs. We integrate with your team — not around it.
              </p>

              <figure className="mt-8 rounded-lg border border-border bg-background/60 p-5">
                <blockquote className="text-sm text-foreground/90">
                  "ZahTech rebuilt our core platform in 8 weeks. Performance is up 4x and our team actually understands the codebase."
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary/40" />
                  <span><span className="text-foreground">Maya Lin</span> — CTO, Northwind</span>
                </figcaption>
              </figure>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
