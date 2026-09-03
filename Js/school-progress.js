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
  lessons.forEach((lesson,index)=>{if(lesson.resources.every(resource=>visits[resource]))completed.add(index)});
  save("oracleLessons",[...completed].sort((a,b)=>a-b));
  const journeyStat=document.querySelector('#journey-app [data-stat="lessons"]');
  if(journeyStat)journeyStat.textContent=Math.min(100,Math.round(completed.size/lessons.length*100))+"%";
  const school=document.querySelector("#learn-tarot-app");
  if(school){
    const intro=school.querySelector(".tool-hero p:not(.eyebrow)");
    if(intro)intro.textContent="Work through twelve lessons in order. Read the linked study material and your progress is recorded automatically in this browser. You can also mark a lesson complete manually when you feel ready.";
    school.querySelectorAll(".lesson-toggle").forEach(button=>{if(!button.textContent.includes("Completed"))button.textContent="Mark Lesson Complete"});
  }
  const current=lessons.findIndex(lesson=>lesson.resources.includes(page));
  if(current<0)return;
  const lesson=lessons[current];
  const studied=lesson.resources.filter(resource=>visits[resource]).length;
  const complete=completed.has(current);
  const style=document.createElement("style");
  style.textContent=".school-study-banner{display:flex;align-items:center;justify-content:space-between;gap:18px;width:min(100% - 32px,1120px);margin:18px auto 0;padding:13px 17px;border:1px solid rgba(212,175,55,.34);border-radius:14px;background:linear-gradient(135deg,rgba(212,175,55,.10),rgba(98,76,170,.12));box-shadow:0 8px 24px rgba(0,0,0,.16)}.school-study-banner div{display:flex;align-items:center;flex-wrap:wrap;gap:10px}.school-study-banner strong{color:#f0d77d}.school-study-banner span{color:rgba(255,255,255,.78);font-size:.9rem}.school-study-banner a{color:#f0d77d;font-weight:700;text-decoration:none;white-space:nowrap}.school-study-banner a:hover{color:#fff}@media(max-width:600px){.school-study-banner{width:calc(100% - 22px);align-items:flex-start;flex-direction:column}.school-study-banner a{white-space:normal}}";
  document.head.appendChild(style);
  const banner=document.createElement("aside");
  banner.className="school-study-banner";
  banner.setAttribute("aria-label","Tarot School progress");
  banner.innerHTML=`<div><strong>🎓 Tarot School · Lesson ${current+1}: ${lesson.title}</strong><span>${complete?"✓ Lesson complete":"Study progress: "+studied+" of "+lesson.resources.length+" resources viewed"}</span></div><a href="learn-tarot.html">${complete?"Review your lesson →":"View your school progress →"}</a>`;
  const main=document.querySelector("main");
  if(main)main.insertBefore(banner,main.firstElementChild);
})();
