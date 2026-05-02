import { Code2, Cloud, Brain, Smartphone, ShieldCheck, LineChart } from "lucide-react";

const services = [
  { Icon: Code2, title: "Web Development", desc: "Production-grade web apps built on TypeScript, React, and modern frameworks." },
  { Icon: Cloud, title: "Cloud & DevOps", desc: "Scalable infrastructure on AWS and Vercel with CI/CD baked in from day one." },
  { Icon: Brain, title: "AI Integration", desc: "Embed LLMs, RAG, and intelligent agents into your existing product." },
  { Icon: Smartphone, title: "Mobile Apps", desc: "Cross-platform iOS and Android apps with native-grade performance." },
  { Icon: ShieldCheck, title: "Security Audits", desc: "Hardening, threat modeling, and compliance for SOC 2 and ISO 27001." },
  { Icon: LineChart, title: "Data & Analytics", desc: "Pipelines, dashboards, and decision systems backed by real-time data." },
];

export function Services() {
  return (
    <section id="services" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary">Services</p>
          <h2 className="text-balance text-4xl font-bold md:text-5xl">
            Everything you need to build, ship, and scale.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, title, desc }) => (
            <div key={title} className="group relative bg-background p-8 transition-colors hover:bg-surface-elevated">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-elevated text-primary transition-colors group-hover:border-primary/50">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
