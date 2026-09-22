import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Breadcrumb({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Breadcrumb"
      {...props}
      className={cn("n-breadcrumb", className)}
    />
  );
}
export function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return <ol {...props} className={cn("n-breadcrumb-list", className)} />;
}
export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return <li {...props} className={cn("n-breadcrumb-item", className)} />;
}
export function BreadcrumbLink({ className, ...props }: ComponentProps<"a">) {
  return <a {...props} className={cn("n-breadcrumb-link", className)} />;
}
export function BreadcrumbPage({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      {...props}
      className={cn("n-breadcrumb-page", className)}
    />
  );
}
