import { spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import assert from "node:assert/strict";
const npm = process.env.npm_execpath;
assert(npm, "Use npm run build:pages");
function git(args) {
  const r = spawnSync("git", args, { encoding: "utf8", windowsHide: true });
  assert.equal(r.status, 0, r.stderr);
  return r.stdout.trim();
}
const sourceCommit = git(["rev-parse", "HEAD"]);
const clean = git(["status", "--porcelain"]) === "";
const result = spawnSync(process.execPath, [npm, "run", "build"], {
  stdio: "inherit",
  windowsHide: true,
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/nextjs_uikit" },
});
if (result.status !== 0) process.exit(result.status ?? 1);
await mkdir("artifacts", { recursive: true });
const directory = await mkdtemp(resolve("artifacts/pages-"));
await cp("apps/docs/out", directory, { recursive: true });
await writeFile(join(directory, ".nojekyll"), "");
await mkdir(join(directory, "downloads"));
const pack = spawnSync(
  process.execPath,
  [
    npm,
    "pack",
    "-w",
    "@9to6/ui",
    "--json",
    "--pack-destination",
    join(directory, "downloads"),
  ],
  { encoding: "utf8", windowsHide: true },
);
assert.equal(pack.status, 0, pack.stderr);
const manifest = {
  sourceCommit,
  clean,
  builtAt: new Date().toISOString(),
  basePath: "/nextjs_uikit",
  package: JSON.parse(pack.stdout)[0].filename,
};
await writeFile(
  join(directory, "build-info.json"),
  JSON.stringify(manifest, null, 2),
);
await writeFile(
  "artifacts/pages-build.json",
  JSON.stringify({ ...manifest, directory }, null, 2),
);
console.log(JSON.stringify({ ...manifest, directory }, null, 2));
