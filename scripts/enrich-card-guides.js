// Adds card-specific interpretation to the 78 Rider–Waite guide pages at build time.
// This preserves the authored page structure while replacing repeated boilerplate with
// material grounded in each card's keywords, upright/reversed meanings and editorial insight.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = path.join(__dirname, "..");
const dataBox = {};
vm.createContext(dataBox);
vm.runInContext(fs.readFileSync(path.join(root, "data/tarot-data.js"), "utf8") + "; this.cards = tarotCards;", dataBox);
const cards = dataBox.cards;
const generator = fs.readFileSync(path.join(__dirname, "generate-card-guides.js"), "utf8");
const insightMatch = generator.match(/const cardInsights = (\{[\s\S]*?\n\});\nfunction rank/);
if (!insightMatch) throw new Error("Could not read the authored card-specific insight library.");
const insights = vm.runInNewContext("(" + insightMatch[1] + ")");
const preserved = new Set();
const esc = value => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const slug = name => name.toLowerCase().replace(/the /g, "the-").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function replaceArticle(html, heading, paragraph) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp('(<article class="tool-card"><h2>' + escaped + '</h2><p>)[\\s\\S]*?(</p></article>)');
  if (!re.test(html)) throw new Error("Missing card section: " + heading);
  return html.replace(re, (_, before, after) => before + esc(paragraph) + after);
}
let changed = 0;
const sharedNav = '<a href="index.html">Home</a><a href="reading.html">Free Reading</a><a href="cards.html">Tarot Cards</a><a href="guides.html">Guides</a><a href="tools.html">Tools</a><a href="horoscope.html">Horoscopes</a><a href="tarot-portal.html">Tarot Portal</a><a href="tarot-lab.html">Tarot Lab</a><a href="shop.html">Tarot Shop</a><a href="about.html">About</a><a href="contact.html">Contact</a>';
const sharedFooter = '<a href="index.html">Home</a><a href="reading.html">Free Reading</a><a href="cards.html">Tarot Cards</a><a href="guides.html">Guides</a><a href="tools.html">Tools</a><a href="horoscope.html">Horoscopes</a><a href="tarot-portal.html">Tarot Portal</a><a href="tarot-lab.html">Tarot Lab</a><a href="shop.html">Tarot Shop</a><a href="about.html">About</a><a href="contact.html">Contact</a>';
for (const card of cards) {
  const file = path.join(root, slug(card.name) + ".html");
  if (!fs.existsSync(file)) throw new Error("Missing guide page: " + path.basename(file));
  let html = fs.readFileSync(file, "utf8");
  const navStart = html.indexOf('<nav aria-label="Main navigation">');
  const navEnd = html.indexOf("</nav>", navStart);
  if (navStart < 0 || navEnd < 0) throw new Error("Missing navigation: " + card.name);
  html = html.slice(0, navStart) + '<nav aria-label="Main navigation">' + sharedNav + "</nav>" + html.slice(navEnd + 6);
  const footerStart = html.indexOf("<footer");
  const footerLinksStart = html.indexOf('<div class="footer-links">', footerStart);
  const footerLinksEnd = html.indexOf("</div>", footerLinksStart);
  if (footerLinksStart < 0 || footerLinksEnd < 0) throw new Error("Missing footer links: " + card.name);
  html = html.slice(0, footerLinksStart) + '<div class="footer-links">' + sharedFooter + "</div>" + html.slice(footerLinksEnd + 6);
  if (preserved.has(card.name)) { fs.writeFileSync(file, html); continue; }
  const insight = insights[card.name];
  if (!insight || insight.length < 2) throw new Error("Missing editorial insight: " + card.name);
  const [first, example] = insight;
  const keywords = (card.keywords || []).map(String);
  const [k1 = "awareness", k2 = "context", k3 = "choice"] = keywords;
  const suit = / of Cups$/.test(card.name) ? "Cups" : / of Pentacles$/.test(card.name) ? "Pentacles" : / of Swords$/.test(card.name) ? "Swords" : / of Wands$/.test(card.name) ? "Wands" : "Major Arcana";
  const context = first + " Read this card through its actual spread position. In an advice position, it can suggest a way to respond; in a challenge position, it may reveal where the card's qualities have become difficult to balance. Compare the interpretation with the question and known circumstances before settling on a meaning.";
  const love = "In relationships, " + card.name + " invites attention to " + k1 + " and " + k2 + ". " +
    (suit === "Cups" ? "Consider emotional availability, mutual care and whether feelings can be discussed honestly." :
     suit === "Swords" ? "Notice the quality of communication, the assumptions being made and whether boundaries are respected." :
     suit === "Wands" ? "Consider attraction, shared enthusiasm and whether both people have room for independence and initiative." :
     suit === "Pentacles" ? "Look at reliability, practical support and the everyday effort that makes a connection sustainable." :
     "Consider how the card's wider theme affects choices, values and the way people relate to one another.") +
    " " + card.upright + " Do not use the card to claim knowledge of another person's private thoughts; look for observable behaviour and direct communication.";
  const career = "For work, study or money, " + card.name + " brings " + k2 + " and " + k3 + " into the discussion. " +
    (suit === "Pentacles" ? "Look at resources, routines, skills, time and the practical evidence behind a decision." :
     suit === "Swords" ? "Clarify the facts, identify the decision that needs to be made and communicate expectations precisely." :
     suit === "Wands" ? "Turn enthusiasm into a sequence of achievable actions, with attention to timing and follow-through." :
     suit === "Cups" ? "Consider team relationships, emotional investment and whether the working environment supports thoughtful contribution." :
     "Consider the wider lesson, responsibility or transition involved, then identify what is within your control.") +
    " " + example;
  const growth = "For personal growth, this card asks how " + k1 + " and " + k2 + " are showing up in your own choices. " + first +
    " Rather than trying to become the card's ideal, identify one behaviour you can practise and one extreme you want to avoid. The reversed meaning can help name the imbalance, while the upright meaning offers a direction to explore.";
  const symbolism = "Begin with the actual Rider–Waite–Smith illustration for " + card.name +
    ". Before consulting keywords, describe the figures, posture, objects, setting, colours and direction of movement that are genuinely visible. Then ask which detail best expresses " + k1 + ", " + k2 + " or " + k3 +
    ". Separate what is literally shown from the meaning you assign to it; this makes the interpretation personal without inventing details that are not in the image.";
  const advice = "A grounded way to work with " + card.name + " is to take the scenario seriously without treating it as a prediction. " + example +
    " Use the card to choose one question to ask, one fact to check or one small action that remains within your control. Its reversed meaning offers a useful check against excess or avoidance: " + card.reversed;
  html = replaceArticle(html, "What This Card Brings Into Focus", context);
  html = replaceArticle(html, "Love & Relationships", love);
  html = replaceArticle(html, "Career & Work", career);
  html = replaceArticle(html, "Personal Growth", growth);
  html = replaceArticle(html, "Symbolism & Intuition", symbolism);
  html = replaceArticle(html, "Practical Advice", advice);
  const questions = [
    "Which detail in the image of " + card.name + " best expresses " + k1 + ", and why?",
    "Where might " + k2 + " be helpful here, and where could it become unbalanced?",
    "What practical action connected with " + k3 + " is genuinely within my control?"
  ];
  const questionSection = /<section class="tool-panel" style="margin-top:22px"><h2>Reflection Questions<\/h2><ul>[\s\S]*?<\/ul><\/section>/;
  if (!questionSection.test(html)) throw new Error("Missing reflection questions: " + card.name);
  html = html.replace(questionSection, '<section class="tool-panel" style="margin-top:22px"><h2>Reflection Questions</h2><ul>' + questions.map(q => "<li>" + esc(q) + "</li>").join("") + "</ul></section>");
  const step2 = /<p><strong>Step 2 — Choose what is relevant:<\/strong>[\s\S]*?<\/p>/;
  if (!step2.test(html)) throw new Error("Missing worked example step 2: " + card.name);
  html = html.replace(step2, "<p><strong>Step 2 — Find the card-specific detail:</strong> " + esc(first) + " " + esc(example) + " Explain which part connects most directly with the question and which part would be an assumption.</p>");
  const step4 = /<p><strong>Step 4 — Connect it to real circumstances:<\/strong>[\s\S]*?<\/p>/;
  if (!step4.test(html)) throw new Error("Missing worked example step 4: " + card.name);
  html = html.replace(step4, "<p><strong>Step 4 — Choose a grounded response:</strong> " + esc(advice) + " A tarot card cannot verify another person's thoughts or guarantee an outcome; check the interpretation against what you actually know.</p>");
  fs.writeFileSync(file, html);
  changed++;
}
console.log("Enriched " + changed + " Rider–Waite card guides with card-specific interpretation.");
