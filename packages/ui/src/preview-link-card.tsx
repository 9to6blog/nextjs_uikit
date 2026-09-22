"use client";
import type { ReactNode } from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card.js";
export function PreviewLinkCard({
  href,
  children,
  preview,
  label = "링크 미리보기",
}: {
  href: string;
  children: ReactNode;
  preview: ReactNode;
  label?: string;
}) {
  return (
    <HoverCard openDelay={600} closeDelay={300}>
      <HoverCardTrigger asChild>
        <a href={href} className="n-preview-link">
          {children}
        </a>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        sideOffset={8}
        className="n-preview-link-card"
        aria-label={label}
      >
        {preview}
      </HoverCardContent>
    </HoverCard>
  );
}
