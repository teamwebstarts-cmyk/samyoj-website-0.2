# Site Overview — samyoj-website-0.2

This is the content map for the curated static mirror of the AiSensy marketing website.
It tells you **what the site is, what sections exist, and what content lives in each** — so you can rewrite it with your own content.

## What is this site?
A marketing/landing site for **AiSensy**, an AI-powered **WhatsApp Marketing & Engagement Platform** built on the official WhatsApp Business API. It targets businesses that want to broadcast messages, run Click-to-WhatsApp ads, build chatbots, collect payments, and offer multi-agent live chat — all inside WhatsApp.

## Main sections (and where their content lives)
| Section | Folder / File in mirror | Content MD file |
|---|---|---|
| Homepage | `aisensy.com/index.html` | `HOME.md` |
| Pricing | `aisensy.com/pricing.html`, `pricing/` | `sections/pricing.md` |
| Features | `aisensy.com/features/`, 22 pages | `sections/features.md` |
| Industries | `aisensy.com/industries/`, 17 pages | `sections/industries.md` |
| Integrations | `aisensy.com/integrations/`, 6 pages | `sections/integrations.md` |
| Case Studies | `aisensy.com/case-studies/`, 31 pages | `sections/case-studies.md` |
| Tutorials | `aisensy.com/tutorials/`, 100 pages | `sections/tutorials.md` |
| Product/Tools | `aisensy.com/whatsapp-business-api.html`, `whatsapp-catalogues.html`, template library | `sections/products.md` |
| Legal | `tos.html`, `privacy-policy.html`, `refund-policy.html` | `sections/legal.md` |
| Portuguese mirror | `aisensy.com/pt/` (full, 176 pages) | (translated EN equivalent) |

## How to use these MD files
1. Each `sections/*.md` describes the content of that section (headings + key copy).
2. **Your new content goes into these MD files.** Edit the text, keep the structure.
3. Once you've written your content, tell me and I'll convert the MD back into the HTML pages (or a fresh static site).

## Global page parts (present on every page)
- Top banner (promo strip)
- Main nav (Product / Features / Industries / Resources / Integrations / Partner + language switcher)
- Footer (Platform, WhatsApp Marketing, Resources, FREE Tools, Legal, Contact, copyright)
- CTA buttons: "Start for FREE", "Login", "Book a Demo"

## Notes
- Pages use inline CSS (no separate css/js folders). Images are local copies under `umsousercontent.com/`.
- Google Fonts load from the network.
- The mirror is a static snapshot; forms/buttons that call `app.aisensy.com` are non-functional offline.
