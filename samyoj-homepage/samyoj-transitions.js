/**
 * Samyoj Smooth Page Navigation & Transition Controller
 * Pure vanilla JavaScript - zero external dependencies
 */
(function () {
  'use strict';

  // Check if reduced motion is preferred by the user
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Determine if an anchor link is an internal HTML page navigation
  function isInternalNavigation(anchor) {
    if (!anchor || anchor.tagName !== 'A') return false;

    var href = anchor.getAttribute('href');
    if (!href) return false;

    // Ignore javascript:, mailto:, tel:, # only
    if (href === '#' || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return false;
    }

    // Ignore explicit download attribute
    if (anchor.hasAttribute('download')) return false;

    // Ignore links opening in new tab/window
    if (anchor.target && anchor.target !== '_self') return false;

    // Parse URL safely
    var url;
    try {
      url = new URL(anchor.href, window.location.href);
    } catch (e) {
      return false;
    }

    // Must be HTTP / HTTPS protocol
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;

    // Must be same origin (domain & port)
    if (url.origin !== window.location.origin) return false;

    // Normalize paths to compare
    var currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
    var targetPath = url.pathname.replace(/\/index\.html$/, '/');

    // If it points to the exact same page path and search query
    if (currentPath === targetPath && url.search === window.location.search) {
      // It's an in-page anchor link (e.g. #faq or #demo) -> do NOT intercept
      return false;
    }

    // Exclude static assets/downloads (images, PDFs, documents, archives)
    var ext = url.pathname.split('.').pop().toLowerCase();
    var nonHtmlExts = ['pdf', 'zip', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'mp4', 'webm', 'xml', 'txt', 'json'];
    if (url.pathname.includes('.') && nonHtmlExts.indexOf(ext) !== -1) {
      return false;
    }

    return true;
  }

  // Preload / prefetch destination page for instant loading
  var prefetchedUrls = new Set();
  function prefetchPage(urlStr) {
    if (prefetchedUrls.has(urlStr) || prefersReducedMotion()) return;
    try {
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = urlStr;
      link.as = 'document';
      document.head.appendChild(link);
      prefetchedUrls.add(urlStr);
    } catch (e) {}
  }

  // Listen for pointerenter / touchstart to warm up cache ahead of click
  document.addEventListener('pointerenter', function (e) {
    var anchor = e.target && e.target.closest ? e.target.closest('a') : null;
    if (anchor && isInternalNavigation(anchor)) {
      prefetchPage(anchor.href);
    }
  }, true);

  document.addEventListener('touchstart', function (e) {
    var anchor = e.target && e.target.closest ? e.target.closest('a') : null;
    if (anchor && isInternalNavigation(anchor)) {
      prefetchPage(anchor.href);
    }
  }, { passive: true, capture: true });

  // Navigation interceptor
  var isNavigating = false;

  document.addEventListener('click', function (e) {
    // Ignore defaultPrevented, non-left clicks, or modifier keys (Ctrl, Cmd, Shift, Alt)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    var anchor = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!anchor || !isInternalNavigation(anchor)) {
      return;
    }

    var targetUrl = anchor.href;

    // If reduced motion is requested, navigate immediately without animation
    if (prefersReducedMotion()) {
      window.location.href = targetUrl;
      return;
    }

    // Prevent immediate jump
    e.preventDefault();

    if (isNavigating) return;
    isNavigating = true;

    // Close any open mobile drawer smoothly
    var mobileDrawer = document.getElementById('985hzqm8a3-drawer');
    if (mobileDrawer && !mobileDrawer.classList.contains('um-hidden')) {
      mobileDrawer.classList.add('um-hidden');
    }

    // Trigger smooth exit transition immediately
    document.body.classList.add('sy-page-exiting');

    // Navigate smoothly at completion of exit animation (200ms)
    setTimeout(function () {
      window.location.href = targetUrl;
    }, 200);

    // Safety fallback: if navigation is cancelled or delayed, restore body visibility
    setTimeout(function () {
      if (document.body.classList.contains('sy-page-exiting')) {
        document.body.classList.remove('sy-page-exiting');
        isNavigating = false;
      }
    }, 4000);
  }, false);

  // Restore page visibility on browser Back / Forward (bfcache pageshow event)
  window.addEventListener('pageshow', function () {
    isNavigating = false;
    document.body.classList.remove('sy-page-exiting');
  });

  // Also clean up on pagehide so cached state is always clean
  window.addEventListener('pagehide', function () {
    isNavigating = false;
    document.body.classList.remove('sy-page-exiting');
  });
})();
