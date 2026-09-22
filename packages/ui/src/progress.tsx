import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export type ProgressProps = Omit<ComponentProps<"div">, "children"> & {
  value: number;
  label: string;
};
export function Progress({ value, label, className, ...props }: ProgressProps) {
  const safeValue = Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : 0;
  return (
    <div
      {...props}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
      className={cn("n-progress", className)}
    >
      <span
        className="n-progress-fill"
        style={{ transform: `scaleX(${safeValue / 100})` }}
      />
    </div>
  );
}
