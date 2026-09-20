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