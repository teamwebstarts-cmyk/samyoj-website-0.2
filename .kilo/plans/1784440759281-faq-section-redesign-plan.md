# Redesign FAQ ("Frequently Asked Questions") Section

## Context
The homepage (`index.html` and its mirror `aisensy.com/index.html`) has a FAQ section (footer se pehle, ~line 6987) built with Umso's **default accordion** (`umso-accordion _ffe3dff7`). It looks inconsistent with the rest of the page, which uses our custom "ADC" pattern (white cards, `#e2e8f0` borders, `20px` radius, green `#00b853` accent, Inter font, titles `#0f172a`). Goal: redesign the FAQ into a **simple accordion** that matches our custom UI, keeping it minimal and responsive. Keep all 7 existing Q&A (content + the `FAQPage` JSON-LD schema must stay identical for SEO).

### Current FAQ questions (7, must be preserved verbatim)
1. What does Samyoj do?
2. Is Samyoj an Official WhatsApp Marketing Software?
3. Does Samyoj offer a FREE account?
4. Is there any WhatsApp Business API procurement fee for a brand/business?
5. How do you handle Customer Support?
6. What is the Cost of Broadcasting messages?
7. How many messages can I Broadcast in a day to my customers?

## Design decisions
- **Layout:** Vertical accordion (click-to-expand, one open at a time or independent toggles — independent is simpler). Keep it a single column, max-width ~760px, centered.
- **Per item:** White card, `1px solid #e2e8f0`, `border-radius: 12px`, subtle `box-shadow`. Question row = `font-weight:700; color:#0f172a; font-size:18px`, with a `+`/`−` (or chevron) toggle on the right in green `#00b853`. Answer = `color:#4b5563; font-size:16px; line-height:1.6`.
- **Accent:** Green `#00b853` for the toggle icon and hover state; light green tint `#eafbf0` background on hover/active optional.
- **Section heading:** Reuse `.custom-section-title` style ("Frequently Asked Questions" + optional green highlight) and `.custom-section-center` wrapper for consistency with other custom sections.
- **Responsive:** Already mobile-friendly (single column). Add `@media (max-width:640px)` to drop question font to ~16px and padding to keep it compact — mirror the pattern used in the hero media queries.
- **Keep simple:** No new JS library. Use a tiny vanilla JS toggle (or `<details>/<summary>` for zero-JS). Recommend `<details>/<summary>` for maximum simplicity and accessibility.

## Implementation steps
1. Locate the FAQ `<section class="_83203361 ...">` block in `index.html` (near line 6987) and the mirror in `aisensy.com/index.html`.
2. Replace the Umso accordion markup with a custom container:
   - `<section id="custom-faq-section">` wrapping `.custom-section-center` > `<h2 class="custom-section-title">Frequently Asked <span class="highlight-green">Questions</span></h2>` > `.custom-faq-list`.
   - Each item: `<details class="custom-faq-item"><summary class="custom-faq-q">Question text <span class="custom-faq-icon">+</span></summary><div class="custom-faq-a"><p>Answer text</p></div></details>`.
   - Paste all 7 Q&A verbatim from current markup/JSON-LD.
3. Add CSS (inside the existing `<style>` block, near the other `.custom-*` rules ~line 3864+):
   - `.custom-faq-section { background:#fff; padding:80px 0; font-family:'Inter',... }`
   - `.custom-faq-list { max-width:760px; margin:0 auto; display:flex; flex-direction:column; gap:14px; }`
   - `.custom-faq-item { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:18px 22px; box-shadow:0 2px 10px rgba(0,0,0,0.02); }`
   - `.custom-faq-q { display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; font-size:18px; font-weight:700; color:#0f172a; list-style:none; }`
   - `.custom-faq-q::-webkit-details-marker { display:none; }`
   - `.custom-faq-icon { color:#00b853; font-size:22px; font-weight:700; transition:transform .2s; flex-shrink:0; }`
   - `.custom-faq-item[open] .custom-faq-icon { transform:rotate(45deg); }` (so `+` becomes `×`)
   - `.custom-faq-a { color:#4b5563; font-size:16px; line-height:1.6; margin-top:12px; }`
   - Mobile `@media (max-width:640px)`: `.custom-faq-q{font-size:16px} .custom-faq-item{padding:14px 16px}`.
4. **Preserve SEO:** Keep the existing `FAQPage` JSON-LD `<script type="application/ld+json">` (lines ~6988-7049) unchanged and inside/near the section.
5. Apply identical changes to BOTH `index.html` and `aisensy.com/index.html`.

## Risks
- Removing Umso accordion classes may leave orphan CSS/JS hooks (`_ffe3dff7`, `accordion-trigger`, etc.) — harmless if unused; do not delete global Umso CSS.
- Must keep exact question/answer text + JSON-LD so search rankings and existing content are unaffected.

## Validation
- Serve locally (`python3 -m http.server 8080`) and open `http://localhost:8080/index.html`.
- Verify: FAQ renders as white cards, green toggle icons, click expands/collapses, only the clicked item toggles.
- Resize to mobile width — layout stays single-column and readable.
- View page source / run an SEO check: `FAQPage` JSON-LD still present and valid.
- Confirm `aisensy.com/index.html` shows identical result.
