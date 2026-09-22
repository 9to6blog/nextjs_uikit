import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Bubble({
  from = "assistant",
  className,
  ...props
}: ComponentProps<"div"> & { from?: "user" | "assistant" }) {
  return (
    <div {...props} data-from={from} className={cn("n-bubble", className)} />
  );
}
