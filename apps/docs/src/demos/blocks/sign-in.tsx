"use client";
import { SignIn } from "@9to6/ui/blocks/sign-in";

export default function Example() {
  return (
    <>
      <p className="block-demo-note">
        브라우저 동작 예제입니다. 서버로 전송하거나 계정·구독을 만들지 않습니다.
        사용하는 앱의 API를 콜백에 연결하세요.
      </p>
      <SignIn
        title="다시 만나 반갑습니다"
        description="작업실에 들어오려면 이메일로 로그인하세요."
        successMessage="예시 로그인 콜백을 실행했습니다."
        onSubmit={async ({ email }) => {
          await new Promise((resolve) => setTimeout(resolve, 400));
          if (email === "fail@example.com")
            throw new Error("예시 오류: 이메일을 확인해 주세요.");
        }}
      />
      <p className="block-demo-note">
        fail@example.com을 입력하면 오류 상태도 확인할 수 있습니다.
      </p>
    </>
  );
}
