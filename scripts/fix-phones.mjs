#!/usr/bin/env node
// Fixes stale phone numbers in blog footers. node scripts/fix-phones.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage", "blog");
const fixes = [
  ["Sales: +91 8839888531", "Sales: +91 8305369467"],
  ["Support: +91 8305369467", "Support: +91 9009785315"],
  ["+91-8839888531", "+91-8305369467"],
];

for (const f of readdirSync(ROOT)) {
  if (!f.endsWith(".html") || f === "blog-template.html") continue;
  const p = join(ROOT, f);
  let html = readFileSync(p, "utf8");
  const orig = html;
  for (const [a, b] of fixes) html = html.split(a).join(b);
  if (html !== orig) {
    try {
      writeFileSync(p, html);
      console.log("✓ " + f);
    } catch (e) {
      console.error("✗ " + f + " — " + e.message.slice(0, 60) + " (retry later)");
    }
  }
}
console.log("done");
