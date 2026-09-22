"use client";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "./use-reduced-motion.js";
export type PinnedListItem = {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
};
export function PinnedList({
  items,
  value,
  defaultValue = [],
  onValueChange,
  label = "항목 고정",
}: {
  items: PinnedListItem[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (ids: string[]) => void;
  label?: string;
}) {
  const [local, setLocal] = useState(defaultValue);
  const pinned = value ?? local;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef(new Map<string, DOMRect>());
  const animations = useRef<Animation[]>([]);
  const restoreFocus = useRef<HTMLButtonElement | null>(null);
  useLayoutEffect(() => {
    if (restoreFocus.current?.isConnected)
      restoreFocus.current.focus({ preventScroll: true });
    restoreFocus.current = null;
  });
  const ordered = [
    ...items.filter((i) => pinned.includes(i.id)),
    ...items.filter((i) => !pinned.includes(i.id)),
  ];
  const count = items.filter((i) => pinned.includes(i.id)).length;
  useLayoutEffect(() => {
    const nodes = ref.current?.querySelectorAll<HTMLElement>("[data-pin-id]");
    if (!nodes) return;
    animations.current.forEach((a) => a.cancel());
    animations.current = [];
    const next = new Map<string, DOMRect>();
    nodes.forEach((node) => {
      const id = node.dataset.pinId!;
      const rect = node.getBoundingClientRect();
      const before = previous.current.get(id);
      next.set(id, rect);
      if (!reduced && before && before.top !== rect.top)
        animations.current.push(
          node.animate(
            [
              { transform: `translateY(${before.top - rect.top}px)` },
              { transform: "translateY(0)" },
            ],
            { duration: 500, easing: "cubic-bezier(.22,1,.36,1)" },
          ),
        );
    });
    previous.current = next;
  }, [pinned, items, reduced]);
  return (
    <div ref={ref} className="n-pinned-list" role="group" aria-label={label}>
      {ordered.map((item, index) => (
        <div
          key={item.id}
          data-pin-id={item.id}
          className="n-pin-row"
          data-pinned={pinned.includes(item.id)}
        >
          {index === count && <p className="n-pin-group-label">All items</p>}
          <span className="n-pin-icon" aria-hidden="true">
            {item.icon ?? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="m12 3 8 5v8l-8 5-8-5V8Zm-8 5 8 5 8-5M12 13v8" />
              </svg>
            )}
          </span>
          <span className="n-pin-copy">
            <strong>{item.title}</strong>
            {item.description && <small>{item.description}</small>}
          </span>
          <button
            type="button"
            aria-label={`${item.title} ${pinned.includes(item.id) ? "고정 해제" : "고정"}`}
            aria-pressed={pinned.includes(item.id)}
            onClick={(event) => {
              restoreFocus.current =
                document.activeElement === event.currentTarget
                  ? event.currentTarget
                  : null;
              const next = pinned.includes(item.id)
                ? pinned.filter((id) => id !== item.id)
                : [...pinned, item.id];
              setLocal(next);
              onValueChange?.(next);
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M9 3h6l-1 6 4 4v2H6v-2l4-4ZM12 15v7" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
