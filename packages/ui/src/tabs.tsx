"use client";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
} from "react";
import { Tabs as Primitive } from "radix-ui";
import { cn } from "./utils.js";
export const Tabs = Primitive.Root;
export function TabsList({
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Primitive.List>, "ref">) {
  const ref = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<CSSProperties>({ opacity: 0 });
  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>(
        '[role="tab"][data-state="active"]',
      );
      if (active)
        setIndicator({
          width: active.offsetWidth,
          height: active.offsetHeight,
          transform: `translate(${active.offsetLeft}px, ${active.offsetTop}px)`,
          opacity: 1,
        });
    };
    const observer = new MutationObserver(measure);
    observer.observe(list, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state"],
      childList: true,
    });
    const resize = new ResizeObserver(measure);
    resize.observe(list);
    measure();
    return () => {
      observer.disconnect();
      resize.disconnect();
    };
  }, []);
  return (
    <Primitive.List
      {...props}
      ref={ref}
      className={cn("n-tabs-list", className)}
    >
      <span aria-hidden="true" className="n-tabs-indicator" style={indicator} />
      {children}
    </Primitive.List>
  );
}
export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Trigger {...props} className={cn("n-tabs-trigger", className)} />
  );
}
export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content {...props} className={cn("n-tabs-content", className)} />
  );
}
