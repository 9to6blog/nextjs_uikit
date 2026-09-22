import { Progress } from "../progress.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type ArticleOutlineProps = BlockProps & {
  sections: { id: string; label: string; href: string }[];
  activeId?: string;
  progress: number;
};
export function ArticleOutline({
  sections,
  activeId,
  progress,
  ...props
}: ArticleOutlineProps) {
  return (
    <BlockShell {...props}>
      <nav className="n-block-outline" aria-label="글 목차">
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={s.href}
            aria-current={s.id === activeId ? "location" : undefined}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {s.label}
          </a>
        ))}
      </nav>
      <div className="n-block-progress-label">
        <span>읽기 진행률</span>
        <strong>
          {Math.round(
            Math.max(
              0,
              Math.min(100, Number.isFinite(progress) ? progress : 0),
            ),
          )}
          %
        </strong>
      </div>
      <Progress label="읽기 진행률" value={progress} />
    </BlockShell>
  );
}
