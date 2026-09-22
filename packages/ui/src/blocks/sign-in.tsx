"use client";
import { useId } from "react";
import { Input, Field } from "../input.js";
import { Button } from "../button.js";
import { BlockShell, type BlockProps } from "./shared.js";
import { useSubmission } from "./use-submission.js";
export type SignInProps = BlockProps & {
  onSubmit: (values: {
    email: string;
    password: string;
  }) => void | Promise<void>;
  recoveryHref?: string;
  successMessage?: string;
};
export function SignIn({
  onSubmit,
  recoveryHref,
  successMessage = "로그인 요청을 처리했습니다.",
  ...props
}: SignInProps) {
  const id = useId();
  const { pending, run, feedback } = useSubmission(successMessage);
  return (
    <BlockShell {...props} className={`n-block-form ${props.className ?? ""}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          void run(() =>
            onSubmit({
              email: String(f.get("email")),
              password: String(f.get("password")),
            }),
          );
        }}
      >
        <fieldset disabled={pending}>
          <Field label="이메일" htmlFor={`${id}-email`} required>
            <Input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="username"
              required
              placeholder="you@example.com"
            />
          </Field>
          <Field label="비밀번호" htmlFor={`${id}-password`} required>
            <Input
              id={`${id}-password`}
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </Field>
          {recoveryHref && (
            <a className="n-block-muted" href={recoveryHref}>
              비밀번호를 잊으셨나요?
            </a>
          )}
          <Button type="submit" loading={pending}>
            로그인
          </Button>
        </fieldset>
        {feedback}
      </form>
    </BlockShell>
  );
}
