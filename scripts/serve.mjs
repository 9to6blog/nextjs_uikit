import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve(process.env.STATIC_ROOT ?? "apps/docs/out");
const basePath = process.env.BASE_PATH ?? "";
const port = Number(process.env.PORT ?? 3106);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (basePath) {
      if (pathname === basePath) {
        res.writeHead(308, { Location: `${basePath}/` });
        res.end();
        return;
      }
      if (!pathname.startsWith(`${basePath}/`)) {
        res.writeHead(404);
        res.end();
        return;
      }
      pathname = pathname.slice(basePath.length);
    }
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": mime[extname(file)] ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  process.stdout.write(`NINE UI static preview: http://127.0.0.1:${port}\n`),
);
