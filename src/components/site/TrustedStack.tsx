const stack = [
  "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL",
  "AWS", "Vercel", "Stripe", "OpenAI", "Kubernetes", "Rust", "Go",
];

export function TrustedStack() {
  return (
    <section id="stack" className="border-b border-border py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-10 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          The stack we trust
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-12">
            {[...stack, ...stack].map((s, i) => (
              <span
                key={i}
                className="font-display text-2xl font-semibold text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
