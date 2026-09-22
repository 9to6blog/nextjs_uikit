"use client";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./button.js";
export function SubmitButton({
  loadingLabel = "저장 중",
  ...props
}: Omit<ButtonProps, "type" | "loading">) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      type="submit"
      loading={pending}
      loadingLabel={loadingLabel}
    />
  );
}
