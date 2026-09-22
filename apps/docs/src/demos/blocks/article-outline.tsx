"use client";
import { ArticleOutline } from "@9to6/ui/blocks/article-outline";
import { useState } from "react";
import { Button } from "@9to6/ui/button";
const sections = [
  { id: "observe", label: "먼저 관찰하기", href: "#observe" },
  { id: "design", label: "구조를 설계하기", href: "#design" },
  { id: "refine", label: "작게 다듬기", href: "#refine" },
];
export default function Example() {
  const [active, setActive] = useState("observe");
  return (
    <>
      <ArticleOutline
        title="이 글의 흐름"
        sections={sections}
        activeId={active}
        progress={
          ((sections.findIndex((s) => s.id === active) + 1) / sections.length) *
          100
        }
      />
      <div className="block-demo-destinations">
        {sections.map((s) => (
          <section key={s.id} id={s.id}>
            <h3>{s.label}</h3>
            <p>목차 링크는 실제 문서 구역으로 이동합니다.</p>
            <Button variant="outline" size="sm" onClick={() => setActive(s.id)}>
              이 구역 읽음
            </Button>
          </section>
        ))}
      </div>
    </>
  );
}
