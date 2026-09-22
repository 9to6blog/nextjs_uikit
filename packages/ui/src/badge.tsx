import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export type BadgeProps = ComponentProps<"span"> & {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
  variant?: "soft" | "outline" | "ghost";
  dot?: boolean;
};
export function Badge({
  tone = "neutral",
  variant = "soft",
  dot,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      data-slot="badge"
      data-tone={tone}
      data-variant={variant}
      className={cn("n-badge", className)}
    >
      {dot && <span className="n-status-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
