/**
 * Samyoj Analytics (GA4 via gtag.js)
 * ----------------------------------
 * Lightweight wrapper around Google's gtag snippet.
 * - Loads asynchronously; never blocks rendering.
 * - No-op if MEASUREMENT_ID is a placeholder, so local dev stays clean.
 *
 * Setup: replace `G-XXXXXXXXXX` below with your GA4 Measurement ID
 * (Google Analytics → Admin → Data Streams → Web → Measurement ID),
 * then set window.dataLayer-based consent defaults if needed.
 *
 * Included by every page: <script defer src="/analytics.js"></script>
 */
(function () {
  var MEASUREMENT_ID = "G-T8L8R0JP32";
  var PLACEHOLDER = /^G-XXXXXXXXXX$/.test(MEASUREMENT_ID);
  if (PLACEHOLDER) return; // not configured yet — do nothing

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
  document.head.appendChild(s);

  // Basic page tracking; SPA/hashes not used on this static site.
  gtag("config", MEASUREMENT_ID, { anonymize_ip: true });

  document.addEventListener("click", function (event) {
    var el = event.target && event.target.closest ? event.target.closest("a[href], button") : null;
    if (!el) return;
    var href = el.tagName === "A" ? (el.getAttribute("href") || "") : "";
    var label = (el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    var name = "";
    if (/calendly\.com/i.test(href)) name = "cta_book_demo";
    else if (/app\.samyoj\.com/i.test(href)) name = "cta_start_trial";
    else if (/(?:^|\/)pricing(?:\.html)?(?:$|[?#])/i.test(href)) name = "cta_pricing";
    else if (/(?:^|\/)contact(?:\.html)?(?:$|[?#])/i.test(href)) name = "cta_contact";
    else if (el.tagName === "BUTTON" && /start for free|start free|free trial|start 14-day/.test(label)) name = "cta_start_trial";
    if (!name) return;
    gtag("event", name, {
      link_url: el.tagName === "A" ? el.href : "https://app.samyoj.com/",
      page_path: location.pathname,
      link_text: label.slice(0, 80)
    });
  }, true);
})();
