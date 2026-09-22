import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function InputGroup({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-input-group", className)} />;
}
export function InputGroupAddon({
  className,
  ...props
}: ComponentProps<"span">) {
  return <span {...props} className={cn("n-input-addon", className)} />;
}
export function InputGroupText({
  className,
  ...props
}: ComponentProps<"span">) {
  return <span {...props} className={cn("n-input-group-text", className)} />;
}
