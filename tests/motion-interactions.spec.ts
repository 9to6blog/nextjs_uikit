import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { gotoReady, settleAnimations } from "./helpers";

test("black is the default accent and fields use quiet one-pixel borders", async ({
  page,
}) => {
  await gotoReady(page, "/components/input/");
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-accent",
    "black",
  );
  const field = page.getByRole("textbox", { name: "이메일", exact: true });
  expect(
    await field.evaluate((el) => ({
      border: getComputedStyle(el).borderColor,
      width: getComputedStyle(el).borderWidth,
      accent: getComputedStyle(el).getPropertyValue("--n-accent").trim(),
    })),
  ).toEqual({ border: "rgb(229, 229, 229)", width: "1px", accent: "#0a0a0a" });
  await field.focus();
  await settleAnimations(page);
  expect(await field.evaluate((el) => getComputedStyle(el).boxShadow)).not.toBe(
    "none",
  );
  await gotoReady(page, "/components/textarea/");
  expect(
    await page
      .getByRole("textbox", { name: "소개" })
      .evaluate((el) => getComputedStyle(el).borderColor),
  ).toBe("rgb(229, 229, 229)");
});

test("check and minus are centered SVG strokes that animate both ways", async ({
  page,
}) => {
  await gotoReady(page, "/components/checkbox/");
  const mixed = page.getByRole("checkbox", {
    name: "일부 항목 선택",
    exact: true,
  });
  const check = page.getByRole("checkbox", {
    name: "이용 약관에 동의합니다.",
    exact: true,
  });
  await settleAnimations(page);
  for (const control of [check, mixed]) {
    const delta = await control.evaluate((el) => {
      const root = el.getBoundingClientRect();
      const svg = el.querySelector("svg")!.getBoundingClientRect();
      const path = el
        .querySelector<SVGPathElement>(
          el.getAttribute("data-state") === "checked"
            ? ".n-checkbox-check"
            : ".n-checkbox-minus",
        )!
        .getBBox();
      return {
        x: Math.abs(root.x + root.width / 2 - svg.x - svg.width / 2),
        y: Math.abs(root.y + root.height / 2 - svg.y - svg.height / 2),
        pathX: path.x + path.width / 2,
        pathY: path.y + path.height / 2,
      };
    });
    expect(delta.x).toBeLessThan(0.1);
    expect(delta.y).toBeLessThan(0.1);
    expect(delta.pathX).toBe(12);
    expect(delta.pathY).toBe(12);
  }
  await check.click();
  await settleAnimations(page);
  await check.click();
  const progress = await check
    .locator(".n-checkbox-check")
    .evaluate(async (el) => {
      await new Promise(requestAnimationFrame);
      const animation = el
        .getAnimations()
        .find(
          (a) =>
            a instanceof CSSTransition &&
            a.transitionProperty === "stroke-dashoffset",
        );
      if (!animation) return null;
      animation.pause();
      animation.currentTime = 300;
      const middle = parseFloat(getComputedStyle(el).strokeDashoffset);
      animation.finish();
      return middle;
    });
  expect(progress).not.toBeNull();
  expect(progress!).toBeGreaterThan(0);
  expect(progress!).toBeLessThan(1);
  const cycle = page.getByRole("button", { name: "체크·해제·마이너스 전환" });
  await cycle.click();
  await expect(mixed).toBeChecked();
  await settleAnimations(page);
  expect(
    await mixed
      .locator(".n-checkbox-minus")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("0");
  await cycle.click();
  await expect(mixed).not.toBeChecked();
  await cycle.click();
  await expect(mixed).toHaveAttribute("aria-checked", "mixed");
  await settleAnimations(page);
  expect(
    await mixed
      .locator(".n-checkbox-minus")
      .evaluate((el) => getComputedStyle(el).strokeDashoffset),
  ).toBe("0px");
});

test("uncontrolled indeterminate checkbox changes its glyph and resets with its form", async ({
  page,
}) => {
  await gotoReady(page, "/components/checkbox/");
  const control = page.getByRole("checkbox", { name: "초기 마이너스 상태" });
  await control.click();
  await expect(control).toBeChecked();
  await settleAnimations(page);
  expect(
    await control
      .locator(".n-checkbox-check")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
  expect(
    await control
      .locator(".n-checkbox-minus")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("0");
  await page.getByRole("button", { name: "초기 상태로 재설정" }).click();
  await expect(control).toHaveAttribute("aria-checked", "mixed");
});

test("OS reduced motion removes checkbox delays and spring transitions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await gotoReady(page, "/components/checkbox/");
  const check = page.getByRole("checkbox", {
    name: "이용 약관에 동의합니다.",
    exact: true,
  });
  await check.click();
  await check.click();
  const timing = await check
    .locator("path")
    .first()
    .evaluate((el) => ({
      duration: parseFloat(getComputedStyle(el).transitionDuration),
      delay: parseFloat(getComputedStyle(el).transitionDelay),
    }));
  expect(timing.duration).toBeLessThanOrEqual(0.001);
  expect(timing.delay).toBe(0);
  await gotoReady(page, "/components/radio-group/");
  expect(
    await page
      .locator(".n-radio-indicator")
      .first()
      .evaluate((el) => parseFloat(getComputedStyle(el).transitionDuration)),
  ).toBeLessThanOrEqual(0.001);
});

test("tree hover uses a single moving surface", async ({ page }) => {
  await gotoReady(page, "/components/tree/");
  const rows = page.getByRole("treeitem");
  const highlight = page.locator(".n-tree .n-moving-highlight");
  await rows.nth(0).hover();
  await settleAnimations(page);
  const before = await highlight.boundingBox();
  await rows.nth(1).hover();
  await settleAnimations(page);
  const after = await highlight.boundingBox();
  expect(after!.y).toBeGreaterThan(before!.y);
  expect(
    Math.abs(after!.y - (await rows.nth(1).boundingBox())!.y),
  ).toBeLessThan(1);
});

test("code typing copies the full source and code tabs support keyboard selection", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async (text: string) => {
          document.documentElement.dataset.copiedCode = text;
        },
      },
    }),
  );
  await gotoReady(page, "/components/code-block/");
  await page.getByRole("button", { name: "타이핑 다시 재생" }).click();
  await page
    .locator(".demo-host")
    .getByRole("button", { name: "코드 복사", exact: true })
    .click();
  await expect(page.getByRole("button", { name: "복사 완료" })).toBeVisible();
  expect(await page.locator("html").getAttribute("data-copied-code")).toContain(
    "return <Button>{name}</Button>",
  );
  await gotoReady(page, "/components/code-tabs/");
  await page.getByRole("tab", { name: "Next.js", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Config", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText('"accent": "black"');
});

test("notifications expand and collapse from keyboard and hover", async ({
  page,
}) => {
  await gotoReady(page, "/components/notification-list/");
  const toggle = page.locator(".n-notification-toggle");
  await page.locator(".n-notifications").hover();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  // A spring briefly reverses direction before settling. Wait for its full
  // transition so WebKit does not scroll toward a moving toggle and leave hover.
  await settleAnimations(page);
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await page.mouse.move(0, 0);
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await settleAnimations(page);
  const expanded = (await page.locator(".n-notification-stack").boundingBox())!
    .height;
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await settleAnimations(page);
  expect(
    (await page.locator(".n-notification-stack").boundingBox())!.height,
  ).toBeLessThan(expanded);
});

test("pinning reorders persistent rows without losing keyboard focus", async ({
  page,
}) => {
  await gotoReady(page, "/components/pinned-list/");
  const pin = page.locator('[data-pin-id="token"] button');
  await pin.focus();
  await page.keyboard.press("Enter");
  await expect(pin).toBeFocused();
  await expect(pin).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".n-pin-row").nth(2)).toHaveAttribute(
    "data-pin-id",
    "token",
  );
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Token Lock 고정", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(pin).toBeFocused();
});

test("todo completion draws and erases its strike", async ({ page }) => {
  await gotoReady(page, "/components/todo-list/");
  const check = page.getByRole("checkbox").first();
  await check.click();
  await expect(check).toBeChecked();
  await settleAnimations(page);
  const strike = page.locator(".n-todo-row > span > svg path").first();
  expect(
    await strike.evaluate((el) => getComputedStyle(el).strokeDashoffset),
  ).toBe("0px");
  await check.click();
  await settleAnimations(page);
  expect(
    await strike.evaluate((el) => getComputedStyle(el).strokeDashoffset),
  ).toBe("1px");
});

test("radial menu supports keyboard open, selection, Escape and focus return", async ({
  page,
}) => {
  await gotoReady(page, "/components/radial-menu/");
  const trigger = page.locator(".n-radial-trigger");
  await trigger.focus();
  await page.keyboard.press("Shift+F10");
  const menu = page.getByRole("menu", { name: "원형 메뉴", exact: true });
  await expect(menu).toBeVisible();
  await settleAnimations(page);
  const origin = (await trigger.boundingBox())!;
  const bounds = (await menu.boundingBox())!;
  expect(
    Math.abs(bounds.x + bounds.width / 2 - origin.x - origin.width / 2),
  ).toBeLessThan(1);
  expect(
    Math.abs(bounds.y + bounds.height / 2 - origin.y - origin.height / 2),
  ).toBeLessThan(1);
  const result = await new AxeBuilder({ page })
    .include(".n-radial-menu")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.locator(".demo-host [role=status]")).toContainText(
    "선택됨",
  );
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Shift+F10");
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("multi-step dialog goes forward and back, completes, and resets on reopen", async ({
  page,
}) => {
  await gotoReady(page, "/components/multi-step-dialog/");
  const trigger = page.getByRole("button", { name: "시작하기", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("button", { name: "이전", exact: true }),
  ).toBeDisabled();
  await dialog.getByRole("button", { name: "계속", exact: true }).click();
  await expect(
    dialog.getByRole("heading", { name: "어떻게 사용하나요?" }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "이전", exact: true }).click();
  await expect(
    dialog.getByRole("heading", { name: "NINE UI", exact: true }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "계속", exact: true }).click();
  await dialog.getByRole("button", { name: "계속", exact: true }).click();
  await settleAnimations(page);
  expect(
    (
      await new AxeBuilder({ page })
        .include(".n-step-dialog")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await dialog.getByRole("button", { name: "완료", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator(".demo-host [role=status]")).toContainText(
    "설정을 완료했습니다.",
  );
  await trigger.click();
  await expect(
    dialog.getByRole("button", { name: "이전", exact: true }),
  ).toBeDisabled();
});

test("timezone rows show one instant in EST, GMT and JST", async ({ page }) => {
  await gotoReady(page, "/components/relative-time/");
  const rows = page.locator(".n-time-row");
  await expect(rows).toHaveCount(3);
  const instants = await rows
    .locator("time")
    .evaluateAll((nodes) => nodes.map((el) => el.getAttribute("datetime")));
  expect(new Set(instants).size).toBe(1);
  const times = await rows.locator("time").allTextContents();
  expect(new Set(times).size).toBe(3);
});

test("icon sidebar keeps its actions accessible while collapsed", async ({
  page,
}) => {
  await gotoReady(page, "/components/sidebar/");
  const sidebar = page.locator(".n-sidebar");
  const trigger = page
    .locator(".demo-host")
    .getByRole("button", { name: "메뉴", exact: true });
  await trigger.click();
  await settleAnimations(page);
  expect((await sidebar.boundingBox())!.width).toBe(56);
  const design = sidebar.getByRole("button", { name: "디자인", exact: true });
  await design.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".demo-host [role=status]")).toContainText(
    "디자인 화면",
  );
  await trigger.click();
  await settleAnimations(page);
  expect((await sidebar.boundingBox())!.width).toBe(220);
});

test("stored legacy default migrates to black and an explicit blue selection persists", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("nine-ui-settings"))
      localStorage.setItem(
        "nine-ui-settings",
        JSON.stringify({ theme: "light", accent: "blue" }),
      );
  });
  await gotoReady(page, "/foundations/");
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-accent",
    "black",
  );
  await page.getByRole("button", { name: "blue", exact: true }).click();
  await page.reload();
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-accent",
    "blue",
  );
});
