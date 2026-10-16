// Browser sweep via CDP is interactive; instead this exports a compact
// per-page contract check the browser tooling can run page-by-page.
// (kept for reference; actual sweep done interactively)
export const VIEWPORTS = [1440, 1280, 768, 390];
export const PAGES = ["/", "/features", "/pricing", "/industries", "/contact", "/blog"];
console.log("Use interactive sweep; viewports:", VIEWPORTS, "pages:", PAGES);
