import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PUBLIC = path.join(ROOT, "public");
const CONFIG_PATH = path.join(ROOT, "providers.json");
const ENV_PATH = path.join(ROOT, ".env");

/** @type {{ listen: string, port: number, active: string, profiles: Record<string, any> }} */
let config = loadConfig();
loadEnvFile(ENV_PATH);

const recent = [];
const MAX_RECENT = 30;

function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

function saveActive(profileId) {
  config = loadConfig();
  if (!config.profiles[profileId]) {
    throw new Error(`Unknown profile: ${profileId}`);
  }
  config.active = profileId;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function activeProfile() {
  const id = config.active;
  const profile = config.profiles[id];
  if (!profile) throw new Error(`Active profile missing: ${id}`);
  return { id, profile };
}

function resolveApiKey(profile) {
  const key = process.env[profile.apiKeyEnv];
  if (!key) {
    throw new Error(
      `Missing env ${profile.apiKeyEnv}. Copy .env.example → .env and set your key.`
    );
  }
  return key;
}

function mapModel(profile, model) {
  if (!model) return profile.defaultModel;
  return profile.models?.[model] ?? model;
}

function pushRecent(entry) {
  recent.unshift({ ...entry, at: new Date().toISOString() });
  if (recent.length > MAX_RECENT) recent.length = MAX_RECENT;
}

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store",
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".svg": "image/svg+xml",
    }[ext] || "application/octet-stream"
  );
}

function serveStatic(req, res, urlPath) {
  let rel = urlPath === "/" ? "/index.html" : urlPath;
  rel = decodeURIComponent(rel.split("?")[0]);
  if (rel.includes("..")) {
    res.writeHead(400);
    res.end("Bad path");
    return;
  }
  const filePath = path.join(PUBLIC, rel);
  if (!filePath.startsWith(PUBLIC) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  res.writeHead(200, { "Content-Type": contentType(filePath) });
  fs.createReadStream(filePath).pipe(res);
}

function statusPayload() {
  const { id, profile } = activeProfile();
  const hasKey = Boolean(process.env[profile.apiKeyEnv]);
  return {
    ok: true,
    active: id,
    label: profile.label,
    baseURL: profile.baseURL,
    color: profile.color,
    defaultModel: profile.defaultModel,
    models: Object.keys(profile.models || {}),
    hasKey,
    apiKeyEnv: profile.apiKeyEnv,
    listen: `http://${config.listen}:${config.port}`,
    profiles: Object.fromEntries(
      Object.entries(config.profiles).map(([pid, p]) => [
        pid,
        {
          label: p.label,
          color: p.color,
          baseURL: p.baseURL,
          defaultModel: p.defaultModel,
          models: Object.keys(p.models || {}),
          hasKey: Boolean(process.env[p.apiKeyEnv]),
          apiKeyEnv: p.apiKeyEnv,
        },
      ])
    ),
    recent: recent.slice(0, 10),
  };
}

async function handleSwitch(req, res) {
  const raw = await readBody(req);
  let body = {};
  try {
    body = raw.length ? JSON.parse(raw.toString("utf8")) : {};
  } catch {
    return json(res, 400, { error: "Invalid JSON" });
  }
  const profileId = body.profile || body.id;
  if (!profileId || !config.profiles[profileId]) {
    return json(res, 400, {
      error: "Unknown profile",
      available: Object.keys(config.profiles),
    });
  }
  saveActive(profileId);
  return json(res, 200, statusPayload());
}

async function handleTest(req, res) {
  const started = Date.now();
  try {
    const { id, profile } = activeProfile();
    const apiKey = resolveApiKey(profile);
    const model = mapModel(profile, profile.defaultModel);
    const upstream = `${profile.baseURL.replace(/\/$/, "")}/chat/completions`;
    const r = await fetch(upstream, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: profile.testPrompt || "Reply with exactly: OK" }],
        max_tokens: 32,
        stream: false,
      }),
    });
    const text = await r.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text.slice(0, 500) };
    }
    const ms = Date.now() - started;
    const content = parsed?.choices?.[0]?.message?.content ?? null;
    const entry = {
      kind: "test",
      profile: id,
      model,
      status: r.status,
      ms,
      ok: r.ok,
      preview: content ? String(content).slice(0, 120) : null,
      error: r.ok ? null : parsed?.error?.message || text.slice(0, 200),
    };
    pushRecent(entry);
    return json(res, r.ok ? 200 : 502, { ...entry, body: parsed });
  } catch (err) {
    const ms = Date.now() - started;
    const entry = {
      kind: "test",
      profile: config.active,
      status: 0,
      ms,
      ok: false,
      error: err.message,
    };
    pushRecent(entry);
    return json(res, 500, entry);
  }
}

async function proxyChatCompletions(req, res) {
  const started = Date.now();
  let modelSent = null;
  try {
    const { id, profile } = activeProfile();
    const apiKey = resolveApiKey(profile);
    const raw = await readBody(req);
    let body;
    try {
      body = JSON.parse(raw.toString("utf8") || "{}");
    } catch {
      return json(res, 400, {
        error: { message: "Invalid JSON body", type: "invalid_request_error" },
      });
    }

    const originalModel = body.model;
    body.model = mapModel(profile, body.model);
    modelSent = body.model;

    const upstream = `${profile.baseURL.replace(/\/$/, "")}/chat/completions`;
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
    if (req.headers["accept"]) headers.Accept = req.headers["accept"];

    const upstreamRes = await fetch(upstream, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const ms = Date.now() - started;
    pushRecent({
      kind: "chat",
      profile: id,
      model: modelSent,
      originalModel,
      status: upstreamRes.status,
      ms,
      ok: upstreamRes.ok,
      stream: Boolean(body.stream),
    });

    const outHeaders = {
      "Access-Control-Allow-Origin": "*",
    };
    const ct = upstreamRes.headers.get("content-type");
    if (ct) outHeaders["Content-Type"] = ct;

    res.writeHead(upstreamRes.status, outHeaders);

    if (!upstreamRes.body) {
      const t = await upstreamRes.text();
      res.end(t);
      return;
    }

    const reader = upstreamRes.body.getReader();
    const pump = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      res.end();
    };
    pump().catch((err) => {
      console.error("stream error", err);
      try {
        res.end();
      } catch {
        /* ignore */
      }
    });
  } catch (err) {
    pushRecent({
      kind: "chat",
      profile: config.active,
      model: modelSent,
      status: 500,
      ms: Date.now() - started,
      ok: false,
      error: err.message,
    });
    return json(res, 500, {
      error: { message: err.message, type: "proxy_error" },
    });
  }
}

function proxyModels(req, res) {
  try {
    const { id, profile } = activeProfile();
    const aliases = Object.keys(profile.models || {});
    const unique = [...new Set([profile.defaultModel, ...Object.values(profile.models || {}), ...aliases])];
    const data = unique.map((mid, i) => ({
      id: mid,
      object: "model",
      created: Math.floor(Date.now() / 1000) - i,
      owned_by: id,
    }));
    return json(res, 200, { object: "list", data });
  } catch (err) {
    return json(res, 500, { error: { message: err.message } });
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${config.listen}:${config.port}`);
  const method = req.method || "GET";

  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    });
    res.end();
    return;
  }

  try {
    if (method === "GET" && url.pathname === "/status") {
      return json(res, 200, statusPayload());
    }
    if (method === "POST" && url.pathname === "/switch") {
      return await handleSwitch(req, res);
    }
    if (method === "POST" && (url.pathname === "/test" || url.pathname === "/api/test")) {
      return await handleTest(req, res);
    }
    if (method === "GET" && url.pathname === "/v1/models") {
      return proxyModels(req, res);
    }
    if (method === "POST" && url.pathname === "/v1/chat/completions") {
      return await proxyChatCompletions(req, res);
    }
    if (method === "GET") {
      return serveStatic(req, res, url.pathname);
    }
    json(res, 404, { error: "Not found", path: url.pathname });
  } catch (err) {
    console.error(err);
    json(res, 500, { error: err.message });
  }
});

config = loadConfig();
const host = config.listen || "127.0.0.1";
const port = Number(config.port) || 8787;

server.listen(port, host, () => {
  const { id, profile } = activeProfile();
  console.log(`Cursor Provider Switch listening on http://${host}:${port}`);
  console.log(`UI:     http://${host}:${port}/`);
  console.log(`Active: ${profile.label} (${id}) → ${profile.baseURL}`);
  console.log(`Cursor Override OpenAI Base URL: http://${host}:${port}/v1`);
  console.log(`Cursor OpenAI API Key: local`);
});
