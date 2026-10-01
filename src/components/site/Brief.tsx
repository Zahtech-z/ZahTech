import { motion } from "framer-motion";
import { Settings, Clock, ChevronRight, User } from "lucide-react";
import { LogoMark } from "./Logo";
import { useLang } from "@/lib/i18n";

export function Brief() {
  const { t } = useLang();
  const b = t.landing.brief;
  return (
    <section className="relative border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="dark text-foreground overflow-hidden rounded-xl border border-border bg-[#0a0a0e]"
        >
          {/* top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
              <Settings className="h-3.5 w-3.5" /> {b.templates} <ChevronRight className="h-3 w-3" />
            </button>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-foreground/90">{b.title}</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" /> {b.ago}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                {b.preview}
              </button>
              <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90">
                {b.send}
              </button>
            </div>
          </div>

          {/* fields */}
          <div className="divide-y divide-border text-sm">
            <FieldRow label={b.from}>
              <span className="font-mono text-foreground/90">contact@zahtech.net</span>
            </FieldRow>
            <FieldRow label={b.to}>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-elevated px-2 py-0.5 text-xs">
                <User className="h-3 w-3 text-primary" /> {b.client}
              </span>
            </FieldRow>
            <FieldRow label={b.subject}>
              <span>{b.subjectValue}</span>
            </FieldRow>
          </div>

          {/* content */}
          <div className="p-6 md:p-10">
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-background/40 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <LogoMark size={48} />
                <span className="font-display text-lg font-bold">ZahTech</span>
              </div>
              <h3 className="font-display text-2xl font-bold md:text-3xl">{b.quoteTitle}</h3>
              <dl className="mt-6 space-y-3 text-sm">
                <Line k={b.service} v={b.serviceValue} />
                <Line k={b.timeline} v={b.timelineValue} />
                <Line k={b.stack} v="Next.js · Supabase · Vercel" />
                <Line k={b.includes} v={b.includesValue} />
              </dl>
              <div className="my-5 border-t border-dashed border-border" />
              <Line k={b.total} v={b.totalValue} emphasize />
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
      <span
        className={
          emphasize ? "font-display text-base font-bold text-foreground" : "text-foreground/90"
        }
      >
        {v}
      </span>
    </div>
  );
}
