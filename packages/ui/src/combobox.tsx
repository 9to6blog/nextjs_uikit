"use client";
import { useState } from "react";
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
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-label={label} disabled={disabled}>
          {options.find((o) => o.value === value)?.label || placeholder}
          <span aria-hidden="true">⌄</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="n-combobox-popover"
        aria-label={`${label} 선택`}
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
                {value === option.value && <span aria-hidden="true">✓</span>}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
