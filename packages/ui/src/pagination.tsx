"use client";
import type { ComponentProps } from "react";
import { Button } from "./button.js";
import { cn } from "./utils.js";
export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  ...props
}: Omit<ComponentProps<"nav">, "children"> & {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  const total = Math.max(1, pageCount);
  return (
    <nav
      {...props}
      aria-label="페이지 탐색"
      className={cn("n-pagination", className)}
    >
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        이전
      </Button>
      <span aria-live="polite">
        {page} / {total}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= total}
        onClick={() => onPageChange(page + 1)}
      >
        다음
      </Button>
    </nav>
  );
}
