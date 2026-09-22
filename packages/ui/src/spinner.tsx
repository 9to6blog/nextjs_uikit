import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Spinner({
  label = "불러오는 중",
  className,
  ...props
}: ComponentProps<"span"> & { label?: string }) {
  return (
    <span
      {...props}
      role="status"
      className={cn("n-spinner-container", className)}
    >
      <span className="n-spinner" aria-hidden="true" />
      <span className="n-sr-only">{label}</span>
    </span>
  );
}
