// Site-wide navigation, footer, monetisation and internal-link audit.
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
const legalFooter = '<div class="footer-links footer-small"><a href="privacy.html">Privacy Policy</a><a href="disclaimer.html">Disclaimer</a><a href="terms.html">Terms</a><a href="cookies.html">Cookie Policy</a><a href="cookies.html#managing-cookies" id="privacy-settings-link">Privacy &amp; cookie settings</a></div>';
const analyticsTag = '<script async src="https://www.googletagmanager.com/gtag/js?id=G-6YM3CKSZLR"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-6YM3CKSZLR");</script>';
const adsTag = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2517381819553976" crossorigin="anonymous"></script>';
let normalised = 0, footerNormalised = 0, adsTagged = 0, analyticsTagged = 0, pagesWithoutFooter = 0;
for (const file of htmlFiles) {
  const full = path.join(root, file);
  let html = fs.readFileSync(full, "utf8");
  const original = html;
  const start = html.indexOf("<nav");
  const end = start < 0 ? -1 : html.indexOf("</nav>", start);
  if (start < 0 || end < 0) throw new Error("Missing primary navigation in " + file);
  const nav = '<nav aria-label="Main navigation">' + navItems.map(([href, label]) =>
    '<a href="' + href + '"' + (file === href ? ' class="current-page" aria-current="page"' : "") + '>' + label + '</a>'
  ).join("") + "</nav>";
  if (html.slice(start, end + 6) !== nav) {
    html = html.slice(0, start) + nav + html.slice(end + 6);
    normalised++;
  }
  if (!html.includes("googletagmanager.com/gtag/js?id=G-6YM3CKSZLR")) {
    if (!html.includes("</head>")) throw new Error("Missing head element in " + file);
    html = html.replace("</head>", analyticsTag + "</head>");
    analyticsTagged++;
  }
  if (!html.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2517381819553976")) {
    if (!html.includes("</head>")) throw new Error("Missing head element in " + file);
    html = html.replace("</head>", adsTag + "</head>");
    adsTagged++;
  }
  const footerStart = html.indexOf("<footer");
  const footerEnd = footerStart < 0 ? -1 : html.indexOf("</footer>", footerStart);
  if (footerStart < 0 || footerEnd < 0) {
    pagesWithoutFooter++;
  } else {
    const footer = html.slice(footerStart, footerEnd + 9);
    const small = /<div class="footer-links footer-small">[\s\S]*?<\/div>/;
    const updatedFooter = small.test(footer)
      ? footer.replace(small, legalFooter)
      : footer.replace("</footer>", legalFooter + "</footer>");
    if (updatedFooter !== footer) {
      html = html.slice(0, footerStart) + updatedFooter + html.slice(footerEnd + 9);
      footerNormalised++;
    }
  }
  if (html !== original) fs.writeFileSync(full, html);
}
const errors = [];
function checkTarget(source, raw, kind) {
  if (!raw || /^(https?:|mailto:|tel:|javascript:|data:|blob:|\/\/)/i.test(raw)) return;
  const hashIndex = raw.indexOf("#");
  const fragment = hashIndex >= 0 ? decodeURIComponent(raw.slice(hashIndex + 1)) : "";
  const withoutHash = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw;
  const clean = decodeURIComponent(withoutHash.split("?")[0]);
  const targetRel = clean.startsWith("/") ? clean.slice(1) : path.join(path.dirname(source), clean);
  const target = path.resolve(root, targetRel || source);
  if (!target.startsWith(root + path.sep) && target !== root) { errors.push(source + " has unsafe path " + raw); return; }
  if (!fs.existsSync(target)) { errors.push(source + " has missing " + kind + " target " + raw); return; }
  if (fragment && fs.statSync(target).isFile() && target.endsWith(".html")) {
    const body = fs.readFileSync(target, "utf8");
    if (!body.includes('id="' + fragment + '"') && !body.includes("id='" + fragment + "'") &&
        !body.includes('name="' + fragment + '"') && !body.includes("name='" + fragment + "'"))
      errors.push(source + " links to missing fragment " + raw);
  }
}
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  const description = (html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) || [])[1];
  const canonical = (html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i) || [])[1];
  if (!title || !title.trim()) errors.push(file + " is missing a page title.");
  if (!description || !description.trim()) errors.push(file + " is missing a meta description.");
  const expectedCanonical = "https://oraclesupportcentre.com/" + (file === "index.html" ? "" : file);
  if (canonical !== expectedCanonical) errors.push(file + " has a missing or incorrect canonical URL (expected " + expectedCanonical + ").");
  if (!/<h1\b/i.test(html)) errors.push(file + " is missing its main H1 heading.");
  for (const match of html.matchAll(/<(a|area)\b[^>]*href=["']([^"']+)["']/gi)) checkTarget(file, match[2], "link");
  for (const match of html.matchAll(/<(script|img|source|iframe|video|audio)\b[^>]*src=["']([^"']+)["']/gi)) checkTarget(file, match[2], "asset");
  for (const match of html.matchAll(/<link\b[^>]*href=["']([^"']+)["']/gi)) checkTarget(file, match[1], "asset");
}
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>https?:\/\/oraclesupportcentre\.com\/([^<]*)<\/loc>/g)].map(m => decodeURIComponent(m[1]));
const seen = new Set();
for (const item of sitemapPaths) {
  if (seen.has(item)) errors.push("Duplicate sitemap entry: " + item);
  seen.add(item);
  if (item && !fs.existsSync(path.join(root, item))) errors.push("Sitemap URL has no file: " + item);
}
if (!seen.has("")) errors.push("Homepage root URL is missing from sitemap.");
for (const file of htmlFiles) {
  if (file === "index.html") continue;
  if (!seen.has(file)) errors.push("Indexable HTML page missing from sitemap: " + file);
}
for (const match of sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(match[1]) || Number.isNaN(Date.parse(match[1])))
    errors.push("Invalid sitemap lastmod date: " + match[1]);
}
if (errors.length) {
  console.error("Site audit found " + errors.length + " issue(s):");
  for (const issue of errors) console.error(" - " + issue);
  process.exit(1);
}
console.log("Site audit passed: " + htmlFiles.length + " HTML pages; " + sitemapPaths.length + " sitemap URLs; " +
  normalised + " navigation bars standardised; " + footerNormalised + " legal footers standardised; " +
  analyticsTagged + " analytics tags and " + adsTagged + " AdSense tags added; " +
  pagesWithoutFooter + " pages without a footer; internal links, local assets and sitemap resolved.");
