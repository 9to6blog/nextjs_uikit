"use client";
import type { ComponentProps } from "react";
import { Popover as Primitive } from "radix-ui";
import { useUIAttributes } from "./provider.js";
import { cn } from "./utils.js";
export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;
export const PopoverClose = Primitive.Close;
export function PopoverContent({
  className,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.Content
        {...attributes}
        {...props}
        sideOffset={sideOffset}
        className={cn("n-popover", className)}
      />
    </Primitive.Portal>
  );
}
