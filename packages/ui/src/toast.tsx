"use client";
import { Toaster as Primitive, toast, type ToasterProps } from "sonner";
import { useUIAttributes } from "./provider.js";
export { toast };
export function Toaster({ ...props }: ToasterProps) {
  const attributes = useUIAttributes();
  return (
    <div {...attributes}>
      <Primitive
        theme={attributes["data-theme"]}
        position="bottom-right"
        closeButton
        {...props}
        toastOptions={{
          ...props.toastOptions,
          classNames: {
            toast: "n-toast",
            title: "n-toast-title",
            description: "n-toast-description",
            ...props.toastOptions?.classNames,
          },
        }}
      />
    </div>
  );
}
