"use client";
import { Icon } from "./icons.js";
import type { ComponentProps } from "react";
import { ContextMenu as Primitive } from "radix-ui";
import { cn } from "./utils.js";
import { useUIAttributes } from "./provider.js";
export const ContextMenu = Primitive.Root;
export function ContextMenuTrigger({
  disabled,
  tabIndex,
  onKeyDown,
  ...props
}: ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Trigger
      {...props}
      disabled={disabled}
      tabIndex={tabIndex ?? (disabled ? -1 : 0)}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (disabled || event.defaultPrevented) return;
        if (
          event.key === "ContextMenu" ||
          (event.shiftKey && event.key === "F10")
        ) {
          // Browsers differ in whether they dispatch a contextmenu event for
          // these keys. Prevent the native action and open through Radix's
          // existing contextmenu path at the focused trigger's position.
          event.preventDefault();
          const trigger = event.currentTarget;
          const rect = trigger.getBoundingClientRect();
          trigger.dispatchEvent(
            new MouseEvent("contextmenu", {
              bubbles: true,
              cancelable: true,
              clientX: rect.left + Math.min(8, rect.width / 2),
              clientY: rect.bottom,
            }),
          );
        }
      }}
    />
  );
}
export const ContextMenuGroup = Primitive.Group;
export const ContextMenuRadioGroup = Primitive.RadioGroup;
export const ContextMenuSub = Primitive.Sub;
export function ContextMenuContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.Content
        {...attributes}
        {...props}
        className={cn("n-context-menu-content", className)}
      />
    </Primitive.Portal>
  );
}
export function ContextMenuItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      {...props}
      className={cn("n-context-menu-item", className)}
    />
  );
}
export function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.CheckboxItem>) {
  return (
    <Primitive.CheckboxItem
      {...props}
      className={cn("n-context-menu-checkbox-item", "n-menu-check", className)}
    >
      <Primitive.ItemIndicator className="n-menu-indicator">
        <Icon name="check" />
      </Primitive.ItemIndicator>
      {children}
    </Primitive.CheckboxItem>
  );
}
export function ContextMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.RadioItem>) {
  return (
    <Primitive.RadioItem
      {...props}
      className={cn("n-context-menu-radio-item", "n-menu-check", className)}
    >
      <Primitive.ItemIndicator className="n-menu-indicator">
        <Icon name="check" />
      </Primitive.ItemIndicator>
      {children}
    </Primitive.RadioItem>
  );
}
export function ContextMenuLabel({
  className,
  ...props
}: ComponentProps<typeof Primitive.Label>) {
  return (
    <Primitive.Label
      {...props}
      className={cn("n-context-menu-label", className)}
    />
  );
}
export function ContextMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof Primitive.Separator>) {
  return (
    <Primitive.Separator
      {...props}
      className={cn("n-context-menu-separator", className)}
    />
  );
}
export function ContextMenuSubTrigger({
  className,
  ...props
}: ComponentProps<typeof Primitive.SubTrigger>) {
  return (
    <Primitive.SubTrigger
      {...props}
      className={cn("n-context-menu-sub-trigger", className)}
    />
  );
}
export function ContextMenuSubContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.SubContent>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.SubContent
        {...attributes}
        {...props}
        className={cn("n-context-menu-sub-content", className)}
      />
    </Primitive.Portal>
  );
}
