import { motion } from "framer-motion";
import { Settings, Clock, ChevronRight, User } from "lucide-react";
import { LogoMark } from "./Logo";

export function Brief() {
  return (
    <section className="relative border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-xl border border-border bg-[#0a0a0e]"
        >
          {/* top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
              <Settings className="h-3.5 w-3.5" /> Templates <ChevronRight className="h-3 w-3" />
            </button>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-foreground/90">Project Brief</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" /> 2 hours ago
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">Preview</button>
              <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90">Send Quote</button>
            </div>
          </div>

          {/* fields */}
          <div className="divide-y divide-border text-sm">
            <FieldRow label="From"><span className="font-mono text-foreground/90">contact@zahtech.net</span></FieldRow>
            <FieldRow label="To">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-elevated px-2 py-0.5 text-xs">
                <User className="h-3 w-3 text-primary" /> Client Name
              </span>
            </FieldRow>
            <FieldRow label="Subject"><span>Your ZahTech Quote</span></FieldRow>
          </div>

          {/* content */}
          <div className="p-6 md:p-10">
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-background/40 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <LogoMark size={48} />
                <span className="font-display text-lg font-bold">ZahTech</span>
              </div>
              <h3 className="font-display text-2xl font-bold md:text-3xl">Your Project Quote</h3>
              <dl className="mt-6 space-y-3 text-sm">
                <Line k="Service requested" v="Full-stack Web App" />
                <Line k="Estimated timeline" v="4 – 6 weeks" />
                <Line k="Tech stack" v="Next.js · Supabase · Vercel" />
                <Line k="Includes" v="Design · Dev · Deploy · Support" />
              </dl>
              <div className="my-5 border-t border-dashed border-border" />
              <Line k="Total estimate" v="Contact for pricing" emphasize />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6 px-6 py-3">
      <span className="w-16 text-xs text-muted-foreground">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Line({ k, v, emphasize }: { k: string; v: string; emphasize?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{k}</span>
      <span className={emphasize ? "font-display text-base font-bold text-foreground" : "text-foreground/90"}>{v}</span>
    </div>
  );
}
