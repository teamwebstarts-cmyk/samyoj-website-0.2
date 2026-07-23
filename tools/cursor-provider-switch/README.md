# Cursor Provider Switch

Local OpenAI-compatible proxy so you can **click-switch** between Command Code, Zyloo, and more — without re-pasting Base URL / API key in Cursor every time.

## Quick start

```powershell
cd e:\samyojjj\tools\cursor-provider-switch
copy .env.example .env
# Edit .env — set CMD_API_KEY and ZYLOO_KEY
npm start
```

Open **http://127.0.0.1:8787/** → click a provider → **Test active provider**.

## Cursor setup (once)

1. **Settings → Models**
2. Enable **OpenAI API Key** → value: `local`
3. Enable **Override OpenAI Base URL** → `http://127.0.0.1:8787/v1`
4. **+ Add Custom Model** for the ids you use, e.g.:
   - `poolside/laguna-s-2.1-free`
   - `laguna-free` (alias → Laguna via Command Code profile)
   - `zyloo/claude-sonnet-4-6-thinking-free`
   - `claude-sonnet-free` (alias → Zyloo Sonnet free)
5. Keep `npm start` running while you chat in Cursor

## Switch providers

- UI: http://127.0.0.1:8787/
- Or API:

```powershell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8787/switch -ContentType application/json -Body '{"profile":"zyloo"}'
```

Profiles live in `providers.json` (`active` is updated when you switch).

## Endpoints

| Path | Purpose |
|------|---------|
| `GET /` | Switcher UI |
| `GET /status` | Active profile + key presence |
| `POST /switch` | `{ "profile": "commandcode" \| "zyloo" }` |
| `POST /test` | Ping active upstream |
| `POST /v1/chat/completions` | Cursor / OpenAI clients |
| `GET /v1/models` | Model list for active profile |

## Security

- Binds to **127.0.0.1** only
- Real keys stay in `.env` (gitignored)
- Do not expose this port to the network
