/* CSS brace-balance checker for samyoj-index-main.css */
const fs = require('fs');
const file = process.argv[2] || 'd:/webstarts/samyoj-website-0.2/samyoj-homepage/samyoj-index-main.css';
const src = fs.readFileSync(file, 'utf8');
const lines = src.split(/\r?\n/);

let inComment = false;
const stack = [];
const opens = [];

lines.forEach((line, i) => {
  const ln = i + 1;
  let out = '';
  for (let j = 0; j < line.length; j++) {
    if (!inComment && line[j] === '/' && line[j + 1] === '*') { inComment = true; j++; continue; }
    if (inComment && line[j] === '*' && line[j + 1] === '/') { inComment = false; j++; continue; }
    if (!inComment) out += line[j];
  }
  let l = out;
  // strip quoted strings (simple, no escapes across lines)
  l = l.replace(/"[^"\n]*"/g, '');
  l = l.replace(/'[^'\n]*'/g, '');

  for (const ch of l) {
    if (ch === '{') {
      stack.push(ln);
      opens.push(ln);
    } else if (ch === '}') {
      stack.pop();
    }
  }
  // record when we fall back below each depth? simpler: track depth at each line end
});

console.log('final unclosed depth:', stack.length);
console.log('first unclosed { opened at lines:', stack.slice(0, 15).join(', '));

// Also report lines whose pre-strip text contains @media and their balancing
let depth = 0;
const mediaStack = [];
const mediaReport = [];
lines.forEach((line, i) => {
  let l = line.replace(/\/\*[\s\S]*?\*\//g, '');
  l = l.replace(/"[^"\n]*"/g, '').replace(/'[^'\n]*'/g, '');
  if (/@media/.test(l)) mediaStack.push({ line: i + 1, depth });
  for (const ch of l) {
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (mediaStack.length && depth === mediaStack[mediaStack.length - 1].depth) {
        const m = mediaStack.pop();
        mediaReport.push(m);
      }
    }
  }
});
console.log('total depth end:', depth);
console.log('media blocks found:', mediaReport.length);
