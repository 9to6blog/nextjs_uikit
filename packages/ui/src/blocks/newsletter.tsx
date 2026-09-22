"use client";
import { useId } from "react";
import { Input, Field } from "../input.js";
import { Button } from "../button.js";
import { Icon } from "../icons.js";
import { type BlockProps } from "./shared.js";
import { useSubmission } from "./use-submission.js";
export type NewsletterProps = BlockProps & {
  onSubscribe: (email: string) => void | Promise<void>;
  privacyHref: string;
  successMessage?: string;
};
export function Newsletter({
  title,
  description,
  onSubscribe,
  privacyHref,
  successMessage = "구독 신청을 받았습니다.",
  className,
}: NewsletterProps) {
  const id = useId();
  const { pending, run, feedback } = useSubmission(successMessage);
  return (
    <section className={`n-block n-block-newsletter ${className ?? ""}`}>
      <span className="n-block-symbol">
        <Icon name="document" />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          void run(() => onSubscribe(String(f.get("email"))));
        }}
      >
        <fieldset disabled={pending}>
          <Field htmlFor={id} label="구독 이메일">
            <Input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </Field>
          <Button type="submit" loading={pending}>
            구독 신청
          </Button>
        </fieldset>
        {feedback}
      </form>
      <a className="n-block-muted" href={privacyHref}>
        개인정보 처리방침
      </a>
    </section>
  );
}
