import { cn } from "@/lib/utils";

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
      <path d="M5.8 4.5H24.5Q25.8 4.5 25.8 5.8V8Q25.8 8.6 25.3 9L6 26.2Q4.2 27.8 4.2 25.5V21.8L16.9 9.5H5.8Q4.8 9.5 4.8 8.5V5.5Q4.8 4.5 5.8 4.5Z" />
      <path
        d="M9 27.5L18.7 18.4Q19 18.1 19.5 18.1H27.6Q28.2 18.1 28.2 18.7V19.6Q28.2 19.9 27.9 20.2L20.2 27.5Z"
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
