"use client";
import {
  DayPicker,
  getDefaultClassNames,
  type DayPickerProps,
} from "react-day-picker";
import { cn } from "./utils.js";
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      {...props}
      showOutsideDays={showOutsideDays}
      className={cn("n-calendar", className)}
      classNames={{ ...getDefaultClassNames(), ...classNames }}
    />
  );
}
export type { DateRange, DayPickerProps } from "react-day-picker";
