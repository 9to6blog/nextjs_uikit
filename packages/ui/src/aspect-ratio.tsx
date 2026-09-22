import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function AspectRatio({
  ratio = 16 / 9,
  style,
  className,
  ...props
}: ComponentProps<"div"> & { ratio?: number }) {
  return (
    <div
      {...props}
      style={{ aspectRatio: ratio, ...style }}
      className={cn("n-aspect-ratio", className)}
    />
  );
}
