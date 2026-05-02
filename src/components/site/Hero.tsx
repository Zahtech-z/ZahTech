import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { PipelineAnimation } from "./PipelineAnimation";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-40 pb-32 lg:grid-cols-2 lg:pt-48">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <a href="#contact" className="mb-8 inline-flex items-center gap-2 rounded-full p-px text-xs" style={{ background: "linear-gradient(90deg, #818cf8, #22d3ee, #c084fc, #818cf8)" }}>
            <span className="flex items-center gap-2 rounded-full bg-background px-3 py-1">
              <span className="bg-gradient-to-r from-primary via-[#22d3ee] to-[#c084fc] bg-clip-text text-transparent">
                Now accepting new clients — 2026
              </span>
              <ChevronRight className="h-3 w-3 text-primary" />
            </span>
          </a>
          <h1 className="text-balance font-display text-6xl font-medium leading-[0.95] tracking-tight text-foreground/95 md:text-7xl lg:text-[88px]">
            Tech for
            <br />
            <span className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">businesses</span>
          </h1>
          <p className="mt-8 max-w-md text-base text-muted-foreground md:text-lg">
            The best way to build, deploy and scale your digital product. From MVP to enterprise — delivered fast.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <a href="#contact" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90">
              Get a Quote
            </a>
            <a href="#services" className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground">
              View services
            </a>
          </div>
        </motion.div>

        {/* Right: assembly animation */}
        <div className="relative h-[460px] w-full lg:h-[540px]">
          {/* chips */}
          {chips.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ x: c.x * 1.4, y: c.y * 1.4, opacity: 0, scale: 0.6, filter: "blur(8px)" }}
              animate={{ x: 0, y: 0, opacity: [0, 1, 1, 0.4], scale: [0.6, 1, 1, 0.7], filter: "blur(0px)" }}
              transition={{ duration: 2.4, delay: c.delay, ease: [0.22, 1, 0.36, 1], times: [0, 0.4, 0.75, 1] }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface-elevated/90 px-3 py-1.5 text-xs text-foreground/90 backdrop-blur"
              style={{ zIndex: 10 + i }}
            >
              {c.label}
            </motion.div>
          ))}

          {/* Laptop */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative w-[360px] rounded-t-xl border border-border bg-surface-elevated p-3 shadow-[0_0_120px_-20px_oklch(0.74_0.14_280/0.6)]">
              <div className="mb-2 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex h-44 flex-col items-center justify-center rounded-md bg-background">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                  className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  Deployed
                </motion.div>
                <p className="mt-3 font-mono text-[10px] text-muted-foreground">myapp.zahtech.net</p>
              </div>
            </div>
            <div className="mx-auto h-2 w-[400px] rounded-b-2xl bg-gradient-to-b from-surface-elevated to-[#0a0a0e]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
