"use client";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { useReducedMotion } from "./use-reduced-motion.js";
import { cn } from "./utils.js";
function colorize(code: string, language: string) {
  if (!/^(tsx?|jsx?|json|javascript|typescript)$/.test(language)) return code;
  return code
    .split(
      /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/[^\n]*|\b(?:import|from|type|export|function|return|const|let|boolean|string|number|true|false|null)\b|\b\d+\b)/g,
    )
    .map((part, index) => {
      const kind = /^['"]/.test(part)
        ? "string"
        : part.startsWith("//")
          ? "comment"
          : /^\d+$/.test(part)
            ? "number"
            : /^(import|from|type|export|function|return|const|let|boolean|string|number|true|false|null)$/.test(
                  part,
                )
              ? "keyword"
              : undefined;
      return kind ? (
        <span key={index} className={`n-code-${kind}`}>
          {part}
        </span>
      ) : (
        part
      );
    });
}
export type CodeBlockProps = Omit<ComponentProps<"div">, "children"> & {
  code: string;
  filename?: string;
  language?: string;
  writing?: boolean;
  duration?: number;
};
export function CodeBlock({
  code,
  filename,
  language = "text",
  writing = false,
  duration = 5000,
  className,
  ...props
}: CodeBlockProps) {
  const reduced = useReducedMotion();
  const [length, setLength] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!writing || reduced || !host.current) return;
    let frame = 0,
      start = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const tick = (time: number) => {
        if (!start) start = time;
        const next = Math.min(
          code.length,
          Math.floor(((time - start) / Math.max(duration, 1)) * code.length),
        );
        setLength(next);
        if (next < code.length) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(host.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [code, writing, reduced, duration]);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  const text = writing && !reduced ? code.slice(0, length) : code;
  return (
    <div {...props} ref={host} className={cn("n-code-block", className)}>
      <div className="n-code-header">
        <span>{filename ?? language}</span>
        <button
          type="button"
          aria-label={copied ? "복사 완료" : "코드 복사"}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setError(false);
            } catch {
              setError(true);
            }
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            {copied ? (
              <path d="m5 12 4 4L19 6" />
            ) : (
              <>
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M15 8V4H4v11h4" />
              </>
            )}
          </svg>
        </button>
      </div>
      <pre tabIndex={0} aria-label={`${language} 코드`}>
        <code aria-hidden={writing || undefined}>
          {colorize(text, language)}
        </code>
        {writing && <code className="n-sr-only">{code}</code>}
      </pre>
      <span className="n-sr-only" role="status">
        {error
          ? "복사하지 못했습니다. 코드를 직접 선택해 복사하세요."
          : copied
            ? "코드를 복사했습니다."
            : ""}
      </span>
    </div>
  );
}
