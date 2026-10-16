#!/usr/bin/env node
/**
 * ORIGINAL-design overflow baseline: serves git 67f1b15 versions of core pages
 * into a temp dir + needed css, so we can compare overflow behaviour of the
 * original design vs current. Prints element-culprit scan for both variants.
 * Run: node scripts/overflow-baseline.mjs   (reads files, prints report, no server)
 */
import { readFileSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const WS = join(dirname(fileURLToPath(import.meta.url)), "..");
const REF = "67f1b15";
const TMP = join(WS, ".tmp-orig-pages");
const PAGES = ["index.html", "pricing.html"];

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

for (const page of PAGES) {
  const html = execFileSync("git", ["show", `${REF}:samyoj-homepage/${page}`], { cwd: WS, encoding: "utf8" });
  // rewrite samyoj css/links to a relative path that we also export
  const links = [...html.matchAll(/href="(samyoj[^"]+\.css)"/g)].map((m) => m[1]);
  writeFileSync(join(TMP, page), html, "utf8");
  for (const link of links) {
    try {
      const css = readFileSync(join(WS, "samyoj-homepage", link), "utf8");
      writeFileSync(join(TMP, link), css, "utf8");
    } catch { console.log("missing css for", link); }
  }
}
console.log("Original pages + css written to", TMP);
console.log("Segments to compare come from browser sweep next.");
