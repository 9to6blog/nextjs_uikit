"use client";
import type { ComponentProps } from "react";
import { NavigationMenu as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export const NavigationMenuSub = Primitive.Sub;
export function NavigationMenu({
  className,
  ...props
}: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root {...props} className={cn("n-navigation-menu", className)} />
  );
}
export function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof Primitive.List>) {
  return (
    <Primitive.List
      {...props}
      className={cn("n-navigation-menu-list", className)}
    />
  );
}
export function NavigationMenuItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      {...props}
      className={cn("n-navigation-menu-item", className)}
    />
  );
}
export function NavigationMenuTrigger({
  className,
  ...props
}: ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Trigger
      {...props}
      className={cn("n-navigation-menu-trigger", className)}
    />
  );
}
export function NavigationMenuContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content
      {...props}
      className={cn("n-navigation-menu-content", className)}
    />
  );
}
export function NavigationMenuLink({
  className,
  ...props
}: ComponentProps<typeof Primitive.Link>) {
  return (
    <Primitive.Link
      {...props}
      className={cn("n-navigation-menu-link", className)}
    />
  );
}
export function NavigationMenuIndicator({
  className,
  ...props
}: ComponentProps<typeof Primitive.Indicator>) {
  return (
    <Primitive.Indicator
      {...props}
      className={cn("n-navigation-menu-indicator", className)}
    />
  );
}
export function NavigationMenuViewport({
  className,
  ...props
}: ComponentProps<typeof Primitive.Viewport>) {
  return (
    <Primitive.Viewport
      {...props}
      className={cn("n-navigation-menu-viewport", className)}
    />
  );
}
