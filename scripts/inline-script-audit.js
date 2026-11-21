// Parse every inline JavaScript block without executing browser code.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..");
const files = fs.readdirSync(root).filter(name => name.endsWith(".html") && name !== "welcome.html");
let checked = 0;
const errors = [];
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  let index = 0;
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = match[1] || "";
    if (/\bsrc\s*=/.test(attrs)) continue;
    const type = (attrs.match(/\btype=["']([^"']+)["']/i) || [])[1] || "";
    if (type && !/^(text|application)\/javascript|module$/i.test(type) && type !== "text/javascript") continue;
    const code = match[2].trim();
    if (!code) continue;
    index++;
    try {
      new vm.Script(code, { filename: file + " inline script " + index });
      checked++;
    } catch (error) {
      errors.push(file + " inline script " + index + ": " + error.message);
    }
  }
}
console.log("Inline JavaScript syntax audit: " + checked + " blocks checked across " + files.length + " pages.");
if (errors.length) {
  console.error("Inline script syntax errors: " + errors.length);
  for (const error of errors) console.error(" - " + error);
  process.exit(1);
}
