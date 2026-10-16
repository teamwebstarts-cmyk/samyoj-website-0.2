#!/usr/bin/env node
// Lists <img> tags missing alt text per page. node scripts/list-alt-gaps.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage");
const SKIP_DIRS = ["images", "New images", "doc", "node_modules", "legal"];
const pages = [];
function collect(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (!SKIP_DIRS.includes(f)) collect(p); }
    else if (f.endsWith(".html") && f !== "blog-template.html") pages.push(p);
  }
}
collect(ROOT);

for (const p of pages) {
  const html = readFileSync(p, "utf8");
  const imgs = [...html.matchAll(/<img[^>]*>/gi)].map(m => m[0]);
  const noAlt = imgs.filter(t => !/alt="[^"]+"/.test(t));
  if (noAlt.length) {
    console.log(`\n=== ${relative(ROOT, p)} — ${noAlt.length}/${imgs.length} missing alt ===`);
    noAlt.forEach((t, i) => console.log(`${i + 1}. ${t.slice(0, 180)}`));
  }
}
