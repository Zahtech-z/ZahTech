import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const tabs = [
  { id: "nextjs", label: "Next.js", icon: "▲" },
  { id: "react", label: "React", icon: "⚛" },
  { id: "node", label: "Node.js", icon: "⬡" },
  { id: "docker", label: "Docker", icon: "🐳" },
  { id: "aws", label: "AWS", icon: "☁" },
  { id: "vercel", label: "Vercel", icon: "▲" },
];

const code = `// ZahTech - Deploy your app
import { ZahTech } from 'zahtech-sdk';

const client = new ZahTech('zt_xxxxxxxxx');

const { data, error } = await client
  .projects
  .deploy({
    name: 'my-app',
    framework: 'nextjs',
    region: 'us-east-1',
  });

if (error) {
  return console.log(error);
}

console.log(data);
// { id: "proj_xxx", url: "myapp.zahtech.net" }`;

const lines = code.split("\n");

function highlight(line: string) {
  // simple tokenizer
  if (line.trim().startsWith("//")) {
    return <span style={{ color: "rgba(255,255,255,0.35)" }}>{line}</span>;
  }
  const parts: React.ReactNode[] = [];
  let rest = line;
  const patterns: Array<{ re: RegExp; color: string }> = [
    { re: /^(import|const|await|return|if|new|from)\b/, color: "#818cf8" },
    { re: /^'[^']*'/, color: "#22d3ee" },
    { re: /^"[^"]*"/, color: "#22d3ee" },
    { re: /^\.([a-zA-Z_]+)/, color: "#c084fc" },
    { re: /^[{}();,=]/, color: "rgba(255,255,255,0.6)" },
    { re: /^\s+/, color: "inherit" },
    { re: /^[A-Za-z_][A-Za-z0-9_]*/, color: "rgba(255,255,255,0.85)" },
    { re: /^./, color: "rgba(255,255,255,0.7)" },
  ];
  let key = 0;
  while (rest.length) {
    let matched = false;
    for (const p of patterns) {
      const m = rest.match(p.re);
      if (m) {
        parts.push(
          <span key={key++} style={{ color: p.color }}>
            {m[0]}
          </span>,
        );
        rest = rest.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) break;
  }
  return <>{parts}</>;
}

export function CodeTabs() {
  const [active, setActive] = useState("nextjs");
  const [copied, setCopied] = useState(false);

  return (
    <section className="relative border-b border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs transition-all ${
                active === t.id
                  ? "border-primary/50 bg-primary/10 text-primary shadow-[0_0_30px_-10px_oklch(0.74_0.14_280/0.7)]"
                  : "border-border bg-surface-elevated/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-base">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="overflow-hidden rounded-xl border border-border bg-[#06060a]"
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {tabs.find((t) => t.id === active)?.label} · index.ts
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <div className="flex font-mono text-[13px] leading-6">
            <div className="select-none border-r border-border bg-[#04040800] px-4 py-4 text-right text-muted-foreground/50">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className="flex-1 overflow-x-auto py-4 pl-4 pr-6">
              {lines.map((l, i) => (
                <div key={i}>{highlight(l) || "\u00A0"}</div>
              ))}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
