# Soft Scroll-Reveal Animations for Landing Page

## Context
The Samyoj landing page (`index.html` + mirror `aisensy.com/index.html`) currently shows all **custom sections instantly** as you scroll — no scroll-triggered motion. Some Umso-native blocks ("Why Samyoj Runs on WhatsApp", footer) already use Umso's load-time `umso-animated` reveals, but the custom-built sections (hero, stats banner, brand-video block, broadcast, meta-features, FAQ, etc.) do not.

Goal: add **very soft, professional scroll-reveal** (subtle fade + small upward slide) to every custom section so the page feels polished as the user scrolls. Decided scope: **all custom sections except the hero** (hero is above the fold and must appear instantly). Already-animated Umso blocks are left untouched.

### Findings from codebase audit
- No `IntersectionObserver` exists today → reveals are load-time CSS only.
- `prefers-reduced-motion` is already respected in CSS (lines 246, 3211) → must continue to honor it.
- A `SmoothScroll` library is bundled but handles anchor jumps, NOT reveals — out of scope unless we also want smooth in-page anchor scrolling (optional, see Open Questions).
- Custom sections to animate (by id/class):
  - `#custom-stats-banner` (`.custom-stats-banner`)
  - `#custom-brand-video-section` (`.custom-section-center` wrapper → contains `.custom-logos-card`, `.custom-grey-box`, `.custom-bottom-banner`)
  - `#custom-broadcast-section`
  - `#custom-meta-features-section` (`.card-*` cards inside)
  - `#custom-faq-section`
  - Plus any other custom `section`/`div` custom blocks (setup steps, integrations, bottom CTA) — animate their top-level wrapper.
- Keep Umso `umso-animated` blocks (Why Samyoj, footer) as-is.

## Recommended approach (research-based best practice)
- **No new dependency.** Use a tiny vanilla **`IntersectionObserver`** + CSS transitions. This is the modern, performant, accessible standard (better than scroll-event listeners which cause layout thrash).
- **Style:** very soft — `opacity 0 → 1` and `translateY(24px) → 0`, `transition: opacity .7s ease, transform .7s cubic-bezier(.22,.61,.36,1)` (ease-out). Trigger once (`observer.unobserve` after first reveal) so it doesn't replay and feel jittery.
- **Stagger:** within a section, animate direct child blocks with a small incremental `transition-delay` (e.g. +80–100ms each) for a refined cascade — but keep it subtle.
- **Threshold:** reveal when ~12–15% of the element is visible (`threshold: 0.12`) with a `rootMargin: '0px 0px -8% 0px'` so it triggers slightly before fully in view.
- **Accessibility:** wrap everything in `@media (prefers-reduced-motion: no-preference)` so reduced-motion users see content immediately (no transform/opacity animation). JS also no-ops when reduced motion is set. Also: content must be visible if JS fails (start visible, add a `.js-reveal` class to `<html>` via inline script in `<head>` so CSS only hides when JS is active — prevents "blank page if JS breaks").

## Implementation steps
1. **Head guard (both files):** Add an inline script as early as possible in `<head>`:
   `document.documentElement.classList.add('js-reveal')` — so reveal-hiding CSS only applies when JS runs.
2. **CSS (both files, inside existing `<style>` near other `.custom-*` rules):**
   ```css
   @media (prefers-reduced-motion: no-preference) {
     html.js-reveal [data-reveal] {
       opacity: 0;
       transform: translateY(24px);
       transition: opacity .7s ease, transform .7s cubic-bezier(.22,.61,.36,1);
       will-change: opacity, transform;
     }
     html.js-reveal [data-reveal].is-visible {
       opacity: 1;
       transform: none;
     }
   }
   ```
   Optional stagger helper: `html.js-reveal [data-reveal][data-reveal-stagger] > * { ... transition-delay via nth-child }` OR set `style="transition-delay"` per child in JS.
3. **Markup:** Add `data-reveal` attribute to each target custom section wrapper, and `data-reveal` (or a stagger container) to inner cards where a cascade is wanted (e.g. meta-feature cards, FAQ items, stats). Only add to custom sections (not Umso blocks).
   - Hero: **no** `data-reveal` (instant).
4. **JS (both files, before `</body>` or in existing script block):**
   ```js
   (function(){
     var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
     var els = document.querySelectorAll('[data-reveal]');
     if (reduce || !('IntersectionObserver' in window) || !els.length) {
       els.forEach(function(e){ e.classList.add('is-visible'); });
       return;
     }
     var io = new IntersectionObserver(function(entries){
       entries.forEach(function(en){
         if (en.isIntersecting) {
           en.target.classList.add('is-visible');
           io.unobserve(en.target);
         }
       });
     }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
     els.forEach(function(e){ io.observe(e); });
   })();
   ```
5. Apply identical changes to **`index.html`** and **`aisensy.com/index.html`** (keep them in sync, as done for all prior edits).

## Risks
- **Blank content if JS errors:** mitigated by the `js-reveal` head guard (CSS hides only when JS active; if the observer script throws, a tiny fallback `try/catch` adds `.is-visible` to all).
- **Double animation conflict:** Umso `umso-animated` blocks already reveal on load — we do NOT add `data-reveal` to them, so no conflict.
- **Layout shift:** `translateY` only (no width/height change) → no reflow/CLS.
- **Reduced motion:** explicitly skipped via media query + JS check.
- **SEO/Content:** reveal is pure visual; text stays in DOM (good for crawlers/screen readers).

## Validation
- Serve locally (`python3 -m http.server 8080`) and open `http://localhost:8080/index.html`.
- Scroll slowly: each custom section fades + slides up softly once, does not replay.
- Hero appears instantly (no animation).
- Resize to mobile width: reveals still work, no horizontal scroll, no layout break.
- Toggle OS "reduce motion" (or DevTools rendering emulation): sections show immediately, no transform.
- Disable JS (or break the script): all content remains visible (no blank page).
- Confirm `aisensy.com/index.html` mirrors the behavior.

## Open questions (optional, out of scope unless requested)
- Also enable **smooth in-page anchor scrolling** using the already-bundled `SmoothScroll` lib (currently uninitialized) for nav/CTA links — separate concern from reveals.
- Whether the FAQ `<details>` items themselves should stagger-reveal (more motion); current plan reveals the whole FAQ block as one unit.
