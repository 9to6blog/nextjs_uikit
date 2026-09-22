"use client";
import type { ComponentProps } from "react";
import { Collapsible as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export const Collapsible = Primitive.Root;
export const CollapsibleTrigger = Primitive.Trigger;
export function CollapsibleContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content
      {...props}
      className={cn("n-collapsible-content", className)}
    />
  );
}
