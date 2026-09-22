import { gotoReady } from "./helpers";
import { test, expect } from "@playwright/test";
import { catalog } from "../apps/docs/src/lib/catalog";
test("home, guides and every component fit the viewport", async ({
  page,
}, testInfo) => {
  test.setTimeout(180000);
  for (const route of [
    "/",
    "/getting-started/",
    "/foundations/",
    "/motion/",
    "/quality/",
    ...catalog.map((c) => `/components/${c.slug}/`),
  ]) {
    await gotoReady(page, route);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".app-root")).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(
      dimensions.scroll,
      `${route} must not overflow at ${dimensions.width}px`,
    ).toBeLessThanOrEqual(dimensions.width + 1);
  }
  await gotoReady(page, "/");
  await page.screenshot({
    path: `artifacts/screenshots/home-${testInfo.project.name}.png`,
    fullPage: true,
    animations: "disabled",
  });
  await page
    .getByRole("button", { name: "다크 테마로 변경", exact: true })
    .click();
  await page.screenshot({
    path: `artifacts/screenshots/home-${testInfo.project.name}-dark.png`,
    fullPage: true,
    animations: "disabled",
  });
});
test("reduced motion keeps controls usable and stops CSS transitions", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await gotoReady(page, "/motion/");
  const object = page.locator(".motion-object");
  await page.getByRole("button", { name: "움직임 재생" }).click();
  await expect(object).toHaveAttribute("data-moved", "true");
  expect(
    await object.evaluate((el) =>
      parseFloat(getComputedStyle(el).transitionDuration),
    ),
  ).toBeLessThanOrEqual(0.001);
  await gotoReady(page, "/components/switch/");
  const control = page.getByRole("switch", { name: "이메일 알림" });
  await expect(control).toBeChecked();
  await control.click();
  await expect(control).not.toBeChecked();
});
test("mobile navigation and theme preferences work across routes", async ({
  page,
  isMobile,
}) => {
  await gotoReady(page, "/");
  if (isMobile) {
    await page.getByRole("button", { name: "탐색 메뉴 열기" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "Button", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Button", exact: true }),
    ).toBeVisible();
  }
  await page
    .getByRole("button", { name: "다크 테마로 변경", exact: true })
    .click();
  await gotoReady(page, "/components/input/");
  await expect(page.locator(".app-root")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator(".app-root")).toHaveAttribute("data-theme", "dark");
});
