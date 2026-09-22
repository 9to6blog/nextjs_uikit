"use client";
import { NotificationSettings } from "@9to6/ui/blocks/notification-settings";
import { useState } from "react";

export default function Example() {
  const [preferences, setPreferences] = useState([
    {
      id: "reply",
      label: "댓글과 답글",
      description: "내 글에 새 의견이 남겨졌을 때",
      enabled: true,
    },
    {
      id: "digest",
      label: "주간 요약",
      description: "한 주의 방문과 반응을 모아서",
      enabled: false,
    },
    {
      id: "review",
      label: "검토 요청",
      description: "팀원이 초안 검토를 요청했을 때",
      enabled: true,
    },
  ]);
  return (
    <>
      <p className="block-demo-note">
        브라우저 동작 예제입니다. 서버로 전송하거나 계정·구독을 만들지 않습니다.
        사용하는 앱의 API를 콜백에 연결하세요.
      </p>
      <NotificationSettings
        title="필요한 소식만 받아요"
        preferences={preferences}
        onChange={setPreferences}
        onSave={async () => {
          await new Promise((resolve) => setTimeout(resolve, 400));
        }}
        successMessage="예시 설정 콜백을 실행했습니다."
      />
    </>
  );
}
