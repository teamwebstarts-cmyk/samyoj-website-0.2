/* Report the enclosing @media condition for given line numbers */
const fs = require('fs');
const file = 'd:/webstarts/samyoj-website-0.2/samyoj-homepage/samyoj-index-main.css';
const targets = (process.argv[2] || '5093,5140,5128').split(',').map(Number);
const src = fs.readFileSync(file, 'utf8');
const lines = src.split(/\r?\n/);

let inComment = false;
const stack = [];
const results = [];

lines.forEach((line, i) => {
  const ln = i + 1;
  let out = '';
  for (let j = 0; j < line.length; j++) {
    if (!inComment && line[j] === '/' && line[j + 1] === '*') { inComment = true; j++; continue; }
    if (inComment && line[j] === '*' && line[j + 1] === '/') { inComment = false; j++; continue; }
    if (!inComment) out += line[j];
  }
  let l = out.replace(/"[^"\n]*"/g, '').replace(/'[^'\n]*'/g, '');

  // If one of our target lines, dump current stack (conditions opened but not yet applying their '{'? handle below)
  const isTarget = targets.includes(ln);

  // Process chars, capturing media header text before '{'
  let pendingHeader = '';
  for (const ch of l) {
    if (ch === '{') {
      stack.push({ header: pendingHeader.trim().slice(0, 70), line: ln });
      pendingHeader = '';
    } else if (ch === '}') {
      stack.pop();
    } else {
      pendingHeader += ch;
      if (pendingHeader.length > 400) pendingHeader = pendingHeader.slice(-400);
    }
  }
  if (isTarget) {
    results.push({
      line: ln,
      depth: stack.length,
      stack: stack.map(s => ({ at: s.line, header: s.header }))
    });
  }
});

for (const r of results) {
  console.log('=== line', r.line, '| depth', r.depth);
  for (const s of r.stack) console.log('   opened@' + s.at, '::', s.header || '(no header)');
}
