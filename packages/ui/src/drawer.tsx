"use client";
import type { ComponentProps } from "react";
import { Drawer as Primitive } from "vaul";
import { useUIAttributes } from "./provider.js";
import { cn } from "./utils.js";
export const Drawer = Primitive.Root;
export const DrawerTrigger = Primitive.Trigger;
export const DrawerClose = Primitive.Close;
export const DrawerTitle = Primitive.Title;
export const DrawerDescription = Primitive.Description;
export function DrawerContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.Overlay {...attributes} className="n-dialog-overlay" />
      <Primitive.Content
        {...attributes}
        {...props}
        className={cn("n-drawer", className)}
      >
        <div className="n-drawer-handle" aria-hidden="true" />
        {children}
      </Primitive.Content>
    </Primitive.Portal>
  );
}
