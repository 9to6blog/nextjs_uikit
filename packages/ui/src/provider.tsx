"use client";
import { createContext, useContext, type ComponentProps } from "react";
import { cn } from "./utils.js";
export type UISettings = {
  theme?: "light" | "dark" | "system";
  motion?: "full" | "reduced";
  density?: "comfortable" | "compact";
  accent?: "black" | "blue" | "violet" | "teal";
};
const UIContext = createContext<Required<UISettings>>({
  theme: "system",
  motion: "full",
  density: "comfortable",
  accent: "black",
});
export function UIProvider({
  theme = "system",
  motion = "full",
  density = "comfortable",
  accent = "black",
  className,
  children,
  ...props
}: ComponentProps<"div"> & UISettings) {
  return (
    <UIContext.Provider value={{ theme, motion, density, accent }}>
      <div
        {...props}
        data-n-ui=""
        data-theme={theme}
        data-motion={motion}
        data-density={density}
        data-accent={accent}
        className={cn("n-root", className)}
      >
        {children}
      </div>
    </UIContext.Provider>
  );
}
/** Carry theme settings through Radix portals without changing the host document. */
export function useUIAttributes() {
  const { theme, motion, density, accent } = useContext(UIContext);
  return {
    "data-n-ui": "",
    "data-theme": theme,
    "data-motion": motion,
    "data-density": density,
    "data-accent": accent,
  } as const;
}
