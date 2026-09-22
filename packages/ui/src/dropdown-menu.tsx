"use client";
import type { ComponentProps } from "react";
import { DropdownMenu as Primitive } from "radix-ui";
import { cn } from "./utils.js";
import { useUIAttributes } from "./provider.js";
import { MovingHighlight } from "./moving-highlight.js";
export const DropdownMenu = Primitive.Root;
export const DropdownMenuTrigger = Primitive.Trigger;
export const DropdownMenuGroup = Primitive.Group;
export const DropdownMenuRadioGroup = Primitive.RadioGroup;
export const DropdownMenuSub = Primitive.Sub;
export function DropdownMenuContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.Content
        {...attributes}
        {...props}
        className={cn("n-dropdown-menu-content", className)}
      >
        <MovingHighlight selector="[role^=menuitem]" />
        {children}
      </Primitive.Content>
    </Primitive.Portal>
  );
}
export function DropdownMenuItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      {...props}
      className={cn("n-dropdown-menu-item", className)}
    />
  );
}
export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.CheckboxItem>) {
  return (
    <Primitive.CheckboxItem
      {...props}
      className={cn("n-dropdown-menu-checkbox-item", "n-menu-check", className)}
    >
      <Primitive.ItemIndicator className="n-menu-indicator">
        ✓
      </Primitive.ItemIndicator>
      {children}
    </Primitive.CheckboxItem>
  );
}
export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.RadioItem>) {
  return (
    <Primitive.RadioItem
      {...props}
      className={cn("n-dropdown-menu-radio-item", "n-menu-check", className)}
    >
      <Primitive.ItemIndicator className="n-menu-indicator">
        ✓
      </Primitive.ItemIndicator>
      {children}
    </Primitive.RadioItem>
  );
}
export function DropdownMenuLabel({
  className,
  ...props
}: ComponentProps<typeof Primitive.Label>) {
  return (
    <Primitive.Label
      {...props}
      className={cn("n-dropdown-menu-label", className)}
    />
  );
}
export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof Primitive.Separator>) {
  return (
    <Primitive.Separator
      {...props}
      className={cn("n-dropdown-menu-separator", className)}
    />
  );
}
export function DropdownMenuSubTrigger({
  className,
  ...props
}: ComponentProps<typeof Primitive.SubTrigger>) {
  return (
    <Primitive.SubTrigger
      {...props}
      className={cn("n-dropdown-menu-sub-trigger", className)}
    />
  );
}
export function DropdownMenuSubContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.SubContent>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.SubContent
        {...attributes}
        {...props}
        className={cn("n-dropdown-menu-sub-content", className)}
      >
        <MovingHighlight selector="[role^=menuitem]" />
        {children}
      </Primitive.SubContent>
    </Primitive.Portal>
  );
}
