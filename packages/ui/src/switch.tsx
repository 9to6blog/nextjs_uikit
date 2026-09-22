"use client";
import type { ComponentProps } from "react";
import { Switch as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export function Switch({
  className,
  ...props
}: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root
      {...props}
      data-slot="switch"
      className={cn("n-switch", className)}
    >
      <Primitive.Thumb className="n-switch-thumb" />
    </Primitive.Root>
  );
}
