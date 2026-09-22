import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";

// Next 16.3.5 on Windows emits nested segment prefetch files while its client
// requests dot-separated names. Add the requested static aliases to the artifact
// so it works on a normal static host without a platform-specific rewrite.
export async function normalizeExport(directory) {
  const root = resolve(directory);
  const files = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await walk(path);
      else files.push(path);
    }
  }
  await walk(root);
  let count = 0;
  for (const file of files) {
    const parts = relative(root, file).split(sep);
    const index = parts.findIndex((part) => part.startsWith("__next."));
    if (index < 0 || index === parts.length - 1 || !file.endsWith(".txt"))
      continue;
    const target = join(
      root,
      ...parts.slice(0, index),
      parts.slice(index).join("."),
    );
    const body = await readFile(file);
    const existing = await readFile(target).catch((error) => {
      if (error.code !== "ENOENT") throw error;
      return null;
    });
    if (existing && !existing.equals(body))
      throw new Error(`Prefetch alias collision: ${target}`);
    if (!existing) {
      await writeFile(target, body, { flag: "wx" });
      count++;
    }
  }
  return count;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  console.log(
    `Static prefetch aliases: ${await normalizeExport(process.argv[2] ?? "apps/docs/out")}`,
  );
}
