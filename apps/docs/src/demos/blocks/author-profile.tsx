import { AuthorProfile } from "@9to6/ui/blocks/author-profile";

export default function Example() {
  return (
    <>
      <AuthorProfile
        name="지안"
        initials="JA"
        bio="디자인과 코드 사이에서 발견한 것들을 기록합니다."
        topics={["인터페이스", "웹 개발", "관찰 노트"]}
        stats={[
          { label: "기록", value: "32" },
          { label: "연재", value: "4" },
          { label: "함께 읽는 사람", value: "280" },
        ]}
        link={{ label: "작가의 노트", href: "#author-note" }}
      />
      <p id="author-note" className="block-demo-note">
        작가 노트 · 적게 담아 더 잘 전하기.
      </p>
    </>
  );
}
