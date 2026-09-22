import { Testimonials } from "@9to6/ui/blocks/testimonials";

export default function Example() {
  return (
    <Testimonials
      title="다른 시선에서 본 작업실"
      description="레이아웃을 보여 주기 위한 가상 후기입니다."
      items={[
        {
          id: "1",
          quote:
            "작은 생각을 바로 기록할 수 있어서, 초안을 시작하는 일이 가벼워졌어요.",
          name: "민서",
          role: "콘텐츠 디자이너 · 예시 인물",
        },
        {
          id: "2",
          quote: "읽는 사람의 흐름을 먼저 생각하게 만드는 차분한 공간이에요.",
          name: "도윤",
          role: "프론트엔드 개발자 · 예시 인물",
        },
        {
          id: "3",
          quote: "함께 검토하고 다듬는 과정이 한눈에 보여서 좋았어요.",
          name: "하린",
          role: "에디터 · 예시 인물",
        },
      ]}
    />
  );
}
