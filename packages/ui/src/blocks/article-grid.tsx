"use client";
import { useId, useState } from "react";
import { Input } from "../input.js";
import { Button } from "../button.js";
import {
  BlockShell,
  ArticleTile,
  type Article,
  type BlockProps,
} from "./shared.js";
export type ArticleGridProps = BlockProps & { articles: Article[] };
export function ArticleGrid({ articles, ...props }: ArticleGridProps) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("전체");
  const filtered = articles.filter(
    (a) =>
      (category === "전체" || a.category === category) &&
      `${a.title} ${a.excerpt}`
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()),
  );
  return (
    <BlockShell {...props}>
      <div className="n-block-toolbar">
        <label className="n-sr-only" htmlFor={id}>
          글 검색
        </label>
        <Input
          id={id}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="읽고 싶은 글 찾기"
        />
        <div className="n-block-chips" role="group" aria-label="글 분류">
          {["전체", ...new Set(articles.map((a) => a.category))].map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? "primary" : "ghost"}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>
      <p className="n-block-muted" role="status">
        {filtered.length}개의 글
      </p>
      <div className="n-block-grid">
        {filtered.map((a) => (
          <ArticleTile key={a.id} article={a} />
        ))}
      </div>
      {!filtered.length && (
        <p className="n-block-empty">
          검색한 글이 없습니다. 다른 검색어를 입력해 보세요.
        </p>
      )}
    </BlockShell>
  );
}
