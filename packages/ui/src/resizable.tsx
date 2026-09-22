"use client";
import type { ComponentProps } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { cn } from "./utils.js";
export const ResizablePanel = Panel;
export function ResizablePanelGroup({
  className,
  ...props
}: ComponentProps<typeof Group>) {
  return <Group {...props} className={cn("n-resizable", className)} />;
}
export function ResizableHandle({
  className,
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator {...props} className={cn("n-resizable-handle", className)}>
      <span aria-hidden="true">⋮</span>
    </Separator>
  );
}
