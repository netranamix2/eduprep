import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";

/* ---------- Card ---------- */
export function Card({
  className,
  children,
  ...props
}: { className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-card border border-border bg-bg-card", className)} {...props}>
      {children}
    </div>
  );
}

/* ---------- Badge / chip ---------- */
export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "brand" | "success" | "warning" | "danger" | "outline";
  className?: string;
}) {
  const variants = {
    default: "bg-bg-elevated text-ink-muted",
    brand: "bg-brand-soft text-brand",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    outline: "border border-border text-ink-muted",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------- ProgressBar ---------- */
export function ProgressBar({
  value,
  className,
  barClassName,
  color,
}: {
  value: number;
  className?: string;
  barClassName?: string;
  color?: string;
}) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-pill bg-bg-elevated", className)}>
      <div
        className={cn("h-full rounded-pill bg-brand transition-all", barClassName)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
      />
    </div>
  );
}

/* ---------- Button ---------- */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-hover",
    secondary: "bg-bg-elevated text-ink hover:bg-border",
    ghost: "text-ink-muted hover:text-ink hover:bg-bg-elevated",
    outline: "border border-border text-ink hover:bg-bg-elevated",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[12px] font-semibold transition disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------- Avatar ---------- */
export function Avatar({
  initials,
  size = "md",
  className,
  ring,
}: {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  ring?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
    xl: "h-20 w-20 text-2xl",
  };
  return (
    <div
      className={cn(
        "grid place-items-center rounded-full bg-bg-elevated font-semibold text-ink",
        sizes[size],
        className
      )}
      style={ring ? { boxShadow: `0 0 0 3px ${ring}` } : undefined}
    >
      {initials}
    </div>
  );
}

/* ---------- Page header ---------- */
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1.5 text-ink-muted">{subtitle}</p>}
    </div>
  );
}

/* ---------- Section title with icon ---------- */
export function SectionTitle({
  icon,
  title,
  subtitle,
  action,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between">
      <div className="flex items-start gap-2">
        {icon && <span className="mt-0.5 text-brand">{icon}</span>}
        <div>
          <h2 className="font-semibold text-ink">{title}</h2>
          {subtitle && <p className="text-sm text-ink-muted">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
