"use client";
import { ProfileSettings } from "@9to6/ui/blocks/profile-settings";

export default function Example() {
  return (
    <>
      <p className="block-demo-note">
        브라우저 동작 예제입니다. 서버로 전송하거나 계정·구독을 만들지 않습니다.
        사용하는 앱의 API를 콜백에 연결하세요.
      </p>
      <ProfileSettings
        title="내 프로필"
        description="공개 프로필에 표시되는 정보를 관리합니다."
        profile={{
          name: "지안",
          handle: "quiet_studio",
          bio: "디자인과 코드 사이에서 발견한 것들을 기록합니다.",
        }}
        onSave={async () => {
          await new Promise((resolve) => setTimeout(resolve, 400));
        }}
        successMessage="예시 프로필 콜백을 실행했습니다."
      />
    </>
  );
}
