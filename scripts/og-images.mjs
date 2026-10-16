#!/usr/bin/env node
/**
 * OG card generator — SEO plan §4.2
 * Generates 1200x630 branded cards (≤150KB) for every page.
 * Usage: node scripts/og-images.mjs
 */
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "samyoj-homepage", "images", "og");
const BRAND = "#4B2EEB";
const BRAND_DARK = "#3A22BE";
mkdirSync(OUT, { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function cardSVG({ kicker, lines, chip }) {
  const lineEls = lines
    .map((l, i) => `<text x="72" y="${330 + i * 82}" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="800" fill="#FFFFFF">${esc(l)}</text>`)
    .join("");
  const chipEl = chip
    ? `<rect x="72" y="428" rx="16" width="${chip.length * 13 + 36}" height="44" fill="rgba(255,255,255,0.16)"/>
       <text x="${72 + 18}" y="458" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="#EDEAFF">${esc(chip)}</text>`
    : "";
  return Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND}"/><stop offset="100%" stop-color="${BRAND_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1080" cy="90" r="260" fill="rgba(255,255,255,0.06)"/>
  <circle cx="150" cy="600" r="200" fill="rgba(255,255,255,0.05)"/>
  <text x="72" y="150" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="800" fill="#FFFFFF" letter-spacing="2">SAMYOJ</text>
  <text x="73" y="196" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="500" fill="#D9D2FF">${esc(kicker)}</text>
  ${lineEls}
  ${chipEl}
  <text x="72" y="580" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="600" fill="#C9BFFF">samyoj.com</text>
</svg>`);
}

const CARDS = {
  // core pages
  "index-og": { kicker: "AI-Powered WhatsApp CRM", lines: ["Every Conversation.", "One CRM."], chip: "WhatsApp · Instagram · Facebook" },
  "features-og": { kicker: "Samyoj Platform", lines: ["Every customer conversation.", "One smarter platform."], chip: "12 features built for scale" },
  "pricing-og": { kicker: "14-day free trial", lines: ["Simple pricing for", "smart communication."], chip: "Plans from ₹999/month" },
  "industries-og": { kicker: "Samyoj for your vertical", lines: ["Turn inquiries", "into revenue."], chip: "Real Estate · Education · Healthcare · D2C" },
  "contact-og": { kicker: "Talk to our team", lines: ["Let's design your", "growth stack."], chip: "Sales & support in India" },
  "blog-og": { kicker: "Samyoj Blog", lines: ["Insights to grow with", "conversational CRM."], chip: "Guides · Playbooks · Trends" },
  // blog posts
  "what-is-whatsapp-crm-og": { kicker: "Samyoj Blog · Guide", lines: ["What is a", "WhatsApp CRM?"], chip: "The 2026 guide" },
  "whatsapp-marketing-2026-trends-og": { kicker: "Samyoj Blog · Trends", lines: ["WhatsApp marketing", "trends for 2026"], chip: "Future-proof your channel" },
  "top-7-whatsapp-business-api-providers-og": { kicker: "Samyoj Blog · Comparison", lines: ["Top 7 WhatsApp", "BSP providers"], chip: "2026 buyer's guide" },
  "how-to-set-up-click-to-whatsapp-ads-og": { kicker: "Samyoj Blog · How-to", lines: ["How to set up", "Click-to-WhatsApp ads"], chip: "Step-by-step" },
  "automating-whatsapp-broadcasts-og": { kicker: "Samyoj Blog · How-to", lines: ["Automating", "WhatsApp broadcasts"], chip: "Scale outreach safely" },
  "whatsapp-conversational-commerce-og": { kicker: "Samyoj Blog · Strategy", lines: ["Conversational", "commerce on WhatsApp"], chip: "Sell where chats happen" },
  "ai-agents-in-whatsapp-og": { kicker: "Samyoj Blog · AI", lines: ["AI agents in", "WhatsApp"], chip: "24/7 qualification" },
  "how-to-collect-payments-on-whatsapp-og": { kicker: "Samyoj Blog · How-to", lines: ["How to collect", "payments on WhatsApp"], chip: "UPI · Cards · Links" },
  "whatsapp-lead-generation-strategies-og": { kicker: "Samyoj Blog · Growth", lines: ["WhatsApp lead", "generation strategies"], chip: "From ad to deal" },
  "whatsapp-automation-examples-og": { kicker: "Samyoj Blog · Examples", lines: ["WhatsApp automation", "examples that work"], chip: "Copy these flows" },
  "ultimate-whatsapp-marketing-strategy-2026-og": { kicker: "Samyoj Blog · Strategy", lines: ["The ultimate WhatsApp", "marketing strategy 2026"], chip: "Full playbook" },
  "whatsapp-flows-guide-in-chat-forms-og": { kicker: "Samyoj Blog · Guide", lines: ["WhatsApp Flows:", "in-chat forms guide"], chip: "Zero-friction data capture" },
  "whatsapp-business-calling-voice-ai-og": { kicker: "Samyoj Blog · Voice AI", lines: ["WhatsApp Business", "calling + Voice AI"], chip: "Talk to customers" },
  "meta-whatsapp-api-pricing-2026-guide-og": { kicker: "Samyoj Blog · Pricing", lines: ["Meta WhatsApp API", "pricing guide 2026"], chip: "Every category explained" },
  "whatsapp-click-to-chat-ads-vs-landing-pages-og": { kicker: "Samyoj Blog · Comparison", lines: ["Click-to-chat ads", "vs landing pages"], chip: "Which converts better?" },
  "how-to-avoid-whatsapp-account-bans-quality-score-og": { kicker: "Samyoj Blog · Compliance", lines: ["Avoid WhatsApp", "account bans"], chip: "Quality-rating playbook" },
  "whatsapp-crm-for-shopify-ecommerce-automation-og": { kicker: "Samyoj Blog · E-commerce", lines: ["WhatsApp CRM for", "Shopify automation"], chip: "Cart to COD, automated" },
};

let done = 0, oversize = [];
for (const [name, cfg] of Object.entries(CARDS)) {
  const out = join(OUT, `${name}.png`);
  await sharp(cardSVG(cfg)).png({ compressionLevel: 9, palette: true }).toFile(out);
  const kb = (statSync(out).size / 1024).toFixed(0);
  if (kb > 150) oversize.push(`${name}: ${kb}KB`);
  done++;
  console.log(`  ${name}.png  ${kb} KB`);
}
console.log(`\nGenerated ${done} cards → ${OUT}`);
if (oversize.length) { console.error("OVERSIZE: " + oversize.join(", ")); process.exit(1); }
