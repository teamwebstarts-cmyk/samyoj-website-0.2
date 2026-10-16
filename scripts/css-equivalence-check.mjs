#!/usr/bin/env node
/**
 * FINAL proof: for every page, concatenating current external css files (in link order)
 * + remaining inline styles === original concatenated blocks at git 67f1b15.
 * Handles both patterns: -all.css single file and early/chrome/main triple.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const WS = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = join(WS, "samyoj-homepage");
const REF = "67f1b15";
const PAGES = ["index.html", "features.html", "pricing.html", "industries.html", "contact.html", "blog.html"];

const norm = (s) => s.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();
const innerBlock = (b) => b.replace(/^<style[^>]*>/i, "").replace(/<\/style>$/i, "").trim();
const blocksOf = (html) => [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => norm(innerBlock(m[0]))).join("\n");
const stripComments = (css) => css
  .replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, " ") // all block comments
  .replace(/\/\*[\s\S]*?\*\//g, " ");

for (const page of PAGES) {
  const origRaw = blocksOf(execFileSync("git", ["show", `${REF}:samyoj-homepage/${page}`], { cwd: WS, encoding: "utf8" }));
  const orig = norm(stripComments(origRaw));

  const cur = readFileSync(join(ROOT, page), "utf8");
  const parts = [];
  for (const m of cur.matchAll(/<link[^>]*href="(samyoj[^"]+\.css)"/g)) {
    const fp = join(ROOT, m[1]);
    if (existsSync(fp)) parts.push(readFileSync(fp, "utf8"));
    else console.log(`   (warn: link to missing ${m[1]})`);
  }
  parts.push(blocksOf(cur)); // remaining inline styles
  const now = norm(stripComments(parts.join("\n")));

  const ok = now === orig;
  console.log(`${ok ? "✅ IDENTICAL" : "❌ DIFF   "} ${page} (orig ${orig.length} ⇄ now ${now.length})`);
  if (!ok) {
    let i = 0; while (i < orig.length && i < now.length && orig[i] === now[i]) i++;
    console.log(`   @${i}\n   orig: ${orig.slice(Math.max(0, i - 50), i + 80)}\n   now : ${now.slice(Math.max(0, i - 50), i + 80)}`);
  }
}
