"use client";
import { useState } from "react";
import { FileUpload, type FileUploadProps } from "../file-upload.js";
import { Button } from "../button.js";
import { BlockShell, type BlockProps } from "./shared.js";
import { useSubmission } from "./use-submission.js";
export type UploadPanelProps = BlockProps &
  Pick<FileUploadProps, "accept" | "maxFiles" | "maxSize"> & {
    onUpload: (files: File[]) => void | Promise<void>;
    successMessage?: string;
  };
export function UploadPanel({
  onUpload,
  accept,
  maxFiles = 5,
  maxSize,
  successMessage = "파일을 업로드했습니다.",
  ...props
}: UploadPanelProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { pending, run, feedback } = useSubmission(successMessage);
  return (
    <BlockShell {...props}>
      <FileUpload
        value={files}
        onValueChange={setFiles}
        disabled={pending}
        accept={accept}
        maxFiles={maxFiles}
        maxSize={maxSize}
      />
      <div className="n-block-actions">
        <Button
          loading={pending}
          disabled={!files.length}
          onClick={() => void run(() => onUpload(files))}
        >
          선택 파일 업로드
        </Button>
        <Button
          variant="ghost"
          disabled={pending || !files.length}
          onClick={() => setFiles([])}
        >
          모두 비우기
        </Button>
      </div>
      {feedback}
    </BlockShell>
  );
}
