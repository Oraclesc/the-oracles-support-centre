// Site-wide navigation and internal-link audit. Runs before the Pages artifact is uploaded.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const htmlFiles = fs.readdirSync(root).filter(name => name.endsWith(".html") && name !== "welcome.html");
const navItems = [
  ["index.html", "Home"], ["reading.html", "Free Reading"], ["cards.html", "Tarot Cards"],
  ["guides.html", "Guides"], ["tools.html", "Tools"], ["horoscope.html", "Horoscopes"],
  ["tarot-portal.html", "Tarot Portal"], ["tarot-lab.html", "Tarot Lab"],
  ["shop.html", "Tarot Shop"], ["about.html", "About"], ["contact.html", "Contact"]
];
const esc = value => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
let normalised = 0;
for (const file of htmlFiles) {
  const full = path.join(root, file);
  let html = fs.readFileSync(full, "utf8");
  const start = html.indexOf("<nav");
  const end = start < 0 ? -1 : html.indexOf("</nav>", start);
  if (start < 0 || end < 0) throw new Error("Missing primary navigation in " + file);
  const active = file;
  const nav = '<nav aria-label="Main navigation">' + navItems.map(([href, label]) =>
    '<a href="' + esc(href) + '"' + (active === href ? ' class="current-page" aria-current="page"' : "") + '>' + label + '</a>'
  ).join("") + "</nav>";
  const old = html.slice(start, end + 6);
  if (old !== nav) {
    html = html.slice(0, start) + nav + html.slice(end + 6);
    fs.writeFileSync(full, html);
    normalised++;
  }
}
const errors = [];
const checkTarget = (source, raw, kind) => {
  if (!raw || /^(?:https?:|mailto:|tel:|javascript:|data:|blob:|//)/i.test(raw)) return;
  if (raw.startsWith("#")) {
    const id = decodeURIComponent(raw.slice(1));
    const sourceText = fs.readFileSync(path.join(root, source), "utf8");
    if (id && !new RegExp('(?:id|name)\\s*=\\s*["\\']' + id.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&") + '["\\']').test(sourceText))
      errors.push(source + " has missing local fragment " + raw);
    return;
  }
  const clean = decodeURIComponent(raw.split("#")[0].split("?")[0]);
  if (!clean) return;
  const target = path.resolve(root, clean.startsWith("/") ? "." + clean : path.join(path.dirname(source), clean));
  if (!target.startsWith(root + path.sep) && target !== root) { errors.push(source + " has unsafe path " + raw); return; }
  if (!fs.existsSync(target)) errors.push(source + " has missing " + kind + " target " + raw);
};
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  for (const match of html.matchAll(/<(a|area)\\b[^>]*href=["']([^"']+)["']/gi)) checkTarget(file, match[2], "link");
  for (const match of html.matchAll(/<(script|img|source|iframe|video|audio)\\b[^>]*src=["']([^"']+)["']/gi)) checkTarget(file, match[2], "asset");
  for (const match of html.matchAll(/<link\\b[^>]*href=["']([^"']+)["']/gi)) checkTarget(file, match[1], "asset");
}
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>https?:\\/\\/oraclesupportcentre\\.com\\/([^<]*)<\\/loc>/g)].map(m => decodeURIComponent(m[1]));
const seen = new Set();
for (const item of sitemapPaths) {
  if (seen.has(item)) errors.push("Duplicate sitemap entry: " + item);
  seen.add(item);
  if (item && !fs.existsSync(path.join(root, item))) errors.push("Sitemap URL has no file: " + item);
}
for (const file of htmlFiles) {
  if (file === "index.html") continue; // The root URL is the canonical homepage.
  if (!seen.has(file)) errors.push("Indexable HTML page missing from sitemap: " + file);
}
if (errors.length) {
  console.error("Site audit found " + errors.length + " issue(s):");
  for (const issue of errors) console.error(" - " + issue);
  process.exit(1);
}
console.log("Site audit passed: " + htmlFiles.length + " HTML pages; " + sitemapPaths.length + " sitemap URLs; " + normalised + " navigation bars standardised; internal links and local assets resolved.");
