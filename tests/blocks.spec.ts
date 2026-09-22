import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { blocks } from "../apps/docs/src/lib/blocks";
import { gotoReady, settleAnimations } from "./helpers";
for (const block of blocks)
  test(`${block.name} block renders original content and accessible controls`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (e) => {
      if (e.type() === "error") errors.push(e.text());
    });
    await gotoReady(page, `/blocks/${block.slug}/`);
    await expect(page.locator(".block-demo .n-block")).toBeVisible();
    await settleAnimations(page);
    const result = await new AxeBuilder({ page }).include("main").analyze();
    expect(result.violations).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `artifacts/expansion-review/block-${block.slug}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
for (const [kind, selector] of Object.entries({
  line: ".recharts-line-curve",
  area: ".recharts-area-area",
  bar: ".recharts-bar-rectangle",
  "horizontal-bar": ".recharts-bar-rectangle",
  "stacked-bar": ".recharts-bar-rectangle",
  "stacked-area": ".recharts-area-area",
  pie: ".recharts-pie-sector",
  donut: ".recharts-pie-sector",
  radar: ".recharts-radar-polygon",
  radial: ".recharts-radial-bar-sector",
  scatter: ".recharts-scatter-symbol",
  composed: ".recharts-bar-rectangle",
}))
  test(`${kind} chart draws geometry and exposes its data`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await gotoReady(page, "/charts/");
    await page
      .locator(".chart-kind-grid button")
      .filter({
        has: page.locator("small", { hasText: new RegExp(`^${kind}$`) }),
      })
      .click();
    await expect(page.locator(selector).first()).toBeVisible();
    await page.locator(".n-chart-table summary").click();
    await expect(page.locator(".n-chart-table tbody tr")).toHaveCount(6);
    expect(
      (await new AxeBuilder({ page }).include("main").analyze()).violations,
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `artifacts/expansion-review/chart-${kind}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
