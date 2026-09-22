"use client";
import { Badge } from "../badge.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type BoardTask = {
  id: string;
  title: string;
  description: string;
  status: string;
  tag: string;
};
export type ProjectBoardProps = BlockProps & {
  columns: { id: string; label: string }[];
  tasks: BoardTask[];
  onTasksChange: (tasks: BoardTask[]) => void;
};
export function ProjectBoard({
  columns,
  tasks,
  onTasksChange,
  ...props
}: ProjectBoardProps) {
  return (
    <BlockShell {...props}>
      <div className="n-block-board">
        {columns.map((c) => (
          <section key={c.id}>
            <h3>
              {c.label}
              <span>{tasks.filter((t) => t.status === c.id).length}</span>
            </h3>
            {tasks
              .filter((t) => t.status === c.id)
              .map((t) => (
                <article key={t.id}>
                  <Badge>{t.tag}</Badge>
                  <h4>{t.title}</h4>
                  <p>{t.description}</p>
                  <Select
                    value={t.status}
                    onValueChange={(status) =>
                      onTasksChange(
                        tasks.map((a) =>
                          a.id === t.id ? { ...a, status } : a,
                        ),
                      )
                    }
                  >
                    <SelectTrigger aria-label={`${t.title} 상태`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((o) => (
                        <SelectItem value={o.id} key={o.id}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </article>
              ))}
            {!tasks.some((t) => t.status === c.id) && (
              <p className="n-block-empty">아직 작업이 없습니다.</p>
            )}
          </section>
        ))}
      </div>
    </BlockShell>
  );
}
