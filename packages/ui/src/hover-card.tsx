"use client";
import type { ComponentProps } from "react";
import { HoverCard as Primitive } from "radix-ui";
import { cn } from "./utils.js";
import { useUIAttributes } from "./provider.js";
export const HoverCard = Primitive.Root;
export const HoverCardTrigger = Primitive.Trigger;
export function HoverCardContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.Content
        {...attributes}
        {...props}
        className={cn("n-hover-card-content", className)}
      />
    </Primitive.Portal>
  );
}
