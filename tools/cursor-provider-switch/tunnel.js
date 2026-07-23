import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 8787);
const TARGET = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, "tunnel-url.json");

function writeUrl(provider, publicUrl) {
  const clean = String(publicUrl).replace(/\/$/, "");
  fs.writeFileSync(
    OUT,
    JSON.stringify({ provider, publicUrl: clean, at: new Date().toISOString() }, null, 2) + "\n"
  );
  console.log(`\nPublic tunnel: ${clean}`);
  console.log(`Cursor Override OpenAI Base URL: ${clean}/v1`);
  console.log(`Cursor OpenAI API Key: value of PROXY_SECRET in .env\n`);
}

function tryParseCloudflare(line) {
  const m = line.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
  return m ? m[0] : null;
}

function tryParseNgrok(line) {
  const m = line.match(/https:\/\/[a-z0-9-]+\.ngrok(?:-free)?\.(?:app|io|dev)/i);
  return m ? m[0] : null;
}

async function waitForNgrokApi(timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch("http://127.0.0.1:4040/api/tunnels");
      if (r.ok) {
        const data = await r.json();
        const https = (data.tunnels || []).find((t) =>
          String(t.public_url || "").startsWith("https://")
        );
        if (https?.public_url) return https.public_url;
      }
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  return null;
}

function run(cmd, args, { onLine } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: __dirname,
      shell: true,
      windowsHide: true,
    });
    const handle = (buf) => {
      const text = buf.toString();
      process.stdout.write(text);
      for (const line of text.split(/\r?\n/)) {
        if (line.trim()) onLine?.(line);
      }
    };
    child.stdout.on("data", handle);
    child.stderr.on("data", handle);
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited ${code}`));
    });
  });
}

async function startCloudflared() {
  console.log("Starting Cloudflare quick tunnel…");
  let found = false;
  await run("cloudflared", ["tunnel", "--url", TARGET], {
    onLine: (line) => {
      const url = tryParseCloudflare(line);
      if (url && !found) {
        found = true;
        writeUrl("cloudflared", url);
      }
    },
  });
}

async function startNgrok() {
  console.log("Starting ngrok tunnel…");
  const child = spawn("ngrok", ["http", String(PORT), "--log=stdout"], {
    cwd: __dirname,
    shell: true,
    windowsHide: true,
  });
  child.stdout.on("data", (d) => process.stdout.write(d));
  child.stderr.on("data", (d) => {
    const text = d.toString();
    process.stderr.write(text);
    const url = tryParseNgrok(text);
    if (url) writeUrl("ngrok", url);
  });
  const url = await waitForNgrokApi();
  if (url) writeUrl("ngrok", url);
  await new Promise((resolve, reject) => {
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`ngrok exited ${code}`))
    );
    child.on("error", reject);
  });
}

async function main() {
  console.log(`Tunneling local proxy ${TARGET}`);
  console.log("Keep this terminal open. Ctrl+C to stop.\n");
  try {
    await startCloudflared();
  } catch (err) {
    console.warn("cloudflared failed:", err.message);
    console.warn("Falling back to ngrok…");
    await startNgrok();
  }
}

main().catch((err) => {
  console.error(err);
  console.error("\nInstall one of:");
  console.error("  winget install Cloudflare.cloudflared");
  console.error("  https://ngrok.com/download (authtoken required)");
  process.exit(1);
});
