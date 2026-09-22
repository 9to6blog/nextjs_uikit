import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, join } from "node:path";
const root = fileURLToPath(new URL("..", import.meta.url));
const library = resolve(root, "packages/ui");
const pkg = JSON.parse(await readFile(join(library, "package.json"), "utf8"));
await mkdir(join(library, "licenses"), { recursive: true });
const rows = [];
for (const name of Object.keys(pkg.dependencies).sort()) {
  const directory = resolve(root, "node_modules", name);
  const metadata = JSON.parse(
    await readFile(join(directory, "package.json"), "utf8"),
  );
  const license = (await readdir(directory)).find((file) =>
    /^licen[cs]e(?:\.|$)/i.test(file),
  );
  let reference =
    "License from package metadata; no notice file in installed package";
  if (license) {
    const target = name.replaceAll("/", "-").replace("@", "") + ".txt";
    await writeFile(
      join(library, "licenses", target),
      (await readFile(join(directory, license), "utf8")).trimEnd() + "\n",
    );
    reference = `[license](licenses/${target})`;
  }
  rows.push(
    `| ${name} | ${metadata.version} | ${metadata.license ?? "See upstream"} | ${reference} |`,
  );
}
const text =
  "# Third-party notices\n\nNINE UI owns its component presentation and composition code. It uses the following maintained packages for interaction and rendering.\n\nThe packaged stylesheet includes react-day-picker's MIT-licensed CSS. Its copyright and permission notice is reproduced in licenses/react-day-picker.txt. Other dependency implementations are installed from their original packages and retain their own notices.\n\n| Package | Installed version | License | Notice |\n| --- | --- | --- | --- |\n" +
  rows.join("\n") +
  "\n\nThe independently authored NINE UI code does not yet carry a public open-source license. npm publishing remains disabled.\n";
await writeFile(join(library, "THIRD_PARTY_NOTICES.md"), text);
await writeFile(
  join(root, "THIRD_PARTY_NOTICES.md"),
  text.replaceAll("](licenses/", "](packages/ui/licenses/"),
);
