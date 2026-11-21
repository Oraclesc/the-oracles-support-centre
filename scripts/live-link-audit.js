// Verify every sitemap URL and every same-origin link/asset against the deployed site.
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const base = "https://oraclesupportcentre.com";
async function main() {
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
const targets = new Set(urls);
const local = value => {
  if (!value || /^(https?:|mailto:|tel:|javascript:|data:|blob:|\/\/)/i.test(value)) return;
  const url = new URL(value, base + "/");
  if (url.origin === base) targets.add(url.href.split("#")[0]);
};
for (const file of fs.readdirSync(root).filter(x => x.endsWith(".html") && x !== "welcome.html")) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  for (const m of html.matchAll(/<(a|area|link)\b[^>]*href=["']([^"']+)["']/gi)) local(m[2]);
  for (const m of html.matchAll(/<(script|img|source|iframe|video|audio)\b[^>]*src=["']([^"']+)["']/gi)) local(m[2]);
}
const queue = [...targets];
const failures = [];
let checked = 0;
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    let response;
    try {
      response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(12000), headers: { "User-Agent": "OracleSiteAudit/1.0" } });
      if (!response.ok) failures.push(url + " -> HTTP " + response.status);
      await response.arrayBuffer();
    } catch (error) {
      failures.push(url + " -> " + error.message);
    }
    checked++;
    if (checked % 25 === 0) console.log("Checked " + checked + "/" + targets.size + " live URLs");
  }
}
await Promise.all(Array.from({ length: 10 }, worker));
if (failures.length) {
  console.error("Live link audit found " + failures.length + " failure(s):");
  for (const failure of failures) console.error(" - " + failure);
  process.exit(1);
}
console.log("Live link audit passed: " + checked + " same-origin pages, links and assets returned successful HTTP responses.");
}
main().catch(error => { console.error(error); process.exit(1); });
