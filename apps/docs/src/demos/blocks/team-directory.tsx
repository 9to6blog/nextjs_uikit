import { TeamDirectory } from "@9to6/ui/blocks/team-directory";

export default function Example() {
  return (
    <TeamDirectory
      title="함께 만드는 사람들"
      members={[
        {
          id: "1",
          name: "지안",
          role: "디자인",
          email: "jian@example.com",
          initials: "JA",
        },
        {
          id: "2",
          name: "현우",
          role: "개발",
          email: "hyunwoo@example.com",
          initials: "HW",
        },
        {
          id: "3",
          name: "서윤",
          role: "콘텐츠",
          email: "seoyun@example.com",
          initials: "SY",
        },
      ]}
    />
  );
}
