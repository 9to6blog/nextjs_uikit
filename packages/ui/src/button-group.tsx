import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function ButtonGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div role="group" {...props} className={cn("n-button-group", className)} />
  );
}
