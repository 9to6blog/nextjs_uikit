"use client";
import { Direction } from "radix-ui";
import type { ReactNode } from "react";
export function DirectionProvider(props: {
  dir: "ltr" | "rtl";
  children: ReactNode;
}) {
  return <Direction.Provider {...props} />;
}
export const useDirection = Direction.useDirection;
