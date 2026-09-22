import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} data-slot="card" className={cn("n-card", className)} />
  );
}
export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-card-header", className)} />;
}
export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 {...props} className={cn("n-card-title", className)} />;
}
export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p {...props} className={cn("n-description", className)} />;
}
export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-card-content", className)} />;
}
export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-card-footer", className)} />;
}
