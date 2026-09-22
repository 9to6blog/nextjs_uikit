import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label {...props} className={cn("n-label", className)} />;
}
