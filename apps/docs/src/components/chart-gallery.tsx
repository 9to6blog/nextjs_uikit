"use client";
import { useState } from "react";
import { ChartView, chartKinds, type ChartKind } from "@9to6/ui/chart-view";
import { Button } from "@9to6/ui/button";
import { CodeBlock } from "@/components/code-block";
const labels: Record<ChartKind, string> = {
  line: "선",
  area: "영역",
  bar: "막대",
  "horizontal-bar": "가로 막대",
  "stacked-bar": "누적 막대",
  "stacked-area": "누적 영역",
  pie: "파이",
  donut: "도넛",
  radar: "레이더",
  radial: "방사형",
  scatter: "산점도",
  composed: "혼합",
};
const periods = {
  week: [
    { name: "월", visitors: 120, returning: 42, x: 1 },
    { name: "화", visitors: 180, returning: 56, x: 2 },
    { name: "수", visitors: 145, returning: 61, x: 3 },
    { name: "목", visitors: 240, returning: 89, x: 4 },
    { name: "금", visitors: 210, returning: 76, x: 5 },
    { name: "토", visitors: 285, returning: 104, x: 6 },
  ],
  month: [
    { name: "1주", visitors: 740, returning: 235, x: 1 },
    { name: "2주", visitors: 980, returning: 342, x: 2 },
    { name: "3주", visitors: 860, returning: 316, x: 3 },
    { name: "4주", visitors: 1180, returning: 428, x: 4 },
  ],
};
const series = [
  { key: "visitors", label: "방문자" },
  { key: "returning", label: "재방문" },
];
export function ChartGallery() {
  const [kind, setKind] = useState<ChartKind>("line");
  const [period, setPeriod] = useState<keyof typeof periods>("week");
  const data =
    kind === "composed"
      ? periods[period].map((row, index) => ({
          ...row,
          responseMs: index === 2 ? null : 32 + index * 5,
        }))
      : periods[period];
  const displaySeries =
    kind === "composed"
      ? [
          { key: "visitors", label: "방문 요청 (건)" },
          { key: "responseMs", label: "응답시간 (ms)", axis: "right" as const },
        ]
      : series;
  return (
    <>
      <div className="chart-kind-grid" role="group" aria-label="차트 유형">
        {chartKinds.map((k, i) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <strong>{labels[k]}</strong>
            <small>{k}</small>
          </button>
        ))}
      </div>
      <section className="gallery-stage" aria-label="차트 미리보기">
        <header>
          <div>
            <small>STUDIO ANALYTICS</small>
            <h2>{labels[kind]} 차트</h2>
          </div>
          <div role="group" aria-label="데이터 기간">
            <Button
              size="sm"
              variant={period === "week" ? "primary" : "ghost"}
              aria-pressed={period === "week"}
              onClick={() => setPeriod("week")}
            >
              이번 주
            </Button>
            <Button
              size="sm"
              variant={period === "month" ? "primary" : "ghost"}
              aria-pressed={period === "month"}
              onClick={() => setPeriod("month")}
            >
              이번 달
            </Button>
          </div>
        </header>
        <ChartView
          key={kind}
          kind={kind}
          data={data}
          series={displaySeries}
          label="작업실 방문 추이"
          height={320}
          allowDecimals={false}
        />
      </section>
      <section className="doc-section">
        <h2>데이터로 바꾸어 사용하기</h2>
        <p>
          각 유형에 같은 data와 series를 전달합니다. 파이·도넛·방사형은 첫 번째
          시리즈를 사용하고, 산점도는 xKey의 숫자 값과 각 시리즈의 값을 짝지어
          표시합니다. 범례와 접을 수 있는 데이터 표를 함께 제공합니다. 혼합
          예시는 방문 요청과 응답시간을 서로 다른 축으로 표시하고, 미수집
          응답시간은 0으로 바꾸지 않고 빈 구간으로 보존합니다.
        </p>
        <CodeBlock
          code={`"use client";\nimport {ChartView} from "@9to6/ui/chart-view";\nimport "@9to6/ui/styles.css";\n\nconst data = ${JSON.stringify(data, null, 2)};\nconst series = ${JSON.stringify(displaySeries, null, 2)};\n\nexport default function Analytics() {\n  return <ChartView kind="${kind}" label="작업실 방문 추이" data={data} series={series} xKey="x" height={320} />;\n}`}
        />
      </section>
      <p className="block-source-note">
        시리즈별 색상은 color로 지정합니다. 더 세밀한 구성은 @9to6/ui/chart의
        개별 차트 요소를 조합하세요. 예시는 동작 확인을 위한 가상 방문
        데이터입니다.
      </p>
    </>
  );
}
