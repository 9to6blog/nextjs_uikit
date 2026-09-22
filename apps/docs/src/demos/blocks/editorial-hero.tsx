import { EditorialHero } from "@9to6/ui/blocks/editorial-hero";

export default function Example() {
  return (
    <>
      <EditorialHero
        title={"생각을 기록하고,\n다음으로 나아가세요."}
        description="작은 발견을 모아 오래 읽히는 이야기로 만듭니다."
        eyebrow="THE QUIET STUDIO"
        primary={{ label: "글 둘러보기", href: "#hero-articles" }}
        secondary={{ label: "작업실 소개", href: "#hero-about" }}
        artwork={
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
        }
      />
      <div className="block-demo-destinations">
        <p id="hero-articles">최근 글 · 작은 여백의 힘</p>
        <p id="hero-about">매주 하나의 발견을 기록하는 작은 작업실입니다.</p>
      </div>
    </>
  );
}
