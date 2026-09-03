"use strict";
(function(){
  const lessons=[
    {title:"The Tarot Deck",resources:["cards.html"]},
    {title:"Major Arcana",resources:["major-arcana.html"]},
    {title:"Minor Arcana",resources:["minor-arcana.html"]},
    {title:"The Four Suits",resources:["cups.html","swords.html","wands.html","pentacles.html"]},
    {title:"Numbers & Court Cards",resources:["tarot-symbolism.html"]},
    {title:"Upright & Reversed Cards",resources:["reversed-tarot-cards.html"]},
    {title:"Ask Better Questions",resources:["tarot-questions.html"]},
    {title:"Learn a Spread",resources:["tarot-spreads.html"]},
    {title:"Read the Image",resources:["how-to-read-tarot.html"]},
    {title:"Read Card Combinations",resources:["tarot-combinations.html"]},
    {title:"Practise With a Journal",resources:["tarot-journal.html"]},
    {title:"Build Your Own Reading Style",resources:["reading.html"]}
  ];
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}};
  const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
  const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const visits=read("oracleStudyVisits",{});
  visits[page]=new Date().toISOString();
  save("oracleStudyVisits",visits);
  const completed=new Set(Array.isArray(read("oracleLessons",[]))?read("oracleLessons",[]):[]);
  lessons.forEach((lesson,index)=>{
    if(lesson.resources.every(resource=>visits[resource])) completed.add(index);
  });
  save("oracleLessons",[...completed].sort((a,b)=>a-b));
  const current=lessons.findIndex(lesson=>lesson.resources.includes(page));
  if(current<0)return;
  const lesson=lessons[current];
  const studied=lesson.resources.filter(resource=>visits[resource]).length;
  const complete=completed.has(current);
  const banner=document.createElement("aside");
  banner.className="school-study-banner";
  banner.setAttribute("aria-label","Tarot School progress");
  banner.innerHTML=`<div><strong>🎓 Tarot School · Lesson ${current+1}</strong><span>${complete?"✓ Lesson complete":"Study progress: "+studied+" of "+lesson.resources.length+" resources viewed"}</span></div><a href="learn-tarot.html">${complete?"Review your lesson →":"View your school progress →"}</a>`;
  const main=document.querySelector("main");
  if(main)main.insertBefore(banner,main.firstElementChild);
})();
