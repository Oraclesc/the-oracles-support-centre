/* The Oracle's Support Centre — Homepage V2 */
(() => {
    const nameEl=document.getElementById("daily-card-name"),keywordsEl=document.getElementById("daily-card-keywords"),messageEl=document.getElementById("daily-card-message"),numberEl=document.getElementById("daily-card-number"),colourEl=document.getElementById("daily-card-colour"),promptEl=document.getElementById("daily-card-prompt"),imageEl=document.getElementById("daily-card-image"),linkEl=document.getElementById("daily-card-link");
    if(!nameEl||typeof tarotCards==="undefined"||!Array.isArray(tarotCards)||!tarotCards.length)return;
    const now=new Date(),daySeed=Math.floor(new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime()/86400000),card=tarotCards[daySeed%tarotCards.length];
    const colours=["Silver","Gold","Indigo","Emerald","Rose","Sky Blue","Violet","Amber","Pearl","Deep Blue"],prompts=["What deserves more of my attention today?","What am I ready to understand differently?","Where could I be more patient with myself?","What would a calmer response look like?","What am I learning from this situation?","What can I appreciate before moving forward?","Where would a clearer boundary help me?","What possibility have I not considered yet?","What am I ready to release?","What small step would feel meaningful today?"];
    nameEl.textContent=card.name;keywordsEl.textContent=card.keywords.map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" • ");messageEl.textContent=card.upright;numberEl.textContent=((daySeed+card.name.length)%9)+1;colourEl.textContent=colours[(daySeed+card.name.length)%colours.length];promptEl.textContent=prompts[(daySeed+card.keywords.length)%prompts.length];
    if(imageEl&&card.file){imageEl.alt=`${card.name} tarot card`;imageEl.src=`images/cards/${card.file}`;}
    if(linkEl){const slug=card.name.toLowerCase().replace(/the /g,"the-").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");linkEl.href=`${slug}.html`;linkEl.textContent=`Explore ${card.name}`;}
    if(!document.querySelector('link[rel="manifest"]')){const m=document.createElement("link");m.rel="manifest";m.href="manifest.webmanifest";document.head.appendChild(m)}
    if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
})();
