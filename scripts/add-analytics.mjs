#!/usr/bin/env node
/**
 * Injects analytics include (<script defer src="/analytics.js">) into every
 * production page. Idempotent — safe to re-run. Skips templates/components.
 * Usage: node scripts/add-analytics.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("../samyoj-homepage", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SKIP_FILES = ["nav-component.html", "new_nav.html", "samyoj-hero.html", "blog-template.html", "404.html"];
const SNIPPET = '<script defer src="/analytics.js"></script>';

const pages = [];
(function collect(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (!["node_modules", "images", "New images", "doc"].includes(f)) collect(p);
    } else if (f.endsWith(".html") && !SKIP_FILES.includes(f)) pages.push(p);
  }
})(ROOT);

let added = 0, already = 0;
for (const file of pages) {
  let html = readFileSync(file, "utf8");
  if (html.includes("/analytics.js")) { already++; continue; }
  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `  ${SNIPPET}\n</head>`);
    added++;
  } else {
    console.warn("no </head> found:", relative(ROOT, file));
    continue;
  }
  writeFileSync(file, html);
}
console.log(`analytics include added to ${added} pages (${already} already had it, ${pages.length - added - already} skipped)`);
