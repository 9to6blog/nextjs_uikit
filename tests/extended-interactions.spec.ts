import { gotoReady, settleAnimations } from "./helpers";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const item of [
  { slug: "sheet", trigger: "상세 설정 열기", title: "프로젝트 설정" },
  {
    slug: "drawer",
    trigger: "빠른 설정 열기",
    title: "Make room for good ideas.",
  },
]) {
  test(`${item.slug}: keyboard close and portal theme`, async ({ page }) => {
    await gotoReady(page, `/components/${item.slug}/`);
    await page
      .getByRole("button", { name: "다크 테마로 변경", exact: true })
      .click();
    const trigger = page.getByRole("button", { name: item.trigger });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByRole("heading", { name: item.title }),
    ).toBeVisible();
    await expect(dialog).toHaveAttribute("data-theme", "dark");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
}

for (const item of [
  { slug: "dialog", trigger: "프로젝트 만들기" },
  { slug: "alert-dialog", trigger: "프로젝트 보관" },
  { slug: "popover", trigger: "크기 설정" },
  { slug: "combobox", trigger: "프레임워크" },
  { slug: "date-picker", trigger: "게시일:" },
  { slug: "dropdown-menu", trigger: "프로젝트 메뉴" },
]) {
  test(`${item.slug}: opened overlay accessibility`, async ({ page }) => {
    await gotoReady(page, `/components/${item.slug}/`);
    await page.getByRole("button", { name: new RegExp(item.trigger) }).click();
    await expect(page.locator('[data-state="open"]').first()).toBeVisible();
    await settleAnimations(page);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          message: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  });
}

test("radio and checkbox are operable without a pointer", async ({ page }) => {
  await gotoReady(page, "/components/radio-group/");
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-shortcuts-ready",
    "true",
  );
  const radios = page.getByRole("radio");
  await radios.nth(0).focus();
  // Radix selects during deferred focus while the arrow key is held. Keep the
  // key down until that observable selection, then release it as a user does.
  await page.keyboard.down("ArrowDown");
  await expect(radios.nth(1)).toBeChecked();
  await page.keyboard.up("ArrowDown");
  await page.keyboard.down("ArrowDown");
  await expect(radios.nth(0)).toBeChecked();
  await page.keyboard.up("ArrowDown");
  await gotoReady(page, "/components/checkbox/");
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-shortcuts-ready",
    "true",
  );
  const checkbox = page.getByRole("checkbox", {
    name: "이용 약관에 동의합니다.",
  });
  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).not.toBeChecked();
  await expect(
    page.getByRole("checkbox", { name: "일부 항목 선택" }),
  ).toHaveAttribute("aria-checked", "mixed");
});
test("range slider changes with keyboard and respects its limits", async ({
  page,
}) => {
  await gotoReady(page, "/components/slider/");
  const minimum = page.getByRole("slider", { name: "최솟값" });
  await minimum.focus();
  await page.keyboard.press("ArrowRight");
  await expect(minimum).toHaveAttribute("aria-valuenow", "26");
  await page.keyboard.press("Home");
  await expect(minimum).toHaveAttribute("aria-valuenow", "0");
  await page.keyboard.press("ArrowLeft");
  await expect(minimum).toHaveAttribute("aria-valuenow", "0");
});
test("date picker selects a day and closes", async ({ page }) => {
  await gotoReady(page, "/components/date-picker/");
  const trigger = page.getByRole("button", { name: /게시일:/ });
  await trigger.click();
  await page.getByRole("button", { name: /September 10/ }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toContainText("2026년 9월 10일");
});
test("calendar selects a complete date range", async ({ page }) => {
  await gotoReady(page, "/components/calendar/");
  await page.getByRole("button", { name: /September 10/ }).click();
  await page.getByRole("button", { name: /September 15/ }).click();
  await expect(
    page.locator('[data-demo="calendar"] p[role="status"]'),
  ).toContainText("2026. 9. 10.");
  await expect(
    page.locator('[data-demo="calendar"] p[role="status"]'),
  ).toContainText("2026. 9. 15.");
});
test("resizable separator responds to the keyboard", async ({ page }) => {
  await gotoReady(page, "/components/resizable/");
  const handle = page.getByRole("separator", { name: "패널 너비 조절" });
  await handle.focus();
  const before = Number(await handle.getAttribute("aria-valuenow"));
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(async () => Number(await handle.getAttribute("aria-valuenow")))
    .toBeGreaterThan(before);
});
test("tooltip responds to focus and escape", async ({ page }) => {
  await gotoReady(page, "/components/tooltip/");
  await page.getByRole("button", { name: "마우스를 올려 보세요" }).focus();
  await expect(page.getByRole("tooltip")).toContainText("키보드 포커스");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).not.toBeVisible();
});
test("context menu responds to the keyboard", async ({ page }) => {
  await gotoReady(page, "/components/context-menu/");
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-shortcuts-ready",
    "true",
  );
  await page.locator(".context-target").focus();
  await page.keyboard.press("Shift+F10");
  await expect(
    page.getByRole("menuitem", { name: "복사", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.locator('[data-demo="context-menu"] [role="status"]'),
  ).toHaveText("복사 선택");
});
test("menubar navigates between menus with arrows", async ({ page }) => {
  await gotoReady(page, "/components/menubar/");
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-shortcuts-ready",
    "true",
  );
  await page.getByRole("menuitem", { name: "파일", exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("menuitem", { name: "새 문서", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("menuitem", { name: "편집", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  const openMenu = page.locator(
    '[data-radix-menubar-content][data-state="open"]',
  );
  await expect(openMenu).toBeFocused();
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press("ArrowLeft");
    await expect(
      page.getByRole("menuitem", { name: "파일", exact: true }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(openMenu).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("menuitem", { name: "편집", exact: true }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(openMenu).toBeFocused();
  }
  await page.getByRole("menuitem", { name: "실행 취소", exact: true }).click();
  await expect(
    page.locator('[data-demo="menubar"] [role="status"]'),
  ).toHaveText("실행 취소 선택");
});

test("static export navigation retains the document without failed prefetches", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await gotoReady(page, "/components/button/");
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-shortcuts-ready",
    "true",
  );
  await page.evaluate(() => {
    document.documentElement.dataset.navigationProbe = "retained";
  });
  const nav = page.getByRole("navigation", { name: "컴포넌트 탐색" });
  for (const [link, title] of [
    ["Card", "Card"],
    ["디자인 토큰", "A language of your own."],
    ["Dialog", "Dialog"],
  ]) {
    await nav.getByRole("link", { name: link, exact: true }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: title, exact: true }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute(
      "data-navigation-probe",
      "retained",
    );
  }
  await page
    .getByRole("button", { name: "프로젝트 만들기", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(errors).toEqual([]);
});

test("system dark accents match the explicit dark palette", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await gotoReady(page, "/foundations/");
  const root = page.locator(".app-root");
  for (const accent of ["blue", "violet", "teal"]) {
    await page.getByRole("button", { name: accent, exact: true }).click();
    await page.getByRole("button", { name: "dark", exact: true }).click();
    const dark = await root.evaluate((el) =>
      ["--n-bg", "--n-accent", "--n-accent-soft", "--n-on-accent"].map(
        (token) => getComputedStyle(el).getPropertyValue(token),
      ),
    );
    await page.getByRole("button", { name: "system", exact: true }).click();
    await expect(root).toHaveAttribute("data-theme", "system");
    expect(
      await root.evaluate((el) =>
        ["--n-bg", "--n-accent", "--n-accent-soft", "--n-on-accent"].map(
          (token) => getComputedStyle(el).getPropertyValue(token),
        ),
      ),
    ).toEqual(dark);
    await settleAnimations(page);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});
test("message scroller preserves a reader's place and resumes following", async ({
  page,
}) => {
  await gotoReady(page, "/components/message-scroller/");
  const scroller = page.getByRole("region", { name: "대화 내역" });
  await expect
    .poll(() => scroller.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
  await scroller.evaluate((el) => {
    el.scrollTop = 0;
  });
  await expect(page.getByRole("button", { name: "최신 메시지" })).toBeVisible();
  await page.getByRole("button", { name: "메시지 추가" }).click();
  expect(await scroller.evaluate((el) => el.scrollTop)).toBeLessThan(10);
  await page.getByRole("button", { name: "최신 메시지" }).click();
  await expect
    .poll(() =>
      scroller.evaluate(
        (el) => el.scrollHeight - el.clientHeight - el.scrollTop,
      ),
    )
    .toBeLessThan(25);
});
test("toast announces feedback and can be dismissed", async ({ page }) => {
  await gotoReady(page, "/components/toast/");
  await page.getByRole("button", { name: "성공 알림" }).click();
  await expect(
    page.getByText("변경 사항이 저장되었습니다.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close toast" }).click();
  await expect(
    page.getByText("변경 사항이 저장되었습니다.", { exact: true }),
  ).not.toBeVisible();
});
test("chart has a real plotted series and a text alternative", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await gotoReady(page, "/components/chart/");
  await expect(page.locator(".recharts-area-curve")).toBeVisible();
  expect(
    (await page.locator(".recharts-area-curve").getAttribute("d"))?.length,
  ).toBeGreaterThan(20);
  await page.getByText("차트 데이터 보기", { exact: true }).click();
  await expect(page.getByText("Mon: 24", { exact: true })).toBeVisible();
});

test("home and guides have accessible controls in both themes", async ({
  page,
}) => {
  test.setTimeout(90000);
  // Each route must really be scanned in light and dark. Stored preferences
  // hydrate after the server's light snapshot; reset only this isolated test's
  // storage instead of reading that transient snapshot as the settled theme.
  await page.addInitScript(() => localStorage.removeItem("nine-ui-settings"));
  for (const route of ["/", "/foundations/", "/motion/", "/getting-started/"]) {
    await gotoReady(page, route);
    await expect(page.locator(".app-root")).toHaveAttribute(
      "data-shortcuts-ready",
      "true",
    );
    for (const theme of ["light", "dark"]) {
      if (theme === "dark")
        await page
          .getByRole("button", { name: "다크 테마로 변경", exact: true })
          .click();
      await expect(page.locator(".app-root")).toHaveAttribute(
        "data-theme",
        theme,
      );
      await settleAnimations(page);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          route,
          theme,
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            message: n.failureSummary,
          })),
        })),
      ).toEqual([]);
    }
  }
});
