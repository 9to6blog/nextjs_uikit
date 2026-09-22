"use client";
import type { ComponentProps } from "react";
import { ScrollArea as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export function ScrollArea({
  className,
  ...props
}: ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root {...props} className={cn("n-scroll-area", className)} />
  );
}
export function ScrollAreaViewport({
  className,
  ...props
}: ComponentProps<typeof Primitive.Viewport>) {
  return (
    <Primitive.Viewport
      {...props}
      className={cn("n-scroll-area-viewport", className)}
    />
  );
}
export function ScrollAreaScrollbar({
  className,
  ...props
}: ComponentProps<typeof Primitive.Scrollbar>) {
  return (
    <Primitive.Scrollbar
      {...props}
      className={cn("n-scroll-area-scrollbar", className)}
    />
  );
}
export function ScrollAreaThumb({
  className,
  ...props
}: ComponentProps<typeof Primitive.Thumb>) {
  return (
    <Primitive.Thumb
      {...props}
      className={cn("n-scroll-area-thumb", className)}
    />
  );
}
export function ScrollAreaCorner({
  className,
  ...props
}: ComponentProps<typeof Primitive.Corner>) {
  return (
    <Primitive.Corner
      {...props}
      className={cn("n-scroll-area-corner", className)}
    />
  );
}
