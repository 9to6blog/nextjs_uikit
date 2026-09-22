import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve("packages/ui/src");
const output = resolve("apps/docs/public/r");
await mkdir(output, { recursive: true });
const available = await readdir(root);
const pkg = JSON.parse(await readFile("packages/ui/package.json", "utf8"));
const index = [];
for (const file of available.filter((name) => name.endsWith(".tsx"))) {
  const name = file.replace(/\.tsx$/, "");
  const files = [];
  const visited = new Set();
  const dependencies = new Set();
  async function collect(filename) {
    if (visited.has(filename)) return;
    visited.add(filename);
    let content = await readFile(resolve(root, filename), "utf8");
    for (const match of content.matchAll(
      /(?:from\s+|import\s*)["']([^"']+)["']/g,
    )) {
      const specifier = match[1];
      if (specifier.startsWith("./")) {
        const stem = specifier.slice(2).replace(/\.js$/, "");
        const found = available.find(
          (f) => f === `${stem}.tsx` || f === `${stem}.ts`,
        );
        if (!found)
          throw new Error(`Missing registry dependency: ${specifier}`);
        await collect(found);
      } else {
        const dependency = specifier.startsWith("@")
          ? specifier.split("/").slice(0, 2).join("/")
          : specifier.split("/")[0];
        if (pkg.dependencies[dependency])
          dependencies.add(`${dependency}@${pkg.dependencies[dependency]}`);
      }
    }
    content = content.replace(/(["']\.\/[^"']+)\.js(["'])/g, "$1$2");
    files.push({ path: `ui/${filename}`, type: "registry:ui", content });
  }
  await collect(file);
  files.push({
    path: "ui/nine-ui.css",
    type: "registry:ui",
    content: await readFile("packages/ui/dist/styles.css", "utf8"),
  });
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:ui",
    title: `NINE UI · ${name}`,
    description:
      "Independent Next.js UI with semantic tokens and reduced-motion support.",
    dependencies: [...dependencies].sort(),
    files,
  };
  await writeFile(
    resolve(output, `${name}.json`),
    JSON.stringify(item, null, 2) + "\n",
  );
  index.push({
    name,
    type: "registry:ui",
    title: item.title,
    files: files.map(({ path, type }) => ({ path, type })),
  });
}
await writeFile(
  resolve(output, "registry.json"),
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "nine-ui",
      homepage: "https://github.com/9to6blog/nextjs_uikit",
      items: index,
    },
    null,
    2,
  ) + "\n",
);
process.stdout.write(
  `Built ${index.length} source registry items in apps/docs/public/r\n`,
);
