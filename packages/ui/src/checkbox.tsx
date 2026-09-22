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
      <Primitive.Indicator
        forceMount
        className="n-checkbox-indicator"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="n-checkbox-check"
            pathLength="1"
            d="M4.5 12.75 10.5 18.75 19.5 5.25"
          />
          <path className="n-checkbox-minus" pathLength="1" d="M5 12H19" />
        </svg>
      </Primitive.Indicator>
    </Primitive.Root>
  );
}
