import { Cpu } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated">
        <Cpu className="absolute h-4 w-4 text-primary opacity-60" strokeWidth={1.5} />
        <span className="relative font-display text-base font-bold text-foreground">Z</span>
      </div>
      <span className="font-display text-lg font-bold tracking-tight">ZahTech</span>
    </div>
  );
}
