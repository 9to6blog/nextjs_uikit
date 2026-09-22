"use client";
import { Faq } from "@9to6/ui/blocks/faq";

export default function Example() {
  return (
    <Faq
      title="자주 묻는 질문"
      description="시작하기 전에 알아 두면 좋은 것들."
      items={[
        {
          id: "react",
          question: "React 프로젝트에서도 쓸 수 있나요?",
          answer:
            "일반 UI와 블록은 React에서 사용할 수 있습니다. Next.js 전용 링크 같은 연동 컴포넌트만 별도 경로로 가져옵니다.",
        },
        {
          id: "style",
          question: "색상과 간격을 바꿀 수 있나요?",
          answer:
            "UIProvider 설정과 CSS 토큰으로 테마, 강조 색상, 밀도와 모션을 조절합니다.",
        },
        {
          id: "data",
          question: "데이터는 어디에 저장하나요?",
          answer:
            "앱에서 전달하는 콜백에 원하는 API를 연결합니다. UI 패키지가 저장소나 인증 방식을 결정하지 않습니다.",
        },
      ]}
    />
  );
}
