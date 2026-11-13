// Generates the 78 static tarot guide pages.
const fs=require("fs"),vm=require("vm"),path=require("path");
const src=fs.readFileSync(path.join(__dirname,"../data/tarot-data.js"),"utf8"),box={};vm.createContext(box);vm.runInContext(src+";this.cards=tarotCards;",box);const cards=box.cards,root=path.join(__dirname,"..");
function slug(n){return n.toLowerCase().replace(/the /g,"the-").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
function esc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;")}
function suit(c){if(!c)return"Major Arcana";if(/^Cups/.test(c.file)||/ of Cups$/.test(c.name))return"Cups";if(/^Pentacles/.test(c.file)||/ of Pentacles$/.test(c.name))return"Pentacles";if(/^Swords/.test(c.file)||/ of Swords$/.test(c.name))return"Swords";if(/^Wands/.test(c.file)||/ of Wands$/.test(c.name))return"Wands";return"Major Arcana"}
const suitFocus={Cups:["feelings, relationships and emotional exchange","Notice what is being felt, expressed, received or held back."],Pentacles:["work, resources, routines and practical security","Look for the real-world action, resource or habit that can make the situation more stable."],Swords:["thought, communication, truth and decisions","Separate facts from assumptions and notice which conversation, belief or decision needs attention."],Wands:["energy, creativity, ambition and direction","Notice where your energy is going and whether your enthusiasm has a clear, sustainable direction."],"Major Arcana":["larger themes, turning points and personal development","Consider what wider lesson, transition or value is becoming important rather than reducing the card to one event."]};
const majorLens={"The Fool":"beginning before certainty","The Magician":"using ability with intention","The High Priestess":"quiet knowledge and inner listening","The Empress":"care, creativity and growth","The Emperor":"structure, boundaries and responsibility","The Hierophant":"learning, tradition and chosen beliefs","The Lovers":"connection, values and meaningful choice","The Chariot":"direction, discipline and momentum","Strength":"courage expressed through patience","The Hermit":"solitude, study and self-trust","Wheel of Fortune":"cycles, timing and adaptation","Justice":"truth, fairness and accountability","The Hanged Man":"pause, surrender and perspective","Death":"release and transformation","Temperance":"balance and integration","The Devil":"attachment, temptation and awareness","The Tower":"disruption and honest rebuilding","The Star":"hope, renewal and inspiration","The Moon":"uncertainty, intuition and discernment","The Sun":"clarity, confidence and vitality","Judgement":"reflection, awakening and renewal","The World":"completion, integration and achievement"};
const rankLens={Ace:"a fresh opening",Two:"a choice, pairing or balance",Three:"growth through cooperation",Four:"stability, rest or consolidation",Five:"challenge, friction or disruption",Six:"movement toward balance or recovery",Seven:"assessment, conviction or strategy",Eight:"momentum, repetition or focused effort",Nine:"maturity, resilience or the final stretch",Ten:"completion, consequence or a larger pattern",Page:"learning, curiosity or a new message",Knight:"pursuit, movement or active expression",Queen:"mature inner understanding",King:"mature outer responsibility"};
const cardInsights = {
  "The Fool": [
    "The Fool is not simply about being carefree. Its deeper question is whether openness is helping you learn or allowing you to overlook a responsibility.",
    "You are considering a new course, job or project. The card supports curiosity, but the useful next step is to understand the commitment before saying yes."
  ],
  "The Magician": [
    "The Magician links intention with execution: having an idea is only the beginning; tools, timing and focused effort turn it into something real.",
    "You have several resources available but feel stuck. List what you already know, who can help and the first action that would make progress visible."
  ],
  "The High Priestess": [
    "The High Priestess asks you to make room for quiet observation. Intuition can be valuable, but it should be distinguished from fear, wishful thinking and missing information.",
    "A conversation feels unclear. Rather than decide what the other person secretly means, notice your response and ask a calm, direct question when appropriate."
  ],
  "The Empress": [
    "The Empress is about creating conditions in which something can flourish. Care is active work, but it also needs boundaries so that giving does not become depletion.",
    "A project or relationship needs attention. Choose one practical way to nurture it while protecting time and energy for yourself."
  ],
  "The Emperor": [
    "The Emperor's structure is most helpful when it creates safety and direction, not when control becomes an end in itself.",
    "A team or household lacks clear responsibilities. Agree who owns each task and what decisions they can make without waiting for permission."
  ],
  "The Hierophant": [
    "The Hierophant invites learning from established systems while asking whether their values genuinely fit you. Tradition can guide without removing personal judgement.",
    "You are learning a skill or facing a formal process. Find a reliable teacher or source, then understand the reasons behind the rules rather than following them blindly."
  ],
  "The Lovers": [
    "The Lovers is not only a romance card. Its central theme is alignment: choosing in a way that brings actions, relationships and personal values closer together.",
    "Two options both appeal to you. Compare them by the values each supports, not only by which feels easiest today."
  ],
  "The Chariot": [
    "The Chariot is controlled movement, not speed for its own sake. Progress depends on keeping competing impulses pointed in a chosen direction.",
    "You have several deadlines competing for attention. Pick the priority that matters most, set a realistic route and avoid changing direction every time pressure rises."
  ],
  "Strength": [
    "Strength describes influence through patience, compassion and self-command. It is often quieter than force and does not require pretending that difficult feelings are absent.",
    "A disagreement is becoming heated. Pause, name what matters to you and respond firmly without trying to overpower the other person."
  ],
  "The Hermit": [
    "The Hermit distinguishes restorative solitude from withdrawal. Time alone is useful when it produces insight that can eventually be brought back into life.",
    "You feel overwhelmed by opinions. Take time to research and reflect, then decide what advice is genuinely relevant instead of isolating indefinitely."
  ],
  "Wheel of Fortune": [
    "The Wheel highlights changing conditions and recurring cycles. It does not promise luck; it asks you to recognise what is shifting and adapt without assuming you control everything.",
    "A plan has changed unexpectedly. Identify what remains within your influence and revise the next step rather than treating the disruption as a final verdict."
  ],
  "Justice": [
    "Justice asks for proportion, evidence and accountability. It is not merely about receiving what you deserve; it also asks you to examine your own part fairly.",
    "A disagreement has two competing accounts. Separate what you know from what you assume, check records where possible and apply the same standard to everyone."
  ],
  "The Hanged Man": [
    "The Hanged Man is a deliberate pause that changes perspective. Waiting is useful only when it reveals something or makes a conscious sacrifice worthwhile.",
    "You are pushing at a problem without progress. Stop repeating the same approach and ask what changes if you look at the situation from another person's position."
  ],
  "Death": [
    "Death represents a transition whose old form cannot simply be restored. The emphasis is on making room for what follows, not predicting literal loss.",
    "A role or routine no longer fits. Identify what has genuinely run its course and what needs to be carried forward into the next phase."
  ],
  "Temperance": [
    "Temperance is the craft of combining differences gradually. Balance is not perfect stillness; it is the ongoing adjustment that keeps things workable.",
    "Your schedule is overloaded. Make a small sustainable change and review it, rather than trying to fix everything through an extreme new routine."
  ],
  "The Devil": [
    "The Devil brings attention to attachments, bargains and habits that can feel powerful because they are familiar. Recognition creates room to choose; shame rarely helps.",
    "You keep returning to a habit that conflicts with your goals. Notice the trigger and the short-term reward, then make one practical change to the pattern."
  ],
  "The Tower": [
    "The Tower exposes a structure that may already be unstable. Its value is in honest recognition and rebuilding on firmer ground, not in assuming disaster is inevitable.",
    "A plan has failed because an assumption was wrong. Work out what the evidence has shown, protect what still matters and rebuild the plan around reality."
  ],
  "The Star": [
    "The Star is a form of hope that allows recovery and renewed direction. It is not a guarantee that everything will resolve without effort.",
    "After a difficult period, choose one small activity that restores confidence or connection, and give recovery time instead of demanding instant results."
  ],
  "The Moon": [
    "The Moon describes uncertainty, mixed signals and the difficulty of seeing clearly. It asks you to stay curious without treating every fear or impression as fact.",
    "You have incomplete information about a situation. Write down what is known, what is suspected and what needs checking before making a major decision."
  ],
  "The Sun": [
    "The Sun brings visibility, warmth and uncomplicated recognition. Its clarity is strongest when success can be enjoyed honestly rather than exaggerated.",
    "A project is going well. Acknowledge the progress, share credit fairly and use the confidence gained to decide what deserves attention next."
  ],
  "Judgement": [
    "Judgement is a reckoning with experience: reviewing what has happened, accepting responsibility and deciding how to respond differently.",
    "An old issue has returned. Instead of replaying it automatically, identify what you understand now and what decision would reflect that learning."
  ],
  "The World": [
    "The World concerns completion that integrates the whole journey. Finishing matters, but so does recognising what you have learned and preparing for a new cycle.",
    "You have reached a milestone. Record what worked, close any loose ends and decide whether the next step is expansion, rest or a different goal."
  ],
  "Ace of Cups": [
    "The Ace of Cups is an opening for emotional connection, compassion or creative feeling. An opening is an invitation, not proof that another person will respond in kind.",
    "You feel drawn to reconnect or begin something meaningful. Express your feelings honestly while allowing the other person room to choose their response."
  ],
  "Two of Cups": [
    "The Two of Cups emphasises mutuality: connection is strongest when attention, respect and willingness move in both directions.",
    "A partnership is forming. Talk about expectations early and notice whether both people contribute rather than assuming chemistry alone will sustain it."
  ],
  "Three of Cups": [
    "The Three of Cups celebrates shared joy and support beyond a single pair. It can also remind you to make room for community rather than carrying everything alone.",
    "You have good news or a milestone. Share it with people who support you and let celebration strengthen the relationships around you."
  ],
  "Four of Cups": [
    "The Four of Cups can show emotional saturation: when attention is fixed on disappointment, a new possibility may be hard to notice. It does not mean you must accept every offer.",
    "You feel uninspired by the options available. Give yourself space to understand the dissatisfaction, then check whether you have dismissed a workable alternative too quickly."
  ],
  "Five of Cups": [
    "The Five of Cups acknowledges grief and disappointment without making them the whole story. What remains may matter, but it should not be used to rush someone past loss.",
    "A plan has fallen through. Allow yourself to recognise the setback, then identify what support or remaining opportunity is available when you are ready."
  ],
  "Six of Cups": [
    "The Six of Cups brings memory, familiarity and earlier experiences into the present. Nostalgia can comfort, but the past should not be mistaken for a complete guide to today.",
    "An old friend or opportunity returns. Appreciate the history while checking whether the situation and both people have changed."
  ],
  "Seven of Cups": [
    "The Seven of Cups is the challenge of too many imagined possibilities. Discernment means testing attractive ideas against evidence, priorities and practical limits.",
    "You have several exciting options. Write down what each requires, what is realistic and which choice best matches your current priorities."
  ],
  "Eight of Cups": [
    "The Eight of Cups is a conscious departure when something no longer provides enough meaning. Leaving may be necessary, but clarity about what you are seeking matters too.",
    "A familiar role feels empty despite its apparent success. Explore what is missing and plan a responsible transition rather than leaving solely to escape discomfort."
  ],
  "Nine of Cups": [
    "The Nine of Cups asks what satisfaction really means to you. Enjoyment is valid, but short-term pleasure and deeper fulfilment are not always the same.",
    "You reach a personal goal. Take time to enjoy it and ask what would make the achievement meaningful beyond external approval."
  ],
  "Ten of Cups": [
    "The Ten of Cups imagines emotional belonging and shared wellbeing. It is less about a perfect family picture than the everyday conditions that help people feel accepted.",
    "A group wants greater harmony. Discuss what support looks like to each person and make space for differences instead of demanding a perfect image."
  ],
  "Page of Cups": [
    "The Page of Cups approaches feelings with curiosity and creative openness. Its sensitivity is a strength when paired with enough grounding to interpret signals carefully.",
    "You receive an unexpected invitation or idea. Stay open, ask what it involves and let curiosity develop without deciding immediately that it must become something huge."
  ],
  "Knight of Cups": [
    "The Knight of Cups follows an ideal or emotional invitation. The card values sincerity but asks whether promises and gestures are supported by consistent action.",
    "Someone makes an appealing proposal. Appreciate the intention while checking the practical details and whether follow-through matches the words."
  ],
  "Queen of Cups": [
    "The Queen of Cups combines empathy with emotional boundaries. Understanding another person's feelings does not mean taking responsibility for managing them.",
    "A friend needs support. Listen carefully, offer compassion and be honest about what help you can realistically provide."
  ],
  "King of Cups": [
    "The King of Cups represents emotional steadiness: feelings are acknowledged and guided rather than denied or allowed to dictate every response.",
    "A tense situation needs a calm presence. Recognise the emotion in the room, then respond in a way that is fair and measured."
  ],
  "Ace of Pentacles": [
    "The Ace of Pentacles is a tangible seed: an opportunity becomes valuable through planning, resources and repeated care.",
    "A new job, course or financial idea appears. Check the terms, costs and time commitment, then decide what first step would make it viable."
  ],
  "Two of Pentacles": [
    "The Two of Pentacles is active prioritisation under changing demands. Flexibility helps, but constant juggling can hide the need to say no.",
    "Two commitments compete for the same time. Review deadlines and consequences, then renegotiate one commitment rather than relying on endless multitasking."
  ],
  "Three of Pentacles": [
    "The Three of Pentacles values skilled collaboration and useful feedback. Good work improves when roles and standards are clear.",
    "A project needs several skills. Agree the outcome, divide responsibilities and ask for specific feedback before small problems become expensive."
  ],
  "Four of Pentacles": [
    "The Four of Pentacles asks when security becomes rigidity. Saving and protecting resources can be sensible, but excessive holding may prevent necessary exchange or growth.",
    "You are reluctant to spend or share time. Check whether the caution is proportionate to the risk or whether fear is blocking a reasonable investment."
  ],
  "Five of Pentacles": [
    "The Five of Pentacles recognises material or emotional hardship and the isolation that can accompany it. It also asks whether support is available but difficult to approach.",
    "Money or work feels uncertain. Identify practical support, speak to someone trustworthy and focus on the next manageable need rather than facing everything alone."
  ],
  "Six of Pentacles": [
    "The Six of Pentacles explores giving, receiving and the power balance between them. Generosity is healthiest when expectations and dignity are respected.",
    "You are offering help or receiving it. Be clear about whether it is a gift, loan or exchange, and avoid using support to create obligation or control."
  ],
  "Seven of Pentacles": [
    "The Seven of Pentacles is an honest review of effort and return. Patience matters, but so does recognising when a method needs adjustment.",
    "You have invested months in a goal. Review measurable progress, decide what is worth continuing and change the approach if the evidence calls for it."
  ],
  "Eight of Pentacles": [
    "The Eight of Pentacles is deliberate practice: improvement comes from attention, repetition and willingness to correct mistakes.",
    "You want to improve a skill. Set a small practice target, seek feedback and track the quality of the work rather than only the hours spent."
  ],
  "Nine of Pentacles": [
    "The Nine of Pentacles values self-reliance and the ability to enjoy what careful effort has created. Independence can include accepting support by choice.",
    "You reach a point of greater financial or personal independence. Enjoy the freedom while maintaining the habits that make it sustainable."
  ],
  "Ten of Pentacles": [
    "The Ten of Pentacles looks beyond an immediate result to long-term stability, shared resources and what is passed between generations or communities.",
    "A family or business is making a long-term plan. Consider maintenance, fairness and future needs as well as the immediate benefit."
  ],
  "Page of Pentacles": [
    "The Page of Pentacles learns by turning interest into a practical plan. Curiosity becomes useful when it is followed by study and steady application.",
    "You want to learn something new. Choose a realistic course or practice routine and define what you want to be able to do after the first month."
  ],
  "Knight of Pentacles": [
    "The Knight of Pentacles makes progress through reliability and repetition. Its caution is useful until consistency becomes resistance to necessary change.",
    "A task is taking longer than expected. Keep the dependable routine, but review whether the method still works and whether a small improvement is possible."
  ],
  "Queen of Pentacles": [
    "The Queen of Pentacles joins practical care with resourcefulness. She asks how to make everyday life supportive without neglecting personal needs.",
    "You are caring for others while managing work and home. Simplify one routine and make sure your own rest and resources are included in the plan."
  ],
  "King of Pentacles": [
    "The King of Pentacles is stewardship: managing resources responsibly and building something that can endure. Security is measured by sound judgement, not display.",
    "You are responsible for a budget or team. Make decisions using clear figures, plan for maintenance and consider the long-term effects on everyone involved."
  ],
  "Ace of Swords": [
    "The Ace of Swords is the arrival of a clear idea, question or truth that cuts through confusion. Clarity still needs careful communication and evidence.",
    "A complicated issue becomes easier to define. Write the central question in one sentence and identify what information would confirm or challenge your view."
  ],
  "Two of Swords": [
    "The Two of Swords shows a stalemate maintained by avoiding a difficult choice or limiting information. A pause can help, but indefinite avoidance has a cost.",
    "You cannot decide between two options. Identify what fact is missing, what each choice would require and when you will revisit the decision."
  ],
  "Three of Swords": [
    "The Three of Swords gives language to hurt, disappointment or a truth that is painful to face. It should not be used to assume betrayal without evidence.",
    "A conversation has hurt you. Name what was said and how it affected you, then decide whether clarification, a boundary or time is needed."
  ],
  "Four of Swords": [
    "The Four of Swords treats rest as part of recovery and clear thinking, not as laziness. A pause is most useful when it allows energy to return.",
    "You have been working without a break. Schedule genuine downtime and decide what can wait until you can approach it with a clearer mind."
  ],
  "Five of Swords": [
    "The Five of Swords questions the cost of winning. A technically successful argument may still damage trust or leave the real problem unresolved.",
    "A disagreement becomes competitive. Ask what outcome would actually improve the situation and whether continuing the argument serves that purpose."
  ],
  "Six of Swords": [
    "The Six of Swords is gradual movement away from difficulty. Progress may be quiet and incomplete, but a calmer environment can make recovery possible.",
    "You are leaving a stressful situation. Plan the practical transition and accept that feeling better may take longer than making the initial change."
  ],
  "Seven of Swords": [
    "The Seven of Swords concerns strategy, privacy and selective disclosure, but it also asks whether avoidance or dishonesty is creating extra risk.",
    "You are tempted to avoid an awkward conversation. Consider what genuinely needs privacy and what should be addressed openly before trust is damaged."
  ],
  "Eight of Swords": [
    "The Eight of Swords explores how fear and assumptions can narrow perceived choices. The limits may be real in part, but they deserve to be examined rather than accepted wholesale.",
    "You feel trapped by a problem. List the constraints you cannot change and the choices you still have, however small, then test one of them."
  ],
  "Nine of Swords": [
    "The Nine of Swords gives space to worry, guilt and sleepless rumination. A thought can feel convincing at night without being a complete account of reality.",
    "You are replaying a mistake. Separate what you can repair from what you cannot change, and seek support if worry is disrupting daily life."
  ],
  "Ten of Swords": [
    "The Ten of Swords marks an ending or a point where continuing the same approach is no longer viable. It can be painful, but it also removes the need to pretend nothing has changed.",
    "A project has definitively ended. Acknowledge the loss, close what needs closing and identify one lesson to carry forward without defining yourself by the setback."
  ],
  "Page of Swords": [
    "The Page of Swords is alert, questioning and eager to learn. Curiosity is valuable when it checks sources and avoids turning fragments into conclusions.",
    "You hear a rumour or encounter a surprising claim. Verify the source, ask precise questions and resist sharing it as fact before checking."
  ],
  "Knight of Swords": [
    "The Knight of Swords moves quickly toward an idea or objective. Decisiveness can help, but speed without listening may create avoidable conflict.",
    "You want to challenge a decision immediately. Prepare the facts, consider the likely response and choose a moment when the point can be heard."
  ],
  "Queen of Swords": [
    "The Queen of Swords values clear judgement and direct communication shaped by experience. Boundaries can be firm without becoming cruel or dismissive.",
    "You need to say no. Be concise about the boundary, avoid unnecessary blame and leave less room for misunderstanding."
  ],
  "King of Swords": [
    "The King of Swords represents principled reasoning and responsibility for decisions. Logic is strongest when it remains open to evidence and human consequences.",
    "You must make a difficult policy or work decision. Set transparent criteria, apply them consistently and explain the reasoning to those affected."
  ],
  "Ace of Wands": [
    "The Ace of Wands is a spark of motivation or creative potential. Inspiration is powerful at the beginning, but it needs a first experiment to become more than excitement.",
    "An idea energises you. Try a small prototype or first session before committing significant money or time."
  ],
  "Two of Wands": [
    "The Two of Wands looks beyond the immediate comfort zone and compares possible directions. Planning turns ambition into a choice with consequences.",
    "You are deciding whether to expand or stay with what works. Compare the risks, resources and likely trade-offs before choosing a direction."
  ],
  "Three of Wands": [
    "The Three of Wands is the stage when initial effort begins to meet the wider world. It asks you to look ahead, follow up and adjust expectations to what returns.",
    "You have launched something and are waiting for results. Review early feedback, maintain useful contacts and prepare the next step rather than simply waiting."
  ],
  "Four of Wands": [
    "The Four of Wands marks a stable base, shared achievement or a moment worth celebrating. The foundation matters as much as the event.",
    "A team finishes an important stage. Recognise everyone's contribution and use the milestone to strengthen the routines that made it possible."
  ],
  "Five of Wands": [
    "The Five of Wands describes competing energies, ideas or ambitions. Disagreement can improve a result when people share fair rules and a common purpose.",
    "A group has several competing suggestions. Give each idea a fair hearing, agree how to decide and keep debate focused on the work rather than personalities."
  ],
  "Six of Wands": [
    "The Six of Wands concerns visible progress and recognition. Praise can motivate, but it is healthiest when confidence remains connected to effort and shared contribution.",
    "You receive recognition for your work. Accept it, acknowledge help from others and decide how to build on the result without becoming dependent on approval."
  ],
  "Seven of Wands": [
    "The Seven of Wands is the effort of maintaining a position under pressure. It asks which principles are worth defending and which battles drain energy unnecessarily.",
    "Others challenge your decision. Explain the reasons calmly, stand by what matters and remain willing to revise details if new evidence appears."
  ],
  "Eight of Wands": [
    "The Eight of Wands brings acceleration, messages and developments that may arrive close together. Momentum is useful when communication remains organised.",
    "Several updates arrive at once. Confirm priorities, respond to the time-sensitive points and avoid confusing speed with the need to answer everything immediately."
  ],
  "Nine of Wands": [
    "The Nine of Wands shows resilience after repeated effort, alongside the fatigue that can make further demands feel threatening. Persistence should include recovery.",
    "You are close to finishing a demanding task. Protect your remaining energy, ask for practical help and avoid treating every new request as another test of endurance."
  ],
  "Ten of Wands": [
    "The Ten of Wands asks whether responsibility has become an unsustainable load. Completing the task may require delegation, simplification or admitting that the scope is too large.",
    "You are carrying too many commitments. List what only you can do, what can be shared and what can be postponed or removed."
  ],
  "Page of Wands": [
    "The Page of Wands is enthusiastic exploration: a willingness to try, learn and follow an interesting lead before the whole route is known.",
    "You discover a new interest. Explore it with a low-cost first step and notice whether the excitement remains once the practical work begins."
  ],
  "Knight of Wands": [
    "The Knight of Wands pursues experience with boldness and speed. Its challenge is to keep enthusiasm connected to preparation and follow-through.",
    "You want to make a sudden change. Check the consequences, decide what preparation is essential and avoid making promises that depend on sustained energy you may not have."
  ],
  "Queen of Wands": [
    "The Queen of Wands combines confidence, warmth and independent initiative. Her presence is inviting because she is comfortable taking up space without needing to dominate.",
    "You are leading a group or presenting an idea. Be visible, encourage others to contribute and let confidence come from preparation rather than performance."
  ],
  "King of Wands": [
    "The King of Wands turns vision into direction and inspires action through a clear purpose. Leadership requires making room for others to help shape the route.",
    "You have a long-term idea for a team or business. Explain the destination, agree the first milestones and invite people with different strengths to improve the plan."
  ]
};
function rank(c){if(!c.name.includes(" of "))return"";return c.name.split(" of ")[0]}
function header(t,d,u){return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(t)}</title><meta name="description" content="${esc(d)}"><link rel="canonical" href="${u}"><meta property="og:title" content="${esc(t)}"><meta property="og:description" content="${esc(d)}"><meta property="og:url" content="${u}"><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/tools.css"><link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#170629"><script async src="https://www.googletagmanager.com/gtag/js?id=G-6YM3CKSZLR"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-6YM3CKSZLR');</script><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2517381819553976" crossorigin="anonymous"></script></head><body><div class="page"><img class="moon" src="images/moon.webp" alt="" aria-hidden="true"><header class="site-header"><a class="logo" href="index.html">☾ The Oracle's Support Centre</a><nav aria-label="Main navigation"><a href="index.html">Home</a><a href="reading.html">Free Reading</a><a href="cards.html">Tarot Cards</a><a href="guides.html">Guides</a><a href="tools.html">Tools</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav></header>`}
function footer(){return `<footer class="site-footer"><div class="footer-logo">🌙 The Oracle's Support Centre</div><p class="footer-tagline">Free Tarot Readings • Personal Reflection • Guidance</p><div class="footer-links"><a href="index.html">Home</a><a href="reading.html">Free Reading</a><a href="cards.html">Tarot Cards</a><a href="guides.html">Guides</a><a href="tools.html">Tools</a><a href="about.html">About</a><a href="contact.html">Contact</a></div><div class="footer-links footer-small"><a href="privacy.html">Privacy Policy</a><a href="disclaimer.html">Disclaimer</a><a href="terms.html">Terms</a><a href="cookies.html">Cookie Policy</a></div><p class="footer-copy">© 2026 The Oracle's Support Centre<br>All Rights Reserved.</p></footer></div><script src="data/tarot-data.js"></script><script src="Js/script.js"></script><script src="Js/tools.js"></script></body></html>`}
for(const c of cards){const s=suit(c),r=rank(c),keywords=(c.keywords||[]).map(String),k1=keywords[0]||"awareness",k2=keywords[1]||"context",k3=keywords[2]||"choice",lens=c.name.includes(" of ")?`${r?rankLens[r]||"a stage of development":"a developing theme"} through ${s.toLowerCase()} themes`:majorLens[c.name]||c.category.toLowerCase();const focus=suitFocus[s],desc=`Explore ${c.name} tarot card meaning with upright and reversed interpretations, relationships, career, personal growth, symbolism, advice and reflection questions.`;const u=`https://oraclesupportcentre.com/${slug(c.name)}.html`;const core=`${c.name} brings ${k1}, ${k2} and ${k3} into focus. At its centre is ${lens}. Rather than treating the card as a fixed prediction, use these themes to describe what may be happening and what deserves your attention.`;const context=`For this card, start with the question you actually asked. Then notice how ${k1} or ${k2} changes the meaning. The same card can feel supportive, challenging or neutral depending on the position, surrounding cards and real circumstances.`;const love=`In love and relationships, consider how ${k1} is being expressed between people. ${s==="Cups"?"Emotional honesty and reciprocity are especially worth noticing.":s==="Swords"?"Clear communication matters more than assumptions about what another person thinks.":s==="Wands"?"Shared enthusiasm is useful when it is matched by compatible direction.":s==="Pentacles"?"Reliability, practical effort and consistency can reveal more than promises alone.":"Look for the values, choices and patterns that shape the connection."} Ask whether the card describes a feeling, a behaviour, a relationship pattern or a choice that needs to be made.`;const career=`For work, study or projects, use ${c.name} to examine ${k2} and ${k3}. ${focus[1]} A useful question is: what would a realistic next step look like if I acted on the card's theme without overinterpreting it?`;const growth=`For personal growth, explore the relationship between ${k1} and ${k2}. Notice one habit, reaction or belief that matches the card, then imagine a healthier or more deliberate version of it. Small observations are often more useful than trying to force a dramatic change.`;const symbolism=`Let the artwork speak before you reach for a definition. Notice the visual detail that catches your attention first, then connect it to ${k1}, ${k2} or ${k3}. Record your own impression and compare it with the traditional meaning. This keeps intuition involved without treating every symbol as having only one possible answer.`;const advice=`If ${c.name} appears in a reading, try this: name the strongest theme, connect it to the position in the spread, and identify one action or observation you can test in real life. ${c.isReversed?"A reversal can also invite you to consider what is blocked, internal, delayed or excessive.":"An upright card does not guarantee an outcome; it describes an energy or perspective you can explore."}`;const questions=[`Where do I currently notice ${k1} in relation to my question?`,`What is ${c.name} helping me see about ${k2}?`,`What would change if I approached this situation with more awareness of ${k3}?`];const insight=cardInsights[c.name];if(!insight)throw new Error(`Missing card-specific insight for ${c.name}`);const uniqueSection=`<section class="tool-panel card-specific-insight" style="margin-top:22px"><h2>A closer look at ${esc(c.name)}</h2><p>${esc(insight[0])}</p><h3>How this can appear in everyday life</h3><p>${esc(insight[1])}</p><p><strong>Reading check:</strong> Which part of this example is supported by the question and the surrounding cards, and which part would be an assumption?</p></section>`;const practiceQuestion=s==="Cups"?"How can I understand the emotional side of this situation?":s==="Swords"?"What do I need to think through or communicate more clearly?":s==="Wands"?"Where would focused energy or a fresh approach help?":s==="Pentacles"?"What practical step could make this situation more stable?":`What wider lesson or turning point deserves my attention in this situation?`;
const workedExample=`<section class="tool-panel card-worked-example" style="margin-top:22px"><h2>Worked example: reading ${esc(c.name)} in context</h2><p><strong>Practice question:</strong> “${esc(practiceQuestion)}” This is a fictional learning prompt. It is deliberately open, so the card can be explored without pretending to know a fixed outcome.</p><p><strong>Step 1 — Start with this card's themes:</strong> ${esc(c.upright)} The keywords ${keywords.map(esc).join(", ")} offer a starting point, not a checklist that must all apply at once.</p><p><strong>Step 2 — Choose what is relevant:</strong> ${esc(context)} For this question, identify the one phrase or theme that most directly addresses what was asked. Explain why it fits the question and the card's position before adding a wider interpretation.</p><p><strong>Step 3 — Test a different angle:</strong> ${esc(c.reversed)} Even when the card appears upright, its reversed meaning can be a useful contrast: it asks what an unhelpful extreme, obstacle or overlooked perspective might look like. Do not assume a reversal is automatically negative.</p><p><strong>Step 4 — Connect it to real circumstances:</strong> ${esc(advice)} Check the interpretation against what you actually know. A card cannot verify another person's thoughts, diagnose a problem or guarantee what will happen.</p><p><strong>Step 5 — Write a grounded response:</strong> Complete this sentence in your own words: “The theme I want to pay attention to is ______. One small, sensible thing I can do or find out is ______.” The second blank should be something within your control.</p></section>`;let h=header(`${c.name} Tarot Card Meaning | The Oracle's Support Centre`,desc,u);h+=`<main class="tool-page card-guide"><section class="tool-hero"><p class="eyebrow">${esc(s)} · ${esc(c.category)}</p><h1>${esc(c.name)}</h1><p>${esc(core)}</p></section><section class="tool-panel"><div class="mini-card"><img src="images/cards/${esc(c.file)}" alt="${esc(c.name)} tarot card"><div><span class="pill">${esc(s)}</span><span class="pill">${esc(c.category)}</span><p><strong>Keywords:</strong> ${keywords.map(esc).join(", ")}</p><button class="secondary-button" data-fav="${esc(c.name)}">☆ Save favourite</button></div></div></section><div class="tool-grid" style="margin-top:22px"><article class="tool-card"><h2>Upright Meaning</h2><p>${esc(c.upright)}</p></article><article class="tool-card"><h2>Reversed Meaning</h2><p>${esc(c.reversed)}</p></article><article class="tool-card"><h2>What This Card Brings Into Focus</h2><p>${esc(context)}</p></article><article class="tool-card"><h2>Love & Relationships</h2><p>${esc(love)}</p></article><article class="tool-card"><h2>Career & Work</h2><p>${esc(career)}</p></article><article class="tool-card"><h2>Personal Growth</h2><p>${esc(growth)}</p></article><article class="tool-card"><h2>Symbolism & Intuition</h2><p>${esc(symbolism)}</p></article><article class="tool-card"><h2>Practical Advice</h2><p>${esc(advice)}</p></article></div>${uniqueSection}${workedExample}<section class="tool-panel" style="margin-top:22px"><h2>Reflection Questions</h2><ul>${questions.map(q=>`<li>${esc(q)}</li>`).join("")}</ul></section><section class="tool-panel" style="margin-top:22px"><h2>Continue Your Tarot Study</h2><p>Compare this card with another card, save it to your favourites, or record your own interpretation in the journal.</p><div class="tool-actions"><a class="primary-button" href="tarot-combinations.html">Compare two cards</a><a class="secondary-button" href="tarot-journal.html?card=${encodeURIComponent(c.name)}">Journal about ${esc(c.name)}</a><a class="secondary-button" href="cards.html">Browse all cards</a></div></section></main>`+footer();fs.writeFileSync(path.join(root,slug(c.name)+".html"),h)}
console.log(`Generated ${cards.length} card guides.`);