import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function NativeSelect({
  className,
  ...props
}: ComponentProps<"select">) {
  return <select {...props} className={cn("n-native-select", className)} />;
}
export function NativeSelectOption({
  className,
  ...props
}: ComponentProps<"option">) {
  return <option {...props} className={cn("", className)} />;
}
export function NativeSelectOptGroup({
  className,
  ...props
}: ComponentProps<"optgroup">) {
  return <optgroup {...props} className={cn("", className)} />;
}
