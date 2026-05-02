import { motion } from "framer-motion";
import { Check, ArrowRight, Circle } from "lucide-react";

const httpLines = [
  'HTTP 200:  { "id": "proj_f3c6d5f3-4f82-403a-aafa-b7a48b20cb38" }',
  'HTTP 200:  { "id": "proj_818eeed6-5452-43a9-a554-84f2bccab73a" }',
  'HTTP 200:  { "id": "proj_735adaa7-5af1-417a-b6e4-13c10a57bd2c" }',
];

const logs = [
  { kind: "ok", text: "Deployed to production" },
  { kind: "ok", text: "SSL certificate active" },
  { kind: "ok", text: "Domain connected" },
  { kind: "info", text: "HTTP 200 — zahtech.net/api/status" },
];

const projects = [
  {
    color: "bg-emerald-400",
    status: "Active",
    name: "SimuWork App",
    meta: "zahtech.net · deployed 2h ago",
  },
  {
    color: "bg-sky-400",
    status: "Building",
    name: "E-Commerce MVP",
    meta: "zahtech.net · in progress",
  },
  {
    color: "bg-emerald-400",
    status: "Active",
    name: "Dashboard SaaS",
    meta: "zahtech.net · deployed 1d ago",
  },
  {
    color: "bg-amber-400",
    status: "Review",
    name: "Mobile App",
    meta: "zahtech.net · awaiting approval",
  },
];

export function Experience() {
  return (
    <section id="experience" className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-balance font-display text-4xl font-bold leading-[1.05] md:text-6xl">
            First-class
            <br />
            client experience
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground md:text-lg">
            We are builders creating solutions for businesses. Our goal: deliver the tech partner
            that just works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-xl border border-border bg-[#0a0a0e] p-6 md:p-8"
          >
            <div className="mb-5 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                <Check className="h-3 w-3" strokeWidth={3} /> Delivered
              </span>
              <span className="font-mono text-muted-foreground">contact@zahtech.net</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] text-muted-foreground/80">
              {httpLines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="truncate"
                >
                  {l}
                </motion.div>
              ))}
            </div>
            <div className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.12 }}
                  className="flex items-center gap-2"
                >
                  {log.kind === "ok" ? (
                    <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-cyan-400" strokeWidth={2.5} />
                  )}
                  <span className={log.kind === "ok" ? "text-emerald-400/90" : "text-cyan-400/90"}>
                    {log.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.article>

          {/* Card 2 */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl border border-border bg-[#0a0a0e] p-6 md:p-8"
          >
            <div className="mb-5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Projects</span>
              <span className="text-muted-foreground">May 2, 2026</span>
            </div>
            <div className="divide-y divide-border">
              {projects.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 py-3.5"
                >
                  <Circle
                    className={`h-2.5 w-2.5 fill-current ${p.color.replace("bg-", "text-")}`}
                    strokeWidth={0}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{p.status}</span>
                      <span className="text-muted-foreground/40">—</span>
                      <span className="truncate text-foreground">{p.name}</span>
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] text-muted-foreground/60">
                      {p.meta}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
