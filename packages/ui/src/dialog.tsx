"use client";
import type { ComponentProps } from "react";
import { Dialog as Primitive } from "radix-ui";
import { useUIAttributes } from "./provider.js";
import { cn } from "./utils.js";
export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogClose = Primitive.Close;
export function DialogContent({
  className,
  children,
  closeLabel = "닫기",
  overlayClassName,
  variant = "default",
  showCloseButton = true,
  ...props
}: ComponentProps<typeof Primitive.Content> & {
  closeLabel?: string;
  overlayClassName?: string;
  variant?: "default" | "command";
  showCloseButton?: boolean;
}) {
  const attributes = useUIAttributes();
  return (
    <Primitive.Portal>
      <Primitive.Overlay
        {...attributes}
        className={cn("n-dialog-overlay", overlayClassName)}
      />
      <Primitive.Content
        {...attributes}
        {...props}
        data-variant={variant}
        className={cn("n-dialog-content", className)}
      >
        {children}
        {showCloseButton && (
          <Primitive.Close className="n-dialog-close" aria-label={closeLabel}>
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </Primitive.Close>
        )}
      </Primitive.Content>
    </Primitive.Portal>
  );
}
export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("n-dialog-header", className)} />;
}
export function DialogFooter({
  className,
  layout = "confirmation",
  ...props
}: ComponentProps<"div"> & { layout?: "confirmation" | "tools" }) {
  return (
    <div
      {...props}
      data-layout={layout}
      className={cn("n-dialog-footer", className)}
    />
  );
}
export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof Primitive.Title>) {
  return (
    <Primitive.Title {...props} className={cn("n-dialog-title", className)} />
  );
}
export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof Primitive.Description>) {
  return (
    <Primitive.Description
      {...props}
      className={cn("n-description", className)}
    />
  );
}
