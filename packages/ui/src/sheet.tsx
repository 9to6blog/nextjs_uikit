"use client";
import { Icon } from "./icons.js";
import type { ComponentProps } from "react";
import { Dialog as Primitive } from "radix-ui";
import { useUIAttributes } from "./provider.js";
import { cn } from "./utils.js";
export {
  Dialog as Sheet,
  DialogTrigger as SheetTrigger,
  DialogClose as SheetClose,
  DialogTitle as SheetTitle,
  DialogDescription as SheetDescription,
} from "./dialog.js";
export function SheetContent({
  className,
  children,
  side = "right",
  closeLabel = "닫기",
  ...props
}: ComponentProps<typeof Primitive.Content> & {
  side?: "left" | "right" | "top" | "bottom";
  closeLabel?: string;
}) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.Overlay {...attributes} className="n-dialog-overlay" />
      <Primitive.Content
        {...attributes}
        {...props}
        data-side={side}
        className={cn("n-sheet", className)}
      >
        {children}
        <Primitive.Close aria-label={closeLabel} className="n-dialog-close">
          <Icon name="close" />
        </Primitive.Close>
      </Primitive.Content>
    </Primitive.Portal>
  );
}
