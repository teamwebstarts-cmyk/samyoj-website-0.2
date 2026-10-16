#!/usr/bin/env node
// Finds samyoj*.css files not referenced by any html page.
// NOTE: href may carry a cache-busting query (e.g. samyoj-nav.css?v=15) — strip it
// before matching, otherwise referenced files are misreported as unused.
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage");
const used = new Set();
for (const f of readdirSync(ROOT).filter((f) => f.endsWith(".html"))) {
  const c = readFileSync(join(ROOT, f), "utf8");
  for (const m of c.matchAll(/href="(samyoj[^"]+\.css)(?:\?[^"]*)?"/g)) used.add(m[1]);
}
console.log("Referenced css (" + used.size + "):", [...used].sort().join(", "));
let unused = 0;
for (const f of readdirSync(ROOT).filter((f) => f.startsWith("samyoj") && f.endsWith(".css"))) {
  if (!used.has(f)) { console.log("UNUSED:", f); unused++; }
}
console.log(unused === 0 ? "✅ all samyoj*.css files are referenced" : `❌ ${unused} unused css files`);
process.exit(unused === 0 ? 0 : 1);
