import type { ComponentProps } from "react";
import { cn } from "./utils.js";

/** Shared leading icon, content and trailing hint slots for menu compositions. */
export function MenuItemIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={cn("n-menu-icon", className)}
    />
  );
}
export function MenuItemLabel({ className, ...props }: ComponentProps<"span">) {
  return <span {...props} className={cn("n-menu-item-label", className)} />;
}
export function MenuItemShortcut({
  className,
  ...props
}: ComponentProps<"span">) {
  return <span {...props} className={cn("n-menu-shortcut", className)} />;
}
