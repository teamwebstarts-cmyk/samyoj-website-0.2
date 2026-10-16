#!/usr/bin/env node
/**
 * Removes legacy <meta name="keywords"> from all site pages. SEO plan §3.6/§5.
 * Usage: node scripts/strip-keywords.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage");
const SKIP_DIRS = ["images", "New images", "doc", "node_modules", "legal"];
const SKIP_FILES = ["nav-component.html", "new_nav.html", "samyoj-hero.html", "blog-template.html"];
const pages = [];

function collect(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (!SKIP_DIRS.includes(f)) collect(p); }
    else if (f.endsWith(".html") && !SKIP_FILES.includes(f)) pages.push(p);
  }
}
collect(ROOT);

let n = 0;
for (const p of pages) {
  let html = readFileSync(p, "utf8");
  const before = html;
  // multi-line meta keywords (both attribute orders, any whitespace)
  html = html.replace(/[ \t]*<meta\s+name="keywords"[\s\S]*?\/>|[ \t]*<meta\s+name="keywords"[\s\S]*?>\n/gi, "");
  // legacy verification meta (points to unknown service, not GSC)
  html = html.replace(/[ \t]*<meta\s+name="thesmartware-site-verification"[^>]*>\n?/gi, "");
  if (html !== before) {
    writeFileSync(p, html);
    n++;
    console.log("✓ cleaned " + relative(ROOT, p));
  }
}
console.log(`\nRemoved keywords/legacy meta from ${n} pages.`);
