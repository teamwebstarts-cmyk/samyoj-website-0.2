#!/usr/bin/env node
/**
 * Page 404 & legal excluded; updates head og/twitter/hreflang/title/desc per SEO plan.
 * Applies changes from a JSON config: node scripts/head-updates.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage");

// [file, [ [find, replace], ... ] ]  — each find must match EXACTLY once or page is skipped with error
const EDITS = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "head-updates.json"), "utf8"));

let failures = 0;
for (const [file, edits] of EDITS) {
  const p = join(ROOT, file);
  let html = readFileSync(p, "utf8");
  let ok = true;
  for (const [find, replace] of edits) {
    const count = html.split(find).length - 1;
    if (count !== 1) {
      console.error(`✗ ${file}: pattern found ${count}× (expected 1): "${find.slice(0, 70)}…"`);
      ok = false; break;
    }
    html = html.replace(find, replace);
  }
  if (ok) {
    writeFileSync(p, html);
    console.log(`✓ ${file} (${edits.length} edits)`);
  } else failures++;
}
console.log(failures ? `\n${failures} file(s) FAILED — nothing else changed` : "\nAll files updated.");
process.exit(failures ? 1 : 0);
