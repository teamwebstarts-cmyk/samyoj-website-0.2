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
loadEnvFile(ENV_PATH, { override: true });

const recent = [];
const MAX_RECENT = 30;

function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

function saveConfig(next) {
  config = next;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");
}

function reloadConfig() {
  config = loadConfig();
  return config;
}

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 40) || `provider_${Date.now()}`;
}

function envKeyName(profileId) {
  return `${slugify(profileId).toUpperCase()}_API_KEY`;
}

function parseModelsInput(raw, defaultModel) {
  const models = {};
  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (!item) continue;
      if (typeof item === "string") {
        const id = item.trim();
        if (id) models[id] = id;
      } else if (item.alias && item.id) {
        models[String(item.alias).trim()] = String(item.id).trim();
        models[String(item.id).trim()] = String(item.id).trim();
      }
    }
  } else if (typeof raw === "string") {
    for (const part of raw.split(/[\n,]+/)) {
      const bit = part.trim();
      if (!bit) continue;
      if (bit.includes("=")) {
        const [alias, id] = bit.split("=").map((s) => s.trim());
        if (alias && id) {
          models[alias] = id;
          models[id] = id;
        }
      } else {
        models[bit] = bit;
      }
    }
  } else if (raw && typeof raw === "object") {
    Object.assign(models, raw);
  }
  if (defaultModel) {
    models[defaultModel] = defaultModel;
  }
  return models;
}

function loadEnvFile(filePath, { override = false } = {}) {
  if (!fs.existsSync(filePath)) return {};
  const map = {};
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
    map[key] = value;
    if (override || !(key in process.env)) process.env[key] = value;
  }
  return map;
}

function readEnvMap() {
  return loadEnvFile(ENV_PATH, { override: false });
}

function writeEnvMap(map) {
  const lines = [
    "# Managed by Cursor Provider Switch UI. Do not commit.",
    "",
  ];
  for (const [k, v] of Object.entries(map)) {
    if (!k) continue;
    const safe = String(v ?? "").replace(/\r?\n/g, "");
    lines.push(`${k}=${safe}`);
  }
  fs.writeFileSync(ENV_PATH, lines.join("\n") + "\n");
  for (const [k, v] of Object.entries(map)) {
    process.env[k] = String(v ?? "");
  }
}

function setEnvKey(envName, value) {
  const map = { ...readEnvMap(), ...loadEnvFile(ENV_PATH) };
  // merge current file values properly
  const current = {};
  if (fs.existsSync(ENV_PATH)) {
    const text = fs.readFileSync(ENV_PATH, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      current[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
    }
  }
  current[envName] = value;
  writeEnvMap(current);
  process.env[envName] = value;
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
      `Missing API key for ${profile.apiKeyEnv}. Add it in the UI.`
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

async function readJson(req) {
  const raw = await readBody(req);
  if (!raw.length) return {};
  try {
    return JSON.parse(raw.toString("utf8"));
  } catch {
    throw Object.assign(new Error("Invalid JSON"), { statusCode: 400 });
  }
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

function maskKey(key) {
  if (!key) return null;
  if (key.length <= 10) return "••••••••";
  return `${key.slice(0, 6)}…${key.slice(-4)}`;
}

async function detectPublicTunnel() {
  // ngrok local inspector
  try {
    const r = await fetch("http://127.0.0.1:4040/api/tunnels");
    if (r.ok) {
      const data = await r.json();
      const https = (data.tunnels || []).find(
        (t) => String(t.public_url || "").startsWith("https://")
      );
      if (https?.public_url) {
        return { provider: "ngrok", publicUrl: https.public_url.replace(/\/$/, "") };
      }
    }
  } catch {
    /* ignore */
  }
  // optional file written by tunnel.js (cloudflared / ngrok)
  const tunnelFile = path.join(ROOT, "tunnel-url.json");
  if (fs.existsSync(tunnelFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(tunnelFile, "utf8"));
      if (data.publicUrl) {
        return {
          provider: data.provider || "tunnel",
          publicUrl: String(data.publicUrl).replace(/\/$/, ""),
        };
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}

function proxySecret() {
  return (process.env.PROXY_SECRET || "").trim();
}

function checkProxyAuth(req) {
  const secret = proxySecret();
  if (!secret) return { ok: true, warned: true };
  const header = req.headers.authorization || "";
  const token = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : (req.headers["x-api-key"] || "").trim();
  if (!token || token !== secret) {
    return {
      ok: false,
      error: "Invalid proxy secret. Set Cursor OpenAI API Key to PROXY_SECRET from .env",
    };
  }
  return { ok: true };
}

async function statusPayload() {
  reloadConfig();
  loadEnvFile(ENV_PATH, { override: true });
  const { id, profile } = activeProfile();
  const hasKey = Boolean(process.env[profile.apiKeyEnv]);
  const tunnel = await detectPublicTunnel();
  const secret = proxySecret();
  const localBase = `http://${config.listen}:${config.port}`;
  const cursorBase = tunnel
    ? `${tunnel.publicUrl}/v1`
    : `${localBase}/v1`;
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
    apiKeyPreview: maskKey(process.env[profile.apiKeyEnv]),
    listen: localBase,
    tunnel,
    cursorBaseUrl: cursorBase,
    proxySecretSet: Boolean(secret),
    proxySecretPreview: maskKey(secret),
    privateNetworkBlocked:
      "Cursor blocks 127.0.0.1 / localhost. Use a public HTTPS tunnel URL in Override OpenAI Base URL.",
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
          apiKeyPreview: maskKey(process.env[p.apiKeyEnv]),
        },
      ])
    ),
    recent: recent.slice(0, 10),
  };
}

function saveActive(profileId) {
  reloadConfig();
  if (!config.profiles[profileId]) {
    throw new Error(`Unknown profile: ${profileId}`);
  }
  config.active = profileId;
  saveConfig(config);
}

async function handleSwitch(req, res) {
  const body = await readJson(req);
  const profileId = body.profile || body.id;
  if (!profileId || !config.profiles[profileId]) {
    return json(res, 400, {
      error: "Unknown profile",
      available: Object.keys(config.profiles),
    });
  }
  saveActive(profileId);
  return json(res, 200, await statusPayload());
}

async function handleSaveKey(req, res) {
  const body = await readJson(req);
  const profileId = body.profile || body.id;
  const apiKey = String(body.apiKey || body.key || "").trim();
  reloadConfig();
  if (!profileId || !config.profiles[profileId]) {
    return json(res, 400, { error: "Unknown profile" });
  }
  if (!apiKey) {
    return json(res, 400, { error: "apiKey is required" });
  }
  const envName = config.profiles[profileId].apiKeyEnv || envKeyName(profileId);
  config.profiles[profileId].apiKeyEnv = envName;
  saveConfig(config);
  setEnvKey(envName, apiKey);
  pushRecent({
    kind: "key",
    profile: profileId,
    ok: true,
    preview: maskKey(apiKey),
  });
  return json(res, 200, await statusPayload());
}

async function handleUpsertProfile(req, res) {
  const body = await readJson(req);
  reloadConfig();

  const id = slugify(body.id || body.label);
  if (!id) return json(res, 400, { error: "id/label required" });

  const label = String(body.label || id).trim();
  let baseURL = String(body.baseURL || body.url || "").trim();
  if (!baseURL) return json(res, 400, { error: "baseURL required" });
  baseURL = baseURL.replace(/\/$/, "");
  if (baseURL.endsWith("/chat/completions")) {
    baseURL = baseURL.replace(/\/chat\/completions$/, "");
  }

  const defaultModel = String(body.defaultModel || "").trim();
  if (!defaultModel) return json(res, 400, { error: "defaultModel required" });

  const existing = config.profiles[id];
  const apiKeyEnv = existing?.apiKeyEnv || body.apiKeyEnv || envKeyName(id);
  const models = parseModelsInput(body.models, defaultModel);

  config.profiles[id] = {
    label,
    baseURL,
    apiKeyEnv,
    color: body.color || existing?.color || "#8b5cf6",
    models,
    defaultModel,
    testPrompt: body.testPrompt || existing?.testPrompt || "Reply with exactly: OK",
  };
  saveConfig(config);

  const apiKey = String(body.apiKey || body.key || "").trim();
  if (apiKey) setEnvKey(apiKeyEnv, apiKey);

  pushRecent({
    kind: "profile",
    profile: id,
    ok: true,
    preview: label,
  });

  return json(res, 200, await statusPayload());
}

async function handleDeleteProfile(req, res) {
  const body = await readJson(req);
  const profileId = body.profile || body.id;
  reloadConfig();
  if (!profileId || !config.profiles[profileId]) {
    return json(res, 400, { error: "Unknown profile" });
  }
  if (Object.keys(config.profiles).length <= 1) {
    return json(res, 400, { error: "Cannot delete the last provider" });
  }
  delete config.profiles[profileId];
  if (config.active === profileId) {
    config.active = Object.keys(config.profiles)[0];
  }
  saveConfig(config);
  pushRecent({ kind: "delete", profile: profileId, ok: true });
  return json(res, 200, await statusPayload());
}

async function handleTest(req, res) {
  const started = Date.now();
  try {
    const body = await readJson(req).catch(() => ({}));
    if (body.profile && config.profiles[body.profile]) {
      saveActive(body.profile);
    }
    const { id, profile } = activeProfile();
    const apiKey = resolveApiKey(profile);
    const model = mapModel(profile, body.model || profile.defaultModel);
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
      error: r.ok
        ? null
        : parsed?.error?.message || parsed?.error || text.slice(0, 200),
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
    const auth = checkProxyAuth(req);
    if (!auth.ok) {
      return json(res, 401, {
        error: { message: auth.error, type: "authentication_error" },
      });
    }
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

    const outHeaders = { "Access-Control-Allow-Origin": "*" };
    const ct = upstreamRes.headers.get("content-type");
    if (ct) outHeaders["Content-Type"] = ct;

    res.writeHead(upstreamRes.status, outHeaders);

    if (!upstreamRes.body) {
      res.end(await upstreamRes.text());
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
    const unique = [
      ...new Set([
        profile.defaultModel,
        ...Object.values(profile.models || {}),
        ...aliases,
      ]),
    ];
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
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    });
    res.end();
    return;
  }

  try {
    if (method === "GET" && url.pathname === "/status") {
      return json(res, 200, await statusPayload());
    }
    if (method === "POST" && url.pathname === "/switch") {
      return await handleSwitch(req, res);
    }
    if (method === "POST" && (url.pathname === "/api/keys" || url.pathname === "/keys")) {
      return await handleSaveKey(req, res);
    }
    if (method === "POST" && (url.pathname === "/api/profiles" || url.pathname === "/profiles")) {
      return await handleUpsertProfile(req, res);
    }
    if (
      method === "DELETE" &&
      (url.pathname === "/api/profiles" || url.pathname === "/profiles")
    ) {
      return await handleDeleteProfile(req, res);
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
    json(res, err.statusCode || 500, { error: err.message });
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
