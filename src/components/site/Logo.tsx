import { Cpu } from "lucide-react";

export function Logo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-md border border-primary/30 bg-gradient-to-br from-[#1a1030] to-[#0a0a0e] shadow-[0_0_20px_-4px_oklch(0.74_0.14_280/0.6)]"
        style={{ height: size, width: size }}
      >
        <Cpu
          className="absolute text-primary opacity-50"
          style={{ height: size * 0.55, width: size * 0.55 }}
          strokeWidth={1.4}
        />
        <span
          className="relative font-display font-bold text-foreground"
          style={{ fontSize: size * 0.5 }}
        >
          Z
        </span>
      </div>
      <span className="font-display text-lg font-bold tracking-tight">ZahTech</span>
    </div>
  );
}

export function LogoMark({ size = 72 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-[#1a1030] to-[#0a0a0e] shadow-[0_0_60px_-10px_oklch(0.74_0.14_280/0.7),0_0_120px_-30px_oklch(0.78_0.18_310/0.4)]"
      style={{ height: size, width: size }}
    >
      <Cpu
        className="absolute text-primary opacity-40"
        style={{ height: size * 0.55, width: size * 0.55 }}
        strokeWidth={1.2}
      />
      <span
        className="relative bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text font-display font-bold text-transparent"
        style={{ fontSize: size * 0.55 }}
      >
        Z
      </span>
    </div>
  );
}
