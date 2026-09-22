"use client";
import { Pricing } from "@9to6/ui/blocks/pricing";
import { useState } from "react";

export default function Example() {
  const [selection, setSelection] = useState(
    "플랜을 선택해 보세요. 결제는 발생하지 않습니다.",
  );
  return (
    <>
      <Pricing
        title="작업실의 크기에 맞게"
        description="아래 금액과 플랜은 화면 구성을 위한 예시입니다."
        plans={[
          {
            id: "personal",
            name: "개인",
            description: "혼자 차분하게 기록하기",
            monthly: 0,
            yearly: 0,
            features: ["글과 노트", "기본 테마", "공개 프로필"],
          },
          {
            id: "studio",
            name: "스튜디오",
            description: "나만의 공간을 더 깊게",
            monthly: 12000,
            yearly: 120000,
            recommended: true,
            features: ["맞춤 도메인", "콘텐츠 분석", "예약 발행"],
          },
          {
            id: "team",
            name: "팀",
            description: "동료와 함께 완성하기",
            monthly: 29000,
            yearly: 290000,
            features: ["팀원 초대", "검토 워크플로", "팀 활동 기록"],
          },
        ]}
        onSelect={(plan, billing) =>
          setSelection(
            `${plan.name} · ${billing === "monthly" ? "월간" : "연간"} 선택`,
          )
        }
      />
      <p role="status" className="block-demo-note">
        {selection}
      </p>
    </>
  );
}
