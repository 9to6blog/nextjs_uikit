"use client";
import type { ComponentProps } from "react";
import { Command as Primitive } from "cmdk";
import { cn } from "./utils.js";
export function Command({
  className,
  ...props
}: ComponentProps<typeof Primitive>) {
  return <Primitive {...props} className={cn("n-command", className)} />;
}
export function CommandInput({
  className,
  ...props
}: ComponentProps<typeof Primitive.Input>) {
  return (
    <Primitive.Input {...props} className={cn("n-command-input", className)} />
  );
}
export function CommandList({
  className,
  ...props
}: ComponentProps<typeof Primitive.List>) {
  return (
    <Primitive.List {...props} className={cn("n-command-list", className)} />
  );
}
export function CommandItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item {...props} className={cn("n-command-item", className)} />
  );
}
export function CommandEmpty({
  className,
  ...props
}: ComponentProps<typeof Primitive.Empty>) {
  return (
    <Primitive.Empty {...props} className={cn("n-command-empty", className)} />
  );
}
export function CommandGroup({
  className,
  ...props
}: ComponentProps<typeof Primitive.Group>) {
  return (
    <Primitive.Group {...props} className={cn("n-command-group", className)} />
  );
}
export const CommandSeparator = Primitive.Separator;
export const CommandLoading = Primitive.Loading;
