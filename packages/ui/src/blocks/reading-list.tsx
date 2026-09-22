"use client";
import { Button } from "../button.js";
import { Icon } from "../icons.js";
import { BlockShell, type Article, type BlockProps } from "./shared.js";
export type ReadingListProps = BlockProps & {
  articles: Article[];
  savedIds: string[];
  onSavedChange: (ids: string[]) => void;
};
export function ReadingList({
  articles,
  savedIds,
  onSavedChange,
  ...props
}: ReadingListProps) {
  return (
    <BlockShell
      {...props}
      action={
        <span className="n-block-muted" role="status">
          {savedIds.length}개 저장
        </span>
      }
    >
      <ul className="n-block-list">
        {articles.map((a, i) => (
          <li key={a.id}>
            <span className="n-block-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="n-block-grow">
              <a href={a.href}>
                <strong>{a.title}</strong>
              </a>
              <p>
                {a.category} · {a.readingTime}
              </p>
            </div>
            <Button
              variant={savedIds.includes(a.id) ? "secondary" : "ghost"}
              size="icon"
              aria-label={`${a.title} 저장`}
              aria-pressed={savedIds.includes(a.id)}
              onClick={() =>
                onSavedChange(
                  savedIds.includes(a.id)
                    ? savedIds.filter((id) => id !== a.id)
                    : [...savedIds, a.id],
                )
              }
            >
              <Icon name="bookmark" />
            </Button>
          </li>
        ))}
      </ul>
    </BlockShell>
  );
}
