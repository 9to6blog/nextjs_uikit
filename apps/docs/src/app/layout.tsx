import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import "@9to6/ui/styles.css";
import "@9to6/ui/blocks.css";
import "./globals.css";
import "./collections.css";
export const metadata: Metadata = {
  title: {
    default: "NINE UI — Interfaces in good motion",
    template: "%s · NINE UI",
  },
  description:
    "Next.js를 위한 독립 UI 라이브러리. 조합 가능한 컴포넌트, 의미 있는 모션, 나만의 디자인 시스템.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
