import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Heading({ className, ...props }: ComponentProps<"h2">) {
  return <h2 {...props} className={cn("n-heading", className)} />;
}
export function Text({ className, ...props }: ComponentProps<"p">) {
  return <p {...props} className={cn("n-text", className)} />;
}
export function Code({ className, ...props }: ComponentProps<"code">) {
  return <code {...props} className={cn("n-code", className)} />;
}
export function Blockquote({
  className,
  ...props
}: ComponentProps<"blockquote">) {
  return <blockquote {...props} className={cn("n-blockquote", className)} />;
}
