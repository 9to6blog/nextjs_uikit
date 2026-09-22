import type { ComponentProps, ReactNode } from "react";
import { cn } from "./utils.js";
export type EmptyStateProps = ComponentProps<"div"> & {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div {...props} className={cn("n-empty", className)}>
      {icon && (
        <div className="n-empty-icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3>{title}</h3>
      <p className="n-description">{description}</p>
      {action}
    </div>
  );
}
