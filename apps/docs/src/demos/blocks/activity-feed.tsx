"use client";
import { ActivityFeed } from "@9to6/ui/blocks/activity-feed";

export default function Example() {
  return (
    <ActivityFeed
      title="작업실의 오늘"
      items={[
        {
          id: "1",
          title: "새 초안이 저장됐어요",
          description: "지안이 ‘좋은 간격의 기준’을 정리했습니다.",
          category: "기록",
          time: "10분 전",
        },
        {
          id: "2",
          title: "디자인 검토를 마쳤어요",
          description: "컴포넌트 간격과 문구를 함께 확인했습니다.",
          category: "협업",
          time: "35분 전",
        },
        {
          id: "3",
          title: "주간 노트가 공개됐어요",
          description: "이번 주에 발견한 세 가지를 모았습니다.",
          category: "기록",
          time: "1시간 전",
        },
      ]}
    />
  );
}
