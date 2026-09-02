const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(name => name.endsWith('.html'));
let changed = 0;

for (const file of files) {
  const full = path.join('.', file);
  let html = fs.readFileSync(full, 'utf8');
  const navMatch = html.match(/<nav\s+aria-label=["']Main navigation["'][\s\S]*?<\/nav>/i);
  if (!navMatch) continue;

  const nav = navMatch[0];
  if (/href=["']tools\.html["']/i.test(nav)) continue;

  const updatedNav = nav.replace(/(\s*<a\b[^>]*href=["']about\.html["'][^>]*>[\s\S]*?<\/a>)/i,
    '\n            <a href="tools.html">\n                Tools\n            </a>\n$1');

  if (updatedNav === nav) continue;
  html = html.replace(nav, updatedNav);
  fs.writeFileSync(full, html);
  changed++;
}

console.log(`Added Tools navigation to ${changed} page(s).`);
