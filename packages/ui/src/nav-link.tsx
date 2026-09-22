"use client";
import Link from "next/link.js";
import { usePathname } from "next/navigation.js";
import type { ComponentProps, ComponentType } from "react";
import type { LinkProps } from "next/link.js";
import { cn } from "./utils.js";
// Next.js exposes default interop differently between NodeNext and the app bundler.
const NextLink = Link as unknown as ComponentType<
  LinkProps & ComponentProps<"a">
>;
export function NavLink({
  href,
  exact = false,
  className,
  ...props
}: Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const normalized = href === "/" ? href : href.replace(/\/$/, "");
  const current = pathname === "/" ? pathname : pathname?.replace(/\/$/, "");
  const active =
    exact || normalized === "/"
      ? current === normalized
      : current === normalized || current?.startsWith(`${normalized}/`);
  return (
    <NextLink
      {...props}
      href={href}
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      className={cn("n-nav-link", className)}
    />
  );
}
