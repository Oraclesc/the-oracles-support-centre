"use strict";


/* ==========================
   PAGE ELEMENTS
========================== */

const beginButton =
    document.getElementById("begin-reading");

const drawButton =
    document.getElementById("draw-card");

const readingSection =
    document.getElementById("reading");

const card =
    document.querySelector(".card");

const cardImage =
    document.getElementById("card-image");

const cardName =
    document.getElementById("card-name");

const cardOrientation =
    document.getElementById("card-orientation");

const cardCategory =
    document.getElementById("card-category");

const cardKeywords =
    document.getElementById("card-keywords");

const cardMessage =
    document.getElementById("card-message");

const shuffleMessage =
    document.getElementById("shuffle-message");

const typeButtons =
    document.querySelectorAll(".type-button");

    const readingAdvertisement =
    document.getElementById(
        "reading-advertisement"
    );


/* ==========================
   SETTINGS
========================== */

const shuffleDuration = 1800;

let lastCardIndex = -1;

let isDrawing = false;

let currentReading = "general";


/* ==========================
   CHECK READING PAGE ELEMENTS
========================== */

const readingPageReady =
    drawButton &&
    card &&
    cardImage &&
    cardName &&
    cardOrientation &&
    cardCategory &&
    cardKeywords &&
    cardMessage &&
    shuffleMessage;


/* ==========================
   PRELOAD ALL CARD IMAGES
========================== */

function preloadTarotImages() {

    if (
        typeof tarotCards === "undefined" ||
        !Array.isArray(tarotCards)
    ) {
        return;
    }

    tarotCards.forEach(function (tarotCard) {

        if (!tarotCard.file) {
            return;
        }

        const image = new Image();

        image.src =
            "images/cards/" +
            tarotCard.file;

    });

}


/* ==========================
   BEGIN READING BUTTON
========================== */

if (beginButton && readingSection) {

    beginButton.addEventListener(
        "click",
        function () {

            readingSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}


/* ==========================
   READING TYPE BUTTONS
========================== */

if (typeButtons.length > 0) {

    typeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                typeButtons.forEach(
                    function (typeButton) {

                        typeButton.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add("active");

                currentReading =
                    button.dataset.type ||
                    "general";

            }
        );

    });

}


/* ==========================
   DRAW A CARD
========================== */

if (readingPageReady) {

    drawButton.addEventListener(
        "click",
        async function () {

            if (isDrawing) {
                return;
            }

            if (
                typeof tarotCards === "undefined" ||
                !Array.isArray(tarotCards) ||
                tarotCards.length === 0
            ) {

                shuffleMessage.textContent =
                    "The tarot database could not be loaded.";

                return;

            }

            isDrawing = true;

            drawButton.disabled = true;
            drawButton.textContent =
                "Shuffling...";

            clearReading();

            card.classList.remove(
                "flipped"
            );

            card.classList.add(
                "shuffling"
            );

            shuffleMessage.textContent =
                "The cards are being shuffled...";

            const selectedIndex =
                chooseCardIndex();

            const selectedCard =
                tarotCards[selectedIndex];

            const isReversed =
                Math.random() < 0.35;

            lastCardIndex =
                selectedIndex;

            const imagePath =
                "images/cards/" +
                selectedCard.file;

            try {

                await Promise.all([
                    wait(shuffleDuration),
                    loadCardImage(imagePath)
                ]);

                showCard(
                    selectedCard,
                    isReversed,
                    imagePath
                );

                card.classList.remove(
                    "shuffling"
                );

                window.requestAnimationFrame(
                    function () {

                        window.requestAnimationFrame(
                            function () {

                                card.classList.add(
                                    "flipped"
                                );

                            }
                        );

                    }
                );

shuffleMessage.textContent =
    "Your card has been revealed.";

if (readingAdvertisement) {

    readingAdvertisement.classList.add(
        "visible"
    );

}

drawButton.disabled = false;

                drawButton.textContent =
                    "Draw Another Card";

                isDrawing = false;

            } catch (error) {

                console.error(error);

                card.classList.remove(
                    "shuffling"
                );

                shuffleMessage.textContent =
                    "The card was selected, but its image could not be loaded.";

                cardMessage.textContent =
                    "Check that the image filename in tarot-data.js exactly matches the file inside images/cards.";

                drawButton.disabled = false;

                drawButton.textContent =
                    "Try Again";

                isDrawing = false;

            }

        }
    );

}


/* ==========================
   WAIT FUNCTION
========================== */

function wait(milliseconds) {

    return new Promise(
        function (resolve) {

            window.setTimeout(
                resolve,
                milliseconds
            );

        }
    );

}


/* ==========================
   LOAD SELECTED IMAGE
========================== */

function loadCardImage(imagePath) {

    return new Promise(
        function (resolve, reject) {

            const image =
                new Image();

            image.onload =
                function () {

                    resolve();

                };

            image.onerror =
                function () {

                    reject(
                        new Error(
                            "Card image could not be loaded: " +
                            imagePath
                        )
                    );

                };

            image.src =
                imagePath;

            if (
                image.complete &&
                image.naturalWidth > 0
            ) {

                resolve();

            }

        }
    );

}


/* ==========================
   CHOOSE RANDOM CARD
========================== */

function chooseCardIndex() {

    if (tarotCards.length === 1) {
        return 0;
    }

    let randomIndex;

    do {

        randomIndex =
            Math.floor(
                Math.random() *
                tarotCards.length
            );

    } while (
        randomIndex === lastCardIndex
    );

    return randomIndex;

}


/* ==========================
   FIND READING MESSAGE
========================== */

function getReadingMessage(
    selectedCard,
    isReversed
) {

    const orientation =
        isReversed
            ? "reversed"
            : "upright";

    const categoryReading =
        selectedCard.readings &&
        selectedCard.readings[currentReading];

    if (
        categoryReading &&
        typeof categoryReading === "object" &&
        categoryReading[orientation]
    ) {

        return categoryReading[orientation];

    }

    if (
        categoryReading &&
        typeof categoryReading === "string"
    ) {

        return categoryReading;

    }

    if (
        selectedCard[currentReading] &&
        typeof selectedCard[currentReading] === "object" &&
        selectedCard[currentReading][orientation]
    ) {

        return selectedCard[currentReading][orientation];

    }

    if (
        selectedCard[currentReading] &&
        typeof selectedCard[currentReading] === "string"
    ) {

        return selectedCard[currentReading];

    }

    return isReversed
        ? selectedCard.reversed
        : selectedCard.upright;

}


/* ==========================
   DISPLAY SELECTED CARD
========================== */

function showCard(
    selectedCard,
    isReversed,
    imagePath
) {

    cardImage.src =
        imagePath;

    cardImage.alt =
        selectedCard.name +
        (
            isReversed
                ? " reversed"
                : ""
        );

    cardImage.classList.toggle(
        "reversed",
        isReversed
    );

    cardOrientation.textContent =
        isReversed
            ? "Reversed"
            : "Upright";

    cardName.textContent =
        selectedCard.name ||
        "Unknown Card";

    cardCategory.textContent =
        selectedCard.category ||
        "";

    if (
        Array.isArray(
            selectedCard.keywords
        )
    ) {

        cardKeywords.textContent =
            selectedCard.keywords.join(
                " • "
            );

    } else {

        cardKeywords.textContent =
            selectedCard.keywords ||
            "";

    }

    cardMessage.textContent =
        getReadingMessage(
            selectedCard,
            isReversed
        );

}


/* ==========================
   CLEAR PREVIOUS READING
========================== */

function clearReading() {

    cardOrientation.textContent = "";
    cardName.textContent = "";
    cardCategory.textContent = "";
    cardKeywords.textContent = "";
    cardMessage.textContent = "";

    cardImage.removeAttribute(
        "src"
    );

    cardImage.alt = "";

    cardImage.classList.remove(
        "reversed"
    );
if (readingAdvertisement) {

    readingAdvertisement.classList.remove(
        "visible"
    );

}
}


/* ==========================
   IMAGE ERROR HANDLING
========================== */

if (cardImage) {

    cardImage.addEventListener(
        "error",
        function () {

            cardImage.removeAttribute(
                "src"
            );

            cardImage.alt =
                "The tarot card image could not be loaded.";

            if (cardMessage) {

                cardMessage.textContent =
                    "The card was selected, but its image could not be found. Check that its filename matches tarot-data.js exactly.";

            }

            if (card) {

                card.classList.remove(
                    "shuffling"
                );

            }

            if (drawButton) {

                drawButton.disabled = false;

                drawButton.textContent =
                    "Try Again";

            }

            isDrawing = false;

        }
    );

}


/* ==========================
   START IMAGE PRELOADING
========================== */

preloadTarotImages();