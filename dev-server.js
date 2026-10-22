const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
// Bind to process.env.PORT when present (PaaS requirement), fallback 8889 for local use.
const PORT = Number(process.env.PORT) || 8889;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

// Clean-URL map (mirrors vercel.json / serve.json rewrites)
const REWRITES = {
  '/features': '/features.html',
  '/pricing': '/pricing.html',
  '/industries': '/industries.html',
  '/contact': '/contact.html',
  '/blog': '/blog.html',
  '/blog/': '/blog.html',
  '/legal/privacy-policy': '/legal/privacy-policy.html',
  '/legal/terms-and-conditions': '/legal/terms-and-conditions.html',
  '/legal/cookie-policy': '/legal/cookie-policy.html',
  '/legal/refund-cancellation-policy': '/legal/refund-cancellation-policy.html',
  '/legal/acceptable-use-policy': '/legal/acceptable-use-policy.html',
};

// 301s (mirrors vercel.json redirects)
const REDIRECTS = {
  '/privacy-policy': '/legal/privacy-policy',
  '/terms-and-conditions': '/legal/terms-and-conditions',
  '/cookie-policy': '/legal/cookie-policy',
  '/refund-cancellation-policy': '/legal/refund-cancellation-policy',
  '/acceptable-use-policy': '/legal/acceptable-use-policy',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);

  if (REDIRECTS[urlPath]) {
    res.statusCode = 301;
    res.setHeader('Location', REDIRECTS[urlPath]);
    res.end();
    return;
  }

  if (urlPath === '/') urlPath = '/samyoj-homepage/index.html';
  if (REWRITES[urlPath]) urlPath = '/samyoj-homepage' + REWRITES[urlPath];

  const filePath = path.join(ROOT, urlPath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      fs.readFile(path.join(ROOT, 'samyoj-homepage', '404.html'), (e2, page) => {
        res.end(e2 ? '404 Not Found' : page);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log(`Server running at http://localhost:${PORT}/`));
