import { readFile, writeFile, copyFile } from "node:fs/promises";
const css = await readFile(
  new URL("../packages/ui/src/styles.css", import.meta.url),
  "utf8",
);
await copyFile(
  new URL("../packages/ui/src/blocks.css", import.meta.url),
  new URL("../packages/ui/dist/blocks.css", import.meta.url),
);
const calendar = await readFile(
  new URL("../node_modules/react-day-picker/src/style.css", import.meta.url),
  "utf8",
);
await writeFile(
  new URL("../packages/ui/dist/styles.css", import.meta.url),
  css.replace(
    '@import "react-day-picker/style.css";',
    `/* react-day-picker CSS, MIT; see THIRD_PARTY_NOTICES.md */\n${calendar}`,
  ),
);
