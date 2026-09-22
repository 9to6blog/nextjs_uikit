"use client";
import { AnalyticsOverview } from "@9to6/ui/blocks/analytics-overview";

const data = [
  { name: "월", visitors: 120, returning: 40, x: 1 },
  { name: "화", visitors: 180, returning: 60, x: 2 },
  { name: "수", visitors: 145, returning: 48, x: 3 },
  { name: "목", visitors: 240, returning: 80, x: 4 },
  { name: "금", visitors: 210, returning: 70, x: 5 },
  { name: "토", visitors: 285, returning: 95, x: 6 },
];
const series = [
  { key: "visitors", label: "방문자" },
  { key: "returning", label: "재방문" },
];
export default function Example() {
  return (
    <AnalyticsOverview
      title="이번 주의 기록"
      description="작업실 방문 흐름 · 예시 데이터"
      metrics={[
        { label: "방문자", value: "1,180", change: "이전 주보다 12.4% 증가" },
        { label: "읽은 글", value: "2,430", change: "방문당 2.06개" },
        {
          label: "평균 읽기",
          value: "3분 24초",
          change: "이전 주보다 18초 증가",
        },
      ]}
      data={data}
      series={series}
    />
  );
}
