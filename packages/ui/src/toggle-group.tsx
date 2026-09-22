"use client";
import type { ComponentProps } from "react";
import { ToggleGroup as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export function ToggleGroup({
  className,
  ...props
}: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root {...props} className={cn("n-toggle-group", className)} />
  );
}
export function ToggleGroupItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      {...props}
      className={cn("n-toggle-group-item", className)}
    />
  );
}
