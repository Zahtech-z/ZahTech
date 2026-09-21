import { motion } from "framer-motion";
import { Code2, Cloud, Compass, Sparkles, ShieldCheck, Rocket } from "lucide-react";
import { useLang } from "@/lib/i18n";

const icons = [Code2, Cloud, Compass, Sparkles, ShieldCheck, Rocket];

export function Services() {
  const { t } = useLang();

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
          {t.services.heading}
        </motion.h2>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-background p-8 transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:bg-surface-elevated hover:shadow-[0_10px_40px_-12px_oklch(0.74_0.14_280/0.45)]"
              >
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-elevated text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_-4px_oklch(0.74_0.14_280/0.6)]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
