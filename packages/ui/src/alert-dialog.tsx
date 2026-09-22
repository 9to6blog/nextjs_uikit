"use client";
import type { ComponentProps } from "react";
import { AlertDialog as Primitive } from "radix-ui";
import { cn } from "./utils.js";
import { useUIAttributes } from "./provider.js";
export const AlertDialog = Primitive.Root;
export const AlertDialogTrigger = Primitive.Trigger;
export const AlertDialogAction = Primitive.Action;
export const AlertDialogCancel = Primitive.Cancel;
export function AlertDialogContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.Overlay {...attributes} className="n-dialog-overlay" />
      <Primitive.Content
        {...attributes}
        {...props}
        className={cn("n-dialog-content", className)}
      />
    </Primitive.Portal>
  );
}
export function AlertDialogTitle({
  className,
  ...props
}: ComponentProps<typeof Primitive.Title>) {
  return (
    <Primitive.Title
      {...props}
      className={cn("n-alert-dialog-title", className)}
    />
  );
}
export function AlertDialogDescription({
  className,
  ...props
}: ComponentProps<typeof Primitive.Description>) {
  return (
    <Primitive.Description
      {...props}
      className={cn("n-alert-dialog-description", className)}
    />
  );
}
