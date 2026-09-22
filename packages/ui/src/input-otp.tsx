"use client";
import { OTPInput, REGEXP_ONLY_DIGITS, type OTPInputProps } from "input-otp";
import { cn } from "./utils.js";
export function InputOTP({
  containerClassName,
  maxLength = 6,
  ...props
}: Omit<OTPInputProps, "render" | "children" | "maxLength"> & {
  maxLength?: number;
}) {
  return (
    <OTPInput
      pattern={REGEXP_ONLY_DIGITS}
      {...props}
      maxLength={maxLength}
      containerClassName={cn("n-otp", containerClassName)}
      render={({ slots }) => (
        <>
          {slots.map((slot, index) => (
            <span
              key={index}
              aria-hidden="true"
              data-active={slot.isActive}
              className="n-otp-slot"
            >
              {slot.char ?? slot.placeholderChar}
              {slot.hasFakeCaret && <span className="n-otp-caret" />}
            </span>
          ))}
        </>
      )}
    />
  );
}
