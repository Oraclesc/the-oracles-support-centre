"use strict";

/* ==========================
   PAGE ELEMENTS
========================== */

const tarotGrid =
    document.getElementById("tarot-grid");

const cardSearch =
    document.getElementById("card-search");

const filterButtons =
    document.querySelectorAll(".filter-button");

const cardCount =
    document.getElementById("card-count");

const noCardResults =
    document.getElementById("no-card-results");

const cardModal =
    document.getElementById("card-modal");

const closeModalButton =
    document.getElementById("close-modal");

const modalCardImage =
    document.getElementById("modal-card-image");

const modalCardName =
    document.getElementById("modal-card-name");

const modalCardGroup =
    document.getElementById("modal-card-group");

const modalCardKeywords =
    document.getElementById("modal-card-keywords");

const modalUpright =
    document.getElementById("modal-upright");

const modalReversed =
    document.getElementById("modal-reversed");


/* ==========================
   CURRENT SETTINGS
========================== */

let currentFilter = "all";

let currentSearch = "";

let lastFocusedElement = null;


/* ==========================
   START THE PAGE
========================== */

if (
    typeof tarotCards === "undefined" ||
    !Array.isArray(tarotCards)
) {

    cardCount.textContent =
        "The tarot card database could not be loaded.";

} else {

    displayCards(tarotCards);

}


/* ==========================
   DISPLAY CARDS
========================== */

function displayCards(cardsToDisplay) {

    tarotGrid.innerHTML = "";

    cardsToDisplay.forEach(function (tarotCard) {

        const cardGroup =
            getCardGroup(tarotCard);

        const cardButton =
            document.createElement("button");

        cardButton.type = "button";

        cardButton.className =
            "library-card";

        cardButton.dataset.cardName =
            tarotCard.name;

        cardButton.setAttribute(
            "aria-label",
            "Read the meaning of " + tarotCard.name
        );

        const image =
            document.createElement("img");

        image.src =
            "images/cards/" + tarotCard.file;

        image.alt =
            tarotCard.name;

        image.loading =
            "lazy";

        const information =
            document.createElement("span");

        information.className =
            "library-card-information";

        const group =
            document.createElement("span");

        group.className =
            "library-card-group";

        group.textContent =
            formatGroupName(cardGroup);

        const name =
            document.createElement("span");

        name.className =
            "library-card-name";

        name.textContent =
            tarotCard.name;

        information.appendChild(group);
        information.appendChild(name);

        cardButton.appendChild(image);
        cardButton.appendChild(information);

        cardButton.addEventListener(
            "click",
            function () {

                openCardModal(tarotCard);

            }
        );

        tarotGrid.appendChild(cardButton);

    });

    updateResultCount(cardsToDisplay.length);

}


/* ==========================
   IDENTIFY CARD GROUP
========================== */

function getCardGroup(tarotCard) {

    const filename =
        tarotCard.file.toLowerCase();

    if (filename.startsWith("cups")) {
        return "cups";
    }

    if (filename.startsWith("pentacles")) {
        return "pentacles";
    }

    if (filename.startsWith("swords")) {
        return "swords";
    }

    if (filename.startsWith("wands")) {
        return "wands";
    }

    return "major";

}


/* ==========================
   FORMAT GROUP NAME
========================== */

function formatGroupName(group) {

    if (group === "major") {
        return "Major Arcana";
    }

    return (
        group.charAt(0).toUpperCase() +
        group.slice(1)
    );

}


/* ==========================
   SEARCH
========================== */

cardSearch.addEventListener(
    "input",
    function () {

        currentSearch =
            cardSearch.value
                .trim()
                .toLowerCase();

        filterCards();

    }
);


/* ==========================
   FILTER BUTTONS
========================== */

filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(
                function (filterButton) {

                    filterButton.classList.remove(
                        "active"
                    );

                }
            );

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            filterCards();

        }
    );

});


/* ==========================
   APPLY SEARCH AND FILTER
========================== */

function filterCards() {

    const filteredCards =
        tarotCards.filter(function (tarotCard) {

            const cardGroup =
                getCardGroup(tarotCard);

            const matchesGroup =
                currentFilter === "all" ||
                cardGroup === currentFilter;

            const searchableText =
                (
                    tarotCard.name +
                    " " +
                    tarotCard.category +
                    " " +
                    tarotCard.keywords.join(" ")
                ).toLowerCase();

            const matchesSearch =
                searchableText.includes(
                    currentSearch
                );

            return (
                matchesGroup &&
                matchesSearch
            );

        });

    displayCards(filteredCards);

    noCardResults.hidden =
        filteredCards.length !== 0;

}


/* ==========================
   RESULT COUNT
========================== */

function updateResultCount(numberOfCards) {

    if (numberOfCards === 1) {

        cardCount.textContent =
            "Showing 1 tarot card.";

        return;

    }

    cardCount.textContent =
        "Showing " +
        numberOfCards +
        " tarot cards.";

}


/* ==========================
   OPEN CARD MODAL
========================== */

function openCardModal(tarotCard) {

    lastFocusedElement =
        document.activeElement;

    const group =
        getCardGroup(tarotCard);

    modalCardImage.src =
        "images/cards/" +
        tarotCard.file;

    modalCardImage.alt =
        tarotCard.name;

    modalCardName.textContent =
        tarotCard.name;

    modalCardGroup.textContent =
        formatGroupName(group);

    modalCardKeywords.textContent =
        tarotCard.keywords.join(" • ");

    modalUpright.textContent =
        tarotCard.upright;

    modalReversed.textContent =
        tarotCard.reversed;

    cardModal.hidden = false;

    document.body.classList.add(
        "modal-open"
    );

    closeModalButton.focus();

}


/* ==========================
   CLOSE CARD MODAL
========================== */

function closeCardModal() {

    cardModal.hidden = true;

    document.body.classList.remove(
        "modal-open"
    );

    modalCardImage.removeAttribute("src");

    if (lastFocusedElement) {

        lastFocusedElement.focus();

    }

}


/* ==========================
   MODAL EVENTS
========================== */

closeModalButton.addEventListener(
    "click",
    closeCardModal
);

cardModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target.hasAttribute(
                "data-close-modal"
            )
        ) {

            closeCardModal();

        }

    }
);

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            !cardModal.hidden
        ) {

            closeCardModal();

        }

    }
);