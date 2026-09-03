(function(){
  "use strict";
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}};
  const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
  const lessonsTotal=12;
  const resources=[
    ["cards.html"],
    ["major-arcana.html"],
    ["minor-arcana.html"],
    ["cups.html","swords.html","wands.html","pentacles.html"],
    ["tarot-symbolism.html"],
    ["reversed-tarot-cards.html"],
    ["tarot-questions.html"],
    ["tarot-spreads.html"],
    ["how-to-read-tarot.html"],
    ["tarot-combinations.html"],
    ["tarot-journal.html"],
    ["reading.html"]
  ];
  const ref=document.referrer;
  if(ref){try{
    const refUrl=new URL(ref);
    const refPage=refUrl.pathname.split("/").pop().toLowerCase();
    if(refUrl.origin===location.origin){
      const visits=read("oracleStudyVisits",{});
      visits[refPage]=visits[refPage]||new Date().toISOString();
      save("oracleStudyVisits",visits);
      const completed=new Set(read("oracleLessons",[]));
      resources.forEach((items,i)=>{if(items.every(x=>visits[x]))completed.add(i)});
      save("oracleLessons",[...completed].sort((a,b)=>a-b));
    }
  }catch(e){}
  }
  const lessons=read("oracleLessons",[]);
  const journal=read("oracleJournalEntries",[]);
  const readings=read("oracleReadings",[]);
  const favourites=read("oracleFavourites",[]);
  const done=Array.isArray(lessons)?lessons.length:0;
  const percent=Math.min(100,Math.round(done/lessonsTotal*100));
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
  const bar=document.getElementById("home-school-progress");
  if(bar){bar.style.width=percent+"%";bar.setAttribute("aria-valuenow",String(percent))}
  set("home-school-percent",percent+"%");
  set("home-school-count",done+" of "+lessonsTotal+" lessons complete");
  set("home-journal-count",journal.length);
  set("home-reading-count",readings.length);
  set("home-favourite-count",favourites.length);
  const next=Math.min(done+1,lessonsTotal);
  const nextLabel=document.getElementById("home-next-lesson");
  if(nextLabel)nextLabel.textContent=done>=lessonsTotal?"All 12 lessons complete — keep practising!":"Next up: Lesson "+next;
})();