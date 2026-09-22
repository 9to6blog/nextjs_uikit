"use client";
import { useId } from "react";
import { Checkbox } from "../checkbox.js";
import { Progress } from "../progress.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type TaskItem = {
  id: string;
  title: string;
  detail?: string;
  done: boolean;
};
export type TaskPanelProps = BlockProps & {
  tasks: TaskItem[];
  onTasksChange: (tasks: TaskItem[]) => void;
};
export function TaskPanel({ tasks, onTasksChange, ...props }: TaskPanelProps) {
  const id = useId();
  const done = tasks.filter((t) => t.done).length;
  return (
    <BlockShell
      {...props}
      action={
        <span className="n-block-muted" role="status">
          {done} / {tasks.length} 완료
        </span>
      }
    >
      <Progress
        label="작업 완료율"
        value={tasks.length ? (done / tasks.length) * 100 : 0}
      />
      <ul className="n-block-list">
        {tasks.map((t) => (
          <li key={t.id}>
            <Checkbox
              id={`${id}-${t.id}`}
              checked={t.done}
              onCheckedChange={(checked) =>
                onTasksChange(
                  tasks.map((a) =>
                    a.id === t.id ? { ...a, done: checked === true } : a,
                  ),
                )
              }
            />
            <label
              htmlFor={`${id}-${t.id}`}
              className="n-block-grow"
              data-done={t.done}
            >
              <strong>{t.title}</strong>
              {t.detail && <p>{t.detail}</p>}
            </label>
          </li>
        ))}
      </ul>
    </BlockShell>
  );
}
