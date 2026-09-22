"use client";
import { UploadPanel } from "@9to6/ui/blocks/upload-panel";

export default function Example() {
  return (
    <>
      <p className="block-demo-note">
        브라우저 동작 예제입니다. 서버로 전송하거나 계정·구독을 만들지 않습니다.
        사용하는 앱의 API를 콜백에 연결하세요.
      </p>
      <UploadPanel
        title="발행 자료 모으기"
        description="표지 이미지와 참고 문서를 준비합니다."
        accept="image/*,.pdf,.txt"
        maxFiles={3}
        maxSize={5 * 1024 * 1024}
        onUpload={async () => {
          await new Promise((resolve) => setTimeout(resolve, 400));
        }}
        successMessage="예시 업로드 콜백을 실행했습니다. 서버에 저장하지 않았습니다."
      />
    </>
  );
}
