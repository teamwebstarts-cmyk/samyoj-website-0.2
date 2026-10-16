// tiny static server for a fixed dir — run: node scripts/tmp-server.mjs <dir> <port>
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import process from "node:process";

const dir = process.argv[2] || ".";
const port = Number(process.argv[3] || 3111);
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  let fp = join(dir, p);
  try {
    if (statSync(fp).isDirectory()) fp = join(fp, "index.html");
    const c = readFileSync(fp);
    res.setHeader("Content-Type", types[extname(fp)] || "application/octet-stream");
    res.end(c);
  } catch {
    res.statusCode = 404;
    res.end("not found: " + p);
  }
}).listen(port, "127.0.0.1", () => console.log(`serving ${dir} on http://127.0.0.1:${port}`));
