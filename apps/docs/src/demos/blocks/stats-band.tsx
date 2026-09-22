import { StatsBand } from "@9to6/ui/blocks/stats-band";

export default function Example() {
  return (
    <StatsBand
      title="작은 기록이 쌓여 만드는 변화"
      description="한 달의 작업실을 숫자로 돌아봅니다. 예시 데이터입니다."
      stats={[
        { label: "새로운 기록", value: "32", detail: "하루에 한 줄부터" },
        {
          label: "함께 읽은 시간",
          value: "128h",
          detail: "생각을 나누는 시간",
        },
        {
          label: "다시 찾은 독자",
          value: "64%",
          detail: "계속 이어지는 이야기",
        },
      ]}
    />
  );
}
