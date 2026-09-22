import { test, expect } from "@playwright/test";
import { gotoReady, settleAnimations } from "./helpers";
test("blocks gallery filters and opens a usable block", async ({ page }) => {
  await gotoReady(page, "/blocks/");
  await expect(page.locator(".block-gallery-card")).toHaveCount(24);
  await page.getByRole("button", { name: "Forms", exact: true }).click();
  await expect(page.locator(".block-gallery-card")).toHaveCount(6);
  await page.getByRole("textbox", { name: "블록 검색" }).fill("profile");
  await expect(page.locator(".block-gallery-card")).toHaveCount(1);
  await page.locator(".block-gallery-card").click();
  await expect(page.locator("h1")).toHaveText("Profile Settings");
  await expect(page.getByRole("textbox", { name: "표시 이름" })).toHaveValue(
    "지안",
  );
});
test("article filters and controlled bookmarks update real content", async ({
  page,
}) => {
  await gotoReady(page, "/blocks/article-grid/");
  await page.getByRole("button", { name: "개발", exact: true }).click();
  await expect(page.locator(".n-block-article")).toHaveCount(1);
  await page.getByRole("textbox", { name: "글 검색" }).fill("없는 제목");
  await expect(page.locator(".n-block-article")).toHaveCount(0);
  await gotoReady(page, "/blocks/reading-list/");
  const save = page.getByRole("button", { name: "모션에 이유를 더하기 저장" });
  await save.click();
  await expect(save).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".n-block [role=status]")).toHaveText("2개 저장");
});
test("board tasks move columns and checklist uses the shared checkbox", async ({
  page,
}) => {
  await gotoReady(page, "/blocks/project-board/");
  await page.getByRole("combobox", { name: "글 구조 정리 상태" }).click();
  await page.getByRole("option", { name: "완료", exact: true }).click();
  const done = page.locator(".n-block-board > section").filter({
    has: page.getByRole("heading", { name: "완료 2", exact: true }),
  });
  await expect(
    done.getByRole("heading", { name: "글 구조 정리", exact: true }),
  ).toBeVisible();
  await gotoReady(page, "/blocks/task-panel/");
  const checkbox = page.getByRole("checkbox", { name: /이미지 대체 텍스트/ });
  await expect(checkbox).toHaveClass(/n-checkbox/);
  await checkbox.click();
  await expect(checkbox).toBeChecked();
  await expect(page.locator(".n-block [role=status]")).toHaveText("2 / 3 완료");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    /66\.66/,
  );
});
test("commands and team search use caller data", async ({ page }) => {
  await gotoReady(page, "/blocks/command-workspace/");
  await page.getByRole("combobox", { name: "작업 검색" }).fill("새 초안");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.locator(".block-demo [role=status]")).toHaveText(
    "새 초안을 준비했습니다.",
  );
  await gotoReady(page, "/blocks/team-directory/");
  await page.getByRole("textbox", { name: "팀원 검색" }).fill("개발");
  await expect(page.locator(".n-block-list > li")).toHaveCount(1);
  await expect(page.locator(".n-block-list")).toContainText("현우");
});
test("form validation, pending, rejection and success are visible", async ({
  page,
}) => {
  await gotoReady(page, "/blocks/sign-in/");
  await page.getByRole("button", { name: "로그인", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "이메일", exact: true }),
  ).toBeFocused();
  await page
    .getByRole("textbox", { name: "이메일", exact: true })
    .fill("fail@example.com");
  await page.getByLabel("비밀번호", { exact: false }).fill("example-password");
  await page.getByRole("button", { name: "로그인", exact: true }).click();
  await expect(page.locator(".n-block form [role=alert]")).toHaveText(
    "예시 오류: 이메일을 확인해 주세요.",
  );
  await page
    .getByRole("textbox", { name: "이메일", exact: true })
    .fill("reader@example.com");
  await page.getByRole("button", { name: "로그인", exact: true }).click();
  await expect(page.locator(".n-block form [role=status]")).toHaveText(
    "예시 로그인 콜백을 실행했습니다.",
  );
});
test("profile reset, notification switches and upload callback work", async ({
  page,
}) => {
  await gotoReady(page, "/blocks/profile-settings/");
  const name = page.getByRole("textbox", { name: "표시 이름" });
  await name.fill("새 이름");
  await page.getByRole("button", { name: "되돌리기" }).click();
  await expect(name).toHaveValue("지안");
  await name.fill("새 이름");
  await page.getByRole("button", { name: "변경사항 저장" }).click();
  await expect(page.locator(".n-block [role=status]")).toContainText(
    "예시 프로필",
  );
  await gotoReady(page, "/blocks/notification-settings/");
  const control = page.getByRole("switch", { name: "주간 요약" });
  await control.click();
  await expect(control).toBeChecked();
  await page.getByRole("button", { name: "알림 설정 저장" }).click();
  await expect(page.locator(".n-block [role=status]")).toContainText(
    "예시 설정",
  );
  await gotoReady(page, "/blocks/upload-panel/");
  await expect(
    page.getByRole("button", { name: "선택 파일 업로드" }),
  ).toBeDisabled();
  await page.locator("input[type=file]").setInputFiles({
    name: "notes.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Original studio notes"),
  });
  await page.getByRole("button", { name: "선택 파일 업로드" }).click();
  await expect(page.locator(".n-block [role=status]")).toContainText(
    "서버에 저장하지 않았습니다",
  );
  await page.getByRole("button", { name: "모두 비우기" }).click();
  await expect(page.locator(".n-upload-list > li")).toHaveCount(0);
});
test("pricing changes billing and FAQ opens with keyboard", async ({
  page,
}) => {
  await gotoReady(page, "/blocks/pricing/");
  await expect(page.locator(".n-block-price").nth(1)).toContainText("12,000");
  await page.getByRole("button", { name: "연간 결제" }).click();
  await expect(page.locator(".n-block-price").nth(1)).toContainText("120,000");
  await page.getByRole("button", { name: "스튜디오 선택" }).click();
  await expect(page.locator(".block-demo [role=status]")).toHaveText(
    "스튜디오 · 연간 선택",
  );
  await gotoReady(page, "/blocks/faq/");
  const question = page.getByRole("button", {
    name: "React 프로젝트에서도 쓸 수 있나요?",
  });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
});
test("chart types use updated data and a readable table", async ({ page }) => {
  await gotoReady(page, "/charts/");
  await expect(page.locator(".n-chart-view")).toHaveAttribute(
    "data-kind",
    "line",
  );
  await page.getByRole("button", { name: /도넛/ }).click();
  await expect(page.locator(".n-chart-view")).toHaveAttribute(
    "data-kind",
    "donut",
  );
  await expect(page.locator(".recharts-pie-sector")).toHaveCount(6);
  await page.getByRole("button", { name: "이번 달", exact: true }).click();
  await expect(page.locator(".recharts-pie-sector")).toHaveCount(4);
  await page.locator(".n-chart-table summary").click();
  await expect(page.locator(".n-chart-table tbody tr")).toHaveCount(4);
  await expect(page.locator(".n-chart-table")).toContainText("1180");
  await page.getByRole("button", { name: /산점도/ }).click();
  await expect(page.locator(".recharts-scatter-symbol")).toHaveCount(8);
});
test("carousel thumbnail, multiple slides and vertical keyboard navigation work", async ({
  page,
}) => {
  await gotoReady(page, "/carousels/");
  await page.getByRole("button", { name: "썸네일", exact: true }).click();
  await page.getByRole("button", { name: "3번 슬라이드 보기" }).click();
  await expect(page.locator(".n-carousel-controls span[aria-live]")).toHaveText(
    "3 / 3",
  );
  await page.getByRole("button", { name: "다중 카드", exact: true }).click();
  await expect
    .poll(() => page.locator(".n-carousel-slide:not([inert])").count())
    .toBe(2);
  await page.getByRole("button", { name: "세로 이동", exact: true }).click();
  const next = page.getByRole("button", { name: "다음 슬라이드" });
  await next.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator(".n-carousel-controls span[aria-live]")).toHaveText(
    "2 / 3",
  );
  await settleAnimations(page);
});
test("carousel autoplay pauses on focus and reduced motion disables rotation", async ({
  page,
}) => {
  await gotoReady(page, "/carousels/");
  await page.getByRole("button", { name: "자동 재생", exact: true }).click();
  const carousel = page.locator(".n-carousel");
  await expect(carousel).toHaveAttribute("data-playing", "true");
  await expect(page.locator(".n-carousel-controls span[aria-live]")).toHaveText(
    "2 / 3",
    { timeout: 7000 },
  );
  await page.getByRole("button", { name: "다음 슬라이드" }).focus();
  await expect(carousel).toHaveAttribute("data-playing", "false");
  const start = page.getByRole("button", { name: "자동 재생 시작" });
  await start.focus();
  await page.mouse.move(0, 0);
  await page.keyboard.press("Enter");
  await expect(carousel).toHaveAttribute("data-playing", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(carousel).toHaveAttribute("data-playing", "false");
  await expect(
    page.getByRole("button", { name: "자동 재생 꺼짐 · 모션 감소" }),
  ).toBeDisabled();
});
