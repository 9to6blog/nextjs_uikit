import type { ComponentProps, CSSProperties } from "react";
import { cn } from "./utils.js";
export function ShineCard({
  className,
  duration = 3000,
  style,
  ...props
}: ComponentProps<"div"> & { duration?: number }) {
  return (
    <div
      {...props}
      className={cn("n-shine-card", className)}
      style={{ "--shine-duration": `${duration}ms`, ...style } as CSSProperties}
    />
  );
}
