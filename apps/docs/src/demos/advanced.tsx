"use client";
import { useDemoReady } from "@/lib/use-demo-ready";
import { useState } from "react";
import { FileUpload } from "@9to6/ui/file-upload";
import { Tree } from "@9to6/ui/tree";
import { Sortable } from "@9to6/ui/sortable";
export function AdvancedDemo({ name }: { name: string }) {
  useDemoReady(name);
  const [files, setFiles] = useState<File[]>([]);
  const [selection, setSelection] = useState("button");
  const [items, setItems] = useState([
    { id: "1", label: "Introduction" },
    { id: "2", label: "Design principles" },
    { id: "3", label: "Getting started" },
    { id: "4", label: "Next steps" },
  ]);
  switch (name) {
    case "file-upload":
      return (
        <div className="demo-stack">
          <FileUpload
            value={files}
            onValueChange={setFiles}
            accept="image/*,.pdf,.txt"
            maxFiles={3}
            maxSize={5 * 1024 * 1024}
          />
          <p className="demo-note">
            이미지, PDF, TXT · 데모에서는 파일을 서버로 전송하지 않습니다.
          </p>
        </div>
      );
    case "tree":
      return (
        <div className="demo-stack">
          <Tree
            label="프로젝트 파일"
            nodes={[
              {
                id: "components",
                label: "Components",
                children: [
                  { id: "button", label: "button.tsx" },
                  { id: "card", label: "card.tsx" },
                  { id: "input", label: "input.tsx" },
                ],
              },
              {
                id: "styles",
                label: "Styles",
                children: [
                  { id: "tokens", label: "tokens.css" },
                  { id: "global", label: "globals.css" },
                ],
              },
              { id: "readme", label: "README.md" },
            ]}
            defaultExpanded={["components"]}
            value={selection}
            onValueChange={setSelection}
          />
          <span role="status" className="demo-note">
            선택: {selection}
          </span>
        </div>
      );
    case "sortable":
      return (
        <div className="demo-stack">
          <Sortable label="문서 순서" items={items} onValueChange={setItems} />
          <p className="demo-note">
            핸들을 드래그하거나 Space, 방향키, Space 순서로 순서를 바꾸세요.
          </p>
        </div>
      );
    default:
      return null;
  }
}
