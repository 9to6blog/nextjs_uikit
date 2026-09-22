"use client";
import { CommandWorkspace } from "@9to6/ui/blocks/command-workspace";
import { useState } from "react";

export default function Example() {
  const [result, setResult] = useState("명령을 선택하면 결과를 표시합니다.");
  return (
    <>
      <CommandWorkspace
        title="어떤 작업을 할까요?"
        commands={[
          {
            id: "draft",
            label: "새 초안 만들기",
            description: "빈 문서로 생각 정리하기",
            group: "글쓰기",
            onSelect: () => setResult("새 초안을 준비했습니다."),
          },
          {
            id: "preview",
            label: "발행 미리보기",
            description: "독자가 볼 화면 확인하기",
            group: "글쓰기",
            onSelect: () => setResult("미리보기 작업을 선택했습니다."),
          },
          {
            id: "settings",
            label: "작업실 설정",
            description: "이름과 알림 설정 관리",
            group: "관리",
            onSelect: () => setResult("설정 작업을 선택했습니다."),
          },
        ]}
      />
      <p className="block-demo-note" role="status">
        {result}
      </p>
    </>
  );
}
