import type { ComponentProps, CSSProperties } from "react";
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
      <span className="n-spinner-bars" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} style={{ "--spinner-index": i } as CSSProperties} />
        ))}
      </span>
      <span className="n-sr-only">{label}</span>
    </span>
  );
}
