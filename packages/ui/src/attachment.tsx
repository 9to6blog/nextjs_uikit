import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Attachment({
  name,
  size,
  href,
  className,
  ...props
}: Omit<ComponentProps<"a">, "children"> & { name: string; size?: string }) {
  return (
    <a {...props} href={href} className={cn("n-attachment", className)}>
      <span aria-hidden="true">↗</span>
      <span>
        <strong>{name}</strong>
        {size && <small>{size}</small>}
      </span>
    </a>
  );
}
