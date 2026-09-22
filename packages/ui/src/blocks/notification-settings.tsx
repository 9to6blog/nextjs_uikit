"use client";
import { useId } from "react";
import { Switch } from "../switch.js";
import { Button } from "../button.js";
import { BlockShell, type BlockProps } from "./shared.js";
import { useSubmission } from "./use-submission.js";
export type NotificationPreference = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};
export type NotificationSettingsProps = BlockProps & {
  preferences: NotificationPreference[];
  onChange: (preferences: NotificationPreference[]) => void;
  onSave: (preferences: NotificationPreference[]) => void | Promise<void>;
  successMessage?: string;
};
export function NotificationSettings({
  preferences,
  onChange,
  onSave,
  successMessage = "알림 설정을 저장했습니다.",
  ...props
}: NotificationSettingsProps) {
  const id = useId();
  const { pending, run, feedback } = useSubmission(successMessage);
  return (
    <BlockShell {...props}>
      <ul className="n-block-list">
        {preferences.map((p) => (
          <li key={p.id}>
            <div className="n-block-grow">
              <label htmlFor={`${id}-${p.id}`}>
                <strong>{p.label}</strong>
              </label>
              <p id={`${id}-${p.id}-hint`}>{p.description}</p>
            </div>
            <Switch
              id={`${id}-${p.id}`}
              aria-describedby={`${id}-${p.id}-hint`}
              checked={p.enabled}
              disabled={pending}
              onCheckedChange={(enabled) =>
                onChange(
                  preferences.map((v) =>
                    v.id === p.id ? { ...v, enabled } : v,
                  ),
                )
              }
            />
          </li>
        ))}
      </ul>
      <Button
        loading={pending}
        onClick={() => void run(() => onSave(preferences))}
      >
        알림 설정 저장
      </Button>
      {feedback}
    </BlockShell>
  );
}
