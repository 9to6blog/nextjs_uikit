"use client";
import { useEffect, useRef } from "react";

/** One shared surface follows pointer or keyboard focus without moving content. */
export function MovingHighlight({
  selector,
  variant = "surface",
}: {
  selector: string;
  variant?: "surface" | "line";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const indicator = ref.current;
    const root = indicator?.parentElement;
    if (!root || !indicator) return;
    root.dataset.nHighlightRoot = "";
    let active: HTMLElement | null = null;
    let hovered: HTMLElement | null = null;
    let focused: HTMLElement | null = null;
    const selected = () =>
      Array.from(root.querySelectorAll<HTMLElement>(selector)).find((item) =>
        item.matches(
          '[aria-current="page"], [aria-pressed="true"], [aria-selected="true"], [data-active="true"], [data-state="active"]',
        ),
      ) ?? null;
    const measure = () => {
      active =
        [hovered, focused, selected()].find(
          (item) => item && root.contains(item),
        ) ?? null;
      if (!active) {
        indicator.style.opacity = "0";
        return;
      }
      // offset geometry is unaffected by the parent's popup entrance transform.
      let x = 0,
        y = 0,
        element: HTMLElement | null = active;
      while (element && element !== root) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      }
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.height = `${active.offsetHeight}px`;
      indicator.style.transform = `translate(${x}px, ${y}px)`;
      indicator.style.opacity = "1";
    };
    const track = (event: Event) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(selector)
          : null;
      if (
        target &&
        root.contains(target) &&
        !target.hasAttribute("data-disabled") &&
        target.getAttribute("aria-disabled") !== "true"
      ) {
        if (event.type === "focusin") focused = target;
        else hovered = target;
        measure();
      }
    };
    const leave = (event: Event) => {
      if (event.type === "focusout") focused = null;
      else hovered = null;
      measure();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(root);
    const mutations = new MutationObserver(measure);
    mutations.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        "aria-current",
        "aria-pressed",
        "aria-selected",
        "data-active",
        "data-state",
      ],
    });
    measure();
    root.addEventListener("pointermove", track);
    root.addEventListener("focusin", track);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("focusout", leave);
    return () => {
      resize.disconnect();
      mutations.disconnect();
      root.removeEventListener("pointermove", track);
      root.removeEventListener("focusin", track);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusout", leave);
      delete root.dataset.nHighlightRoot;
    };
  }, [selector]);
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="n-moving-highlight"
      data-variant={variant}
    />
  );
}
