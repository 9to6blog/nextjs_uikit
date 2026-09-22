"use client";
import { useState } from "react";
import { Carousel } from "@9to6/ui/carousel";
import { Button } from "@9to6/ui/button";
import { CodeBlock } from "@/components/code-block";
const examples = [
  {
    id: "editorial",
    name: "에디토리얼",
    description: "한 장씩 집중해서 읽는 이야기와 페이지 점.",
  },
  {
    id: "testimonials",
    name: "후기",
    description: "인용문을 차분하게 넘기는 순환 캐러셀.",
  },
  {
    id: "thumbnails",
    name: "썸네일",
    description: "작은 이미지로 원하는 장면을 직접 선택.",
  },
  {
    id: "multiple",
    name: "다중 카드",
    description: "넓은 화면에서는 두 장, 모바일에서는 한 장.",
  },
  {
    id: "vertical",
    name: "세로 이동",
    description: "위아래 방향키와 세로 드래그로 탐색.",
  },
  {
    id: "autoplay",
    name: "자동 재생",
    description: "정지·시작 버튼, 포커스와 모션 감소 설정 반영.",
  },
] as const;
const stories = [
  {
    title: "생각이 머무는 자리",
    description: "복잡한 하루에서 작은 여유를 발견합니다.",
    color: "#d6e0d9",
  },
  {
    title: "천천히 쌓는 기록",
    description: "한 줄의 메모가 다음 이야기의 시작이 됩니다.",
    color: "#e6daca",
  },
  {
    title: "새로운 관점의 발견",
    description: "익숙한 것을 다른 각도에서 바라봅니다.",
    color: "#dcd9e7",
  },
];
function Artwork({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${stories[index].title} 추상 일러스트`}
    >
      <rect width="600" height="300" fill={stories[index].color} />
      <circle cx={210 + index * 50} cy="135" r="90" fill="#222522" />
      <path d="M80 280 360 40 540 280Z" fill="#fbfaf7" opacity=".85" />
      <path d="M80 240h420M80 250h240" stroke="#777" strokeWidth="1" />
    </svg>
  );
}
export function CarouselGallery() {
  const [selected, setSelected] =
    useState<(typeof examples)[number]["id"]>("editorial");
  const example = examples.find((e) => e.id === selected)!;
  const thumbs = selected === "thumbnails";
  const multi = selected === "multiple";
  const vertical = selected === "vertical";
  const auto = selected === "autoplay";
  const quotes = selected === "testimonials";
  const slides = stories.map((s, i) => (
    <article
      className={`gallery-slide ${quotes ? "gallery-quote" : ""}`}
      key={s.title}
    >
      {quotes ? (
        <>
          <span aria-hidden="true">“</span>
          <blockquote>
            {
              [
                "필요한 것에 집중할 수 있는 작은 공간이 생겼어요.",
                "기록이 쌓이는 과정을 눈으로 볼 수 있어 좋았어요.",
                "다음 문장을 쓰고 싶어지는 차분한 화면이에요.",
              ][i]
            }
          </blockquote>
          <p>{["지안", "현우", "서윤"][i]} · 예시 인물의 가상 후기</p>
        </>
      ) : (
        <>
          <div className="gallery-slide-art">
            <Artwork index={i} />
          </div>
          <div className="gallery-slide-copy">
            <small>STORY 0{i + 1}</small>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        </>
      )}
    </article>
  ));
  return (
    <>
      <div className="carousel-presets" role="group" aria-label="캐러셀 예제">
        {examples.map((e) => (
          <Button
            key={e.id}
            variant={selected === e.id ? "primary" : "outline"}
            aria-pressed={selected === e.id}
            onClick={() => setSelected(e.id)}
          >
            {e.name}
          </Button>
        ))}
      </div>
      <section className="gallery-stage" aria-label="캐러셀 미리보기">
        <header>
          <div>
            <small>MOTION IN CONTEXT</small>
            <h2>{example.name}</h2>
            <p>{example.description}</p>
          </div>
        </header>
        <Carousel
          key={selected}
          label={`${example.name} 이야기`}
          slides={slides}
          loop={quotes || multi || auto}
          slideSize={multi ? "50%" : "100%"}
          orientation={vertical ? "vertical" : "horizontal"}
          height={400}
          dots={!thumbs}
          thumbnails={
            thumbs
              ? stories.map((_, i) => <Artwork key={i} index={i} />)
              : undefined
          }
          autoplay={auto}
          interval={4500}
        />
      </section>
      <section className="doc-section">
        <h2>프로젝트에 연결하기</h2>
        <p>
          slides에는 카드, 이미지, 인용문 등 React 요소를 전달합니다. 터치
          드래그와 방향키를 지원하며 화면 밖 슬라이드의 컨트롤은 탐색 대상에서
          제외합니다.
        </p>
        <CodeBlock
          code={`"use client";\nimport {Carousel} from "@9to6/ui/carousel";\nimport "@9to6/ui/styles.css";\n\nconst titles = ["생각이 머무는 자리", "천천히 쌓는 기록", "새로운 관점의 발견"];\nexport default function Stories() {\n  return <Carousel\n    label="작업실 이야기"\n    slides={titles.map(title => <article key={title} style={{padding: 32, minHeight: 260}}><h2>{title}</h2><p>앱의 콘텐츠를 연결하세요.</p></article>)}\n    loop={${quotes || multi || auto}}\n    slideSize="${multi ? "50%" : "100%"}"\n    orientation="${vertical ? "vertical" : "horizontal"}"\n    height={400}\n    ${thumbs ? "thumbnails={titles.map((title,i) => <span key={title}>{i + 1}</span>)}" : "dots"}\n    autoplay={${auto}}\n    interval={4500}\n  />;\n}`}
        />
      </section>
      <p className="block-source-note">
        자동 재생은 기본적으로 꺼져 있습니다. 켜면 마우스가 머무를 때 잠시
        멈추고, 포커스·드래그·수동 탐색 후에는 시작 버튼을 눌러야 재개합니다.
        모션 감소 환경에서는 자동 재생을 끕니다.
      </p>
    </>
  );
}
