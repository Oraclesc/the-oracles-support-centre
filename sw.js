const CACHE_NAME="oracle-support-v19";
const CORE=["/","/index.html","/cards.html","/guides.html","/reading.html","/tools.html","/card-of-the-day.html","/learn-tarot.html","/tarot-journal.html","/tarot-combinations.html","/card-search.html","/favourites.html","/ask-the-tarot.html","/relationship-reading.html","/career-reading.html","/yes-no-reading.html","/my-tarot-journey.html","/css/style.css","/css/tools.css","/css/home-v2-final.css","/data/tarot-data.js","/Js/script.js","/Js/tools.js","/Js/daily.js","/Js/phase12.js","/Js/phase3.js","/Js/home-v2-final.js","/Js/home-journey.js","/Js/school-progress.js","/images/moon.webp","/images/card-back.webp"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE_NAME).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
async function addSchoolTracking(response){
  const type=response.headers.get("content-type")||"";
  if(!type.includes("text/html"))return response;
  const html=await response.text();
  if(html.includes("Js/school-progress.js"))return new Response(html,{status:response.status,statusText:response.statusText,headers:response.headers});
  const injected=html.replace(/<\/body>/i,'<script src="/Js/school-progress.js?v=6"></script></body>');
  const headers=new Headers(response.headers);
  headers.set("content-type","text/html; charset=utf-8");
  return new Response(injected,{status:response.status,statusText:response.statusText,headers});
}
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  if(e.request.mode==="navigate"){
    e.respondWith((async()=>{
      const cached=await caches.match(e.request);
      if(cached){try{return await addSchoolTracking(cached)}catch{return cached}}
      try{const network=await fetch(e.request);const copy=network.clone();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)));return await addSchoolTracking(network)}catch{return cached||new Response("Offline",{status:503})}
    })());
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));return r;}).catch(()=>cached)));
});
