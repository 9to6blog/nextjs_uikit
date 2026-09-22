"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@9to6/ui/button";
export function CodeBlock({
  code,
  label = "tsx",
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="code-block">
      <div className="code-block-top">
        <span>{label}</span>
        <Button
          size="icon"
          variant="ghost"
          aria-label="코드 복사"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setError(false);
              setTimeout(() => setCopied(false), 1800);
            } catch {
              setError(true);
            }
          }}
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
      <pre tabIndex={0} aria-label={`${label} 코드`}>
        <code>{code}</code>
      </pre>
      <span role="status" className={error ? "code-copy-error" : "n-sr-only"}>
        {error
          ? "복사할 수 없습니다. 코드를 직접 선택해 복사하세요."
          : copied
            ? "복사했습니다."
            : ""}
      </span>
    </div>
  );
}
