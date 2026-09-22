import { readFile, readdir, stat, writeFile, mkdir } from "node:fs/promises";
import { join, resolve, relative, sep, extname } from "node:path";
import { createServer } from "node:http";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";
const build = JSON.parse(await readFile("artifacts/pages-build.json", "utf8"));
const root = resolve(build.directory);
const routes = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name === "index.html") {
      const path = relative(root, directory).split(sep).join("/");
      if (!path.startsWith("_") && path !== "404")
        routes.push(path ? `${path}/` : "");
    }
  }
}
await walk(root);
assert.equal(
  routes.length,
  111,
  "Every public documentation route must be checked",
);
let server;
let base = process.argv[2];
if (!base) {
  server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
      assert(pathname.startsWith(`${build.basePath}/`));
      let file = resolve(root, `.${pathname.slice(build.basePath.length)}`);
      assert(file === root || file.startsWith(root + sep));
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      response.setHeader(
        "Content-Type",
        {
          ".html": "text/html; charset=utf-8",
          ".js": "text/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".txt": "text/plain",
          ".svg": "image/svg+xml",
        }[extname(file)] ?? "application/octet-stream",
      );
      response.end(await readFile(file));
    } catch {
      response.writeHead(404);
      response.end();
    }
  });
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  base = `http://127.0.0.1:${server.address().port}${build.basePath}/`;
}
base = base.replace(/\/?$/, "/");
const live = Boolean(process.argv[2]);
const errors = [];
const browser = await chromium.launch();
try {
  let next = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (next < routes.length) {
        const route = routes[next++];
        const response = await fetch(new URL(route, base));
        assert.equal(response.status, 200, route);
        assert(
          (await response.text()).includes("NINE"),
          `Unexpected HTML: ${route}`,
        );
      }
    }),
  );
  const info = await (await fetch(new URL("build-info.json", base))).json();
  assert.equal(info.sourceCommit, build.sourceCommit);
  const registry = await (await fetch(new URL("r/button.json", base))).json();
  assert.equal(registry.name, "button");
  assert(registry.files.some((file) => file.content.includes("n-button")));
  const packageResponse = await fetch(
    new URL(`downloads/${build.package}`, base),
  );
  assert.equal(packageResponse.status, 200);
  const downloaded = Buffer.from(await packageResponse.arrayBuffer());
  const sha = (data) => createHash("sha256").update(data).digest("hex");
  assert.equal(
    sha(downloaded),
    sha(await readFile(join(root, "downloads", build.package))),
  );
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  const open = async (path) => {
    await page.goto(new URL(path, base).href);
    await expect(page.locator(".app-root")).toHaveAttribute(
      "data-shortcuts-ready",
      "true",
    );
    if (path.startsWith("components/"))
      await expect(page.locator(".demo-host")).toHaveAttribute(
        "data-ready",
        "true",
      );
  };
  await open("");
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Components", exact: true })
    .click();
  await expect(page).toHaveURL(new URL("components/button/", base).href);
  await page
    .getByRole("navigation", { name: "컴포넌트 탐색" })
    .getByRole("link", { name: "Dialog", exact: true })
    .click();
  await expect(page.locator(".demo-host")).toHaveAttribute(
    "data-ready",
    "true",
  );
  await page
    .getByRole("button", { name: "프로젝트 만들기", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await open("components/preview-link-card/");
  await page.getByRole("link", { name: "NINE UI Docs", exact: true }).click();
  await expect(page).toHaveURL(new URL("getting-started/", base).href);
  await expect(
    page.getByRole("heading", { name: "React · Vite에서 사용", exact: true }),
  ).toBeVisible();
  await open("components/nav-link/");
  await expect(
    page
      .locator(".demo-host")
      .getByRole("link", { name: "현재 페이지", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page
    .locator(".demo-host")
    .getByRole("link", { name: "가이드", exact: true })
    .click();
  await expect(page).toHaveURL(new URL("getting-started/", base).href);
  await open("components/calendar/");
  await page.getByRole("button", { name: /September 10/ }).click();
  await page.getByRole("button", { name: /September 15/ }).click();
  await expect(page.locator(".rdp-selected .rdp-day_button").first()).toHaveCSS(
    "font-size",
    "13px",
  );
  await open("components/card/");
  await page.locator(".demo-card .n-card-footer button").click();
  await expect(page.locator(".demo-card .n-card-footer button")).toHaveText(
    "선택됨",
  );
  await open("components/data-table/");
  await page.getByRole("checkbox", { name: "1행 선택", exact: true }).click();
  await expect(
    page.getByRole("checkbox", { name: "현재 페이지 전체 선택" }),
  ).toHaveAttribute("data-state", "indeterminate");
  for (const path of [
    "components/navigation-menu/",
    "components/breadcrumb/",
    "components/attachment/",
  ]) {
    await open(path);
    const hrefs = await page
      .locator('.demo-host a[href^="/"]')
      .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href")));
    assert(
      hrefs.every((href) => href.startsWith(`${build.basePath}/`)),
      `Escaped project path: ${path}`,
    );
  }
  await open("blocks/");
  await expect(page.locator(".block-gallery-card")).toHaveCount(24);
  await page.getByRole("textbox", { name: "블록 검색" }).fill("Task Panel");
  await page.locator(".block-gallery-card").click();
  await expect(
    page.getByRole("heading", { name: "Task Panel", exact: true }),
  ).toBeVisible();
  await page.getByRole("checkbox", { name: /이미지 대체 텍스트/ }).click();
  await expect(page.locator(".n-block [role=status]")).toHaveText("2 / 3 완료");
  await open("charts/");
  for (const theme of ["light", "dark"]) {
    if (theme === "dark")
      await page
        .getByRole("button", { name: "다크 테마로 변경", exact: true })
        .click();
    await expect(
      page.locator(".recharts-cartesian-axis-tick-value").first(),
    ).toHaveCSS(
      "fill",
      await page
        .locator(".n-chart-caption ul")
        .evaluate((el) => getComputedStyle(el).color),
    );
  }
  await page
    .getByRole("button", { name: "라이트 테마로 변경", exact: true })
    .click();
  await page.getByRole("button", { name: /도넛/ }).click();
  await expect(page.locator(".recharts-pie-sector")).toHaveCount(6);
  await open("carousels/");
  await page.getByRole("button", { name: "썸네일", exact: true }).click();
  await page.getByRole("button", { name: "3번 슬라이드 보기" }).click();
  await expect(page.locator(".n-carousel-controls span[aria-live]")).toHaveText(
    "3 / 3",
  );
  await open("");
  await mkdir("artifacts/pages-review", { recursive: true });
  await page.screenshot({
    path: `artifacts/pages-review/${live ? "live" : "local"}-desktop.png`,
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await open("");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `artifacts/pages-review/${live ? "live" : "local"}-mobile.png`,
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  const evidence = {
    date: new Date().toISOString(),
    url: base,
    sourceCommit: build.sourceCommit,
    builtAt: build.builtAt,
    routes: routes.length,
    registry: true,
    packageSha256: sha(downloaded),
    navigation: true,
    reactDocs: true,
    calendar: true,
    card: true,
    table: true,
    blocks: 24,
    chartKinds: 12,
    carouselExamples: 6,
    mobileWidth: 390,
    browserErrors: errors,
  };
  await writeFile(
    `artifacts/pages-${live ? "live" : "local"}-verification.json`,
    JSON.stringify(evidence, null, 2),
  );
  console.log(JSON.stringify(evidence, null, 2));
} finally {
  await browser.close();
  server?.close();
}
