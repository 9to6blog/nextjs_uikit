"use client";
import { useSyncExternalStore } from "react";
import { useUIAttributes } from "./provider.js";
function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function snapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
export function useReducedMotion() {
  const system = useSyncExternalStore(subscribe, snapshot, () => true);
  const attributes = useUIAttributes();
  return system || attributes["data-motion"] === "reduced";
}
