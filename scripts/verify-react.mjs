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
  `import {useState} from "react";
import {createRoot} from "react-dom/client";
import {TaskPanel,type TaskItem} from "@9to6/ui/blocks/task-panel";
import {ChartView} from "@9to6/ui/chart-view";
import {Carousel} from "@9to6/ui/carousel";
import {UIProvider,Button,Checkbox,Combobox,NavLink,Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription} from "@9to6/ui/react";
import "@9to6/ui/styles.css";
import "@9to6/ui/blocks.css";
function Expansion(){const [tasks,setTasks]=useState<TaskItem[]>([{id:"review",title:"Review draft",done:false}]);return <div style={{maxWidth:640,marginTop:40}}><TaskPanel title="React tasks" tasks={tasks} onTasksChange={setTasks}/><ChartView kind="bar" label="React chart" data={[{name:"A",count:12},{name:"B",count:24}]} series={[{key:"count",label:"Count"}]}/><Carousel label="React carousel" dots slides={[<p key="1">First</p>,<p key="2">Second</p>]}/></div>}
function App(){const [checked,setChecked]=useState(false);const [value,setValue]=useState("react");return <UIProvider><main style={{padding:32}}><h1>Standalone React</h1><NavLink href="#main" active>Current route</NavLink><label><Checkbox checked={checked} onCheckedChange={v=>setChecked(v===true)}/> Enable notifications</label><p role="status">{checked?"Enabled":"Disabled"}</p><Combobox label="Framework" value={value} onValueChange={setValue} style={{width:140}} contentMinWidth={240} options={[{value:"react",label:"React"},{value:"vite",label:"Vite"}]}/><Dialog><DialogTrigger asChild><Button>Open React dialog</Button></DialogTrigger><DialogContent><DialogTitle>React dialog</DialogTitle><DialogDescription>No Next.js dependency installed.</DialogDescription></DialogContent></Dialog></main><Expansion/></UIProvider>};createRoot(document.getElementById("root")!).render(<App/>);`,
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
for (const name of ["shadcn", "@shadcn/ui"])
  await assert.rejects(stat(join(fixture, "node_modules", name)), {
    code: "ENOENT",
  });
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
  await page.getByRole("checkbox", { name: "Enable notifications" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Enabled" }),
  ).toHaveText("Enabled");
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
  assert.deepEqual(errors, []);
  await page.getByRole("checkbox", { name: "Review draft" }).click();
  await expect(
    page.getByRole("checkbox", { name: "Review draft" }),
  ).toBeChecked();
  await expect(page.locator(".n-block")).toHaveCSS("border-radius", "16px");
  await expect(page.locator(".recharts-bar-rectangle")).toHaveCount(2);
  await page.getByRole("button", { name: "2번 슬라이드 보기" }).click();
  await expect(page.locator(".n-carousel-controls span[aria-live]")).toHaveText(
    "2 / 2",
  );
  assert.deepEqual(errors, []);
  const evidence = {
    date: new Date().toISOString(),
    fixture,
    react: "19.3.0",
    vite: "8.3.0",
    nextInstalled: false,
    shadcnInstalled: false,
    types: true,
    build: true,
    checkbox: true,
    combobox: true,
    dialog: true,
    activeLink: true,
    block: true,
    chart: true,
    carousel: true,
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
