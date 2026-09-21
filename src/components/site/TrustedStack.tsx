import { motion } from "framer-motion";
import { LogoMark } from "./Logo";
import { useLang } from "@/lib/i18n";

const row1 = ["⚛ React", "▲ Next.js", "☁ AWS", "🐳 Docker", "🐘 PostgreSQL", "▲ Vercel"];
const row2 = ["⬡ Node.js", "TS TypeScript", "Ⓢ Stripe", "⚡ Supabase", "🌬 Tailwind", "◈ Framer"];

export function TrustedStack() {
  const { t } = useLang();
  const [introFirst, introSecond] = t.landing.trusted.intro.split("\n");
  return (
    <section id="stack" className="relative border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-md text-center text-sm text-muted-foreground"
        >
          {introFirst}
          <br />
          {introSecond}
        </motion.p>

        <div className="space-y-8">
          {[row1, row2].map((row, ri) => (
            <motion.div
              key={ri}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.06, delayChildren: ri * 0.15 }}
              className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16"
            >
              {row.map((label) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 0.5, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="font-display text-xl font-semibold text-foreground/50 transition-opacity hover:opacity-100"
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Floating Z */}
        <div className="mt-32 flex flex-col items-center text-center">
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          >
            <LogoMark size={84} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-12 text-balance font-display text-5xl font-bold tracking-tight md:text-7xl"
          >
            {t.landing.trusted.heading}
          </motion.h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            {t.landing.trusted.sub}
          </p>
        </div>
      </div>
    </section>
  );
}
