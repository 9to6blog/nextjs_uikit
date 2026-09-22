"use client";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { DropdownMenu as Primitive } from "radix-ui";
import { useUIAttributes } from "./provider.js";
export type RadialMenuItem = {
  id: string;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
};
/** A centered context menu with Radix's roving focus and dismissal behavior. */
export function RadialMenu({
  items,
  children,
  label = "원형 메뉴",
}: {
  items: RadialMenuItem[];
  children: ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trigger = useRef<HTMLDivElement>(null);
  const attributes = useUIAttributes();
  function show(x: number, y: number) {
    setPosition({
      x: Math.max(8, Math.min(x - 112, window.innerWidth - 232)),
      y: Math.max(8, Math.min(y - 112, window.innerHeight - 232)),
    });
    setOpen(true);
  }
  const count = items.length;
  return (
    <Primitive.Root open={open} onOpenChange={setOpen}>
      <div
        ref={trigger}
        className="n-radial-trigger"
        role="button"
        tabIndex={0}
        aria-label={`${label} 열기`}
        aria-haspopup="menu"
        aria-expanded={open}
        onContextMenu={(event) => {
          event.preventDefault();
          show(event.clientX, event.clientY);
        }}
        onKeyDown={(event) => {
          if (
            event.key === "ContextMenu" ||
            (event.shiftKey && event.key === "F10") ||
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            const rect = event.currentTarget.getBoundingClientRect();
            show(rect.x + rect.width / 2, rect.y + rect.height / 2);
          }
        }}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          show(
            event.detail === 0 ? rect.x + rect.width / 2 : event.clientX,
            event.detail === 0 ? rect.y + rect.height / 2 : event.clientY,
          );
        }}
      >
        {children}
      </div>
      <Primitive.Trigger
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: 0,
          height: 0,
          padding: 0,
          border: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <Primitive.Portal>
        <Primitive.Content
          {...attributes}
          className="n-radial-menu"
          aria-label={label}
          side="bottom"
          align="start"
          sideOffset={0}
          avoidCollisions={false}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            trigger.current?.focus({ preventScroll: true });
          }}
        >
          {items.map((item, index) => {
            const angle = (index * Math.PI * 2) / count - Math.PI / 2;
            const half = Math.PI / count - 0.008;
            const points = [
              [50, 50],
              ...Array.from({ length: 13 }, (_, i) => {
                const a = angle - half + (i * half) / 6;
                return [50 + 50 * Math.cos(a), 50 + 50 * Math.sin(a)];
              }),
            ];
            return (
              <Primitive.Item
                key={item.id}
                asChild
                disabled={item.disabled}
                onSelect={item.onSelect}
              >
                <button
                  type="button"
                  aria-label={item.label}
                  className="n-radial-item"
                  style={
                    {
                      clipPath: `polygon(${points.map((p) => p.map((n) => `${n}%`).join(" ")).join(",")})`,
                      "--radial-x": `${50 + 34 * Math.cos(angle)}%`,
                      "--radial-y": `${50 + 34 * Math.sin(angle)}%`,
                    } as CSSProperties
                  }
                >
                  <span aria-hidden="true">{item.icon}</span>
                </button>
              </Primitive.Item>
            );
          })}
          <span className="n-radial-center" aria-hidden="true" />
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
