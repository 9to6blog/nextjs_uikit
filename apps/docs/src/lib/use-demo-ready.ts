"use client";
import { useEffect } from "react";

// A lazy demo's own effect runs after its interactive descendants hydrate.
// Expose that fact for browser checks without disabling or delaying the UI.
export function useDemoReady(name: string) {
  useEffect(() => {
    const hosts = document.querySelectorAll<HTMLElement>(
      `[data-demo="${CSS.escape(name)}"]`,
    );
    for (const host of hosts) host.dataset.ready = "true";
    return () => {
      for (const host of hosts) delete host.dataset.ready;
    };
  }, [name]);
}
