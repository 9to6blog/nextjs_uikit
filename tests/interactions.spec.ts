import { gotoReady, settleAnimations } from "./helpers";
import { test, expect } from "@playwright/test";
test("dialog traps focus, validates input and restores trigger", async ({
  page,
}) => {
  await gotoReady(page, "/components/dialog/");
  const trigger = page.getByRole("button", {
    name: "프로젝트 만들기",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.getByRole("textbox", { name: "프로젝트 이름" }).fill("Workspace");
  await dialog.getByRole("button", { name: "만들기", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText("준비");
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("alert dialog starts at the safe action and requires explicit confirmation", async ({
  page,
}) => {
  await gotoReady(page, "/components/alert-dialog/");
  await page
    .getByRole("button", { name: "프로젝트 보관", exact: true })
    .click();
  const dialog = page.getByRole("alertdialog");
  await expect(dialog.getByRole("button", { name: "취소" })).toBeFocused();
  await dialog.getByRole("button", { name: "보관하기" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(
    page.locator('[data-demo="alert-dialog"] [role="status"]'),
  ).toContainText("보관했습니다");
});
test("tabs use arrows, keep one active tab and display matching content", async ({
  page,
}) => {
  await gotoReady(page, "/components/tabs/");
  await page.getByRole("tab", { name: "Design", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Code", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText(
    "Built to make it yours",
  );
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: "Activity", exact: true }),
  ).toBeFocused();
});
test("accordion supports keyboard expand and collapse", async ({ page }) => {
  await gotoReady(page, "/components/accordion/");
  const trigger = page.getByRole("button", {
    name: "애니메이션을 줄일 수 있나요?",
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});
test("select skips disabled choices and returns focus", async ({ page }) => {
  await gotoReady(page, "/components/select/");
  const trigger = page.getByRole("combobox", { name: "언어" });
  await trigger.click();
  await page.getByRole("option", { name: "English", exact: true }).click();
  await expect(trigger).toContainText("English");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(page.getByRole("option", { name: "Deutsch" })).toHaveAttribute(
    "data-disabled",
    "",
  );
  await page.keyboard.press("Escape");
});
test("combobox searches, selects and handles no matches", async ({ page }) => {
  await gotoReady(page, "/components/combobox/");
  const trigger = page.getByRole("button", { name: "프레임워크", exact: true });
  await trigger.click();
  const input = page.getByRole("combobox", { name: "프레임워크 검색" });
  await input.fill("Remix");
  await page.keyboard.press("Enter");
  await expect(trigger).toContainText("Remix");
  await trigger.click();
  await page.getByRole("combobox", { name: "프레임워크 검색" }).fill("zzzzzz");
  await expect(
    page.getByText("검색 결과가 없습니다", { exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
});
test("dropdown supports submenu and menu actions", async ({ page }) => {
  await gotoReady(page, "/components/dropdown-menu/");
  const trigger = page.getByRole("button", { name: "프로젝트 메뉴" });
  await trigger.click();
  await page.getByRole("menuitem", { name: "편집", exact: true }).click();
  await expect(
    page.locator('[data-demo="dropdown-menu"] [role="status"]'),
  ).toContainText("편집");
  await expect(page.getByRole("menu")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("menuitem", { name: "내보내기" }).hover();
  await page.getByRole("menuitem", { name: "JSON", exact: true }).click();
  await expect(
    page.locator('[data-demo="dropdown-menu"] [role="status"]'),
  ).toContainText("JSON");
});
test("OTP accepts complete paste-like input", async ({ page }) => {
  await gotoReady(page, "/components/input-otp/");
  await page.getByRole("textbox", { name: "인증 코드" }).fill("123456");
  await expect(
    page.locator('[data-demo="input-otp"] [role="status"]'),
  ).toHaveText("6자리 입력 완료");
});
test("submit button exposes pending and prevents duplicate submit", async ({
  page,
}) => {
  await gotoReady(page, "/components/submit-button/");
  const button = page.locator(
    '[data-demo="submit-button"] button[type="submit"]',
  );
  const before = await button.boundingBox();
  const layoutWidth = await button.evaluate((el) => getComputedStyle(el).width);
  await button.click();
  await expect(button).toBeDisabled();
  await expect(button).toHaveAttribute("aria-busy", "true");
  await expect(button).toHaveCSS("width", layoutWidth);
  // The press scale changes visual bounds without changing the layout width.
  await settleAnimations(page);
  const during = await button.boundingBox();
  expect(during?.width).toBe(before?.width);
  await expect(
    page.locator('[data-demo="submit-button"] [role="status"]'),
  ).toContainText("완료");
  await expect(button).toBeEnabled();
});
test("data table filters, sorts, selects, paginates and hides columns", async ({
  page,
}) => {
  await gotoReady(page, "/components/data-table/");
  const demo = page.locator('[data-demo="data-table"]');
  await demo.getByRole("button", { name: "조회수" }).click();
  await expect(demo.locator('th[aria-sort="ascending"]')).toContainText(
    "조회수",
  );
  await demo.getByRole("checkbox", { name: "현재 페이지 전체 선택" }).check();
  await expect(demo.locator('tbody tr[data-selected="true"]')).toHaveCount(4);
  await demo.getByRole("button", { name: "다음", exact: true }).click();
  await expect(demo).toContainText("2 / 2 페이지");
  await demo.getByRole("textbox", { name: "게시물 검색" }).fill("없는 게시물");
  await expect(demo).toContainText("표시할 데이터가 없습니다");
  await demo.getByRole("textbox", { name: "게시물 검색" }).fill("디자인");
  await expect(demo.locator("tbody tr")).toHaveCount(1);
  await demo.locator("summary").click();
  await demo.getByRole("checkbox", { name: "조회수", exact: true }).uncheck();
  await expect(demo.getByRole("columnheader", { name: "조회수" })).toHaveCount(
    0,
  );
});
test("tree implements directional navigation, expansion and typeahead", async ({
  page,
}) => {
  await gotoReady(page, "/components/tree/");
  const root = page.getByRole("treeitem", { name: "Components", exact: true });
  await root.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("treeitem", { name: "button.tsx", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("treeitem", { name: "card.tsx", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowLeft");
  await expect(root).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(root).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("r");
  await expect(
    page.getByRole("treeitem", { name: "README.md", exact: true }),
  ).toBeFocused();
});
test("sortable reorders with keyboard and announces the change", async ({
  page,
}) => {
  await gotoReady(page, "/components/sortable/");
  const handle = page.getByRole("button", { name: "Introduction 순서 변경" });
  await handle.focus();
  await page.keyboard.press("Space");
  await expect(
    page.locator('.n-sortable-row[data-dragging="true"]'),
  ).toContainText("Introduction");
  await page.keyboard.press("ArrowDown");
  await expect(
    page.locator('[role="status"][aria-live="assertive"]'),
  ).toContainText("2번째 위치");
  await page.keyboard.press("Space");
  await expect(page.locator(".n-sortable-row").nth(1)).toContainText(
    "Introduction",
  );
});
test("file upload validates formats, lists files and removes them", async ({
  page,
}) => {
  await gotoReady(page, "/components/file-upload/");
  const chooserOpened = page.waitForEvent("filechooser");
  await page.getByRole("button", { name: "파일 선택", exact: true }).click();
  const chooser = await chooserOpened;
  await chooser.setFiles([
    { name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("notes") },
    {
      name: "invalid.exe",
      mimeType: "application/octet-stream",
      buffer: Buffer.from("invalid"),
    },
  ]);
  await expect(page.locator(".n-upload-list")).toContainText("notes.txt");
  await expect(
    page.locator('[data-demo="file-upload"] [role="alert"]'),
  ).toContainText("허용하지 않는 형식");
  await page.getByRole("button", { name: "notes.txt 제거" }).click();
  await expect(page.locator(".n-upload-list li")).toHaveCount(0);
});
test("carousel updates visible slide and navigation limits", async ({
  page,
}) => {
  await gotoReady(page, "/components/carousel/");
  await expect(
    page.getByRole("button", { name: "이전 슬라이드" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "다음 슬라이드" }).click();
  await expect(page.locator(".n-carousel-controls")).toContainText("2 / 3");
  await page.getByRole("button", { name: "다음 슬라이드" }).click();
  await expect(
    page.getByRole("button", { name: "다음 슬라이드" }),
  ).toBeDisabled();
});
test("questionnaire validates required data and submits", async ({ page }) => {
  await gotoReady(page, "/components/questionnaire/");
  await page.getByRole("textbox", { name: "이름" }).fill("DaeHan");
  await page.getByRole("textbox", { name: "이메일" }).fill("test@example.com");
  await page
    .getByRole("combobox", { name: "주로 하는 일" })
    .selectOption("engineering");
  await page.getByRole("button", { name: "제출", exact: true }).click();
  await expect(
    page.locator('[data-demo="questionnaire"] [role="status"]'),
  ).toContainText("DaeHan님");
});
test("command search navigates to selected documentation", async ({ page }) => {
  await gotoReady(page, "/");
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-shortcuts-ready",
    "true",
  );
  await page.keyboard.press("Control+k");
  const search = page.getByRole("combobox", { name: "컴포넌트 검색어" });
  await search.fill("Accordion");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { level: 1, name: "Accordion" }),
  ).toBeVisible();
});
