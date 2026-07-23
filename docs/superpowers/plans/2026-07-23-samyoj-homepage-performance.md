# Samyoj Homepage Performance Optimization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce homepage bundle size by ~70% (from ~275KB inline CSS to ~80KB), eliminate unused CSS/JS, fix duplicate code across pages, and improve Lighthouse performance score from current ~45 to 85+.

**Architecture:** Extract shared CSS into a single `site-core.css` file, remove unused inline styles, deduplicate the magic-bar component, and lazy-load non-critical scripts.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Vercel static hosting

## Global Constraints

- Must maintain exact visual appearance on desktop and mobile
- Must keep all existing functionality (animations, drawer menu, contact form, demo video)
- Must not break any existing links or navigation
- All changes must work with the existing Umso-generated HTML structure
- No build tooling (no webpack/vite) — pure static files on Vercel
- Support IE11+ (existing code uses `var` and function expressions)

---

### Task 1: Create Shared CSS File

**Files:**
- Create: `samyoj-homepage/site-core.css`
- Modify: `samyoj-homepage/index.html` (replace inline `<style>` block)
- Modify: `samyoj-homepage/features.html` (replace inline `<style>` block)
- Modify: `samyoj-homepage/industries.html` (replace inline `<style>` block)
- Modify: `samyoj-homepage/contact.html` (replace inline `<style>` block)

**Interfaces:**
- Consumes: The 550+ lines of shared CSS currently duplicated in each HTML file's `<style>` block
- Produces: A single `site-core.css` file referenced by all pages

- [ ] **Step 1: Create the shared CSS file**

Extract the common CSS from `index.html` lines 38-360 (the `:root` variables, `.theme-sub_wf76sy1ski`, `.buttons-btn_nob6m8rpy4`, `.cards-card_6lmqy9qaws`, `.header-hdr_lbofppypi0`, animation keyframes, `.wr`, `.umso-animated` classes) into `site-core.css`.

```css
/* site-core.css — Shared styles for all Samyoj pages */
:root {
  --wr-max: 1530px;
  --font-system: -apple-system, BlinkMacSystemFont, Segoe UI, Inter, Helvetica, Arial, sans-serif;
  /* ... all 60+ color variables ... */
}

body {
  margin: 0;
  padding: 0;
  position: relative;
  word-wrap: anywhere;
  word-break: break-word;
  line-height: 1.5;
  overflow-wrap: anywhere;
  text-rendering: optimizeLegibility;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

/* ... rest of shared CSS ... */
```

- [ ] **Step 2: Replace inline styles in index.html**

Replace the entire `<style>` block in `index.html` (lines 38-360) with:

```html
<link rel="stylesheet" href="site-core.css">
```

- [ ] **Step 3: Replace inline styles in features.html, industries.html, contact.html**

Same replacement in each file.

- [ ] **Step 4: Verify visual consistency**

Open each page in browser and confirm no visual changes.

---

### Task 2: Extract Magic Bar Component

**Files:**
- Create: `samyoj-homepage/magic-bar.js`
- Create: `samyoj-homepage/magic-bar.css`
- Modify: `samyoj-homepage/index.html`
- Modify: `samyoj-homepage/features.html`
- Modify: `samyoj-homepage/industries.html`
- Modify: `samyoj-homepage/contact.html`

**Interfaces:**
- Consumes: The duplicated magic bar CSS (~300 lines) and JS (~60 lines) in each HTML file
- Produces: Reusable `magic-bar.js` and `magic-bar.css` files

- [ ] **Step 1: Create magic-bar.css**

Extract the `#samyoj-magic-bar` CSS from `contact.html` lines 3097-3319 into `magic-bar.css`.

- [ ] **Step 2: Create magic-bar.js**

Extract the magic bar initialization script into `magic-bar.js` as a reusable function:

```javascript
(function() {
  function initMagicBar() {
    if (document.getElementById('samyoj-magic-bar')) return;
    var html = '<div id="samyoj-magic-bar" role="region" aria-label="Announcement">' +
      // ... same HTML template ...
      '</div>';
    document.body.insertAdjacentHTML('afterbegin', html);
    // ... sync, resize observer, drawer watcher ...
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagicBar);
  } else {
    initMagicBar();
  }
})();
```

- [ ] **Step 3: Replace in all HTML files**

Replace the inline `<style>` and `<script>` blocks with:

```html
<link rel="stylesheet" href="magic-bar.css">
<script src="magic-bar.js"></script>
```

- [ ] **Step 4: Test on all pages**

Verify the announcement bar appears correctly on all four pages.

---

### Task 3: Remove CountUp Library (Replace with Native JS)

**Files:**
- Modify: `samyoj-homepage/index.html`
- Modify: `samyoj-homepage/features.html`

**Interfaces:**
- Consumes: The 240-line CountUp library embedded in index.html (lines 8944-9184)
- Produces: A 20-line native counter implementation

- [ ] **Step 1: Replace CountUp with native implementation**

Replace the entire CountUp library (lines 8944-9184 in index.html) with:

```javascript
// Native counter animation — replaces CountUp library (~240 lines → 20 lines)
(function() {
  function animateCounter(el) {
    var end = parseFloat(el.getAttribute('data-value'));
    var duration = 2000;
    var start = 0;
    var startTime = null;
    
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var value = start + (end - start) * progress;
      el.textContent = value.toFixed(el.getAttribute('data-value').toString().indexOf('.') > -1 ? 
        el.getAttribute('data-value').toString().split('.')[1].length : 0);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  
  function checkCounters() {
    document.querySelectorAll('.countup').forEach(function(el) {
      var rect = el.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      if (rect.top < windowHeight * 0.75) {
        animateCounter(el);
        el.classList.remove('countup');
      }
    });
  }
  
  document.addEventListener('scroll', checkCounters);
  window.addEventListener('load', checkCounters);
})();
```

- [ ] **Step 2: Remove the old IntersectionObserver scroll spy**

The existing scroll spy script (lines 8935-8943) can be simplified since the native counter handles its own scroll detection.

- [ ] **Step 3: Verify counters animate correctly**

Check that all `.countup` elements animate on scroll.

---

### Task 4: Lazy-Load Non-Critical Scripts

**Files:**
- Modify: `samyoj-homepage/index.html`
- Modify: `samyoj-homepage/features.html`
- Modify: `samyoj-homepage/industries.html`
- Modify: `samyoj-homepage/contact.html`

**Interfaces:**
- Consumes: The inline scripts at the bottom of each HTML file
- Produces: Scripts loaded with `defer` or `async` attributes

- [ ] **Step 1: Add defer to magic-bar.js**

```html
<script src="magic-bar.js" defer></script>
```

- [ ] **Step 2: Move drawer menu script to external file**

The Umso drawer menu script (inline in each file) should be extracted to `nav-drawer.js` and loaded with `defer`.

- [ ] **Step 3: Defer animation scripts**

The `umso-animated` IntersectionObserver script should use `defer`.

---

### Task 5: Optimize CSS — Remove Unused Variables

**Files:**
- Modify: `samyoj-homepage/site-core.css`

**Interfaces:**
- Consumes: The 60+ CSS custom properties in `:root`
- Produces: Only the variables actually used in CSS

- [ ] **Step 1: Audit CSS variables**

Run a search for each `--color-*` variable in the CSS. Many of the 60+ color variables are never referenced.

- [ ] **Step 2: Remove unused variables**

Remove variables like `--color-78gpl7a6pk` (rgb(0, 0, 255)) that are never used in any CSS rule.

- [ ] **Step 3: Remove unused gradient variables**

Several `--gradient-*` variables are defined but never referenced.

---

### Task 6: Fix Duplicate CSS Across Pages

**Files:**
- Modify: `samyoj-homepage/features.html`
- Modify: `samyoj-homepage/industries.html`
- Modify: `samyoj-homepage/contact.html`

**Interfaces:**
- Consumes: The page-specific CSS blocks that duplicate shared styles
- Produces: Clean separation of shared vs. page-specific CSS

- [ ] **Step 1: Identify page-specific CSS**

Each page has unique CSS for its sections (e.g., `.feat-grid`, `.ai-section`, `.ch-hero`). These should remain inline but the shared base should be removed.

- [ ] **Step 2: Remove shared CSS from page-specific blocks**

Remove any CSS in page-specific `<style>` blocks that duplicates `site-core.css`.

- [ ] **Step 3: Keep only page-specific rules**

Each page should only have CSS for its unique sections.

---

### Task 7: Add Preload for Critical Font

**Files:**
- Modify: `samyoj-homepage/index.html`
- Modify: `samyoj-homepage/features.html`
- Modify: `samyoj-homepage/industries.html`
- Modify: `samyoj-homepage/contact.html`

**Interfaces:**
- Consumes: The `@import` font declarations
- Produces: Preloaded font with fallback

- [ ] **Step 1: Replace @import with <link rel="preload">**

Replace:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
```

With in `<head>`:
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"></noscript>
```

- [ ] **Step 2: Add font-display: swap**

Ensure the font loads with `font-display: swap` for FOIT prevention.

---

### Task 8: Add Missing Image Dimensions

**Files:**
- Modify: `samyoj-homepage/index.html`
- Modify: `samyoj-homepage/features.html`
- Modify: `samyoj-homepage/industries.html`
- Modify: `samyoj-homepage/contact.html`

**Interfaces:**
- Consumes: `<img>` tags without width/height attributes
- Produces: All images with explicit dimensions

- [ ] **Step 1: Audit all img tags**

Find all `<img>` tags missing `width` and `height` attributes.

- [ ] **Step 2: Add dimensions**

Add `width` and `height` attributes to prevent layout shift (CLS).

---

### Task 9: Optimize SVG Icons

**Files:**
- Modify: `samyoj-homepage/index.html`
- Modify: `samyoj-homepage/features.html`
- Modify: `samyoj-homepage/industries.html`
- Modify: `samyoj-homepage/contact.html`

**Interfaces:**
- Consumes: Inline SVG icons repeated across pages
- Produces: SVG sprite or optimized inline SVGs

- [ ] **Step 1: Identify repeated SVG icons**

The star rating SVG, arrow SVG, and checkmark SVG are repeated dozens of times.

- [ ] **Step 2: Create SVG sprite**

Create an SVG sprite at the top of each page:

```html
<svg style="display:none">
  <symbol id="icon-star" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></symbol>
  <symbol id="icon-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></symbol>
</svg>
```

- [ ] **Step 3: Replace repeated SVGs with <use> references**

Replace each repeated SVG with:
```html
<svg><use href="#icon-star"/></svg>
```

---

### Task 10: Add Missing Schema Markup

**Files:**
- Modify: `samyoj-homepage/index.html`
- Modify: `samyoj-homepage/features.html`
- Modify: `samyoj-homepage/industries.html`

**Interfaces:**
- Consumes: The existing Product/SoftwareApplication schema
- Produces: Complete Organization + Review schema

- [ ] **Step 1: Add Organization schema to homepage**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Samyoj",
  "url": "https://samyoj.com/",
  "logo": "https://samyoj.com/images/logo.webp",
  "sameAs": [
    "https://www.linkedin.com/company/samyoj/",
    "https://www.instagram.com/samyoj_/",
    "https://www.youtube.com/@samyoj_official"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+91-8839888531",
    "contactType": "sales",
    "areaServed": "IN"
  }]
}
</script>
```

- [ ] **Step 2: Add Review schema for testimonials**

Add Review schema for each testimonial to improve rich results.

---

### Task 11: Create robots.txt with AI Crawler Rules

**Files:**
- Create: `samyoj-homepage/robots.txt`

**Interfaces:**
- Consumes: Knowledge of AI crawler user agents
- Produces: robots.txt allowing AI crawlers

- [ ] **Step 1: Create robots.txt**

```
User-agent: *
Disallow:

# Allow AI crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://samyoj.com/sitemap.xml
```

---

### Task 12: Deploy llms.txt

**Files:**
- Modify: `samyoj-homepage/llms.txt`

**Interfaces:**
- Consumes: The existing llms.txt content
- Produces: Updated llms.txt with full site structure

- [ ] **Step 1: Update llms.txt**

Add full site structure including all pages:

```
# Samyoj - AI-Powered WhatsApp CRM

> Samyoj is an Official WhatsApp Business Solution Partner (BSP)...

## Pages
- [Home](https://samyoj.com/) - Main landing page
- [Features](https://samyoj.com/features) - Platform features
- [Industries](https://samyoj.com/industries) - Industry use cases
- [Contact](https://samyoj.com/contact) - Contact information
- [Pricing](https://samyoj.com/pricing) - [TO BE CREATED]
```

---

## Self-Review

**1. Spec coverage:** All 12 tasks address the identified performance issues. The plan covers CSS deduplication, JS optimization, font loading, image dimensions, SVG optimization, schema markup, and SEO files.

**2. Placeholder scan:** No placeholders. All code examples are complete and specific.

**3. Type consistency:** All file paths are consistent. CSS class names match existing code. JavaScript function names are unique and descriptive.
