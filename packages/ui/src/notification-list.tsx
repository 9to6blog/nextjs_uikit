"use client";
import { useId, useState, type CSSProperties } from "react";
export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time?: string;
};
export function NotificationList({
  items,
  label = "알림",
  defaultExpanded = false,
}: {
  items: NotificationItem[];
  label?: string;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [hovered, setHovered] = useState(false);
  const open = expanded || hovered;
  const id = useId();
  return (
    <section
      className="n-notifications"
      aria-label={label}
      data-expanded={open}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <div
        id={id}
        className="n-notification-stack"
        style={
          { "--notification-count": Math.max(items.length, 1) } as CSSProperties
        }
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className="n-notification-card"
            aria-hidden={!open && index > 0}
            style={
              {
                "--notification-index": index,
                zIndex: items.length - index,
              } as CSSProperties
            }
          >
            <strong>{item.title}</strong>
            <p>{item.description}</p>
            {item.time && <time>{item.time}</time>}
          </article>
        ))}
        {items.length === 0 && <p>새 알림이 없습니다.</p>}
      </div>
      <button
        type="button"
        className="n-notification-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setHovered(false);
          setExpanded(!open);
        }}
      >
        <span>{items.length}</span>
        {open ? "알림 접기" : "알림 모두 보기"}
      </button>
    </section>
  );
}
