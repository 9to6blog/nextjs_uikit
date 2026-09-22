import { ReleaseNotes } from "@9to6/ui/blocks/release-notes";

export default function Example() {
  return (
    <ReleaseNotes
      title="조금씩 더 좋아지는 작업실"
      description="업데이트 화면 구성을 위한 예시 기록입니다."
      releases={[
        {
          version: "0.3.0",
          date: "2026-09-20",
          title: "기록을 찾는 새로운 방법",
          changes: [
            "주제별로 글을 모아 볼 수 있습니다.",
            "검색 결과에서 읽기 시간을 확인합니다.",
          ],
        },
        {
          version: "0.2.0",
          date: "2026-09-12",
          title: "함께 다듬는 초안",
          changes: [
            "검토할 항목을 체크리스트로 정리합니다.",
            "작업 상태를 보드에서 옮길 수 있습니다.",
          ],
        },
        {
          version: "0.1.0",
          date: "2026-09-01",
          title: "첫 번째 작업실",
          changes: ["프로필과 글 목록을 공개합니다."],
        },
      ]}
    />
  );
}
