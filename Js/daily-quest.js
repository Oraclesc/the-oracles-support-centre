"use strict";
(function(){
  const KEY="oracleDailyQuests.v1";
  const JOURNAL_KEY="oracleJournalEntries";
  const quests=[
    {category:"Card observation",title:"Look beyond the first impression",description:"Choose a tarot card that catches your attention today. Spend a few quiet minutes with its imagery before reaching for a guidebook.",instruction:"Write down three details you can actually see in the card. What feeling do those details create, and how might they change the way you understand the card?"},
    {category:"Symbol study",title:"Follow one symbol",description:"Pick a card and focus on one symbol, object, colour or animal within it.",instruction:"What might this symbol represent? Note one traditional association and one meaning that feels personal to you. Keep the two ideas distinct."},
    {category:"Intuition",title:"Your first three words",description:"Look at a card without checking its meaning first. Let your immediate response arrive naturally.",instruction:"Write the first three words or phrases that come to mind. Then compare them with the card's traditional themes. Where do they overlap, and where do they differ?"},
    {category:"Daily life",title:"Connect a card to real life",description:"Choose a card and think about a small, ordinary moment from your day that it brings to mind.",instruction:"Describe the moment and explain which part of the card's imagery or theme connects with it. What useful perspective does that connection offer?"},
    {category:"Suit exploration",title:"Notice the element",description:"Choose one Minor Arcana card and consider the element of its suit: Cups, Wands, Swords or Pentacles.",instruction:"How does the suit's element show up in the card? Write one example of how that element might appear in everyday life."},
    {category:"Reflection",title:"A question worth sitting with",description:"Choose a card that represents something you would like to understand more clearly.",instruction:"Write one open question inspired by the card. Avoid trying to force an answer; note what the question helps you notice."},
    {category:"Card comparison",title:"Find the contrast",description:"Choose two cards that feel different in mood, energy or message.",instruction:"Describe one clear contrast between them. What might each card encourage you to consider in the same situation?"},
    {category:"Grounded practice",title:"Turn a theme into one small action",description:"Choose a card with a theme you would like to bring into your day, such as patience, courage, balance or curiosity.",instruction:"What is one realistic action you could take today that expresses this theme? Make it small and specific."},
    {category:"Reversals",title:"Explore another angle",description:"Choose a card and consider how its meaning might shift when its energy is blocked, internalised or out of balance.",instruction:"Write one possible expression of the card's upright theme and one possible reversed expression. Which feels most relevant to your reflection, and why?"},
    {category:"Major Arcana",title:"A chapter in the journey",description:"Choose a Major Arcana card and imagine it as a chapter in a longer journey of learning.",instruction:"What might come before this chapter? What might come after it? Write a few lines about the transition the card represents."},
    {category:"Mindful reading",title:"Separate observation from interpretation",description:"Take a card and make two short lists: what is visibly present and what you think it could mean.",instruction:"Record at least three visual observations, then three interpretations. Which interpretations are supported by the imagery, and which come from your own assumptions?"},
    {category:"Personal growth",title:"Recognise a strength",description:"Choose a card that reminds you of a strength, resource or quality you already have.",instruction:"Describe a time you used this strength. How could you make space for it again this week?"},
    {category:"Relationship with self",title:"Offer yourself a kinder reading",description:"Choose a card you find challenging or uncomfortable. Approach it with curiosity rather than judgement.",instruction:"What might this card be inviting you to understand, rather than criticise? Write a compassionate response to its theme."},
    {category:"Tarot history",title:"Compare two traditions",description:"Look at the same card in two decks if you have them available, or compare two guidebook descriptions.",instruction:"Note one similarity and one difference in the imagery or interpretation. How does the deck's artistic approach influence your reading?"},
    {category:"Reading skills",title:"Make the message specific",description:"Choose a broad card meaning, such as change, hope, conflict or stability.",instruction:"Rewrite that broad meaning as a practical observation about a real-life situation. Keep it grounded and avoid treating it as a prediction."},
    {category:"Cups",title:"Explore an emotional current",description:"Choose a Cups card and notice how emotion is represented through its figures, setting and symbols.",instruction:"What emotion or relationship theme stands out? How could you acknowledge that feeling without letting it make the decision for you?"},
    {category:"Wands",title:"Find the spark",description:"Choose a Wands card and explore its relationship with energy, creativity, motivation or action.",instruction:"What deserves your enthusiasm right now? Write one way to direct your energy without overcommitting."},
    {category:"Swords",title:"Untangle a thought",description:"Choose a Swords card and consider the role of ideas, communication, decisions or mental habits.",instruction:"What thought or assumption could use a second look? Write a more balanced alternative."},
    {category:"Pentacles",title:"Bring an idea down to earth",description:"Choose a Pentacles card and explore its connection with time, resources, work, routine or the physical world.",instruction:"What practical step would support the theme of this card? Identify something you can realistically do."},
    {category:"Three-card practice",title:"Read the conversation between cards",description:"Draw or choose three cards and look at them as a group rather than three separate definitions.",instruction:"What connects the cards? Write one sentence for the overall story, then explain how each card contributes to it."},
    {category:"Boundaries",title:"Notice where a boundary helps",description:"Choose a card that brings to mind balance, independence, care or responsibility.",instruction:"Where might a clearer boundary support your wellbeing or focus? Describe one respectful boundary you could communicate or practise."},
    {category:"Gratitude",title:"Spot what is already working",description:"Choose a card that helps you notice support, progress or something worth appreciating.",instruction:"Write down two things that are already helping you. How does the card change the way you see them?"},
    {category:"Creative practice",title:"Give the card a voice",description:"Imagine the figure or central image on a card could offer one sentence of advice.",instruction:"Write that sentence, then explain which details in the image inspired it. What would you add or question about the advice?"},
    {category:"Pattern spotting",title:"Notice a repeating theme",description:"Think about recent readings or cards you have studied. Look for a theme that has appeared more than once.",instruction:"Name the repeating theme and consider why it has caught your attention. What is one grounded way to explore it further?"},
    {category:"Card meanings",title:"Teach a card in your own words",description:"Choose a card you know reasonably well and explain it without copying a guidebook.",instruction:"Write a short explanation in your own words, including one helpful expression of the card and one potential challenge."},
    {category:"Perspective",title:"Try a different viewpoint",description:"Choose a card that you usually interpret in one particular way.",instruction:"Write a second interpretation that is still consistent with the imagery but comes from a different viewpoint. What new possibility does it reveal?"},
    {category:"Mindful pause",title:"Take a moment before drawing",description:"Before choosing a card, pause and notice what is on your mind. You do not need to solve anything immediately.",instruction:"Write what you are bringing into the reading today. What would help you approach the cards with openness and a little patience?"},
    {category:"Learning",title:"Return to a card you misunderstood",description:"Choose a card that once confused you or that you tend to avoid.",instruction:"What made it difficult to understand? What have you learned since then, and what would you like to explore next?"},
    {category:"Integration",title:"Connect tarot with action",description:"Choose a card from a recent reading and revisit the reflection you wrote at the time.",instruction:"What still feels useful? What has changed? Record one insight you want to carry forward and one thing you can now let go of."},
    {category:"Weekly reflection",title:"Celebrate a small step",description:"Think back over your recent tarot practice, even if it was only a few minutes.",instruction:"What is one thing you understand a little better now? What would you like to practise next? Give yourself credit for showing up."}
  ];
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}};
  const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}};
  const localDate=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
  const dayNumber=key=>Math.floor(Date.UTC(+key.slice(0,4),+key.slice(5,7)-1,+key.slice(8,10))/86400000);
  const today=localDate(),index=((dayNumber(today)%quests.length)+quests.length)%quests.length,quest=quests[index];
  const root=document.getElementById("daily-quest");if(!root)return;
  const $=id=>document.getElementById(id);
  const history=read(KEY,[]);
  const current=history.find(x=>x.date===today);
  $("quest-category").textContent=quest.category;
  $("quest-date").textContent=new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  $("quest-title").textContent=quest.title;
  $("quest-description").textContent=quest.description;
  $("quest-instruction").textContent=quest.instruction;
  const response=$("quest-reflection"),button=$("complete-quest"),status=$("quest-status");
  if(current){response.value=current.reflection||"";response.disabled=true;button.disabled=true;button.textContent="Quest Completed ✓";status.textContent="You've completed today's quest. Your reflection is saved in your Tarot Journal.";}
  const completed=()=>history.map(x=>x.date);
  const streak=()=>{let n=0,d=today;while(completed().includes(d)){n++;const p=new Date(d+"T12:00:00");p.setDate(p.getDate()-1);d=localDateFrom(p);}return n;};
  function localDateFrom(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
  $("quest-streak").textContent=streak();
  $("quest-total").textContent=history.length;
  const list=$("quest-history");
  list.innerHTML=history.length?history.slice(0,7).map(x=>'<article class="journal-entry quest-history-item"><div class="journal-meta"><span>'+new Date(x.date+"T12:00:00").toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short",year:"numeric"})+'</span><span class="pill">'+x.category+'</span></div><h3>'+x.title+'</h3><p>'+String(x.reflection||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))+'</p></article>').join(""):'<div class="empty-state">Your completed quests will appear here. Complete today's quest to start your record.</div>';
  button.addEventListener("click",()=>{
    if(history.some(x=>x.date===today)){status.textContent="Today's quest is already complete.";return;}
    const reflection=response.value.trim();
    if(!reflection){status.textContent="Add a short reflection before completing your quest.";response.focus();return;}
    const entry={date:new Date().toLocaleString(),card:"",question:"Daily Quest: "+quest.title,notes:"Today's quest: "+quest.title+"\n"+quest.instruction+"\n\nMy reflection:\n"+reflection};
    const journal=read(JOURNAL_KEY,[]);
    journal.unshift(entry);
    if(!write(JOURNAL_KEY,journal.slice(0,200))){status.textContent="Your browser could not save this entry. Check available storage and try again.";return;}
    const record={date:today,title:quest.title,category:quest.category,reflection};
    history.unshift(record);
    if(!write(KEY,history.slice(0,365))){journal.shift();write(JOURNAL_KEY,journal);status.textContent="Your browser could not save quest progress. Please try again.";return;}
    response.disabled=true;button.disabled=true;button.textContent="Quest Completed ✓";
    status.textContent="Quest completed! Your reflection has been added to your private Tarot Journal.";
    $("quest-total").textContent=history.length;$("quest-streak").textContent=streak();
    list.innerHTML='<article class="journal-entry quest-history-item"><div class="journal-meta"><span>Today</span><span class="pill">'+quest.category+'</span></div><h3>'+quest.title+'</h3><p>'+reflection.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))+'</p></article>'+list.innerHTML.replace(/<div class="empty-state">[\s\S]*?<\/div>/,"");
  });
})();
