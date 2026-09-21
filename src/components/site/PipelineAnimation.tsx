import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Code2, Hammer, FlaskConical, Rocket, Cloud } from "lucide-react";
import { useLang } from "@/lib/i18n";

type StageState = "pending" | "running" | "done";

type ChipConfig = { distance: number; duration: number; delay: number };

const floatVariants: Variants = {
  float: (c: ChipConfig) => ({
    y: [0, c.distance, 0],
    transition: { duration: c.duration, repeat: Infinity, ease: "easeInOut" as const, delay: c.delay },
  }),
  still: { y: 0 },
};

const CHIPS: Array<{ key: string; className: string; content: React.ReactNode } & ChipConfig> = [
  {
    key: "nextjs",
    distance: -8,
    duration: 4,
    delay: 0,
    className:
      "absolute right-2 top-6 z-30 rotate-[3deg] rounded-md border border-border bg-surface-elevated/90 px-2.5 py-1 font-mono text-[10px] text-foreground/80 backdrop-blur",
    content: "Next.js ▲",
  },
  {
    key: "aws",
    distance: 10,
    duration: 5,
    delay: 0.6,
    className:
      "absolute left-0 top-2 z-30 -rotate-[1deg] rounded-md border border-border bg-surface-elevated/90 px-2.5 py-1 font-mono text-[10px] text-foreground/80 backdrop-blur",
    content: "AWS ☁",
  },
  {
    key: "deployed",
    distance: -10,
    duration: 4.5,
    delay: 1.2,
    className:
      "absolute bottom-6 left-4 z-30 -rotate-[2deg] rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] text-emerald-400 backdrop-blur",
    content: (
      <>
        <Check className="mr-1 inline h-2.5 w-2.5" strokeWidth={3} /> Deployed
      </>
    ),
  },
];

const LOG_LINES = [
  { icon: "check", text: "Installing dependencies...", time: "0.3s" },
  { icon: "check", text: "Building Next.js app...", time: "2.1s" },
  { icon: "check", text: "Running tests (24/24)...", time: "1.8s" },
  { icon: "check", text: "Optimizing bundle...", time: "0.4s" },
  { icon: "check", text: "Uploading to AWS S3...", time: "0.6s" },
  { icon: "check", text: "Configuring CloudFront CDN...", time: "0.2s" },
  { icon: "arrow", text: "Deploying to production...", time: "▓▓▓▓░" },
];

function CountUp({
  to,
  suffix = "",
  decimals = 0,
  trigger,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  trigger: number;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals) + suffix);
  const [val, setVal] = useState("0" + suffix);
  useEffect(() => {
    mv.set(0);
    const controls = animate(mv, to, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    const unsub = rounded.on("change", (v) => setVal(v));
    return () => {
      controls.stop();
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, to]);
  return <span>{val}</span>;
}

export function PipelineAnimation() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const [loop, setLoop] = useState(0);
  const [phase, setPhase] = useState(0); // 0..6
  const [stages, setStages] = useState<StageState[]>(["pending", "pending", "pending", "pending"]);
  const [visibleLogs, setVisibleLogs] = useState(0);
  const [deployDone, setDeployDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    setPhase(1);
    setStages(["pending", "pending", "pending", "pending"]);
    setVisibleLogs(0);
    setDeployDone(false);

    timers.push(setTimeout(() => setStages(["done", "pending", "pending", "pending"]), 800));
    timers.push(setTimeout(() => setStages(["done", "done", "pending", "pending"]), 1200));
    timers.push(setTimeout(() => setStages(["done", "done", "running", "pending"]), 1600));
    timers.push(setTimeout(() => setStages(["done", "done", "done", "running"]), 2000));

    // logs
    for (let i = 1; i <= LOG_LINES.length; i++) {
      timers.push(setTimeout(() => setVisibleLogs(i), 1500 + i * 280));
    }

    // deploy complete
    timers.push(
      setTimeout(() => {
        setStages(["done", "done", "done", "done"]);
        setDeployDone(true);
        setPhase(4);
      }, 3500),
    );

    timers.push(setTimeout(() => setPhase(5), 4500));
    timers.push(setTimeout(() => setPhase(6), 5500));
    timers.push(setTimeout(() => setLoop((l) => l + 1), 6300));

    return () => timers.forEach(clearTimeout);
  }, [loop]);

  const fadeOut = phase === 6;

  const stageDefs = [Code2, Hammer, FlaskConical, Rocket].map((Icon, index) => ({
    label: t.landing.pipeline.stages[index],
    Icon,
  }));

  return (
    <div className="relative h-[540px] w-full">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      {/* floating chips around card */}
      {CHIPS.map((chip) => (
        <motion.div
          key={chip.key}
          custom={chip}
          variants={floatVariants}
          animate={reduceMotion ? "still" : "float"}
          className={chip.className}
        >
          {chip.key === "deployed" ? (
            <><Check className="mr-1 inline h-2.5 w-2.5" strokeWidth={3} /> {t.landing.pipeline.deployed}</>
          ) : chip.content}
        </motion.div>
      ))}

      {/* card */}
      <motion.div
        animate={{ y: reduceMotion ? 0 : [0, -10, 0], opacity: fadeOut ? 0 : 1 }}
        transition={{
          y: { duration: 5, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" },
          opacity: { duration: 0.5 },
        }}
        style={{ transform: "rotate(-2deg)" }}
        className="absolute left-1/2 top-1/2 z-20 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-surface p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(129,140,248,0.08)]"
      >
        {/* top bar */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[12px] text-white/50">ZahTech Pipeline</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-500">
            <motion.span
              animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
            {t.landing.pipeline.running}
          </div>
        </div>

        {/* command line */}
        <div className="mb-4 font-mono text-[11px] leading-[1.8]">
          <div className="text-white/70">
            <span className="text-primary">$</span> git push origin main
          </div>
          <div className="text-white/40">↳ {t.landing.pipeline.pushing}</div>
        </div>

        {/* pipeline stages */}
        <div className="mb-4 flex items-start justify-between">
          {stageDefs.map((s, i) => {
            const state = stages[i];
            const isDone = state === "done";
            const isRunning = state === "running";
            return (
              <div key={s.label} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  {i > 0 && (
                    <div className="relative h-px flex-1 bg-white/10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: stages[i - 1] === "done" ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-y-0 left-0 w-full origin-left bg-emerald-500/60"
                      />
                    </div>
                  )}
                  <motion.div
                    animate={isRunning && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 1.2, repeat: isRunning && !reduceMotion ? Infinity : 0 }}
                    className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                      isDone
                        ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                        : isRunning
                          ? "border-primary/60 bg-primary/15 text-primary"
                          : "border-white/10 bg-white/[0.03] text-white/30"
                    }`}
                  >
                    {isRunning && !reduceMotion && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.7, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                        className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary"
                      />
                    )}
                    {isDone ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : (
                      <s.Icon className="h-3.5 w-3.5" />
                    )}
                  </motion.div>
                  {i < stageDefs.length - 1 && (
                    <div className="relative h-px flex-1 bg-white/10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isDone ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-y-0 left-0 w-full origin-left bg-emerald-500/60"
                      />
                    </div>
                  )}
                </div>
                <span
                  className={`mt-1.5 text-[10px] ${isDone ? "text-emerald-400/90" : isRunning ? "text-primary" : "text-white/40"}`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* logs */}
        <div className="rounded-md border border-white/5 bg-black/40 p-3 font-mono text-[11px] leading-[1.8]">
          <AnimatePresence initial={false}>
            {LOG_LINES.slice(0, visibleLogs).map((line, idx) => {
              const isLast = idx === LOG_LINES.length - 1;
              const showAsDone = isLast && deployDone;
              return (
                <motion.div
                  key={`${loop}-${idx}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    {line.icon === "check" || showAsDone ? (
                      <Check className="h-3 w-3 shrink-0 text-emerald-500" strokeWidth={3} />
                    ) : (
                      <span className="text-[#22d3ee]">→</span>
                    )}
                    <span className="truncate text-white/70">
                      {showAsDone ? t.landing.pipeline.done : t.landing.pipeline.logs[idx]}
                    </span>
                  </div>
                  <span className="shrink-0 text-white/30">{showAsDone ? "0.1s" : line.time}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* success banner */}
        <AnimatePresence>
          {phase >= 4 && !fadeOut && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3"
            >
              <div className="flex items-center gap-2 text-[12px] font-medium text-emerald-400">
                🚀 {t.landing.pipeline.live}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-white/60">
                client-app.zahtech.net
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-400/90">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                99.9% {t.landing.pipeline.uptime}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* stat badges */}
      <AnimatePresence>
        {phase >= 5 && !fadeOut && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, staggerChildren: 0.08 }}
            className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2"
          >
            {[
              { val: 4.5, suffix: t.landing.pipeline.deployStat, decimals: 1 },
              { val: 24, suffix: t.landing.pipeline.testsStat },
              { val: 99.9, suffix: `% ${t.landing.pipeline.uptime}`, decimals: 1 },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-full border border-primary/30 bg-surface/90 px-3 py-1 font-mono text-[10px] text-foreground/90 backdrop-blur"
              >
                <CountUp to={b.val} decimals={b.decimals ?? 0} trigger={loop} />
                {b.suffix}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
