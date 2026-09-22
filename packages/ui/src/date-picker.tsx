"use client";
import { Icon } from "./icons.js";
import { useState } from "react";
import { Calendar } from "./calendar.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { Button } from "./button.js";
import type { DayPickerProps } from "react-day-picker";
export type DatePickerProps = {
  value?: Date;
  onValueChange: (date: Date | undefined) => void;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  locale?: string;
  calendarProps?: Omit<
    DayPickerProps,
    "mode" | "selected" | "onSelect" | "required"
  >;
};
export function DatePicker({
  value,
  onValueChange,
  label,
  placeholder = "날짜 선택",
  disabled,
  locale = "ko-KR",
  calendarProps,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          aria-label={`${label}: ${value ? value.toLocaleDateString(locale) : placeholder}`}
        >
          {value
            ? value.toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : placeholder}
          <Icon name="calendar" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="n-calendar-popover" aria-label={label}>
        <Calendar
          {...calendarProps}
          mode="single"
          selected={value}
          defaultMonth={value ?? calendarProps?.defaultMonth}
          onSelect={(date) => {
            onValueChange(date);
            setOpen(false);
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
