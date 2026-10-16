/**
 * One-shot codemod: add Samyoj transition system to legal pages.
 * Idempotent — skips files already wired.
 */
const fs = require('fs');
const path = require('path');

const LEGAL_DIR = path.join(__dirname, '..', 'samyoj-homepage', 'legal');

const CSS_LINK = '<link rel="stylesheet" href="../samyoj-transitions.css?v=2">';
const JS_TAG = '<script src="../samyoj-transitions.js?v=2"></script>';

const files = fs.readdirSync(LEGAL_DIR).filter((f) => f.endsWith('.html'));

let wired = 0;
let skipped = 0;

for (const f of files) {
  const fp = path.join(LEGAL_DIR, f);
  let src = fs.readFileSync(fp, 'utf8');

  if (src.includes('samyoj-transitions')) {
    skipped++;
    continue;
  }

  if (!/<\/head>/i.test(src) || !/<\/body>/i.test(src)) {
    console.error('NO </head> or </body> in ' + f);
    continue;
  }

  // 1. CSS link before </head>
  src = src.replace(/<\/head>/i, CSS_LINK + '</head>');

  // 2. JS before </body>
  src = src.replace(/<\/body>(?![\s\S]*<\/body>)/i, JS_TAG + '</body>');

  // 3. Hero reveal on the legal <h1>
  src = src.replace(/(<main><p class="tag">Legal<\/p>)<h1>/i, '$1<h1 class="sy-hero-anim" style="--sy-hero-i:0">');

  fs.writeFileSync(fp, src);
  wired++;
  console.log('wired: ' + f);
}

console.log(`\nDone. wired=${wired}, skipped(already had it)=${skipped}`);
