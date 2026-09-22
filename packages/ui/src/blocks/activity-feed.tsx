"use client";
import { useState } from "react";
import { Badge } from "../badge.js";
import { Button } from "../button.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type ActivityFeedProps = BlockProps & {
  items: {
    id: string;
    title: string;
    description: string;
    category: string;
    time: string;
  }[];
};
export function ActivityFeed({ items, ...props }: ActivityFeedProps) {
  const [filter, setFilter] = useState("전체");
  const visible = items.filter(
    (i) => filter === "전체" || i.category === filter,
  );
  return (
    <BlockShell {...props}>
      <div className="n-block-chips" role="group" aria-label="활동 분류">
        {["전체", ...new Set(items.map((i) => i.category))].map((c) => (
          <Button
            key={c}
            size="sm"
            variant={c === filter ? "primary" : "ghost"}
            aria-pressed={c === filter}
            onClick={() => setFilter(c)}
          >
            {c}
          </Button>
        ))}
      </div>
      <ol className="n-block-timeline">
        {visible.map((i) => (
          <li key={i.id}>
            <span className="n-block-timeline-dot" aria-hidden="true" />
            <div>
              <Badge>{i.category}</Badge>
              <h3>{i.title}</h3>
              <p>{i.description}</p>
              <span className="n-block-muted">{i.time}</span>
            </div>
          </li>
        ))}
      </ol>
      <span className="n-sr-only" role="status">
        {visible.length}개 활동
      </span>
    </BlockShell>
  );
}
