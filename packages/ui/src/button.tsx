import type { ComponentProps } from "react";
import { cn } from "./utils.js";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  loadingLabel?: string;
};

/** Server compatible. Explicitly use type="submit" for form actions. */
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  loadingLabel = "처리 중",
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={loading ? loadingLabel : props["aria-label"]}
      className={cn("n-button", className)}
    >
      <span
        className="n-button-label"
        style={{ opacity: loading ? 0 : undefined }}
      >
        {children}
      </span>
      {loading && (
        <span className="n-button-loader" aria-hidden="true">
          <span className="n-spinner" />
        </span>
      )}
    </button>
  );
}
