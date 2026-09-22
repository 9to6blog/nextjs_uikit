"use client";
import { Fragment } from "react";
import { OTPInput, REGEXP_ONLY_DIGITS, type OTPInputProps } from "input-otp";
import { cn } from "./utils.js";
export function InputOTP({
  containerClassName,
  maxLength = 6,
  separatorAfter = 3,
  ...props
}: Omit<OTPInputProps, "render" | "children" | "maxLength"> & {
  maxLength?: number;
  separatorAfter?: number;
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
            <Fragment key={index}>
              {index === separatorAfter && (
                <span className="n-otp-separator" aria-hidden="true">
                  −
                </span>
              )}
              <span
                aria-hidden="true"
                data-active={slot.isActive}
                className="n-otp-slot"
              >
                {slot.char ?? slot.placeholderChar}
                {slot.hasFakeCaret && <span className="n-otp-caret" />}
              </span>
            </Fragment>
          ))}
        </>
      )}
    />
  );
}
