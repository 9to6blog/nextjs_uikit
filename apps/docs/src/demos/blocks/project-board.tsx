"use client";
import { ProjectBoard } from "@9to6/ui/blocks/project-board";
import { useState } from "react";
import type { BoardTask } from "@9to6/ui/blocks/project-board";

export default function Example() {
  const [tasks, setTasks] = useState<BoardTask[]>([
    {
      id: "outline",
      title: "글 구조 정리",
      description: "핵심 질문 세 가지를 먼저 정합니다.",
      status: "todo",
      tag: "글쓰기",
    },
    {
      id: "cover",
      title: "표지 다듬기",
      description: "주제에 맞는 도형과 색을 고릅니다.",
      status: "doing",
      tag: "디자인",
    },
    {
      id: "check",
      title: "링크 점검",
      description: "본문에 연결한 자료를 확인합니다.",
      status: "done",
      tag: "검토",
    },
  ]);
  return (
    <ProjectBoard
      title="다음 발행 준비"
      description="각 카드의 상태를 변경해 보세요."
      columns={[
        { id: "todo", label: "할 일" },
        { id: "doing", label: "진행 중" },
        { id: "done", label: "완료" },
      ]}
      tasks={tasks}
      onTasksChange={setTasks}
    />
  );
}
