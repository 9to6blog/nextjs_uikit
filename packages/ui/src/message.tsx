import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Message({
  from = "assistant",
  className,
  ...props
}: ComponentProps<"article"> & { from?: "user" | "assistant" }) {
  return (
    <article
      {...props}
      data-from={from}
      className={cn("n-message", className)}
    />
  );
}
export function MessageContent({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-message-content", className)} />;
}
export function MessageActions({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-message-actions", className)} />;
}
