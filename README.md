# Samyoj Website

Static marketing site for Samyoj. Active development branch: **`samyoj-new-features-CRM`**.

Site files live in `samyoj-homepage/`.

## Prerequisites

- Node.js 18+

## Local development

```bash
git checkout samyoj-new-features-CRM
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). URL rewrites for local dev are in `samyoj-homepage/serve.json` (aligned with `_redirects` / `vercel.json`).

## Deployment

| Target | Notes |
|--------|--------|
| **Vercel** | Root directory: `samyoj-homepage` (`vercel.json`) |
| **GitHub Pages** | Workflow uploads `samyoj-homepage` (see `.github/workflows/`) |

## Layout

```
samyoj-homepage/   HTML pages, blog, legal, images
.github/workflows/ GitHub Pages deploy
```
