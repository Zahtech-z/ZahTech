import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: number;
  variant?: "default" | "accent" | "inverse";
};

const colors = {
  default: "text-logo",
  accent: "text-logo-accent",
  inverse: "text-logo-inverse",
};

/** Two interlocking modules suggest an open Z and a handoff from build to delivery. */
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
      <path d="M4 4H28V10L23 15H15L20 10H4Z" />
      <path d="M9 17H17L12 22H28V28H4V22Z" />
    </svg>
  );
}

export function Logo({ className, size = 32, variant = "default" }: LogoProps) {
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
