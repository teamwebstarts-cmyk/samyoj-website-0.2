#!/usr/bin/env node
// Fixes stale phone numbers in legal footers (+ tel: links). node scripts/fix-phones-legal.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage", "legal");
const fixes = [
  ["tel:+918839888531", "tel:+918305369467"], // tel link FIRST (avoid double-replace)
  ["Sales: +91 8839888531", "Sales: +91 8305369467"],
  ["Support: +91 8305369467", "Support: +91 9009785315"],
  ["tel:+9183053694677", "tel:+918305369467"], // safety no-op
];

for (const f of readdirSync(ROOT)) {
  if (!f.endsWith(".html")) continue;
  const p = join(ROOT, f);
  let html = readFileSync(p, "utf8");
  const orig = html;
  for (const [a, b] of fixes) html = html.split(a).join(b);
  if (html !== orig) {
    writeFileSync(p, html);
    console.log("✓ " + f);
  }
}
console.log("done");
