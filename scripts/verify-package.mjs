import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { resolve, join, extname, basename, sep } from "node:path";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { gzipSync } from "node:zlib";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { normalizeExport } from "./normalize-export.mjs";

const root = process.cwd();
const npm = process.env.npm_execpath;
assert(npm, "Run with npm run test:package so the active npm CLI is used.");
const artifacts = resolve("artifacts");
await mkdir(artifacts, { recursive: true });
function run(args, cwd = root) {
  return new Promise((resolveRun, reject) => {
    let stdout = "",
      stderr = "";
    const child = spawn(process.execPath, [npm, ...args], {
      cwd,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    child.stdout.on("data", (data) => {
      stdout += data;
    });
    child.stderr.on("data", (data) => {
      stderr += data;
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolveRun(stdout)
        : reject(
            new Error(
              `${args.join(" ")} failed (${code})\n${stdout}\n${stderr}`,
            ),
          ),
    );
  });
}
function report(message) {
  process.stdout.write(`${message}\n`);
}
report("Packing the real distribution...");
const packed = JSON.parse(
  await run([
    "pack",
    "-w",
    "@9to6/ui",
    "--json",
    "--pack-destination",
    artifacts,
  ]),
)[0];
assert(packed.files.some((file) => file.path === "dist/button.js"));
assert(packed.files.some((file) => file.path === "dist/dialog.d.ts"));
assert(
  packed.files.every(
    (file) =>
      !file.path.includes("node_modules") && !file.path.includes(".env"),
  ),
);
const sources = await readdir("packages/ui/src");
for (const source of sources.filter((name) => /\.tsx?$/.test(name))) {
  const text = await readFile(join("packages/ui/src", source), "utf8");
  const output = await readFile(
    join("packages/ui/dist", source.replace(/\.tsx?$/, ".js")),
    "utf8",
  );
  if (text.startsWith('"use client"'))
    assert(
      output.startsWith('"use client"'),
      `${source} lost its client boundary`,
    );
}

const fixture = join(artifacts, `consumer-${Date.now()}`);
await mkdir(join(fixture, "app"), { recursive: true });
const pkg = {
  name: "nine-ui-consumer-verification",
  version: "0.0.0",
  private: true,
  scripts: { build: "next build" },
  dependencies: {
    "@9to6/ui": `file:${join(artifacts, packed.filename).replaceAll("\\", "/")}`,
    next: "16.3.5",
    react: "19.3.0",
    "react-dom": "19.3.0",
    tailwindcss: "4.3.3",
  },
  devDependencies: {
    typescript: "5.9.3",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "@types/node": "^24.0.0",
  },
};
await writeFile(join(fixture, "package.json"), JSON.stringify(pkg, null, 2));
await writeFile(
  join(fixture, "next.config.mjs"),
  'export default { output: "export", trailingSlash: true, turbopack: { root: import.meta.dirname } };\n',
);
await writeFile(
  join(fixture, "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        lib: ["dom", "dom.iterable", "esnext"],
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react-jsx",
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./*"] },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    },
    null,
    2,
  ),
);
await writeFile(
  join(fixture, "components.json"),
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "new-york",
      rsc: true,
      tsx: true,
      tailwind: {
        config: "",
        css: "app/globals.css",
        baseColor: "neutral",
        cssVariables: true,
      },
      aliases: {
        components: "@/components",
        ui: "@/components/ui",
        utils: "@/lib/utils",
        lib: "@/lib",
        hooks: "@/hooks",
      },
    },
    null,
    2,
  ),
);
await writeFile(
  join(fixture, "app/globals.css"),
  "/* The registry styles do not require a Tailwind build. */\n",
);
await writeFile(
  join(fixture, "app/layout.tsx"),
  'import "@9to6/ui/styles.css";\nimport { UIProvider } from "@9to6/ui/provider";\nexport default function Layout({children}:{children:React.ReactNode}){return <html lang="ko"><body><UIProvider theme="light">{children}</UIProvider></body></html>;}\n',
);
await writeFile(
  join(fixture, "app/page.tsx"),
  'import { Card,CardContent } from "@9to6/ui/card";\nimport { Button } from "@9to6/ui/button";\nimport Example from "./example";\nexport default function Page(){return <main><h1>Tarball consumer</h1><Card><CardContent>Server component content<Button disabled>Server button</Button></CardContent></Card><Example/></main>;}\n',
);
await writeFile(
  join(fixture, "app/example.tsx"),
  '"use client";\nimport { Button } from "@9to6/ui/button";\nimport { Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription } from "@9to6/ui/dialog";\nexport default function Example(){return <Dialog><DialogTrigger asChild><Button>Open package dialog</Button></DialogTrigger><DialogContent><DialogTitle>Package dialog</DialogTitle><DialogDescription>Installed from the real tarball.</DialogDescription></DialogContent></Dialog>;}\n',
);
report("Installing the tarball in an isolated Next.js app...");
await run(
  ["install", "--no-audit", "--no-fund", "--workspaces=false"],
  fixture,
);

function serverFor(directory) {
  return createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = resolve(directory, `.${pathname}`);
      assert(file === directory || file.startsWith(directory + sep));
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      const body = await readFile(file);
      res.writeHead(200, {
        "Content-Type":
          {
            ".html": "text/html; charset=utf-8",
            ".js": "text/javascript",
            ".css": "text/css",
            ".json": "application/json",
            ".txt": "text/plain",
          }[extname(file)] ?? "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
}
function listen(server) {
  return new Promise((resolveListen) =>
    server.listen(0, "127.0.0.1", () =>
      resolveListen(`http://127.0.0.1:${server.address().port}`),
    ),
  );
}
const registryServer = serverFor(resolve("apps/docs/public"));
const registryUrl = await listen(registryServer);
try {
  report("Installing source components using the official shadcn CLI...");
  const result = await run(
    [
      "exec",
      "--yes",
      "--package=shadcn@4.21.0",
      "--",
      "shadcn",
      "add",
      `${registryUrl}/r/button.json`,
      `${registryUrl}/r/dialog.json`,
      "--yes",
      "--overwrite",
    ],
    fixture,
  );
  report(result.trim());
} finally {
  registryServer.close();
}
assert(
  (await readFile(join(fixture, "components/ui/button.tsx"), "utf8")).includes(
    "n-button",
  ),
);
assert(
  (await readFile(join(fixture, "components/ui/nine-ui.css"), "utf8")).includes(
    "--n-accent",
  ),
);
await mkdir(join(fixture, "app/registry"), { recursive: true });
await writeFile(
  join(fixture, "app/registry/page.tsx"),
  '"use client";\nimport "@/components/ui/nine-ui.css";\nimport { UIProvider } from "@/components/ui/provider";\nimport { Button } from "@/components/ui/button";\nimport { Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription } from "@/components/ui/dialog";\nexport default function Page(){return <UIProvider><main><h1>Source registry consumer</h1><Dialog><DialogTrigger asChild><Button>Open registry dialog</Button></DialogTrigger><DialogContent><DialogTitle>Registry dialog</DialogTitle><DialogDescription>Installed by shadcn CLI.</DialogDescription></DialogContent></Dialog></main></UIProvider>;}\n',
);
report("Building the isolated consumer (RSC + package + source registry)...");
report((await run(["run", "build"], fixture)).trim());
await normalizeExport(join(fixture, "out"));
const html = await readFile(join(fixture, "out/index.html"), "utf8");
assert(
  html.includes("Server component content"),
  "Server content missing from static HTML",
);
const chunks = [];
async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, item.name);
    if (item.isDirectory()) await walk(file);
    else if (item.name.endsWith(".js")) chunks.push(file);
  }
}
await walk(join(fixture, "out/_next"));
let bytes = 0,
  gzipBytes = 0;
for (const file of chunks) {
  const data = await readFile(file);
  bytes += data.length;
  gzipBytes += gzipSync(data).length;
  assert(
    !data.includes(Buffer.from("recharts-wrapper")),
    `Unused chart runtime leaked into ${basename(file)}`,
  );
}
const previewServer = serverFor(join(fixture, "out"));
const previewUrl = await listen(previewServer);
const browser = await chromium.launch();
const errors = [];
try {
  const page = await browser.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [route, button, title] of [
    ["/", "Open package dialog", "Package dialog"],
    ["/registry/", "Open registry dialog", "Registry dialog"],
  ]) {
    await page.goto(previewUrl + route);
    await page.getByRole("button", { name: button }).click();
    await page.getByRole("heading", { name: title, exact: true }).waitFor();
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "hidden" });
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
  previewServer.close();
}
const evidence = {
  date: new Date().toISOString(),
  package: packed.filename,
  tarballBytes: packed.size,
  unpackedBytes: packed.unpackedSize,
  files: packed.files.length,
  fixture,
  clientJavaScriptBytes: bytes,
  clientJavaScriptGzipBytes: gzipBytes,
  unusedChartRuntimeAbsent: true,
  serverHtml: true,
  clientDirectivesPreserved: true,
  officialShadcnCli: "4.21.0",
  packageDialog: true,
  registryDialog: true,
  browserErrors: errors,
};
await writeFile(
  join(artifacts, "package-verification.json"),
  JSON.stringify(evidence, null, 2) + "\n",
);
report(JSON.stringify(evidence, null, 2));
