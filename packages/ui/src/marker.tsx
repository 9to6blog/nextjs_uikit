import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Marker({ className, ...props }: ComponentProps<"mark">) {
  return <mark {...props} className={cn("n-marker", className)} />;
}
