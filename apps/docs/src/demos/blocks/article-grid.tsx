"use client";
import { ArticleGrid } from "@9to6/ui/blocks/article-grid";

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
  return (
    <>
      <ArticleGrid
        title="최근에 기록한 것들"
        description="관찰하고, 만들고, 다시 생각합니다."
        articles={articles.map((a) => ({
          ...a,
          artwork: (
            <svg
              viewBox="0 0 300 240"
              fill="none"
              role="img"
              aria-label="겹쳐진 종이와 검은 원의 추상 일러스트"
            >
              <path fill="#e9e7e2" d="M0 0h300v240H0z" />
              <path fill="#fcfbf8" d="m45 30 195 18-15 165L30 190z" />
              <circle cx="152" cy="108" r="52" fill="#171717" />
              <path stroke="#a6a39b" d="M70 188h130M70 198h82" />
            </svg>
          ),
        }))}
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
