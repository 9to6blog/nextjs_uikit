import { FeatureGrid } from "@9to6/ui/blocks/feature-grid";
import { Icon } from "@9to6/ui/icons";

export default function Example() {
  return (
    <FeatureGrid
      title="생각을 완성하는 도구들"
      features={[
        {
          id: "write",
          title: "흐름을 지키는 기록",
          description: "생각이 떠오르는 순서대로 가볍게 적습니다.",
          icon: <Icon name="document" />,
        },
        {
          id: "save",
          title: "다시 꺼내는 발견",
          description: "좋은 자료와 문장을 한곳에 모읍니다.",
          icon: <Icon name="bookmark" />,
        },
        {
          id: "plan",
          title: "꾸준한 발행",
          description: "기록의 리듬을 내 일정에 맞춥니다.",
          icon: <Icon name="calendar" />,
        },
        {
          id: "share",
          title: "열린 이야기",
          description: "완성한 글을 읽기 좋은 화면으로 전합니다.",
          icon: <Icon name="arrow-up-right" />,
        },
        {
          id: "review",
          title: "세심한 검토",
          description: "마지막 확인까지 놓치지 않습니다.",
          icon: <Icon name="check" />,
        },
        {
          id: "grow",
          title: "쌓이는 경험",
          description: "하나씩 더하며 나만의 기준을 만듭니다.",
          icon: <Icon name="arrow-up" />,
        },
      ]}
    />
  );
}
