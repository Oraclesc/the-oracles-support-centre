
/*
  The Oracle's Support Centre — Homepage V2
  Card of the Day uses the existing tarotCards array from data/tarot-data.js.
*/

(() => {
    const nameEl = document.getElementById("daily-card-name");
    const keywordsEl = document.getElementById("daily-card-keywords");
    const messageEl = document.getElementById("daily-card-message");
    const numberEl = document.getElementById("daily-card-number");
    const colourEl = document.getElementById("daily-card-colour");
    const promptEl = document.getElementById("daily-card-prompt");
    const imageEl = document.getElementById("daily-card-image");
    const linkEl = document.getElementById("daily-card-link");

    if (
        !nameEl ||
        typeof tarotCards === "undefined" ||
        !Array.isArray(tarotCards) ||
        tarotCards.length === 0
    ) {
        return;
    }

    const now = new Date();
    const daySeed = Math.floor(
        new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86400000
    );

    const card = tarotCards[daySeed % tarotCards.length];

    const colours = [
        "Silver", "Gold", "Indigo", "Emerald", "Rose",
        "Sky Blue", "Violet", "Amber", "Pearl", "Deep Blue"
    ];

    const prompts = [
        "What deserves more of my attention today?",
        "What am I ready to understand differently?",
        "Where could I be more patient with myself?",
        "What would a calmer response look like?",
        "What am I learning from this situation?",
        "What can I appreciate before moving forward?",
        "Where would a clearer boundary help me?",
        "What possibility have I not considered yet?",
        "What am I ready to release?",
        "What small step would feel meaningful today?"
    ];

    const luckyNumber = ((daySeed + card.name.length) % 9) + 1;
    const colour = colours[(daySeed + card.name.length) % colours.length];
    const prompt = prompts[(daySeed + card.keywords.length) % prompts.length];

    nameEl.textContent = card.name;
    keywordsEl.textContent = card.keywords
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" • ");
    messageEl.textContent = card.upright;
    numberEl.textContent = luckyNumber;
    colourEl.textContent = colour;
    promptEl.textContent = prompt;

  if (imageEl && card.file) {
    imageEl.alt = `${card.name} tarot card`;
    imageEl.src = `images/cards/${card.file}`;
}

    if (linkEl) {
        linkEl.href = "cards.html";
        linkEl.textContent = `Explore ${card.name}`;
    }
})();
