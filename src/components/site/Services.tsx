import { motion } from "framer-motion";
import { Code2, Cloud, Compass, Sparkles, ShieldCheck, Rocket } from "lucide-react";

const services = [
  {
    Icon: Code2,
    title: "App Development",
    desc: "React, Next.js, full-stack apps built for production.",
  },
  {
    Icon: Cloud,
    title: "Cloud & DevOps",
    desc: "AWS, Docker, CI/CD, server maintenance that never sleeps.",
  },
  {
    Icon: Compass,
    title: "Tech Consulting",
    desc: "Architecture reviews and strategic guidance for companies.",
  },
  {
    Icon: Sparkles,
    title: "AI-Powered Build",
    desc: "Vibe coding and LLM-assisted dev to ship 3× faster.",
  },
  {
    Icon: ShieldCheck,
    title: "Server Maintenance",
    desc: "24/7 monitoring, security patches, incident response.",
  },
  {
    Icon: Rocket,
    title: "MVP Launch",
    desc: "Idea to live product in weeks, scoped and production-ready.",
  },
];

export function Services() {
  return (
    <section id="services" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl text-balance font-display text-4xl font-bold md:text-5xl"
        >
          Everything your product needs.
        </motion.h2>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-background p-8 transition-colors hover:bg-surface-elevated"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-elevated text-primary transition-colors group-hover:border-primary/50">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
