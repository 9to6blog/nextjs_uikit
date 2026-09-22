"use client";
import type { ComponentProps } from "react";
import { Accordion as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export const Accordion = Primitive.Root;
export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item {...props} className={cn("n-accordion-item", className)} />
  );
}
export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Header className="n-accordion-heading">
      <Primitive.Trigger
        {...props}
        className={cn("n-accordion-trigger", className)}
      >
        {children}
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Primitive.Trigger>
    </Primitive.Header>
  );
}
export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content
      {...props}
      className={cn("n-accordion-content", className)}
    >
      <div className="n-accordion-inner">{children}</div>
    </Primitive.Content>
  );
}
