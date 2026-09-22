import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Item({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-item", className)} />;
}
export function ItemMedia({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-item-media", className)} />;
}
export function ItemContent({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-item-content", className)} />;
}
export function ItemTitle({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-item-title", className)} />;
}
export function ItemDescription({ className, ...props }: ComponentProps<"p">) {
  return <p {...props} className={cn("n-description", className)} />;
}
export function ItemActions({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-item-actions", className)} />;
}
export function ItemGroup({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-item-group", className)} />;
}
