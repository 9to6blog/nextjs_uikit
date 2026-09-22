"use client";
import type { ComponentProps } from "react";
import { Avatar as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export function Avatar({
  className,
  ...props
}: ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root {...props} className={cn("n-avatar", className)} />;
}
export function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof Primitive.Image>) {
  return (
    <Primitive.Image {...props} className={cn("n-avatar-image", className)} />
  );
}
export function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof Primitive.Fallback>) {
  return (
    <Primitive.Fallback
      {...props}
      className={cn("n-avatar-fallback", className)}
    />
  );
}
