"use strict";
(function(){
  const root=document.getElementById("card-of-the-day");
  if(!root||typeof tarotCards==="undefined")return;
  const esc=s=>String(s??"").replace(/[&<>\"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m]));
  const image=c=>c?"images/cards/"+c.file:"";
  const guide=c=>c?c.name.toLowerCase().replace(/the /g,"the-").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+".html":"#";
  const raw=root.dataset.offset||0,offset=Number(raw)||0;
  const base=new Date();base.setHours(12,0,0,0);base.setDate(base.getDate()+offset);
  const key=base.toISOString().slice(0,10);
  const hash=[...key].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
  const card=tarotCards[hash%tarotCards.length],reversed=hash%7===0;
  const set=(selector,value)=>{const el=root.querySelector(selector);if(el)el.textContent=value};
  set("[data-cotd-date]",base.toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long",year:"numeric"}));
  set("[data-cotd-name]",card.name);
  set("[data-cotd-orientation]",reversed?"Reversed":"Upright");
  set("[data-cotd-meaning]",reversed?card.reversed:card.upright);
  const img=root.querySelector("[data-cotd-image]");if(img){img.src=image(card);img.alt=card.name}
  const link=root.querySelector("[data-cotd-link]");if(link)link.href=guide(card);
  const parent=root.parentElement;
  if(parent.querySelector(".cotd-history"))return;
  const history=document.createElement("section");history.className="tool-panel cotd-history";
  history.innerHTML='<h2>Your Last 7 Days</h2><p>Use the recent cards as a small pattern to reflect on, rather than a prediction.</p><div class="history-grid"></div>';
  parent.insertBefore(history,parent.querySelector(".tool-actions"));
  const grid=history.querySelector(".history-grid"),today=new Date();today.setHours(12,0,0,0);
  let html="";
  for(let i=-6;i<=0;i++){
    const d=new Date(today);d.setDate(today.getDate()+i);
    const k=d.toISOString().slice(0,10),h=[...k].reduce((a,ch)=>(a*31+ch.charCodeAt(0))>>>0,7);
    const c=tarotCards[h%tarotCards.length],rev=h%7===0,dayParam=i===-1?"yesterday":i===1?"tomorrow":i;
    html+=`<a class="history-card" href="card-of-the-day.html?day=${dayParam}"><span>${d.toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"})}</span><img src="${image(c)}" alt="${esc(c.name)}"><strong>${esc(c.name)}</strong><small>${rev?"Reversed":"Upright"}</small></a>`;
  }
  grid.innerHTML=html;
})();
