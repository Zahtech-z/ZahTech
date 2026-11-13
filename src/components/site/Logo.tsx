import { cn } from "@/lib/utils";
import { brandMarkPaths } from "@/lib/brand-mark";

type LogoProps = {
  className?: string;
  size?: number;
  variant?: "default" | "accent" | "inverse";
};

const colors = {
  default: "text-logo",
  accent: "text-logo",
  inverse: "text-logo-inverse",
};

/** Concept 1: traced from the approved board's large upper-left mark.
 * Keep both paths identical to public/logo-mark.svg and public/favicon.svg.
 */
export function LogoMark({
  size = 72,
  className,
  variant = "default",
  label = "ZahTech",
}: LogoProps & { label?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="currentColor"
      className={cn("shrink-0", colors[variant], className)}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={brandMarkPaths[0]} />
      <path
        d={brandMarkPaths[1]}
        className={variant === "default" ? undefined : "text-logo-accent"}
      />
    </svg>
  );
}

export function Logo({ className, size = 32, variant = "accent" }: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        variant === "inverse" ? colors.inverse : colors.default,
        className,
      )}
    >
      <LogoMark size={size} variant={variant} label="" />
      <span className="font-sans text-lg font-semibold tracking-tight">ZahTech</span>
    </div>
  );
}
