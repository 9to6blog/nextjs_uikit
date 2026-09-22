import { test, expect } from "@playwright/test";
import { gotoReady, settleAnimations } from "./helpers";

test("navigation uses one highlight and restores the active item after hover", async ({
  page,
}) => {
  await gotoReady(page, "/foundations/");
  const navigation = page.getByRole("navigation", { name: "컴포넌트 탐색" });
  const current = navigation.getByRole("link", {
    name: "디자인 토큰",
    exact: true,
  });
  const next = navigation.getByRole("link", {
    name: "모션 스튜디오",
    exact: true,
  });
  await next.hover();
  await settleAnimations(page);
  expect(
    await current.evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgba(0, 0, 0, 0)");
  expect(
    await next.evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgba(0, 0, 0, 0)");
  await page.mouse.move(0, 0);
  await settleAnimations(page);
  const line = (await navigation.locator(".n-moving-highlight").boundingBox())!;
  expect(Math.abs(line.y - (await current.boundingBox())!.y)).toBeLessThan(2);
  await gotoReady(page, "/components/sidebar/");
  const selected = page.getByRole("button", { name: "개요", exact: true });
  const hover = page.getByRole("button", { name: "디자인", exact: true });
  await hover.hover();
  await settleAnimations(page);
  for (const item of [selected, hover])
    expect(
      await item.evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe("rgba(0, 0, 0, 0)");
  const surface = page.locator(".n-sidebar-content .n-moving-highlight");
  expect(
    Math.abs((await surface.boundingBox())!.y - (await hover.boundingBox())!.y),
  ).toBeLessThan(2);
  await page.mouse.move(0, 0);
  await settleAnimations(page);
  expect(
    Math.abs(
      (await surface.boundingBox())!.y - (await selected.boundingBox())!.y,
    ),
  ).toBeLessThan(2);
});

test("card confirmation replaces its button content without adding a sibling label", async ({
  page,
}) => {
  await gotoReady(page, "/components/card/");
  const button = page.locator(".demo-card .n-card-footer button");
  const before = (await button.boundingBox())!.width;
  await button.click();
  await expect(button).toHaveText("선택됨");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  expect((await button.boundingBox())!.width).toBe(before);
  await expect(page.locator(".n-card-footer > [role=status]")).toHaveCount(0);
  await button.click();
  await expect(button).toHaveText("열기");
});

test("select icons are SVG and the combobox example aligns its trigger and popup", async ({
  page,
}) => {
  await gotoReady(page, "/components/select/");
  const select = page.getByRole("combobox", { name: "언어" });
  await expect(select.locator("svg")).toHaveCount(1);
  await select.click();
  await expect(
    page.getByRole("option", { name: "한국어", exact: true }).locator("svg"),
  ).toHaveCount(1);
  await page.keyboard.press("Escape");
  await gotoReady(page, "/components/combobox/");
  const trigger = page.getByRole("button", { name: "프레임워크", exact: true });
  await trigger.click();
  await settleAnimations(page);
  const button = (await trigger.boundingBox())!;
  const arrow = (await trigger.locator("svg").boundingBox())!;
  expect(button.x + button.width - arrow.x - arrow.width).toBeLessThan(20);
  const popup = (await page.locator(".n-combobox-popover").boundingBox())!;
  expect(button.width).toBeGreaterThanOrEqual(260);
  expect(button.width).toBeLessThanOrEqual(340);
  expect(Math.abs(button.width - popup.width)).toBeLessThan(2);
  expect(Math.abs(button.x - popup.x)).toBeLessThan(2);
});

test("calendar and date picker keep selected days at the same text size", async ({
  page,
}) => {
  await gotoReady(page, "/components/calendar/");
  await page.getByRole("button", { name: /September 10/ }).click();
  await page.getByRole("button", { name: /September 15/ }).click();
  const sizes = await page
    .locator(".n-calendar .rdp-day_button")
    .evaluateAll((elements) =>
      elements.map((el) => getComputedStyle(el).fontSize),
    );
  expect([...new Set(sizes)]).toEqual(["13px"]);
  await expect(page.locator(".rdp-selected").first()).toHaveCSS(
    "font-size",
    "13px",
  );
  await gotoReady(page, "/components/date-picker/");
  const trigger = page.getByRole("button", { name: /게시일:/ });
  await trigger.click();
  await page.getByRole("button", { name: /September 10/ }).click();
  await trigger.click();
  await expect(
    page.locator(".n-calendar .rdp-selected .rdp-day_button"),
  ).toHaveCSS("font-size", "13px");
});

test("table row, mixed header and column selection use the shared checkbox", async ({
  page,
}) => {
  await gotoReady(page, "/components/data-table/");
  const demo = page.locator('[data-demo="data-table"]');
  const row = demo.getByRole("checkbox", { name: "1행 선택", exact: true });
  await row.click();
  const header = demo.getByRole("checkbox", { name: "현재 페이지 전체 선택" });
  await expect(header).toHaveAttribute("data-state", "indeterminate");
  await expect(header.locator(".n-checkbox-minus")).toHaveCount(1);
  await expect(row.locator(".n-checkbox-check")).toHaveCount(1);
  await header.click();
  await expect(demo.locator('tbody tr[data-selected="true"]')).toHaveCount(4);
  await demo.locator("summary").click();
  const column = demo.getByRole("checkbox", { name: "조회수", exact: true });
  await expect(column).toHaveClass(/n-checkbox/);
  await column.click();
  await expect(demo.getByRole("columnheader", { name: "조회수" })).toHaveCount(
    0,
  );
  await expect(demo.locator('input[type="checkbox"]:visible')).toHaveCount(0);
});
