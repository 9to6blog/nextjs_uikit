import { spawnSync } from "node:child_process";
import { cp, readFile, mkdtemp, writeFile } from "node:fs/promises";
import { resolve, join, sep } from "node:path";
import assert from "node:assert/strict";
function git(args, cwd = process.cwd(), input) {
  const r = spawnSync("git", args, {
    cwd,
    input,
    encoding: "utf8",
    windowsHide: true,
  });
  assert.equal(r.status, 0, r.stderr);
  return r.stdout.trim();
}
const build = JSON.parse(await readFile("artifacts/pages-build.json", "utf8"));
const verified = JSON.parse(
  await readFile("artifacts/pages-local-verification.json", "utf8"),
);
assert.equal(
  verified.sourceCommit,
  build.sourceCommit,
  "Verify the current Pages artifact before publishing",
);
assert.equal(
  verified.builtAt,
  build.builtAt,
  "Re-run Pages verification after each build",
);
assert(build.clean, "Build a clean committed revision before publishing");
assert.equal(
  git(["status", "--porcelain"]),
  "",
  "Commit all source changes before publishing",
);
assert.equal(
  git(["rev-parse", "HEAD"]),
  build.sourceCommit,
  "Rebuild Pages after changing the source commit",
);
const artifacts = resolve("artifacts");
const directory = resolve(build.directory);
assert(
  directory.startsWith(artifacts + sep),
  "Only a local artifact can be published",
);
const origin = git(["remote", "get-url", "origin"]);
assert.equal(origin, "https://github.com/9to6blog/nextjs_uikit.git");
assert.equal(
  git(["ls-remote", "origin", "refs/heads/main"]).split(/\s/)[0],
  build.sourceCommit,
  "Push the verified source revision before publishing",
);
const staging = await mkdtemp(join(artifacts, "pages-publish-"));
await cp(directory, staging, { recursive: true });
git(["init", "--initial-branch=gh-pages"], staging);
git(["remote", "add", "origin", origin], staging);
git(["config", "user.name", git(["config", "user.name"])], staging);
git(["config", "user.email", git(["config", "user.email"])], staging);
const previous = git(
  ["ls-remote", "origin", "refs/heads/gh-pages"],
  staging,
).split(/\s/)[0];
if (previous) git(["fetch", "--depth=1", "origin", "gh-pages"], staging);
git(["add", "--all", "--force"], staging);
const tree = git(["write-tree"], staging);
const commit = git(
  ["commit-tree", tree, ...(previous ? ["-p", previous] : [])],
  staging,
  `Publish locally built ${build.sourceCommit}\n`,
);
git(["push", "origin", `${commit}:refs/heads/gh-pages`], staging);
const evidence = {
  sourceCommit: build.sourceCommit,
  pagesCommit: commit,
  url: "https://9to6blog.github.io/nextjs_uikit/",
  publishedAt: new Date().toISOString(),
};
await writeFile(
  "artifacts/pages-publish.json",
  JSON.stringify(evidence, null, 2),
);
console.log(JSON.stringify(evidence, null, 2));
