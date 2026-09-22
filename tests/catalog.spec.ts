import { gotoReady, settleAnimations } from "./helpers";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { catalog } from "../apps/docs/src/lib/catalog";
for (const entry of catalog) {
  test(`${entry.name}: rendering, themes and accessibility`, async ({
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
    await gotoReady(page, `/components/${entry.slug}/`);
    await expect(
      page.getByRole("heading", { level: 1, name: entry.name, exact: true }),
    ).toBeVisible();
    const demo = page.locator(`[data-demo="${entry.slug}"]`);
    await expect(demo).toBeVisible();
    expect(await demo.locator(":scope > *").count()).toBeGreaterThan(0);
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
        .include("#main")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          description: v.description,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      ).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}
