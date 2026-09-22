"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@9to6/ui/input";
import { Button } from "@9to6/ui/button";
import { Icon } from "@9to6/ui/icons";
import { blocks, blockGroups } from "@/lib/blocks";
export function BlockGallery() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const visible = blocks.filter(
    (b) =>
      (group === "all" || b.group === group) &&
      `${b.name} ${b.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="collection-toolbar">
        <Input
          aria-label="블록 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="만들고 싶은 화면 검색…"
        />
        <div role="group" aria-label="블록 분류">
          <Button
            size="sm"
            variant={group === "all" ? "primary" : "ghost"}
            aria-pressed={group === "all"}
            onClick={() => setGroup("all")}
          >
            전체 24
          </Button>
          {Object.entries(blockGroups).map(([key, label]) => (
            <Button
              size="sm"
              key={key}
              variant={group === key ? "primary" : "ghost"}
              aria-pressed={group === key}
              onClick={() => setGroup(key)}
            >
              {label.split(" · ")[0]}
            </Button>
          ))}
        </div>
      </div>
      <p className="collection-count" role="status">
        {visible.length}개의 블록
      </p>
      <div className="block-gallery">
        {visible.map((b) => (
          <Link
            className="block-gallery-card"
            href={`/blocks/${b.slug}/`}
            key={b.slug}
          >
            <div
              className="block-thumbnail"
              data-group={b.group}
              data-slug={b.slug}
              aria-hidden="true"
            >
              <div className="block-mini">
                <span className="mini-eyebrow" />
                <span className="mini-title" />
                <span className="mini-copy" />
                {b.group === "forms" ? (
                  <>
                    <span className="mini-input" />
                    <span className="mini-input" />
                    <span className="mini-button" />
                  </>
                ) : b.group === "dashboard" ? (
                  <>
                    <div className="mini-stats">
                      <i />
                      <i />
                      <i />
                    </div>
                    <svg viewBox="0 0 240 60">
                      <path
                        d="M0 50 30 38 60 43 90 18 120 28 150 10 180 22 210 5 240 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </>
                ) : b.group === "content" ? (
                  <div className="mini-articles">
                    <i />
                    <i />
                    <i />
                  </div>
                ) : (
                  <div className="mini-columns">
                    <i />
                    <i />
                    <i />
                  </div>
                )}
              </div>
            </div>
            <div className="block-gallery-caption">
              <div>
                <small>{blockGroups[b.group].split(" · ")[0]}</small>
                <h2>{b.name}</h2>
              </div>
              <Icon name="arrow-up-right" />
            </div>
            <p>{b.description}</p>
          </Link>
        ))}
      </div>
      {!visible.length && (
        <div className="collection-empty">
          검색 결과가 없습니다.
          <Button
            variant="outline"
            onClick={() => {
              setQuery("");
              setGroup("all");
            }}
          >
            필터 초기화
          </Button>
        </div>
      )}
    </>
  );
}
