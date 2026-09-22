"use client";
import {
  createContext,
  useContext,
  useId,
  useState,
  type ComponentProps,
} from "react";
import { Button } from "./button.js";
import { cn } from "./utils.js";
const SidebarContext = createContext({
  open: true,
  toggle: () => {},
  id: "sidebar",
});
export function SidebarProvider({
  children,
  defaultOpen = true,
  className,
  ...props
}: ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <SidebarContext.Provider
      value={{ open, toggle: () => setOpen((v) => !v), id }}
    >
      <div {...props} className={cn("n-sidebar-layout", className)}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}
export function Sidebar({ className, ...props }: ComponentProps<"aside">) {
  const { open, id } = useContext(SidebarContext);
  return (
    <aside
      {...props}
      id={id}
      inert={!open}
      aria-hidden={!open}
      data-open={open}
      className={cn("n-sidebar", className)}
    />
  );
}
export function SidebarTrigger({
  children = "메뉴",
  ...props
}: ComponentProps<typeof Button>) {
  const { open, toggle, id } = useContext(SidebarContext);
  return (
    <Button
      variant="ghost"
      {...props}
      aria-controls={id}
      aria-expanded={open}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
    >
      {children}
    </Button>
  );
}
export function SidebarContent({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-sidebar-content", className)} />;
}
export function SidebarInset({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-sidebar-inset", className)} />;
}
export function SidebarGroup({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-sidebar-group", className)} />;
}
export function SidebarGroupLabel({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div {...props} className={cn("n-sidebar-group-label", className)} />;
}
export function SidebarMenuButton({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      {...props}
      className={cn("n-sidebar-menu-button", className)}
    />
  );
}
