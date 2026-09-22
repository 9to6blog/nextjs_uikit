import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return <kbd {...props} className={cn("n-kbd", className)} />;
}
export function KbdGroup({ className, ...props }: ComponentProps<"span">) {
  return <span {...props} className={cn("n-kbd-group", className)} />;
}
