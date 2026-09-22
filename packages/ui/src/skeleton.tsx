import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("n-skeleton", className)}
    />
  );
}
