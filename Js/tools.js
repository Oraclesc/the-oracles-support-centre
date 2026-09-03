"use strict";
/* Shared tarot engine — drawing and card lookup only.
   Page-specific behaviour lives in phase12.js and phase3.js. */
if(!document.querySelector('script[src*="adsbygoogle.js"]')){
  const ads=document.createElement("script");
  ads.async=true;
  ads.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2517381819553976";
  ads.crossOrigin="anonymous";
  document.head.appendChild(ads);
}

const slug=n=>n.toLowerCase().replace(/the /g,"the-").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+".html";
const getCard=n=>tarotCards.find(c=>c.name===n);
const cardUrl=c=>c?slug(c.name):"#";
const cardImage=c=>c?"images/cards/"+c.file:"";
const draw=(allowReverse=true,n=1)=>[...tarotCards]
  .sort(()=>Math.random()-.5)
  .slice(0,n)
  .map(c=>({...c,isReversed:allowReverse&&Math.random()<.35}));

/* Card Meaning Search is intentionally kept here because it is a lightweight
   standalone tool and does not overlap with the reading/journal modules. */
const searchRoot=document.getElementById("card-search-app");
if(searchRoot){
  const input=searchRoot.querySelector("#card-search-input");
  const output=searchRoot.querySelector("#card-search-results");
  const escSearch=s=>String(s??"").replace(/[&<>\"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m]));
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
