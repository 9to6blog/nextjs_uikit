"use client";
import type { ComponentProps } from "react";
import { Toggle as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export function Toggle({
  className,
  ...props
}: ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root {...props} className={cn("n-toggle", className)} />;
}
