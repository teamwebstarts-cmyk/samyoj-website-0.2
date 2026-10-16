#!/usr/bin/env node
// Diagnostic: compare <style> block structure between git ref and current file.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const WS = join(dirname(fileURLToPath(import.meta.url)), "..");
const REF = "67f1b15";
const pages = process.argv.slice(2);

for (const page of pages) {
  const gitHtml = execFileSync("git", ["show", `${REF}:samyoj-homepage/${page}`], { cwd: WS, encoding: "utf8" });
  const curHtml = readFileSync(join(WS, "samyoj-homepage", page), "utf8");
  const blocks = (h) => [...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((m) => ({ len: m[0].length, head: m[1].replace(/\s+/g, " ").trim().slice(0, 70) }));
  console.log(`=== ${page} ===`);
  console.log("GIT blocks:", JSON.stringify(blocks(gitHtml), null, 1));
  console.log("CUR inline blocks:", JSON.stringify(blocks(curHtml), null, 1));
  console.log("CUR links:", [...curHtml.matchAll(/href="(samyoj[^"]+\.css)"/g)].map((m) => m[1]).join(", ") || "(none)");
}
