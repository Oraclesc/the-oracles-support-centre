// Repeatable quality checks for the 156 static card guides.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..");
function load(file, expression) {
  const box = {};
  vm.createContext(box);
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8") + expression, box);
  return box.cards;
}
const rider = load("data/tarot-data.js", "; this.cards = tarotCards;");
const marseille = load("data/marseille-data.js", "; this.cards = marseilleCards;");
const errors = [];
const duplicateParagraphs = new Map();
const escapeHtml = value => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = name => name.toLowerCase().replace(/the /g, "the-").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".html";
const strip = html => html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
function checkDeck(deck, label, filename) {
  if (deck.length !== 78) errors.push(label + " contains " + deck.length + " cards; expected 78.");
  const names = new Set(), urls = new Set();
  for (const card of deck) {
    const file = label === "Rider–Waite–Smith" ? slug(card.name) : card.guideUrl;
    if (!card.name || names.has(card.name)) errors.push(label + " has a missing or duplicate card name: " + card.name);
    names.add(card.name);
    if (!file || urls.has(file)) errors.push(label + " has a missing or duplicate guide URL: " + file);
    urls.add(file);
    if (!card.upright || !card.reversed || !Array.isArray(card.keywords) || card.keywords.length < 3)
      errors.push(label + " has incomplete source meanings or keywords: " + card.name);
    const full = path.join(root, file || "");
    if (!fs.existsSync(full)) { errors.push(label + " guide file missing: " + file); continue; }
    const html = fs.readFileSync(full, "utf8");
    const text = strip(html);
    const canonical = "https://oraclesupportcentre.com/" + (label === "Rider–Waite–Smith" && file === "index.html" ? "" : file);
    if (!html.includes('<link rel="canonical" href="' + canonical + '">')) errors.push(file + " has an incorrect or missing canonical URL.");
    if (!html.includes("<h1") || !text.includes(card.name)) errors.push(file + " is missing its card heading or name.");
    if (text.split(" ").length < 350) errors.push(file + " is too thin (" + text.split(" ").length + " words).");
    for (const heading of ["Upright Meaning", "Reversed Meaning", "Love & Relationships", "Career & Work", "Personal Growth"])
      if (!html.includes(heading)) errors.push(file + " is missing section: " + heading);
    if (label === "Tarot de Marseille" && !html.includes(escapeHtml(card.upright)))
      errors.push(file + " does not retain its card-specific source upright meaning.");
    const blocks = [...html.matchAll(/<article class="tool-card"><h2>([^<]+)<\/h2><p>([\s\S]*?)<\/p>/gi)];
    for (const block of blocks) {
      const p = strip(block[2]);
      if (p.length > 170) {
        const key = p.toLowerCase();
        if (!duplicateParagraphs.has(key)) duplicateParagraphs.set(key, []);
        duplicateParagraphs.get(key).push(file + " [" + block[1] + "]");
      }
    }
  }
}
checkDeck(rider, "Rider–Waite–Smith");
checkDeck(marseille, "Tarot de Marseille");
const justice = marseille.find(c => c.name === "Justice");
const strength = marseille.find(c => c.name === "Strength");
if (!justice || justice.number !== 8 || justice.frenchName !== "La Justice" || justice.guideUrl !== "marseille-justice.html")
  errors.push("Marseille Justice must be VIII / La Justice / marseille-justice.html.");
if (!strength || strength.number !== 11 || strength.frenchName !== "La Force" || strength.guideUrl !== "marseille-strength.html")
  errors.push("Marseille Strength must be XI / La Force / marseille-strength.html.");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const file of [...rider.map(c => slug(c.name)), ...marseille.map(c => c.guideUrl)])
  if (!sitemap.includes("https://oraclesupportcentre.com/" + file)) errors.push("Sitemap missing card guide: " + file);
const repeats = [...duplicateParagraphs].filter(([, pages]) => pages.length > 3);
console.log("Card content audit: " + rider.length + " Rider–Waite–Smith guides and " + marseille.length + " Marseille guides checked.");
console.log("Unique names/URLs, source meanings, card headings, canonical URLs, minimum content, key sections and sitemap coverage checked.");
console.log("Repeated substantive card-section paragraphs across more than three pages: " + repeats.length + ".");
for (const [paragraph, pages] of repeats.slice(0, 10))
  console.log("REPEAT (" + pages.length + "): " + pages.slice(0, 8).join(", ") + " — " + paragraph.slice(0, 180));
if (errors.length) {
  console.error("Card content audit found " + errors.length + " issue(s):");
  for (const error of errors) console.error(" - " + error);
  process.exit(1);
}
