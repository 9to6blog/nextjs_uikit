import { spawn } from "node:child_process";
import { mkdtemp, mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { resolve, join, extname, sep } from "node:path";
import { tmpdir } from "node:os";
import { createServer } from "node:http";
import assert from "node:assert/strict";
import { chromium, expect } from "@playwright/test";
const npm = process.env.npm_execpath;
assert(npm, "Use npm run test:react");
const artifacts = resolve("artifacts");
const fixture = await mkdtemp(join(tmpdir(), "nine-ui-react-"));
function run(args, cwd) {
  return new Promise((done, reject) => {
    let output = "";
    const child = spawn(process.execPath, [npm, ...args], {
      cwd,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    child.stdout.on("data", (chunk) => (output += chunk));
    child.stderr.on("data", (chunk) => (output += chunk));
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? done(output) : reject(new Error(output)),
    );
  });
}
const packed = JSON.parse(
  await run(
    ["pack", "-w", "@9to6/ui", "--json", "--pack-destination", artifacts],
    process.cwd(),
  ),
)[0];
await mkdir(join(fixture, "src"));
await writeFile(
  join(fixture, "package.json"),
  JSON.stringify(
    {
      name: "nine-react-verification",
      version: "0.0.0",
      private: true,
      type: "module",
      scripts: { build: "tsc --noEmit && vite build" },
      dependencies: {
        "@9to6/ui": `file:${join(artifacts, packed.filename).replaceAll("\\", "/")}`,
        react: "19.3.0",
        "react-dom": "19.3.0",
      },
      devDependencies: {
        vite: "8.3.0",
        typescript: "5.9.3",
        "@types/react": "^19.2.0",
        "@types/react-dom": "^19.2.0",
      },
    },
    null,
    2,
  ),
);
await writeFile(
  join(fixture, "tsconfig.json"),
  JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      lib: ["ES2022", "DOM"],
      module: "ESNext",
      moduleResolution: "Bundler",
      jsx: "react-jsx",
      strict: true,
      skipLibCheck: true,
      noEmit: true,
    },
    include: ["src"],
  }),
);
await writeFile(
  join(fixture, "index.html"),
  '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>React consumer</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>',
);
await writeFile(
  join(fixture, "src/main.tsx"),
  `import { useState } from "react";
import { createRoot } from "react-dom/client";
import { UIProvider, Button, Checkbox, Combobox, NavLink, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, Popover, PopoverTrigger, PopoverContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@9to6/ui/react";
import "@9to6/ui/styles.css";
function App() {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("react");
  const [source, setSource] = useState<string | null>(null);
  const [handoff, setHandoff] = useState(false);
  const transfer = () => { setSource(null); setHandoff(true); };
  return <UIProvider><main style={{ padding: 32 }}>
    <h1>Standalone React</h1><NavLink href="#main" active>Current route</NavLink>
    <label><Checkbox checked={checked} onCheckedChange={v => setChecked(v === true)} /> Enable notifications</label><p role="status">{checked ? "Enabled" : "Disabled"}</p>
    <Combobox label="Framework" value={value} onValueChange={setValue} style={{width:140}} contentMinWidth={240} options={[{value:"react",label:"React"},{value:"vite",label:"Vite"}]} />
    <Dialog><DialogTrigger asChild><Button>Open React dialog</Button></DialogTrigger><DialogContent><DialogTitle>React dialog</DialogTitle><DialogDescription>No Next.js dependency installed.</DialogDescription></DialogContent></Dialog>
    <section aria-label="Immediate overlay handoff">
      <Popover open={source === "popover"} onOpenChange={open => setSource(open ? "popover" : null)}><PopoverTrigger asChild><Button>Open source popover</Button></PopoverTrigger><PopoverContent aria-label="Source popover"><Button onClick={transfer}>Continue from popover</Button></PopoverContent></Popover>
      <DropdownMenu modal={false} open={source === "menu"} onOpenChange={open => setSource(open ? "menu" : null)}><DropdownMenuTrigger asChild><Button>Open source menu</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem onSelect={transfer}>Continue from menu</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
      <Sheet open={source === "sheet"} onOpenChange={open => setSource(open ? "sheet" : null)}><SheetTrigger asChild><Button>Open source sheet</Button></SheetTrigger><SheetContent><SheetTitle>Source sheet</SheetTitle><SheetDescription>Transfer without waiting for exit.</SheetDescription><Button onClick={transfer}>Continue from sheet</Button></SheetContent></Sheet>
      <Dialog open={source === "dialog"} onOpenChange={open => setSource(open ? "dialog" : null)}><DialogTrigger asChild><Button>Open source dialog</Button></DialogTrigger><DialogContent><DialogTitle>Source dialog</DialogTitle><DialogDescription>Transfer without waiting for exit.</DialogDescription><Button onClick={transfer}>Continue from dialog</Button></DialogContent></Dialog>
      <Dialog open={handoff} onOpenChange={setHandoff}><DialogTrigger asChild><Button>Open handoff dialog</Button></DialogTrigger><DialogContent><DialogTitle>Handoff dialog</DialogTitle><DialogDescription>The first Escape must reach this active layer.</DialogDescription></DialogContent></Dialog>
    </section>
  </main></UIProvider>;
}
createRoot(document.getElementById("root")!).render(<App/>);`,
);
console.log("Installing a React + Vite consumer outside the workspace...");
await run(
  ["install", "--no-audit", "--no-fund", "--workspaces=false"],
  fixture,
);
assert.equal(
  await stat(join(fixture, "node_modules/next")).then(
    () => true,
    () => false,
  ),
  false,
  "Next.js must not be installed",
);
const output = await run(["run", "build"], fixture);
await writeFile(join(artifacts, "react-build.log"), output);
console.log("React types and production build passed; Next.js is absent.");
const root = join(fixture, "dist");
const server = createServer(async (request, response) => {
  try {
    let file = resolve(
      root,
      `.${decodeURIComponent(new URL(request.url, "http://localhost").pathname)}`,
    );
    assert(file === root || file.startsWith(root + sep));
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    response.setHeader(
      "Content-Type",
      { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }[
        extname(file)
      ] ?? "application/octet-stream",
    );
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end();
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const browser = await chromium.launch();
const errors = [];
try {
  const page = await browser.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (e) => {
    if (e.type() === "error") errors.push(e.text());
  });
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await expect(
    page.getByRole("link", { name: "Current route" }),
  ).toHaveAttribute("aria-current", "page");
  await page.getByRole("checkbox").click();
  await expect(page.getByRole("status")).toHaveText("Enabled");
  await page.getByRole("button", { name: "Framework", exact: true }).click();
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.allSettled(
      document
        .getAnimations()
        .filter((a) => a.effect?.getComputedTiming().endTime !== Infinity)
        .map((a) => a.finished),
    );
  });
  const popup = await page.locator(".n-combobox-popover").boundingBox();
  assert(
    popup.width >= 239 && popup.width > 140,
    "Small triggers may have a wider popup",
  );
  await page.getByRole("option", { name: "Vite", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Framework", exact: true }),
  ).toContainText("Vite");
  await page.getByRole("button", { name: "Open React dialog" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open React dialog" }),
  ).toBeFocused();
  const overlayHandoffs = [];
  for (const source of ["popover", "menu", "sheet", "dialog"]) {
    await page
      .getByRole("button", { name: `Open source ${source}`, exact: true })
      .click();
    const sourceSurface = page.locator(
      source === "popover"
        ? ".n-popover"
        : source === "menu"
          ? ".n-dropdown-menu-content"
          : source === "sheet"
            ? ".n-sheet"
            : ".n-dialog-content",
    );
    await expect(sourceSurface).toHaveAttribute("data-state", "open");
    await expect(sourceSurface).not.toHaveCSS("animation-name", "none");
    await page
      .getByRole(source === "menu" ? "menuitem" : "button", {
        name: `Continue from ${source}`,
        exact: true,
      })
      .click();
    // Intentionally no exit-animation wait: a closed layer must not consume
    // the first Escape intended for the dialog opened by that same action.
    const target = page.getByRole("dialog", {
      name: "Handoff dialog",
      exact: true,
    });
    await expect(target).toBeVisible();
    assert.equal(
      await page
        .locator(
          '[data-state="closed"][role="dialog"], [data-state="closed"][role="menu"]',
        )
        .count(),
      0,
      "Closed layers must unmount before the next keyboard action",
    );
    await page.keyboard.press("Escape");
    await expect(target).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Open handoff dialog", exact: true }),
    ).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("pointer-events", "none");
    overlayHandoffs.push(source);
  }
  assert.deepEqual(errors, []);
  const evidence = {
    date: new Date().toISOString(),
    fixture,
    react: "19.3.0",
    vite: "8.3.0",
    nextInstalled: false,
    types: true,
    build: true,
    checkbox: true,
    combobox: true,
    dialog: true,
    overlayHandoffs,
    activeLink: true,
    browserErrors: errors,
  };
  await writeFile(
    join(artifacts, "react-verification.json"),
    JSON.stringify(evidence, null, 2),
  );
  console.log(JSON.stringify(evidence, null, 2));
} finally {
  await browser.close();
  server.close();
}
