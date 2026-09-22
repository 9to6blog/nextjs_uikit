"use client";
import type { ComponentProps } from "react";
import { Slider as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export function Slider({
  className,
  thumbLabels,
  ...props
}: ComponentProps<typeof Primitive.Root> & { thumbLabels?: string[] }) {
  const values = props.value ?? props.defaultValue ?? [0];
  return (
    <Primitive.Root {...props} className={cn("n-slider", className)}>
      <Primitive.Track className="n-slider-track">
        <Primitive.Range className="n-slider-range" />
      </Primitive.Track>
      {values.map((_, i) => (
        <Primitive.Thumb
          key={i}
          aria-label={
            thumbLabels?.[i] ?? props["aria-label"] ?? `Value ${i + 1}`
          }
          className="n-slider-thumb"
        />
      ))}
    </Primitive.Root>
  );
}
