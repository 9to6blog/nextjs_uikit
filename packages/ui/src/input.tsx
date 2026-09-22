import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input {...props} data-slot="input" className={cn("n-input", className)} />
  );
}
export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      data-slot="textarea"
      className={cn("n-input", "n-textarea", className)}
    />
  );
}
export type FieldProps = ComponentProps<"div"> & {
  label: string;
  htmlFor: string;
  description?: string;
  error?: string;
  required?: boolean;
};
/** Connect inputs with aria-describedby={`${htmlFor}-hint`} and aria-invalid when needed. */
export function Field({
  label,
  htmlFor,
  description,
  error,
  required,
  children,
  className,
  ...props
}: FieldProps) {
  return (
    <div {...props} data-slot="field" className={cn("n-field", className)}>
      <label htmlFor={htmlFor} className="n-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {(description || error) && (
        <p
          id={`${htmlFor}-hint`}
          className={cn("n-hint", error && "n-error")}
          role={error ? "alert" : undefined}
        >
          {error || description}
        </p>
      )}
    </div>
  );
}
