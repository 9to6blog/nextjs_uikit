"use client";
import type { ComponentProps } from "react";
import { Tooltip as Primitive } from "radix-ui";
import { useUIAttributes } from "./provider.js";
import { cn } from "./utils.js";
export const TooltipProvider = Primitive.Provider;
export const Tooltip = Primitive.Root;
export const TooltipTrigger = Primitive.Trigger;
export function TooltipContent({
  className,
  sideOffset = 8,
  children,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.Content
        {...attributes}
        {...props}
        sideOffset={sideOffset}
        className={cn("n-tooltip", className)}
      >
        {children}
        <Primitive.Arrow className="n-tooltip-arrow" width={10} height={5} />
      </Primitive.Content>
    </Primitive.Portal>
  );
}
