"use client";
import { Newsletter } from "@9to6/ui/blocks/newsletter";

export default function Example() {
  return (
    <>
      <p className="block-demo-note">
        브라우저 동작 예제입니다. 서버로 전송하거나 계정·구독을 만들지 않습니다.
        사용하는 앱의 API를 콜백에 연결하세요.
      </p>
      <Newsletter
        title="다음 이야기도 함께 읽어요"
        description="매주 한 번, 디자인과 개발에 관한 짧은 편지를 보냅니다."
        privacyHref="#privacy"
        successMessage="예시 구독 콜백을 실행했습니다."
        onSubscribe={async () => {
          await new Promise((resolve) => setTimeout(resolve, 400));
        }}
      />
      <p id="privacy" className="block-demo-note">
        예시 개인정보 안내 · 실제 서비스의 처리방침 링크를 연결하세요.
      </p>
    </>
  );
}
