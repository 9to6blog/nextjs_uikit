"use client";
import { useId } from "react";
import { Input, Textarea, Field } from "../input.js";
import { Button } from "../button.js";
import { BlockShell, type BlockProps } from "./shared.js";
import { useSubmission } from "./use-submission.js";
export type ContactValues = { name: string; email: string; message: string };
export type ContactProps = BlockProps & {
  onSubmit: (values: ContactValues) => void | Promise<void>;
  successMessage?: string;
};
export function Contact({
  onSubmit,
  successMessage = "문의가 접수됐습니다.",
  ...props
}: ContactProps) {
  const id = useId();
  const { pending, run, feedback } = useSubmission(successMessage);
  return (
    <BlockShell {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          void run(() =>
            onSubmit({
              name: String(f.get("name")),
              email: String(f.get("email")),
              message: String(f.get("message")),
            }),
          );
        }}
      >
        <fieldset disabled={pending}>
          <div className="n-block-grid n-block-grid-two">
            <Field label="이름" htmlFor={`${id}-name`} required>
              <Input
                id={`${id}-name`}
                name="name"
                autoComplete="name"
                required
              />
            </Field>
            <Field label="이메일" htmlFor={`${id}-email`} required>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </Field>
          </div>
          <Field label="문의 내용" htmlFor={`${id}-message`} required>
            <Textarea
              id={`${id}-message`}
              name="message"
              required
              minLength={10}
              rows={4}
              placeholder="함께 만들고 싶은 것을 알려 주세요. (10자 이상)"
            />
          </Field>
          <Button type="submit" loading={pending}>
            문의 보내기
          </Button>
        </fieldset>
        {feedback}
      </form>
    </BlockShell>
  );
}
