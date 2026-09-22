"use client";
import { useId, useRef, useState } from "react";
import { Button } from "./button.js";
export type FileUploadProps = {
  value: File[];
  onValueChange: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  label?: string;
};
function accepted(file: File, accept?: string) {
  return (
    !accept ||
    accept.split(",").some((rule) => {
      const pattern = rule.trim().toLowerCase();
      return pattern.startsWith(".")
        ? file.name.toLowerCase().endsWith(pattern)
        : pattern.endsWith("/*")
          ? file.type.startsWith(pattern.slice(0, -1))
          : file.type === pattern;
    })
  );
}
export function FileUpload({
  value,
  onValueChange,
  accept,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  disabled,
  label = "파일 업로드",
}: FileUploadProps) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  function add(files: File[]) {
    if (disabled) return;
    const next = [...value],
      issues: string[] = [];
    for (const file of files) {
      if (!accepted(file, accept))
        issues.push(`${file.name}: 허용하지 않는 형식입니다.`);
      else if (file.size > maxSize)
        issues.push(`${file.name}: 파일 크기 제한을 초과했습니다.`);
      else if (next.length >= maxFiles)
        issues.push(`최대 ${maxFiles}개까지 선택할 수 있습니다.`);
      else if (
        !next.some(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.lastModified === file.lastModified,
        )
      )
        next.push(file);
    }
    setErrors(issues);
    onValueChange(next);
  }
  return (
    <div className="n-upload">
      <div
        data-dragging={dragging}
        data-disabled={disabled}
        className="n-dropzone"
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(Array.from(e.dataTransfer.files));
        }}
      >
        <span aria-hidden="true" className="n-upload-symbol">
          ↑
        </span>
        <strong>{label}</strong>
        <p id={`${id}-hint`} className="n-description">
          파일을 놓거나 선택하세요 · 최대 {maxFiles}개, 파일당{" "}
          {Math.round(maxSize / 1024 / 1024)} MB
        </p>
        <input
          ref={input}
          className="n-sr-only"
          type="file"
          tabIndex={-1}
          aria-label={label}
          accept={accept}
          multiple={maxFiles > 1}
          disabled={disabled}
          onChange={(e) => {
            add(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
        <Button
          variant="outline"
          disabled={disabled}
          aria-describedby={`${id}-hint`}
          onClick={() => input.current?.click()}
        >
          파일 선택
        </Button>
      </div>
      <ul className="n-upload-list">
        {value.map((file, i) => (
          <li key={`${file.name}-${file.lastModified}`}>
            <span>
              {file.name}
              <small>{Math.ceil(file.size / 1024)} KB</small>
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={disabled}
              aria-label={`${file.name} 제거`}
              onClick={() =>
                onValueChange(value.filter((_, index) => index !== i))
              }
            >
              ×
            </Button>
          </li>
        ))}
      </ul>
      {errors.length > 0 && (
        <div role="alert" className="n-error">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}
