const tarotCards = [

    // ==========================
    // MAJOR ARCANA
    // ==========================

    {
        name: "The Fool",
        file: "00-TheFool.png",
        category: "New beginnings",
        keywords: ["freedom", "adventure", "possibility"],
        upright: "A new journey is opening before you. Step forward with curiosity and trust that experience will teach you what you need to know.",
        reversed: "Pause before taking a careless leap. More preparation or awareness may be needed before you move forward."
    },

    {
        name: "The Magician",
        file: "01-TheMagician.png",
        category: "Manifestation",
        keywords: ["ability", "focus", "creation"],
        upright: "You already possess useful skills and resources. Focus your energy clearly and take purposeful action.",
        reversed: "Your talents may be scattered or underused. Be honest about your intentions and avoid manipulation."
    },

    {
        name: "The High Priestess",
        file: "02-TheHighPriestess.png",
        category: "Intuition",
        keywords: ["mystery", "wisdom", "inner voice"],
        upright: "Quiet your mind and listen to your intuition. Important knowledge may be felt before it can be explained.",
        reversed: "You may be ignoring your instincts or allowing outside noise to drown out your inner guidance."
    },

    {
        name: "The Empress",
        file: "03-TheEmpress.png",
        category: "Abundance",
        keywords: ["nurturing", "creativity", "growth"],
        upright: "Give attention to what you want to grow. Creativity, care and patience can create abundance.",
        reversed: "You may be giving too much or neglecting your own needs. Restore balance through self-care."
    },

    {
        name: "The Emperor",
        file: "04-TheEmperor.png",
        category: "Structure",
        keywords: ["authority", "stability", "leadership"],
        upright: "Clear boundaries and disciplined action will help you create stability and lasting progress.",
        reversed: "Excessive control or rigidity may be causing conflict. Strength does not require domination."
    },

    {
        name: "The Hierophant",
        file: "05-TheHierophant.png",
        category: "Tradition",
        keywords: ["learning", "belief", "guidance"],
        upright: "Established knowledge, tradition or a trusted teacher may offer valuable direction.",
        reversed: "You may need to question an old rule or belief and discover what genuinely feels right for you."
    },

    {
        name: "The Lovers",
        file: "06-TheLovers.png",
        category: "Connection",
        keywords: ["choice", "values", "partnership"],
        upright: "A meaningful relationship or important choice asks you to act in harmony with your deepest values.",
        reversed: "Misalignment or poor communication may be creating distance. Clarify what you truly want."
    },

    {
        name: "The Chariot",
        file: "07-TheChariot.png",
        category: "Determination",
        keywords: ["direction", "victory", "willpower"],
        upright: "Choose your direction and remain focused. Determination can carry you through competing pressures.",
        reversed: "You may be forcing progress without clear direction. Regain control before accelerating."
    },

    {
        name: "Strength",
        file: "08-Strength.png",
        category: "Inner strength",
        keywords: ["courage", "patience", "compassion"],
        upright: "Gentle courage and emotional control are more powerful than force. Trust your ability to handle this.",
        reversed: "Self-doubt or suppressed emotion may be weakening your confidence. Treat yourself with compassion."
    },

    {
        name: "The Hermit",
        file: "09-TheHermit.png",
        category: "Reflection",
        keywords: ["solitude", "wisdom", "searching"],
        upright: "Step away from distraction and seek your own truth. Solitude can bring valuable clarity.",
        reversed: "Isolation may no longer be helping you. Consider reconnecting or asking for trusted support."
    },

    {
        name: "Wheel of Fortune",
        file: "10-WheelOfFortune.png",
        category: "Change",
        keywords: ["cycles", "turning point", "opportunity"],
        upright: "A cycle is shifting. Stay flexible and be ready to use opportunities created by changing circumstances.",
        reversed: "Delays or repeated patterns may feel frustrating. Focus on what you can influence rather than resisting change."
    },

    {
        name: "Justice",
        file: "11-Justice.png",
        category: "Truth",
        keywords: ["fairness", "accountability", "decision"],
        upright: "Consider the facts carefully and act with honesty. Your choices will carry meaningful consequences.",
        reversed: "Bias, avoidance or incomplete information may be affecting your judgement. Seek the full truth."
    },

    {
        name: "The Hanged Man",
        file: "12-TheHangedMan.png",
        category: "Perspective",
        keywords: ["pause", "surrender", "new viewpoint"],
        upright: "A deliberate pause may reveal a perspective you could not see while pushing forward.",
        reversed: "You may be delaying without gaining insight. Decide whether to release, change approach or act."
    },

    {
        name: "Death",
        file: "13-Death.png",
        category: "Transformation",
        keywords: ["ending", "release", "renewal"],
        upright: "An ending is making room for transformation. Release what has completed its purpose.",
        reversed: "Holding onto the past may be delaying necessary change. Letting go can create new life."
    },

    {
        name: "Temperance",
        file: "14-Temperance.png",
        category: "Balance",
        keywords: ["moderation", "patience", "harmony"],
        upright: "Combine patience with steady action. Balance and cooperation will produce better results than extremes.",
        reversed: "Something is out of balance. Slow down and adjust before the situation becomes harder to manage."
    },

    {
        name: "The Devil",
        file: "15-TheDevil.png",
        category: "Attachment",
        keywords: ["temptation", "restriction", "awareness"],
        upright: "Recognise the habit, fear or attachment that is limiting your freedom. Awareness is the first step out.",
        reversed: "You are beginning to reclaim control. Continue breaking patterns that no longer serve you."
    },

    {
        name: "The Tower",
        file: "16-TheTower.png",
        category: "Sudden change",
        keywords: ["disruption", "revelation", "rebuilding"],
        upright: "A sudden truth or disruption may remove an unstable foundation. Rebuild with greater honesty.",
        reversed: "You may be resisting an unavoidable change or quietly managing its effects. Address the weakness directly."
    },

    {
        name: "The Star",
        file: "17-TheStar.png",
        category: "Hope",
        keywords: ["healing", "renewal", "inspiration"],
        upright: "Hope and healing are returning. Continue forward with faith in your ability to recover and grow.",
        reversed: "Discouragement may be clouding your vision. Reconnect with the small signs of progress around you."
    },

    {
        name: "The Moon",
        file: "18-TheMoon.png",
        category: "Uncertainty",
        keywords: ["intuition", "illusion", "subconscious"],
        upright: "Not everything is clear yet. Move carefully and pay attention to dreams, instincts and hidden influences.",
        reversed: "Confusion is beginning to lift, but uncomfortable truths may need to be acknowledged."
    },

    {
        name: "The Sun",
        file: "19-TheSun.png",
        category: "Joy",
        keywords: ["success", "clarity", "vitality"],
        upright: "Confidence, clarity and positive energy support you. Allow yourself to enjoy your progress.",
        reversed: "Happiness is still available, but expectations or temporary setbacks may be dimming it."
    },

    {
        name: "Judgement",
        file: "20-Judgement.png",
        category: "Awakening",
        keywords: ["reflection", "calling", "renewal"],
        upright: "A period of honest reflection can lead to an important awakening and a more purposeful direction.",
        reversed: "Harsh self-judgement or avoidance may be keeping you stuck. Learn from the past without living inside it."
    },

    {
        name: "The World",
        file: "21-TheWorld.png",
        category: "Completion",
        keywords: ["achievement", "integration", "closure"],
        upright: "A significant cycle is reaching completion. Recognise what you have achieved before beginning again.",
        reversed: "Something remains unfinished or unacknowledged. Complete the final step before moving on."
    },


    // ==========================
    // CUPS
    // ==========================

    {
        name: "Ace of Cups",
        file: "Cups01.png",
        category: "Emotional beginning",
        keywords: ["love", "openness", "compassion"],
        upright: "A new emotional or creative beginning is available. Let yourself receive and express genuine feeling.",
        reversed: "Emotions may be blocked, suppressed or overwhelming. Create space to understand what you feel."
    },

    {
        name: "Two of Cups",
        file: "Cups02.png",
        category: "Partnership",
        keywords: ["connection", "mutual respect", "union"],
        upright: "A balanced partnership or meaningful agreement can grow through honesty and equal effort.",
        reversed: "Miscommunication or imbalance may be affecting an important relationship."
    },

    {
        name: "Three of Cups",
        file: "Cups03.png",
        category: "Celebration",
        keywords: ["friendship", "community", "joy"],
        upright: "Support, friendship and shared happiness are available. Celebrate connection with others.",
        reversed: "Social tension, exclusion or overindulgence may need attention."
    },

    {
        name: "Four of Cups",
        file: "Cups04.png",
        category: "Contemplation",
        keywords: ["apathy", "reflection", "opportunity"],
        upright: "You may be emotionally withdrawn or overlooking an opportunity. Examine what is truly missing.",
        reversed: "Interest and motivation may be returning after a period of emotional stagnation."
    },

    {
        name: "Five of Cups",
        file: "Cups05.png",
        category: "Loss",
        keywords: ["grief", "regret", "acceptance"],
        upright: "A disappointment deserves acknowledgement, but not everything has been lost.",
        reversed: "Healing and acceptance are becoming possible. Turn toward what remains."
    },

    {
        name: "Six of Cups",
        file: "Cups06.png",
        category: "Nostalgia",
        keywords: ["memories", "kindness", "innocence"],
        upright: "The past may offer comfort, reconnection or a useful lesson.",
        reversed: "Idealising the past may prevent you from engaging fully with the present."
    },

    {
        name: "Seven of Cups",
        file: "Cups07.png",
        category: "Choices",
        keywords: ["options", "fantasy", "discernment"],
        upright: "Many possibilities are competing for your attention. Separate realistic options from wishful thinking.",
        reversed: "Clarity is returning. Narrow your choices and commit to what matters."
    },

    {
        name: "Eight of Cups",
        file: "Cups08.png",
        category: "Walking away",
        keywords: ["departure", "searching", "release"],
        upright: "It may be time to leave something emotionally unfulfilling and search for deeper meaning.",
        reversed: "Fear or uncertainty may be preventing you from leaving a situation that has run its course."
    },

    {
        name: "Nine of Cups",
        file: "Cups09.png",
        category: "Satisfaction",
        keywords: ["contentment", "wish", "pleasure"],
        upright: "Enjoyment and emotional satisfaction are within reach. Appreciate what is already going well.",
        reversed: "Temporary pleasure may not be providing deeper fulfilment."
    },

    {
        name: "Ten of Cups",
        file: "Cups10.png",
        category: "Emotional fulfilment",
        keywords: ["family", "harmony", "belonging"],
        upright: "Harmony, belonging and shared emotional security are strongly supported.",
        reversed: "Expectations or unresolved tension may be disturbing harmony at home or in relationships."
    },

    {
        name: "Page of Cups",
        file: "Cups11.png",
        category: "Emotional message",
        keywords: ["sensitivity", "curiosity", "intuition"],
        upright: "A heartfelt message, creative idea or intuitive insight may arrive unexpectedly.",
        reversed: "Emotional immaturity or insecurity may make communication unclear."
    },

    {
        name: "Knight of Cups",
        file: "Cups12.png",
        category: "Romantic action",
        keywords: ["charm", "invitation", "idealism"],
        upright: "Follow a sincere emotional or creative invitation while remaining grounded.",
        reversed: "Charm without consistency or unrealistic expectations may cause disappointment."
    },

    {
        name: "Queen of Cups",
        file: "Cups13.png",
        category: "Emotional wisdom",
        keywords: ["empathy", "intuition", "care"],
        upright: "Compassion and emotional insight help you understand what others cannot easily express.",
        reversed: "Emotional overload or poor boundaries may be draining you."
    },

    {
        name: "King of Cups",
        file: "Cups14.png",
        category: "Emotional balance",
        keywords: ["maturity", "diplomacy", "calm"],
        upright: "Respond with emotional maturity, calm leadership and compassion.",
        reversed: "Suppressed emotion, moodiness or manipulation may be influencing the situation."
    },


    // ==========================
    // PENTACLES
    // ==========================

    {
        name: "Ace of Pentacles",
        file: "Pentacles01.png",
        category: "Material opportunity",
        keywords: ["prosperity", "foundation", "potential"],
        upright: "A practical opportunity can grow into lasting security if you nurture it carefully.",
        reversed: "A useful opportunity may be delayed, overlooked or poorly planned."
    },

    {
        name: "Two of Pentacles",
        file: "Pentacles02.png",
        category: "Balance",
        keywords: ["priorities", "adaptability", "time"],
        upright: "Flexible planning will help you balance competing responsibilities.",
        reversed: "Too many demands may be creating instability. Simplify and prioritise."
    },

    {
        name: "Three of Pentacles",
        file: "Pentacles03.png",
        category: "Teamwork",
        keywords: ["skill", "collaboration", "learning"],
        upright: "Cooperation and developing your skills can produce excellent results.",
        reversed: "Poor teamwork, weak standards or lack of recognition may be affecting progress."
    },

    {
        name: "Four of Pentacles",
        file: "Pentacles04.png",
        category: "Security",
        keywords: ["control", "saving", "attachment"],
        upright: "Protecting your resources is sensible, but avoid becoming closed or overly controlling.",
        reversed: "You may need to loosen your grip, improve spending habits or release fear around security."
    },

    {
        name: "Five of Pentacles",
        file: "Pentacles05.png",
        category: "Hardship",
        keywords: ["difficulty", "isolation", "support"],
        upright: "A difficult period may feel isolating, but help may be closer than you realise.",
        reversed: "Recovery is beginning. Accept practical assistance and rebuild steadily."
    },

    {
        name: "Six of Pentacles",
        file: "Pentacles06.png",
        category: "Giving and receiving",
        keywords: ["generosity", "support", "fairness"],
        upright: "Resources, help or knowledge can be exchanged in a fair and beneficial way.",
        reversed: "Support may have conditions attached, or the exchange may be unequal."
    },

    {
        name: "Seven of Pentacles",
        file: "Pentacles07.png",
        category: "Patience",
        keywords: ["assessment", "investment", "progress"],
        upright: "Your efforts need time to mature. Review progress before making major changes.",
        reversed: "Slow results may indicate poor planning, scattered effort or an investment that needs reconsideration."
    },

    {
        name: "Eight of Pentacles",
        file: "Pentacles08.png",
        category: "Mastery",
        keywords: ["practice", "craft", "dedication"],
        upright: "Consistent practice and attention to detail will improve your results.",
        reversed: "Repetition without care or perfectionism may be limiting your progress."
    },

    {
        name: "Nine of Pentacles",
        file: "Pentacles09.png",
        category: "Independence",
        keywords: ["self-reliance", "comfort", "achievement"],
        upright: "Your discipline is creating independence, comfort and well-earned confidence.",
        reversed: "Dependence, overspending or insecurity may be undermining your stability."
    },

    {
        name: "Ten of Pentacles",
        file: "Pentacles10.png",
        category: "Legacy",
        keywords: ["family", "wealth", "long-term security"],
        upright: "Long-term stability, family support or a lasting achievement is strongly indicated.",
        reversed: "Financial disagreement, unstable foundations or conflicting family priorities may need attention."
    },

    {
        name: "Page of Pentacles",
        file: "Pentacles11.png",
        category: "Practical learning",
        keywords: ["study", "opportunity", "planning"],
        upright: "A useful opportunity to learn, train or build something practical is appearing.",
        reversed: "Lack of focus or poor planning may prevent an idea from becoming real."
    },

    {
        name: "Knight of Pentacles",
        file: "Pentacles12.png",
        category: "Reliability",
        keywords: ["routine", "discipline", "persistence"],
        upright: "Slow, dependable effort will take you further than rushing.",
        reversed: "Stubbornness, boredom or lack of progress may require a change in routine."
    },

    {
        name: "Queen of Pentacles",
        file: "Pentacles13.png",
        category: "Practical care",
        keywords: ["security", "resourcefulness", "comfort"],
        upright: "Combine practical judgement with warmth and care. Create security without neglecting wellbeing.",
        reversed: "Work, money or other responsibilities may be causing self-neglect."
    },

    {
        name: "King of Pentacles",
        file: "Pentacles14.png",
        category: "Material mastery",
        keywords: ["success", "stability", "responsibility"],
        upright: "Experienced, responsible management can create lasting success and security.",
        reversed: "Materialism, stubbornness or misuse of authority may be influencing decisions."
    },


    // ==========================
    // SWORDS
    // ==========================

    {
        name: "Ace of Swords",
        file: "Swords01.png",
        category: "Mental clarity",
        keywords: ["truth", "idea", "breakthrough"],
        upright: "A clear idea or important truth can cut through confusion.",
        reversed: "Clouded thinking, misinformation or poor communication may delay progress."
    },

    {
        name: "Two of Swords",
        file: "Swords02.png",
        category: "Difficult decision",
        keywords: ["stalemate", "avoidance", "choice"],
        upright: "A decision cannot be avoided forever. Gather what information you can and choose.",
        reversed: "Overthinking or conflicting information may be making the decision feel overwhelming."
    },

    {
        name: "Three of Swords",
        file: "Swords03.png",
        category: "Heartbreak",
        keywords: ["pain", "truth", "separation"],
        upright: "A painful truth or disappointment needs honest acknowledgement before healing can begin.",
        reversed: "Recovery and forgiveness are becoming possible, though the pain may not be fully resolved."
    },

    {
        name: "Four of Swords",
        file: "Swords04.png",
        category: "Rest",
        keywords: ["recovery", "pause", "quiet"],
        upright: "Step back and give your mind time to recover before taking further action.",
        reversed: "Restlessness or burnout may be signalling that proper recovery is overdue."
    },

    {
        name: "Five of Swords",
        file: "Swords05.png",
        category: "Conflict",
        keywords: ["tension", "victory", "consequences"],
        upright: "Winning at any cost may damage trust. Decide which conflicts are truly worth pursuing.",
        reversed: "Reconciliation may be possible, but accountability and honest communication are required."
    },

    {
        name: "Six of Swords",
        file: "Swords06.png",
        category: "Transition",
        keywords: ["moving on", "recovery", "change"],
        upright: "You are moving away from difficulty, even if the transition feels emotionally complicated.",
        reversed: "Unresolved baggage or resistance may be delaying your move toward calmer circumstances."
    },

    {
        name: "Seven of Swords",
        file: "Swords07.png",
        category: "Strategy",
        keywords: ["secrecy", "planning", "independence"],
        upright: "Use strategy and discretion, but be honest about whether avoidance or secrecy is involved.",
        reversed: "A concealed truth may be exposed, or you may decide to correct a dishonest approach."
    },

    {
        name: "Eight of Swords",
        file: "Swords08.png",
        category: "Restriction",
        keywords: ["fear", "limitation", "perspective"],
        upright: "Fear may be making the situation feel more restrictive than it really is.",
        reversed: "You are beginning to recognise your options and reclaim personal power."
    },

    {
        name: "Nine of Swords",
        file: "Swords09.png",
        category: "Anxiety",
        keywords: ["worry", "guilt", "sleeplessness"],
        upright: "Your mind may be magnifying fear. Seek support and separate real problems from imagined outcomes.",
        reversed: "Anxiety may be easing, or hidden worry may finally be acknowledged."
    },

    {
        name: "Ten of Swords",
        file: "Swords10.png",
        category: "Final ending",
        keywords: ["closure", "collapse", "release"],
        upright: "A painful situation has reached its conclusion. Recovery begins when you accept the ending.",
        reversed: "You may be resisting closure or slowly recovering from a difficult experience."
    },

    {
        name: "Page of Swords",
        file: "Swords11.png",
        category: "Curiosity",
        keywords: ["ideas", "observation", "communication"],
        upright: "Stay curious, gather information and communicate thoughtfully.",
        reversed: "Gossip, impulsive words or incomplete information may create unnecessary trouble."
    },

    {
        name: "Knight of Swords",
        file: "Swords12.png",
        category: "Fast action",
        keywords: ["ambition", "speed", "assertiveness"],
        upright: "Move decisively, but ensure your speed is supported by clear judgement.",
        reversed: "Rushing, aggression or poor planning may create avoidable consequences."
    },

    {
        name: "Queen of Swords",
        file: "Swords13.png",
        category: "Clear judgement",
        keywords: ["honesty", "independence", "boundaries"],
        upright: "Use clear thinking, direct communication and healthy boundaries.",
        reversed: "Pain or bitterness may be making communication excessively harsh."
    },

    {
        name: "King of Swords",
        file: "Swords14.png",
        category: "Intellectual authority",
        keywords: ["logic", "truth", "discipline"],
        upright: "Approach the situation with fairness, reason and disciplined judgement.",
        reversed: "Coldness, manipulation or rigid thinking may be distorting authority."
    },


    // ==========================
    // WANDS
    // ==========================

    {
        name: "Ace of Wands",
        file: "Wands01.png",
        category: "Inspiration",
        keywords: ["energy", "idea", "potential"],
        upright: "A strong creative spark or new direction is ready to be explored.",
        reversed: "Low energy, hesitation or poor timing may be delaying a promising beginning."
    },

    {
        name: "Two of Wands",
        file: "Wands02.png",
        category: "Planning",
        keywords: ["future", "choice", "expansion"],
        upright: "Look beyond your current position and make a practical plan for expansion.",
        reversed: "Fear of the unknown or weak planning may keep you inside familiar limits."
    },

    {
        name: "Three of Wands",
        file: "Wands03.png",
        category: "Expansion",
        keywords: ["progress", "foresight", "opportunity"],
        upright: "Your earlier efforts are beginning to create wider opportunities.",
        reversed: "Delays or limited planning may be restricting growth."
    },

    {
        name: "Four of Wands",
        file: "Wands04.png",
        category: "Celebration",
        keywords: ["home", "stability", "milestone"],
        upright: "A milestone, supportive community or stable foundation deserves celebration.",
        reversed: "Tension at home or instability may be preventing you from fully enjoying progress."
    },

    {
        name: "Five of Wands",
        file: "Wands05.png",
        category: "Competition",
        keywords: ["conflict", "challenge", "difference"],
        upright: "Competition or disagreement can stimulate growth when handled constructively.",
        reversed: "Conflict may be avoided, reduced or pushed beneath the surface."
    },

    {
        name: "Six of Wands",
        file: "Wands06.png",
        category: "Recognition",
        keywords: ["victory", "confidence", "success"],
        upright: "Your work may receive recognition. Accept success without losing perspective.",
        reversed: "A lack of recognition or private self-doubt may be affecting confidence."
    },

    {
        name: "Seven of Wands",
        file: "Wands07.png",
        category: "Defence",
        keywords: ["courage", "position", "persistence"],
        upright: "Stand firm in what matters, even when your position is challenged.",
        reversed: "Exhaustion or overwhelm may make it difficult to keep defending every battle."
    },

    {
        name: "Eight of Wands",
        file: "Wands08.png",
        category: "Momentum",
        keywords: ["speed", "movement", "communication"],
        upright: "Events may move quickly. Respond clearly and use the momentum well.",
        reversed: "Delays, confusion or scattered communication may interrupt progress."
    },

    {
        name: "Nine of Wands",
        file: "Wands09.png",
        category: "Resilience",
        keywords: ["persistence", "boundaries", "experience"],
        upright: "You are tired but capable. Protect your energy and continue with awareness.",
        reversed: "Defensiveness or exhaustion may show that your current approach is no longer sustainable."
    },

    {
        name: "Ten of Wands",
        file: "Wands10.png",
        category: "Burden",
        keywords: ["responsibility", "pressure", "completion"],
        upright: "You may be carrying too much alone. Delegate or release what is not essential.",
        reversed: "You are beginning to reduce responsibilities, or pressure has become impossible to ignore."
    },

    {
        name: "Page of Wands",
        file: "Wands11.png",
        category: "Exploration",
        keywords: ["enthusiasm", "message", "discovery"],
        upright: "A new idea or opportunity invites enthusiastic exploration.",
        reversed: "Unfocused energy, impatience or fear of beginning may block progress."
    },

    {
        name: "Knight of Wands",
        file: "Wands12.png",
        category: "Adventure",
        keywords: ["action", "passion", "impulse"],
        upright: "Move boldly toward what excites you, while remembering to plan for consequences.",
        reversed: "Impulsiveness, frustration or inconsistency may create unnecessary disruption."
    },

    {
        name: "Queen of Wands",
        file: "Wands13.png",
        category: "Confidence",
        keywords: ["charisma", "independence", "warmth"],
        upright: "Confidence, creativity and warmth help you attract support and opportunity.",
        reversed: "Jealousy, insecurity or exhaustion may be hiding your natural confidence."
    },

    {
        name: "King of Wands",
        file: "Wands14.png",
        category: "Vision",
        keywords: ["leadership", "boldness", "enterprise"],
        upright: "Lead with vision and courage. Focus on the larger purpose rather than every small detail.",
        reversed: "Impatience, arrogance or unrealistic expectations may weaken leadership."
    }

];