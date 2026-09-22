"use client";
import { sitePath } from "@/lib/site-path";
import {
  BookOpen,
  Palette,
  Image as ImageIcon,
  NotebookPen,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { Copy, Scissors, Clipboard, Star, Pin, Trash2 } from "lucide-react";
import { useDemoReady } from "@/lib/use-demo-ready";
import { CodeBlock } from "@9to6/ui/code-block";
import { CodeTabs } from "@9to6/ui/code-tabs";
import { NotificationList } from "@9to6/ui/notification-list";
import { PinnedList } from "@9to6/ui/pinned-list";
import { TodoList } from "@9to6/ui/todo-list";
import { RadialMenu } from "@9to6/ui/radial-menu";
import { ShineCard } from "@9to6/ui/shine-card";
import { MultiStepDialog } from "@9to6/ui/multi-step-dialog";
import { RelativeTime } from "@9to6/ui/relative-time";
import { PreviewLinkCard } from "@9to6/ui/preview-link-card";
import { Button } from "@9to6/ui/button";
const code = `'use client';\n\nimport { Button } from '@9to6/ui/button';\n\ntype WorkspaceProps = {\n  name: string;\n};\n\nexport function Workspace({ name }: WorkspaceProps) {\n  return <Button>{name}</Button>;\n}`;
export function MotionDemo({ name }: { name: string }) {
  useDemoReady(name);
  const [replay, setReplay] = useState(0);
  const [status, setStatus] = useState("");
  switch (name) {
    case "code-block":
      return (
        <div className="demo-stack">
          <CodeBlock
            key={replay}
            filename="workspace.tsx"
            language="tsx"
            code={code}
            writing
            duration={5000}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setReplay((v) => v + 1)}
          >
            타이핑 다시 재생
          </Button>
        </div>
      );
    case "code-tabs":
      return (
        <CodeTabs
          tabs={[
            { value: "next", label: "Next.js", language: "tsx", code },
            {
              value: "config",
              label: "Config",
              language: "json",
              code: '{\n  "theme": "system",\n  "accent": "black",\n  "motion": "full"\n}',
            },
          ]}
        />
      );
    case "notification-list":
      return (
        <NotificationList
          items={[
            {
              id: "install",
              title: "NPM Install Complete",
              description: "Just now · 1,227 packages added!",
              time: "2m",
            },
            {
              id: "build",
              title: "Build Succeeded",
              description: "1m 11s · Build finished in 12.34s",
            },
            {
              id: "lint",
              title: "Lint Passed",
              description: "5m · No problems found",
            },
          ]}
        />
      );
    case "pinned-list":
      return (
        <PinnedList
          label="작업실 자료 고정"
          defaultValue={["guide", "palette"]}
          items={[
            {
              id: "guide",
              title: "발행 가이드",
              description: "글을 공개하기 전 확인할 항목",
              icon: <BookOpen />,
            },
            {
              id: "palette",
              title: "브랜드 팔레트",
              description: "색상과 타이포그래피 모음",
              icon: <Palette />,
            },
            {
              id: "cover",
              title: "커버 이미지",
              description: "다음 글에 사용할 표지 시안",
              icon: <ImageIcon />,
            },
            {
              id: "notes",
              title: "인터뷰 노트",
              description: "새로운 관점과 인사이트 기록",
              icon: <NotebookPen />,
            },
            {
              id: "release",
              title: "업데이트 기록",
              description: "제품의 개선 사항과 변경 이력",
              icon: <Layers />,
            },
          ]}
        />
      );
    case "todo-list":
      return (
        <TodoList
          items={[
            { id: "outline", label: "새 글의 목차 정리" },
            { id: "review", label: "초안 검토와 문장 다듬기" },
            { id: "publish", label: "미리보기 확인 후 발행" },
          ]}
        />
      );
    case "radial-menu":
      return (
        <div className="demo-stack">
          <RadialMenu
            items={[
              { id: "copy", label: "복사", icon: <Copy /> },
              { id: "cut", label: "잘라내기", icon: <Scissors /> },
              { id: "paste", label: "붙여넣기", icon: <Clipboard /> },
              { id: "star", label: "즐겨찾기", icon: <Star /> },
              { id: "pin", label: "고정", icon: <Pin /> },
              { id: "delete", label: "삭제", icon: <Trash2 /> },
            ].map((item) => ({
              ...item,
              onSelect: () => setStatus(`${item.label} 선택됨`),
            }))}
          >
            오른쪽 클릭 또는 Shift+F10으로 원형 메뉴 열기
          </RadialMenu>
          <p role="status" className="demo-note">
            {status || "방향키로 이동하고 Enter로 선택할 수 있습니다."}
          </p>
        </div>
      );
    case "shine-card":
      return (
        <ShineCard>
          <h3>NINE UI</h3>
          <p>
            Explore components with thoughtful details and a quiet, continuous
            shimmer.
          </p>
        </ShineCard>
      );
    case "multi-step-dialog":
      return (
        <div className="demo-stack">
          <MultiStepDialog
            trigger={<Button variant="outline">시작하기</Button>}
            steps={[
              {
                id: "intro",
                title: "NINE UI",
                description:
                  "현대적인 디자인과 자연스러운 움직임을 프로젝트에 더하세요.",
              },
              {
                id: "usage",
                title: "어떻게 사용하나요?",
                description:
                  "원하는 컴포넌트를 선택하고 소스를 복사하거나 패키지를 설치하세요.",
              },
              {
                id: "result",
                title: "준비가 끝났습니다",
                description:
                  "공통 토큰으로 프로젝트의 색상과 크기, 움직임을 조절할 수 있습니다.",
              },
            ]}
            onComplete={() => setStatus("설정을 완료했습니다.")}
          />
          <p role="status" className="demo-note">
            {status}
          </p>
        </div>
      );
    case "relative-time":
      return <RelativeTime initialTime="2026-09-22T04:59:45.000Z" />;
    case "preview-link-card":
      return (
        <p className="demo-note">
          Read the{" "}
          <PreviewLinkCard
            href={sitePath("/getting-started/")}
            preview={
              <div className="link-preview-document">
                <small>NINE UI / Documentation</small>
                <h3>Introduction</h3>
                <p>Next.js를 위한 독립형 컴포넌트 라이브러리.</p>
                <hr />
                <strong>Built for your next idea.</strong>
                <p>테마, 접근성, 모션을 한곳에서 관리하세요.</p>
              </div>
            }
          >
            NINE UI Docs
          </PreviewLinkCard>{" "}
          — hover to preview, click to dive in.
        </p>
      );
    default:
      return null;
  }
}
