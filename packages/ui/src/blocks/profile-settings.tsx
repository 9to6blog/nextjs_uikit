"use client";
import { useId } from "react";
import { Input, Textarea, Field } from "../input.js";
import { Button } from "../button.js";
import { BlockShell, type BlockProps } from "./shared.js";
import { useSubmission } from "./use-submission.js";
export type ProfileValues = { name: string; handle: string; bio: string };
export type ProfileSettingsProps = BlockProps & {
  profile: ProfileValues;
  onSave: (values: ProfileValues) => void | Promise<void>;
  successMessage?: string;
};
export function ProfileSettings({
  profile,
  onSave,
  successMessage = "프로필을 저장했습니다.",
  ...props
}: ProfileSettingsProps) {
  const id = useId();
  const { pending, run, feedback } = useSubmission(successMessage);
  return (
    <BlockShell {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          void run(() =>
            onSave({
              name: String(f.get("name")),
              handle: String(f.get("handle")),
              bio: String(f.get("bio")),
            }),
          );
        }}
      >
        <fieldset disabled={pending}>
          <div className="n-block-grid n-block-grid-two">
            <Field label="표시 이름" htmlFor={`${id}-name`} required>
              <Input
                id={`${id}-name`}
                name="name"
                defaultValue={profile.name}
                autoComplete="name"
                required
              />
            </Field>
            <Field
              label="사용자 이름"
              htmlFor={`${id}-handle`}
              required
              description="영문, 숫자, 밑줄로 입력하세요."
            >
              <Input
                id={`${id}-handle`}
                name="handle"
                defaultValue={profile.handle}
                pattern="[A-Za-z0-9_]+"
                aria-describedby={`${id}-handle-hint`}
                required
              />
            </Field>
          </div>
          <Field label="소개" htmlFor={`${id}-bio`}>
            <Textarea
              id={`${id}-bio`}
              name="bio"
              defaultValue={profile.bio}
              maxLength={240}
              rows={3}
            />
          </Field>
          <div className="n-block-actions">
            <Button type="submit" loading={pending}>
              변경사항 저장
            </Button>
            <Button type="reset" variant="ghost">
              되돌리기
            </Button>
          </div>
        </fieldset>
        {feedback}
      </form>
    </BlockShell>
  );
}
