import { expect, type Page } from "@playwright/test";

export async function settleAnimations(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve()),
    );
    const finite = document
      .getAnimations()
      .filter(
        (animation) =>
          animation.effect?.getComputedTiming().endTime !== Infinity,
      );
    await Promise.allSettled(finite.map((animation) => animation.finished));
  });
}

export async function gotoReady(page: Page, url: string) {
  const response = await page.goto(url);
  expect(response?.status()).toBe(200);
  await expect(page.locator(".app-root")).toHaveAttribute(
    "data-shortcuts-ready",
    "true",
  );
  if (new URL(page.url()).pathname.startsWith("/components/")) {
    await expect(page.locator(".demo-host")).toHaveAttribute(
      "data-ready",
      "true",
    );
  }
  return response;
}
