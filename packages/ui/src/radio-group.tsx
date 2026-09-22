"use client";
import type { ComponentProps } from "react";
import { RadioGroup as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export function RadioGroup({
  className,
  ...props
}: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root {...props} className={cn("n-radio-group", className)} />
  );
}
export function RadioGroupItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item {...props} className={cn("n-radio-group-item", className)}>
      <Primitive.Indicator
        forceMount
        className="n-radio-indicator"
        aria-hidden="true"
      />
    </Primitive.Item>
  );
}
