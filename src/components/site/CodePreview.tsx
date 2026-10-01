import { motion } from "framer-motion";
import { Folder, FolderOpen, FileCode, Circle } from "lucide-react";
import { LogoMark } from "./Logo";
import { useLang } from "@/lib/i18n";

const codeLines = [
  { t: "export", c: "#818cf8" },
  { t: " default function ", c: "rgba(255,255,255,0.85)" },
  { t: "Home", c: "#c084fc" },
  { t: "() {", c: "rgba(255,255,255,0.6)" },
];

export function CodePreview() {
  const { t } = useLang();
  return (
    <section className="relative border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-balance font-display text-4xl font-bold tracking-tight md:text-6xl"
        >
          {t.landing.codePreview.heading}
        </motion.h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:text-lg">
          {t.landing.codePreview.sub}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t.landing.codePreview.start}
          </a>
          <a
            href="#stack"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            {t.landing.codePreview.docs}
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="dark text-foreground mt-14 overflow-hidden rounded-xl border border-border bg-[#06060a] text-left shadow-[0_0_120px_-30px_oklch(0.74_0.14_280/0.5)]"
        >
          <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_280px]">
            {/* file tree */}
            <div className="border-r border-border p-3 font-mono text-[12px]">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <FolderOpen className="h-3.5 w-3.5" /> zahtech-app/
              </div>
              <div className="ml-3 mt-1 space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <FolderOpen className="h-3.5 w-3.5" /> app/
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center gap-1.5 rounded bg-primary/15 px-1.5 py-0.5 text-primary">
                    <FileCode className="h-3 w-3" /> page.tsx
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <FileCode className="h-3 w-3" /> layout.tsx
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Folder className="h-3.5 w-3.5" /> api/
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Folder className="h-3.5 w-3.5" /> components/
                </div>
              </div>
            </div>

            {/* code */}
            <div className="border-r border-border p-4 font-mono text-[12px] leading-6">
              <div>
                <span style={{ color: "#818cf8" }}>export default function</span>{" "}
                <span style={{ color: "#c084fc" }}>Home</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>() {"{"}</span>
              </div>
              <div className="pl-4">
                <span style={{ color: "#818cf8" }}>return</span> (
              </div>
              <div className="pl-8">
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{"<"}</span>
                <span style={{ color: "#22d3ee" }}>main</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{">"}</span>
              </div>
              <div className="pl-12">
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{"<"}</span>
                <span style={{ color: "#c084fc" }}>Hero</span>{" "}
                <span style={{ color: "rgba(255,255,255,0.6)" }}>/{">"}</span>
              </div>
              <div className="pl-12">
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{"<"}</span>
                <span style={{ color: "#c084fc" }}>Services</span>{" "}
                <span style={{ color: "rgba(255,255,255,0.6)" }}>/{">"}</span>
              </div>
              <div className="pl-12">
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{"<"}</span>
                <span style={{ color: "#c084fc" }}>Contact</span>{" "}
                <span style={{ color: "rgba(255,255,255,0.6)" }}>/{">"}</span>
              </div>
              <div className="pl-8">
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{"</"}</span>
                <span style={{ color: "#22d3ee" }}>main</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{">"}</span>
              </div>
              <div className="pl-4">
                <span style={{ color: "rgba(255,255,255,0.6)" }}>)</span>
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{"}"}</span>
              </div>
            </div>

            {/* preview */}
            <div className="flex flex-col items-center justify-center gap-3 bg-[#0d0d18] p-6">
              <LogoMark size={56} />
              <h3 className="font-display text-base font-bold">{t.landing.codePreview.welcome}</h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <Circle className="h-2 w-2 fill-current" strokeWidth={0} />
                {t.landing.codePreview.live}
              </div>
              <button className="mt-2 rounded-md bg-primary px-3.5 py-1.5 text-xs font-medium text-background">
                {t.landing.codePreview.quote}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
