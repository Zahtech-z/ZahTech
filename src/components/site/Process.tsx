import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Discovery Call", desc: "We understand your goals, audience, and constraints." },
  { n: "02", title: "Scope & Quote", desc: "Clear deliverables, timeline, and a fixed quote in 24h." },
  { n: "03", title: "Build & Iterate", desc: "Weekly demos. Feedback loops. Production-grade code." },
  { n: "04", title: "Deploy & Support", desc: "Launch, monitor, and maintain — we stay with you." },
];

export function Process() {
  return (
    <section id="process" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl text-balance font-display text-4xl font-bold md:text-5xl"
        >
          A process that actually ships.
        </motion.h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-t border-border pt-6"
            >
              <span className="font-mono text-xs text-primary">{s.n}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
