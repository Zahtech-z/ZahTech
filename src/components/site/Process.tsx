import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const nums = ["01", "02", "03", "04"];

export function Process() {
  const { t } = useLang();

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
          {t.process.heading}
        </motion.h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {t.process.steps.map((s, i) => (
            <motion.div
              key={nums[i]}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-t border-border pt-6"
            >
              <span className="font-mono text-xs text-primary">{nums[i]}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
