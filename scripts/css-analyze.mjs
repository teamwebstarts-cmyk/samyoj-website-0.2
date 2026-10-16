#!/usr/bin/env node
/**
 * Analyzes inline <style> blocks: sizes, locations, and whether they contain
 * page-critical vs duplicated content. Read-only. node scripts/css-analyze.mjs
 */
import { readFileSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage");
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ["index.html", "features.html", "pricing.html", "industries.html", "contact.html"];

const sigMap = {}; // css line -> pages containing it

for (const page of pages) {
  const html = readFileSync(join(ROOT, page), "utf8");
  const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  console.log(`\n=== ${page}: ${styles.length} blocks, total ${(styles.reduce((s, m) => s + m[1].length, 0) / 1024).toFixed(0)} KB ===`);
  styles.forEach((m, i) => {
    const css = m[1];
    const head = css.trim().split("\n").slice(0, 2).join(" | ").slice(0, 90);
    // signature: first 3 selector-ish lines
    const sig = css.split("\n").filter(l => l.trim() && !l.trim().startsWith("/*")).slice(0, 3).join("§").slice(0, 120);
    (sigMap[sig] = sigMap[sig] || []).push(page);
    console.log(`  #${i + 1}: ${(css.length / 1024).toFixed(1)}KB at pos ${m.index} — starts: ${head}`);
  });
}

console.log("\n=== duplicated blocks (same start signature in 2+ pages) ===");
for (const [sig, lst] of Object.entries(sigMap)) {
  if (lst.length > 1) console.log(`  [${lst.join(", ")}] → ${sig.slice(0, 80)}`);
}
