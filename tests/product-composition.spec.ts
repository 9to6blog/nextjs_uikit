import { test, expect } from "@playwright/test";
import { gotoReady, settleAnimations } from "./helpers";

for (const theme of ["light", "dark"] as const) {
  test(`${theme}: menu icon and label stay together while the shortcut stays trailing`, async ({
    page,
  }) => {
    await gotoReady(page, "/components/dropdown-menu/");
    if (theme === "dark")
      await page
        .getByRole("button", { name: "다크 테마로 변경", exact: true })
        .click();
    await page.getByRole("button", { name: /프로젝트 메뉴/ }).click();
    const item = page.getByRole("menuitem", { name: "편집", exact: true });
    await expect(item).toBeVisible();
    await settleAnimations(page);
    const icon = (await item.locator("svg").boundingBox())!;
    const label = (await item.locator(".n-menu-item-label").boundingBox())!;
    const shortcut = (await item.locator(".n-menu-shortcut").boundingBox())!;
    expect(icon.width).toBe(16);
    expect(icon.height).toBe(16);
    expect(label.x - icon.x - icon.width).toBeLessThanOrEqual(12);
    expect(shortcut.x).toBeGreaterThan(label.x + 24);
    await item.click();
    await expect(page.getByRole("status")).toHaveText("편집을 선택했습니다.");
  });

  test(`${theme}: command input focuses the containing surface without a clipped rectangle`, async ({
    page,
  }) => {
    await gotoReady(page, "/components/command/");
    if (theme === "dark")
      await page
        .getByRole("button", { name: "다크 테마로 변경", exact: true })
        .click();
    const input = page.getByRole("combobox", { name: "명령 검색" });
    await input.focus();
    await expect(input).toBeFocused();
    await expect(input).toHaveCSS("outline-style", "none");
    const command = page.locator(".demo-host .n-command");
    await expect(command).not.toHaveCSS("box-shadow", "none");
    const row = (await command.locator(".n-command-input-row").boundingBox())!;
    const field = (await input.boundingBox())!;
    expect(field.x).toBeGreaterThan(row.x);
    expect(field.y).toBeGreaterThanOrEqual(row.y);
    expect(field.y + field.height).toBeLessThanOrEqual(row.y + row.height);
    await input.fill("설정");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("status")).toHaveText("설정 선택");
  });
}
