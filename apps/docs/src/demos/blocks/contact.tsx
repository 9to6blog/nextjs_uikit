"use client";
import { Contact } from "@9to6/ui/blocks/contact";

export default function Example() {
  return (
    <>
      <p className="block-demo-note">
        브라우저 동작 예제입니다. 서버로 전송하거나 계정·구독을 만들지 않습니다.
        사용하는 앱의 API를 콜백에 연결하세요.
      </p>
      <Contact
        title="함께 만들 이야기가 있나요?"
        description="궁금한 점이나 협업 아이디어를 들려 주세요."
        onSubmit={async () => {
          await new Promise((resolve) => setTimeout(resolve, 400));
        }}
        successMessage="예시 문의 콜백을 실행했습니다."
      />
    </>
  );
}
