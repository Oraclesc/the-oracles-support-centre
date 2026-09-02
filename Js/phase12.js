"use strict";
/* Phase 1 + 2 interactive upgrades */
(function(){
  const esc=s=>String(s??"").replace(/[&<>\"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m]));
  const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
  const read=(key,fallback=[])=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}};
  const slug=n=>n.toLowerCase().replace(/the /g,"the-").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+".html";
  const cardBy=n=>tarotCards.find(c=>c.name===n);
  const image=c=>c?"images/cards/"+c.file:"";
  const guide=c=>c?slug(c.name):"#";

  function cardMarkup(c,label){
    return `<article class="result-card reveal-card ${c.isReversed?'is-reversed':''}"><div class="reveal-wrap"><div class="reveal-inner"><div class="reveal-back"><img src="images/card-back.webp" alt="Tarot card back"></div><div class="reveal-front"><img src="${image(c)}" alt="${esc(c.name)}"></div></div></div><div class="result-copy"><span class="pill">${esc(label||"Card")}</span><span class="pill">${c.isReversed?"Reversed":"Upright"}</span><h2>${esc(c.name)}</h2><p>${esc(c.isReversed?c.reversed:c.upright)}</p><p><strong>Keywords:</strong> ${esc((c.keywords||[]).join(" • "))}</p><a class="tool-link" href="${guide(c)}">Read the full guide →</a><br><button class="secondary-button" data-fav="${esc(c.name)}">☆ Save favourite</button></div></article>`;
  }
  function bindFav(root){root.querySelectorAll("[data-fav]").forEach(b=>b.onclick=()=>{let a=read("oracleFavourites"),n=b.dataset.fav;a=a.includes(n)?a.filter(x=>x!==n):[...a,n];save("oracleFavourites",a);b.textContent=a.includes(n)?"★ Favourite":"☆ Save favourite";});}
  function copyText(text,button){navigator.clipboard?.writeText(text).then(()=>{let old=button.textContent;button.textContent="Copied ✓";setTimeout(()=>button.textContent=old,1400)}).catch(()=>{});}
  function saveReading(cards,mode,question=""){
    let a=read("oracleReadings");a.unshift({date:new Date().toISOString(),mode,question,cards:cards.map(c=>({name:c.name,reversed:!!c.isReversed}))});save("oracleReadings",a.slice(0,100));
  }
  function reading(){
    const root=document.getElementById("reading-v2");if(!root)return;
    const button=root.querySelector("#reading-v2-draw"),out=root.querySelector("#reading-v2-results"),reverse=root.querySelector("#reading-v2-reversals");if(!button||!out)return;
    let mode="one";root.querySelectorAll("[data-reading-mode]").forEach(b=>b.addEventListener("click",()=>mode=b.dataset.readingMode));
    const drawReading=()=>{const cards=draw(reverse?.checked??true,mode==="three"?3:1),labels=mode==="three"?["Past","Present","Future"]:["Your card"];out.innerHTML=`<div class="reading-reveal-stage"><div class="card-result-grid">${cards.map((c,i)=>cardMarkup(c,labels[i])).join("")}</div><div class="reading-actions"><button class="primary-button" id="save-reading">Save This Reading</button><button class="secondary-button" id="copy-reading">Copy Reading</button><button class="secondary-button" id="draw-again">Draw Again</button></div><div class="notice reading-saved-note" hidden>Reading saved to your private browser journal.</div></div>`;requestAnimationFrame(()=>out.querySelectorAll(".reveal-card").forEach((el,i)=>setTimeout(()=>el.classList.add("revealed"),300+i*450)));bindFav(out);
      out.querySelector("#save-reading").onclick=()=>{saveReading(cards,mode);out.querySelector(".reading-saved-note").hidden=false};
      out.querySelector("#copy-reading").onclick=e=>{let text=(mode==="three"?cards.map((c,i)=>`${labels[i]}: ${c.name} — ${c.isReversed?"Reversed":"Upright"}\n${c.isReversed?c.reversed:c.upright}`).join("\n\n`:`${cards[0].name} — ${cards[0].isReversed?"Reversed":"Upright"}\n${cards[0].isReversed?cards[0].reversed:cards[0].upright}`);copyText(`The Oracle's Support Centre\n\n${text}`,e.currentTarget)};
      out.querySelector("#draw-again").onclick=drawReading;
    };
    button.onclick=drawReading;
  }

  function specialised(){
    const root=document.querySelector("[data-special-reading]");if(!root)return;
    const type=root.dataset.specialReading, out=root.querySelector("#special-result"), button=root.querySelector("#special-draw");if(!out||!button)return;
    button.onclick=()=>{let n=type==="yesno"?1: type==="career"?4:3,cards=draw(true,n),labels=type==="relationship"?["Your energy","Their energy","The connection"]:type==="career"?["Where you are","What challenges you","What opportunity is present","What to focus on"]:["The card","The influence","The direction"];if(type==="yesno"){let c=cards[0],positive=["The Sun","The Star","The World","The Empress","The Emperor","The Chariot","The Magician","Ace of Cups","Ace of Wands","Ace of Pentacles","Ten of Cups","Ten of Pentacles"].includes(c.name),answer=positive?"YES — explore what supports that answer.":c.isReversed?"NOT YET — reflect on what may need attention first.":"MAYBE — use the card's theme to examine the situation before deciding.";out.innerHTML=`<div class="special-answer">${answer}</div><div class="card-result-grid">${cardMarkup(c,"Your card")}</div>`;bindFav(out);return}out.innerHTML=`<div class="card-result-grid">${cards.map((c,i)=>cardMarkup(c,labels[i])).join("")}</div><div class="reading-actions"><button class="primary-button" id="special-save">Save Reading</button><button class="secondary-button" id="special-copy">Copy Reading</button><button class="secondary-button" id="special-again">Draw Again</button></div>`;requestAnimationFrame(()=>out.querySelectorAll(".reveal-card").forEach((el,i)=>setTimeout(()=>el.classList.add("revealed"),250+i*350)));bindFav(out);out.querySelector("#special-save").onclick=()=>saveReading(cards,type);out.querySelector("#special-copy").onclick=e=>copyText(cards.map((c,i)=>`${labels[i]}: ${c.name} — ${c.isReversed?"Reversed":"Upright"}\n${c.isReversed?c.reversed:c.upright}`).join("\n\n"),e.currentTarget);out.querySelector("#special-again").onclick=()=>button.click()};
  }

  function journal(){
    const root=document.getElementById("journal-app");if(!root)return;
    const list=root.querySelector("#journal-list"),form=root.querySelector("#journal-form");if(!list||!form)return;
    const render=()=>{let entries=read("oracleJournalEntries");list.innerHTML=entries.length?entries.map((e,i)=>`<article class="journal-entry"><div class="journal-meta"><span>${esc(e.date)}</span>${e.card?`<a href="${guide(cardBy(e.card))}">${esc(e.card)}</a>`:"Free reflection"}</div><h3>${esc(e.question||"Reflection")}</h3><p>${esc(e.notes)}</p><div class="journal-entry-actions"><button class="secondary-button" data-edit="${i}">Edit</button><button class="secondary-button" data-del="${i}">Delete</button></div></article>`).join(""): '<div class="empty-state">Your private journal is empty. Entries stay in this browser.</div>';list.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{let a=read("oracleJournalEntries");a.splice(+b.dataset.del,1);save("oracleJournalEntries",a);render()});list.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>{let e=read("oracleJournalEntries")[+b.dataset.edit];form.elements.card.value=e.card||"";form.elements.question.value=e.question||"";form.elements.notes.value=e.notes||"";let a=read("oracleJournalEntries");a.splice(+b.dataset.edit,1);save("oracleJournalEntries",a);render();form.scrollIntoView({behavior:"smooth"})})};
    form.onsubmit=e=>{e.preventDefault();let x=new FormData(form),a=read("oracleJournalEntries");a.unshift({date:new Date().toLocaleString(),card:x.get("card"),question:x.get("question"),notes:x.get("notes")});save("oracleJournalEntries",a.slice(0,200));form.reset();render()};render();
  }

  function favourites(){
    const root=document.getElementById("favourites-app");if(!root)return;
    const render=()=>{let names=read("oracleFavourites");root.innerHTML=names.length?`<div class="favourite-summary"><strong>${names.length}</strong> saved card${names.length===1?"":"s"}</div>`+names.map(n=>{let c=cardBy(n);if(!c)return"";return `<article class="result-card favourite-card"><button class="favorite-button" data-remove="${esc(c.name)}">★</button><img src="${image(c)}" alt="${esc(c.name)}" class="favourite-image"><h2><a href="${guide(c)}">${esc(c.name)}</a></h2><p>${esc(c.category)}</p><p>${esc(c.upright)}</p><label class="favourite-note-label">Your note<input data-note="${esc(c.name)}" value="${esc(read("oracleFavouriteNotes",{})[c.name]||"")}" placeholder="Why do you connect with this card?"></label></article>`}).join(""): '<div class="empty-state">You have no saved cards yet. Save cards from a reading or card guide and they will appear here.</div>';root.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{save("oracleFavourites",read("oracleFavourites").filter(x=>x!==b.dataset.remove));render()});root.querySelectorAll("[data-note]").forEach(i=>i.onchange=()=>{let n=read("oracleFavouriteNotes",{});n[i.dataset.note]=i.value;save("oracleFavouriteNotes",n)});};render();
  }

  function daily(){
    const root=document.getElementById("card-of-the-day");if(!root)return;
    let history=root.parentElement.querySelector(".cotd-history");if(history)return;
    history=document.createElement("section");history.className="tool-panel cotd-history";history.innerHTML='<h2>Your Last 7 Days</h2><p>Use the recent cards as a small pattern to reflect on, rather than a prediction.</p><div class="history-grid"></div>';root.parentElement.insertBefore(history,root.parentElement.querySelector(".tool-actions"));
    const grid=history.querySelector(".history-grid"),today=new Date();today.setHours(12,0,0,0);let html="";for(let i=-6;i<=0;i++){let d=new Date(today);d.setDate(today.getDate()+i);let key=d.toISOString().slice(0,10),h=[...key].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7),c=tarotCards[h%tarotCards.length],rev=h%7===0;html+=`<a class="history-card" href="card-of-the-day.html?day=${i}"><span>${d.toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"})}</span><img src="${image(c)}" alt="${esc(c.name)}"><strong>${esc(c.name)}</strong><small>${rev?"Reversed":"Upright"}</small></a>`}grid.innerHTML=html;
  }

  function journey(){
    const root=document.getElementById("journey-app");if(!root)return;let favs=read("oracleFavourites"),journals=read("oracleJournalEntries"),readings=read("oracleReadings"),lessons=read("oracleLessons"),pct=Math.round(lessons.length/7*100);root.querySelector("[data-stat=cards]").textContent=favs.length;root.querySelector("[data-stat=readings]").textContent=readings.length;root.querySelector("[data-stat=journal]").textContent=journals.length;root.querySelector("[data-stat=lessons]").textContent=pct+"%";let recent=root.querySelector("#journey-recent");recent.innerHTML=readings.slice(0,5).map(r=>`<article class="result-card"><h3>${esc(new Date(r.date).toLocaleDateString())} · ${esc(r.mode)}</h3><p>${r.cards.map(c=>`${esc(c.name)}${c.reversed?" (Reversed)":""}`).join(" • ")}</p></article>`).join("")||'<div class="empty-state">Your reading history will appear here after your first saved reading.</div>';
  }

  reading();specialised();journal();favourites();daily();journey();
})();
