"use client";
import { Icon } from "./icons.js";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Button } from "./button.js";
import { cn } from "./utils.js";
export function MessageScroller({
  children,
  className,
  label = "대화 내역",
  ...props
}: ComponentProps<"div"> & { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pinned = useRef(true);
  const [atBottom, setAtBottom] = useState(true);
  useEffect(() => {
    const viewport = ref.current,
      inner = content.current;
    if (!viewport || !inner) return;
    const observer = new ResizeObserver(() => {
      if (pinned.current) viewport.scrollTop = viewport.scrollHeight;
    });
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="n-message-scroller-shell">
      <div
        {...props}
        ref={ref}
        role="region"
        tabIndex={0}
        aria-label={label}
        className={cn("n-message-scroller", className)}
        onScroll={(event) => {
          props.onScroll?.(event);
          const el = event.currentTarget;
          const bottom = el.scrollHeight - el.clientHeight - el.scrollTop < 24;
          pinned.current = bottom;
          setAtBottom(bottom);
        }}
      >
        <div ref={content}>{children}</div>
      </div>
      {!atBottom && (
        <Button
          size="sm"
          variant="secondary"
          className="n-scroll-bottom"
          onClick={() => {
            const el = ref.current;
            if (el) el.scrollTop = el.scrollHeight;
            pinned.current = true;
            setAtBottom(true);
          }}
        >
          최신 메시지 <Icon name="arrow-down" />
        </Button>
      )}
    </div>
  );
}
