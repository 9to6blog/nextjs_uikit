"use client";
import { useState, type CSSProperties } from "react";
import { Icon } from "./icons.js";
import { cn } from "./utils.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { Button } from "./button.js";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "./command.js";
export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
  keywords?: string[];
};
export type ComboboxProps = {
  className?: string;
  style?: CSSProperties;
  contentMinWidth?: number | string;
  options: ComboboxOption[];
  value?: string;
  onValueChange: (value: string) => void;
  label: string;
  placeholder?: string;
  emptyLabel?: string;
  disabled?: boolean;
};
export function Combobox({
  options,
  value,
  onValueChange,
  label,
  placeholder = "선택하세요",
  emptyLabel = "검색 결과가 없습니다",
  disabled,
  className,
  style,
  contentMinWidth = 240,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-label={label}
          disabled={disabled}
          className={cn("n-combobox-trigger", className)}
          style={style}
        >
          {options.find((o) => o.value === value)?.label || placeholder}
          <Icon name="chevron-down" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="n-combobox-popover"
        aria-label={`${label} 선택`}
        align="start"
        style={
          {
            "--n-combobox-min-width":
              typeof contentMinWidth === "number"
                ? `${contentMinWidth}px`
                : contentMinWidth,
          } as CSSProperties
        }
      >
        <Command label={`${label} 검색`}>
          <CommandInput
            placeholder={`${label} 검색`}
            aria-label={`${label} 검색`}
          />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                keywords={[option.label, ...(option.keywords ?? [])]}
                disabled={option.disabled}
                onSelect={() => {
                  onValueChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {value === option.value && <Icon name="check" />}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
