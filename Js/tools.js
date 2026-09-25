"use strict";
/* Shared tarot engine — lookup, drawing and lightweight card actions.
   Page-specific behaviour lives in phase12.js and phase3.js. */

/* Keep the publisher tag consistent. Some older pages used the legacy
   /pagead/js?client form; remove that form before ensuring the current
   adsbygoogle.js loader is present. */
document.querySelectorAll('script[src*="/pagead/js?client="]').forEach(script=>script.remove());
if(!document.querySelector('script[src*="/pagead/js/adsbygoogle.js?client="]')){
  const ads=document.createElement("script");
  ads.async=true;
  ads.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2517381819553976";
  ads.crossOrigin="anonymous";
  document.head.appendChild(ads);
}

/* Add the complete legal navigation to older shared-tool footers. */
const legalFooterLinks=[
  ["Privacy Policy","privacy.html"],
  ["Disclaimer","disclaimer.html"],
  ["Terms","terms.html"],
  ["Cookie Policy","cookies.html"]
];
const ensureLegalFooter=()=>{
  const footer=document.querySelector("footer.site-footer, footer");
  if(!footer || footer.dataset.legalFooterBound)return;
  footer.dataset.legalFooterBound="1";

  let legal=footer.querySelector(".footer-small");
  if(!legal){
    legal=document.createElement("div");
    legal.className="footer-links footer-small";
    legalFooterLinks.forEach(([label,href])=>{
      const a=document.createElement("a");
      a.href=href;
      a.textContent=label;
      legal.appendChild(a);
    });
    footer.appendChild(legal);
  }

  if(!legal.querySelector("#privacy-settings-link")){
    const a=document.createElement("a");
    a.href="javascript:void(0)";
    a.id="privacy-settings-link";
    a.textContent="Privacy & cookie settings";
    a.style.display="none";
    a.addEventListener("click",event=>{
      event.preventDefault();
      if(window.googlefc&&typeof window.googlefc.showRevocationMessage==="function"){
        window.googlefc.showRevocationMessage();
      }
    });
    legal.appendChild(a);

    window.googlefc=window.googlefc||{};
    window.googlefc.callbackQueue=window.googlefc.callbackQueue||[];
    window.googlefc.callbackQueue.push({
      CONSENT_API_READY:()=>{
        const link=document.getElementById("privacy-settings-link");
        if(link)link.style.display="";
      }
    });
  }
};
ensureLegalFooter();

/* Keep older pages connected to the main Tarot Portal so important content
   can be reached through ordinary HTML anchor elements. */
const ensurePortalNavigation=()=>{
  document.querySelectorAll("nav").forEach(nav=>{
    if(nav.querySelector('a[href="tarot-portal.html"]'))return;
    const toolsLink=nav.querySelector('a[href="tools.html"]');
    const a=document.createElement("a");
    a.href="tarot-portal.html";
    a.textContent="Tarot Portal";
    if(toolsLink)toolsLink.insertAdjacentElement("afterend",a);
    else nav.appendChild(a);
  });
};
ensurePortalNavigation();

const slug=n=>n.toLowerCase().replace(/the /g,"the-").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+".html";
const getCard=n=>tarotCards.find(c=>c.name===n);
const cardUrl=c=>c?slug(c.name):"#";
const cardImagePath=c=>c?"images/cards/"+c.file:"";
const draw=(allowReverse=true,n=1)=>[...tarotCards]
  .sort(()=>Math.random()-.5)
  .slice(0,n)
  .map(c=>({...c,isReversed:allowReverse&&Math.random()<.35}));

/* Favourite buttons on static card-guide pages. */
const bindGuideFavourites=()=>{
  document.querySelectorAll("[data-fav]").forEach(button=>{
    if(button.dataset.favBound)return;
    button.dataset.favBound="1";
    button.addEventListener("click",()=>{
      let names=[];
      try{names=JSON.parse(localStorage.getItem("oracleFavourites")||"[]")}catch{}
      const name=button.dataset.fav;
      names=names.includes(name)?names.filter(x=>x!==name):[...names,name];
      localStorage.setItem("oracleFavourites",JSON.stringify(names));
      button.textContent=names.includes(name)?"★ Favourite":"☆ Save favourite";
    });
  });
};
bindGuideFavourites();

/* Add a small contextual internal-link block to older and card-guide pages.
   The links are real <a href> elements so crawlers can follow them after rendering. */
const addContextualLinks=()=>{
  const main=document.querySelector("main");
  if(!main || main.querySelector(".contextual-internal-links"))return;
  const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const excluded=["index.html","tarot-portal.html","tarot-library.html","guides.html","tools.html","tarot-lab.html","tarot-school.html"];
  if(excluded.includes(page))return;

  const cardPages=/^(the-|ace-of-|two-of-|three-of-|four-of-|five-of-|six-of-|seven-of-|eight-of-|nine-of-|ten-of-|page-of-|knight-of-|queen-of-|king-of-).+\\.html$/.test(page);
  const majorPages=["major-arcana.html","the-fool.html","the-magician.html","the-high-priestess.html","the-empress.html","the-emperor.html","the-hierophant.html","the-lovers.html","the-chariot.html","strength.html","the-hermit.html","wheel-of-fortune.html","justice.html","the-hanged-man.html","death.html","temperance.html","the-devil.html","the-tower.html","the-star.html","the-moon.html","the-sun.html","judgement.html","the-world.html"];
  const suitPages=["minor-arcana.html","wands.html","cups.html","swords.html","pentacles.html"];

  let links;
  if(cardPages){
    links=[
      ["tarot-card-contexts.html","Explore this card in Love, Career & Yes/No contexts"],
      ["tarot-card-combinations.html","Learn how card combinations work"],
      ["reversed-tarot-cards.html","Understand reversed Tarot cards"],
      ["tarot-spreads.html","Choose a Tarot spread for your question"],
      ["tarot-journal-prompts.html","Use journal prompts to deepen your reading"]
    ];
  }else if(majorPages.includes(page)){
    links=[
      ["major-arcana.html","Explore the Major Arcana"],
      ["tarot-history.html","Read about Tarot history"],
      ["tarot-symbolism.html","Study Tarot symbolism"],
      ["tarot-zodiac.html","Explore Tarot and zodiac correspondences"],
      ["tarot-card-contexts.html","See practical card contexts"]
    ];
  }else if(suitPages.includes(page)){
    links=[
      ["minor-arcana.html","Return to the Minor Arcana guide"],
      ["tarot-numerology.html","Explore Tarot numerology"],
      ["tarot-symbolism.html","Study Tarot symbolism"],
      ["tarot-card-contexts.html","Explore card contexts"],
      ["tarot-combinations.html","Study card combinations"]
    ];
  }else{
    links=[
      ["tarot-portal.html","Explore the Tarot Portal"],
      ["tarot-library.html","Browse the Tarot Library"],
      ["tarot-school.html","Follow the Tarot School study plan"],
      ["tarot-spreads.html","Choose a Tarot spread"],
      ["cards.html","Explore all 78 Tarot cards"]
    ];
  }

  const section=document.createElement("section");
  section.className="about-content contextual-internal-links";
  section.style.marginTop="22px";
  section.innerHTML='<article class="about-section"><div class="about-symbol">✦</div><div><h2>Continue Exploring Tarot</h2><p>Keep building your understanding with these related free resources.</p><div class="tool-actions"></div></div></article>';
  const actions=section.querySelector(".tool-actions");
  links.forEach(([href,label])=>{
    const a=document.createElement("a");
    a.className="secondary-button";
    a.href=href;
    a.textContent=label;
    actions.appendChild(a);
  });
  main.appendChild(section);
};
addContextualLinks();

/* Add visible breadcrumbs plus matching BreadcrumbList structured data. Google recommends
   breadcrumbs that represent a normal user path through the site's hierarchy. */ 
const addSeoBreadcrumbs=()=>{
  const main=document.querySelector("main");
  if(!main || main.querySelector(".seo-breadcrumbs"))return;
  const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  if(page==="index.html")return;
  const title=(document.querySelector("h1")?.textContent||document.title.split("|")[0]||"Tarot").replace(/\\s+/g," ").trim();
  const card=/^(the-|ace-of-|two-of-|three-of-|four-of-|five-of-|six-of-|seven-of-|eight-of-|nine-of-|ten-of-|page-of-|knight-of-|queen-of-|king-of-).+\\.html$/.test(page);
  let parent=["Tarot","tarot-portal.html","Tarot Portal"];
  if(card)parent=["Tarot Cards","cards.html","Tarot Cards"];
  else if(/love|relationship/i.test(page+" "+title))parent=["Love Tarot","tarot-love.html","Love Tarot"];
  else if(/career|money/i.test(page+" "+title))parent=["Career Tarot","tarot-career.html","Career Tarot"];
  else if(/journal|practice|school|learn|guide|question|spread|symbolism|numerology|history|ethics|myth|intuition/i.test(page+" "+title))parent=["Tarot Guides","guides.html","Tarot Guides"];
  const base="https://oraclesupportcentre.com/";
  const items=[{name:"Home",url:base},{name:parent[0],url:base+parent[1]},{name:title,url:base+page}];
  const nav=document.createElement("nav");
  nav.className="seo-breadcrumbs";
  nav.setAttribute("aria-label","Breadcrumb");
  nav.innerHTML='<ol>'+items.map((item,i)=>i===items.length-1?'<li aria-current="page">'+item.name+'</li>':'<li><a href="'+item.url.replace(base,"")+'">'+item.name+'</a></li>').join("")+'</ol>';
  main.insertBefore(nav,main.firstChild);
  const script=document.createElement("script");
  script.type="application/ld+json";
  script.textContent=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":items.map((item,i)=>({"@type":"ListItem","position":i+1,"name":item.name,"item":item.url}))});
  document.head.appendChild(script);
};
addSeoBreadcrumbs();

/* Card Meaning Search is intentionally kept here because it is a lightweight
   standalone tool and does not overlap with the reading/journal modules. */
const searchRoot=document.getElementById("card-search-app");
if(searchRoot){
  const input=searchRoot.querySelector("#card-search-input");
  const output=searchRoot.querySelector("#card-search-results");
  const escSearch=s=>String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
  const runSearch=()=>{
    const q=input.value.toLowerCase().trim();
    if(!q){
      output.innerHTML='<div class="empty-state">Type a card name, suit, theme or keyword to begin.</div>';
      return;
    }
    const matches=tarotCards.filter(c=>(
      c.name+" "+c.category+" "+(c.keywords||[]).join(" ")+" "+c.upright+" "+c.reversed
    ).toLowerCase().includes(q));
    output.innerHTML=matches.length
      ?matches.map(c=>`<article class="result-card"><h2><a href="${cardUrl(c)}">${escSearch(c.name)}</a></h2><p>${escSearch(c.category)}</p><p>${escSearch(c.upright)}</p><p><strong>Keywords:</strong> ${escSearch((c.keywords||[]).join(" • "))}</p></article>`).join("")
      :'<div class="empty-state">No cards matched that search.</div>';
  };
  input.oninput=runSearch;
  runSearch();
}

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
}