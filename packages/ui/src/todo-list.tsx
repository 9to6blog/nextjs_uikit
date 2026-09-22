"use client";
import { useState } from "react";
import { Checkbox } from "./checkbox.js";
export type TodoItem = { id: string; label: string; disabled?: boolean };
export function TodoList({
  items,
  value,
  defaultValue = [],
  onValueChange,
  label = "할 일",
}: {
  items: TodoItem[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (ids: string[]) => void;
  label?: string;
}) {
  const [local, setLocal] = useState(defaultValue);
  const checked = value ?? local;
  return (
    <div className="n-todo-list" role="group" aria-label={label}>
      {items.map((item) => (
        <label
          key={item.id}
          className="n-todo-row"
          data-complete={checked.includes(item.id)}
        >
          <Checkbox
            disabled={item.disabled}
            checked={checked.includes(item.id)}
            onCheckedChange={(on) => {
              const next = on
                ? [...checked, item.id]
                : checked.filter((id) => id !== item.id);
              setLocal(next);
              onValueChange?.(next);
            }}
          />
          <span>
            {item.label}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 24"
              preserveAspectRatio="none"
            >
              <path
                pathLength="1"
                d="M1 14Q30 3 69 12T139 9T199 13M198 5Q144 21 92 11T2 18M4 6Q65 20 119 9T196 18"
              />
            </svg>
          </span>
        </label>
      ))}
    </div>
  );
}
