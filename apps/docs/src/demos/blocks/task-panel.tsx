"use client";
import { TaskPanel, type TaskItem } from "@9to6/ui/blocks/task-panel";
import { useState } from "react";

export default function Example() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "title",
      title: "제목과 설명 검토",
      detail: "목록과 검색 화면에서도 자연스럽게",
      done: true,
    },
    {
      id: "alt",
      title: "이미지 대체 텍스트 작성",
      detail: "이미지의 역할을 짧게 설명하기",
      done: false,
    },
    {
      id: "preview",
      title: "모바일 미리보기",
      detail: "줄바꿈과 터치 영역 확인",
      done: false,
    },
  ]);
  return (
    <TaskPanel
      title="발행 전 마지막 확인"
      tasks={tasks}
      onTasksChange={setTasks}
    />
  );
}
