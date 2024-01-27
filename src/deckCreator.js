const cardTypes = ['diamond', 'club', 'heart', 'spade'];

function createDeck() {
    const deck = [];

    for (let cardValue = 1; cardValue <= 13; cardValue++) {
        cardTypes.forEach((cardType) => {
            deck.push({
                value: cardValue,
                type: cardType,
            });
        });
    }
    return deck;
}

export default function getSeperateDecks() {
    const deck = createDeck();

    const firstDeck = [];
    const secondDeck = [];
    let isFirstDeck = true;

    const deckLength = deck.length;

    for (let i = 0; i < deckLength; i++) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const currentCard = deck[randomIndex];

        if (isFirstDeck) {
            firstDeck.push(currentCard);
        } else {
            secondDeck.push(currentCard);
        }

        deck.splice(randomIndex, 1);
        isFirstDeck = !isFirstDeck;
    }

    return [firstDeck, secondDeck];
}
