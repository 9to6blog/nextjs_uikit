"use client";
import { ReadingList } from "@9to6/ui/blocks/reading-list";
import { useState } from "react";
const articles = [
  {
    id: "space",
    title: "작은 여백의 힘",
    excerpt: "요소 사이의 간격으로 읽는 흐름을 만드는 방법.",
    category: "디자인",
    href: "#article-space",
    readingTime: "6분",
    date: "2026. 09. 20",
  },
  {
    id: "motion",
    title: "모션에 이유를 더하기",
    excerpt: "상태의 변화를 자연스럽게 알려 주는 움직임.",
    category: "디자인",
    href: "#article-motion",
    readingTime: "8분",
    date: "2026. 09. 18",
  },
  {
    id: "server",
    title: "가벼운 페이지를 만드는 습관",
    excerpt: "클라이언트와 서버의 역할을 분명하게 나눕니다.",
    category: "개발",
    href: "#article-server",
    readingTime: "5분",
    date: "2026. 09. 16",
  },
];
export default function Example() {
  const [saved, setSaved] = useState<string[]>(["space"]);
  return (
    <>
      <ReadingList
        title="천천히 읽을 글"
        articles={articles}
        savedIds={saved}
        onSavedChange={setSaved}
      />
      <div className="block-demo-destinations">
        {articles.map((a) => (
          <details key={a.id} id={`article-${a.id}`}>
            <summary>{a.title} · 예시 본문</summary>
            <p>{a.excerpt} 이곳을 실제 글 주소로 연결해 사용하세요.</p>
          </details>
        ))}
      </div>
    </>
  );
}
