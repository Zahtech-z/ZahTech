import { CalendarDays } from "lucide-react";
import { openCalendly } from "@/lib/calendly";

export function BookCallButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={openCalendly}
      onMouseEnter={() => void import("@/lib/calendly")}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 bg-gradient-to-r from-primary/15 to-[#22d3ee]/15 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-[#22d3ee]/70 hover:from-primary/25 hover:to-[#22d3ee]/25 ${className}`}
    >
      <CalendarDays className="h-4 w-4 text-[#22d3ee]" strokeWidth={1.8} />
      {label}
    </button>
  );
}
