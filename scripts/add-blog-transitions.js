/**
 * One-shot codemod: add Samyoj transition system to blog article pages.
 * Idempotent — skips files already wired.
 */
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'samyoj-homepage', 'blog');

const CSS_LINK = '  <link rel="stylesheet" href="../samyoj-transitions.css?v=2">';
const JS_TAG = '  <script src="../samyoj-transitions.js?v=2"></script>';

const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.html'));

let wired = 0;
let skipped = 0;

for (const f of files) {
  const fp = path.join(BLOG_DIR, f);
  let src = fs.readFileSync(fp, 'utf8');

  if (src.includes('samyoj-transitions')) {
    skipped++;
    continue;
  }

  // 1. CSS link before </head>
  if (!/<\/head>/i.test(src)) {
    console.error('NO </head> in ' + f);
    continue;
  }
  src = src.replace(/<\/head>/i, CSS_LINK + '\n</head>');

  // 2. JS before </body> (last occurrence)
  src = src.replace(/<\/body>(?![\s\S]*<\/body>)/i, JS_TAG + '\n</body>');

  // 3. Hero reveal classes on article title (+ subtitle when present)
  src = src.replace(
    /<h1 class="blog-article-title">/g,
    '<h1 class="blog-article-title sy-hero-anim" style="--sy-hero-i:0">'
  );
  src = src.replace(
    /<p class="blog-article-subtitle">/g,
    '<p class="blog-article-subtitle sy-hero-anim" style="--sy-hero-i:1">'
  );

  fs.writeFileSync(fp, src);
  wired++;
  console.log('wired: ' + f);
}

console.log(`\nDone. wired=${wired}, skipped(already had it)=${skipped}`);
