"use client";
import { createContext, useContext, useId, type ComponentProps } from "react";
import { Menubar as Primitive } from "radix-ui";
import { cn } from "./utils.js";
import { useUIAttributes } from "./provider.js";
export const MenubarMenu = Primitive.Menu;
export const MenubarTrigger = Primitive.Trigger;
export const MenubarGroup = Primitive.Group;
export const MenubarRadioGroup = Primitive.RadioGroup;
export const MenubarSub = Primitive.Sub;
const MenubarOwner = createContext<string | undefined>(undefined);
export function Menubar({
  className,
  ...props
}: ComponentProps<typeof Primitive.Root>) {
  const owner = useId();
  return (
    <MenubarOwner.Provider value={owner}>
      <Primitive.Root {...props} className={cn("n-menubar", className)} />
    </MenubarOwner.Provider>
  );
}
export function MenubarContent({
  className,
  onFocusOutside,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  const attributes = useUIAttributes();
  const owner = useContext(MenubarOwner);
  return (
    <Primitive.Portal>
      <Primitive.Content
        {...attributes}
        {...props}
        data-n-menubar-owner={owner}
        onFocusOutside={(event) => {
          onFocusOutside?.(event);
          // During an animated menu switch the outgoing layer can still observe
          // focus entering its sibling. That transfer must not close the new menu.
          const target = event.target;
          if (
            owner &&
            target instanceof HTMLElement &&
            target.closest<HTMLElement>("[data-n-menubar-owner]")?.dataset
              .nMenubarOwner === owner
          )
            event.preventDefault();
        }}
        className={cn("n-menubar-content", className)}
      />
    </Primitive.Portal>
  );
}
export function MenubarItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item {...props} className={cn("n-menubar-item", className)} />
  );
}
export function MenubarCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.CheckboxItem>) {
  return (
    <Primitive.CheckboxItem
      {...props}
      className={cn("n-menubar-checkbox-item", "n-menu-check", className)}
    >
      <Primitive.ItemIndicator className="n-menu-indicator">
        ✓
      </Primitive.ItemIndicator>
      {children}
    </Primitive.CheckboxItem>
  );
}
export function MenubarRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.RadioItem>) {
  return (
    <Primitive.RadioItem
      {...props}
      className={cn("n-menubar-radio-item", "n-menu-check", className)}
    >
      <Primitive.ItemIndicator className="n-menu-indicator">
        ✓
      </Primitive.ItemIndicator>
      {children}
    </Primitive.RadioItem>
  );
}
export function MenubarLabel({
  className,
  ...props
}: ComponentProps<typeof Primitive.Label>) {
  return (
    <Primitive.Label {...props} className={cn("n-menubar-label", className)} />
  );
}
export function MenubarSeparator({
  className,
  ...props
}: ComponentProps<typeof Primitive.Separator>) {
  return (
    <Primitive.Separator
      {...props}
      className={cn("n-menubar-separator", className)}
    />
  );
}
export function MenubarSubTrigger({
  className,
  ...props
}: ComponentProps<typeof Primitive.SubTrigger>) {
  return (
    <Primitive.SubTrigger
      {...props}
      className={cn("n-menubar-sub-trigger", className)}
    />
  );
}
export function MenubarSubContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.SubContent>) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.SubContent
        {...attributes}
        {...props}
        className={cn("n-menubar-sub-content", className)}
      />
    </Primitive.Portal>
  );
}
