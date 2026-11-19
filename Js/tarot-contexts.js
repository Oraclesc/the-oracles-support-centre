(function(){
"use strict";
window.setupContextExplorer=function(id,searchId){
 const root=document.getElementById(id),search=document.getElementById(searchId);
 if(!root||!search)return;
 const cards=[...root.querySelectorAll(".context-item")];
 const count=document.getElementById("context-count");
 let mode="love";
 function draw(){
  const q=(search.value||"").trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
   const match=!q||(card.dataset.search||card.textContent).toLowerCase().includes(q);
   card.hidden=!match;
   if(match)visible++;
   card.querySelectorAll(".context-reading").forEach(section=>{
    section.classList.toggle("is-selected",section.querySelector("h3")?.textContent.toLowerCase().startsWith(mode==="yesno"?"yes / no":mode));
   });
  });
  if(count)count.textContent=q?("Showing "+visible+" of "+cards.length+" cards."):("Showing all "+cards.length+" cards.");
 }
 search.addEventListener("input",draw);
 document.querySelectorAll("[data-mode]").forEach(button=>button.addEventListener("click",()=>{
  mode=button.dataset.mode;
  document.querySelectorAll("[data-mode]").forEach(item=>{
   const active=item===button;
   item.classList.toggle("primary-button",active);
   item.classList.toggle("secondary-button",!active);
   item.setAttribute("aria-pressed",String(active));
  });
  draw();
 }));
 draw();
};
})();