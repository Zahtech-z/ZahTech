import { motion } from "framer-motion";
import { FlaskConical, Zap } from "lucide-react";
import { LogoMark } from "./Logo";

const items = [
  {
    Icon: FlaskConical,
    title: "Rapid Delivery",
    desc: "Ship your product in weeks, not months. AI-powered development moves 3× faster than traditional teams.",
  },
  {
    Icon: Zap,
    title: "Real-time Updates",
    desc: "Get notified at every step. From kickoff to deployment — full transparency throughout your project.",
  },
];

export function Features() {
  return (
    <section className="relative border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 rounded-md border border-border bg-[#06060a] px-4 py-2 text-center font-mono text-[11px] text-muted-foreground/60"
        >
          HTTP 200 {`{ "id": "proj_7f3a2d9c-1b4e-4a8f-9c2d-5e6f7a8b9c0d" }`}
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          {items.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Icon className="mb-5 h-6 w-6 text-foreground" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <a
                href="#contact"
                className="mt-4 inline-block text-sm text-primary transition-opacity hover:opacity-80"
              >
                Learn more
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 flex flex-col items-center text-center">
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          >
            <LogoMark size={72} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-10 text-balance font-display text-4xl font-bold tracking-tight md:text-5xl"
          >
            Build using a delightful process
          </motion.h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            A modern workflow that makes it easy for anyone to launch, scale, and maintain digital
            products.
          </p>
        </div>
      </div>
    </section>
  );
}
