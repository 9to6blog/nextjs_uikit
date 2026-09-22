"use client";
import type { ComponentProps } from "react";
import { Checkbox as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export function Checkbox({
  className,
  ...props
}: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root {...props} className={cn("n-checkbox", className)}>
      <Primitive.Indicator className="n-checkbox-indicator">
        {props.checked === "indeterminate" ||
        props.defaultChecked === "indeterminate"
          ? "−"
          : "✓"}
      </Primitive.Indicator>
    </Primitive.Root>
  );
}
