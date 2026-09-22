"use client";
import { useEffect, useRef, type ComponentProps } from "react";
import { cn } from "./utils.js";
export function AnimatedSize({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = outer.current,
      content = inner.current;
    if (!host || !content) return;
    const update = () => {
      host.style.height = `${content.offsetHeight}px`;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);
  return (
    <div {...props} ref={outer} className={cn("n-animated-size", className)}>
      <div ref={inner} className="n-animated-size-inner">
        {children}
      </div>
    </div>
  );
}
