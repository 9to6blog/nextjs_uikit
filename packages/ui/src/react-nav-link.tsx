import type { ComponentProps } from "react";
import { cn } from "./utils.js";
/** Framework-neutral link. Pass the active state from your application's router. */
export function NavLink({
  active = false,
  className,
  ...props
}: ComponentProps<"a"> & { active?: boolean }) {
  return (
    <a
      {...props}
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      className={cn("n-nav-link", className)}
    />
  );
}
