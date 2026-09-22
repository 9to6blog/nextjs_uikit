import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Alert({ className, ...props }: ComponentProps<"div">) {
  return <div role="status" {...props} className={cn("n-alert", className)} />;
}
export function AlertTitle({ className, ...props }: ComponentProps<"h4">) {
  return <h4 {...props} className={cn("n-alert-title", className)} />;
}
export function AlertDescription({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div {...props} className={cn("n-description", className)} />;
}
