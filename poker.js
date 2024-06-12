let balance = 1000;
let playerHand = [];
let deck = [];

function initializeGame() {
    document.getElementById('balance-amount').innerText = balance;
    document.getElementById('message').innerText = '';
    document.getElementById('player-cards').innerHTML = '';
}

function startGame() {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    if (betAmount > balance) {
        document.getElementById('message').innerText = 'Insufficient balance!';
        return;
    }
    balance -= betAmount;
    document.getElementById('balance-amount').innerText = balance;
    document.getElementById('message').innerText = '';
    playerHand = [];
    deck = createDeck();
    shuffleDeck(deck);
    dealCards();
}

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    let id = 1;
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ id, value, suit, selected: false });
            id++;
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards() {
    for (let i = 0; i < 5; i++) {
        playerHand.push(drawCard());
    }
    updatePlayerHand();
}

function drawCard() {
    if (deck.length === 0) {
        deck = createDeck();
        shuffleDeck(deck);
    }
    return deck.pop();
}

function updatePlayerHand() {
    const playerCardsContainer = document.getElementById('player-cards');
    playerCardsContainer.innerHTML = '';
    playerHand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.cardId = card.id;
        cardElement.textContent = `${card.value} of ${card.suit}`;
        if (card.selected) {
            cardElement.classList.add('selected');
        }
        playerCardsContainer.appendChild(cardElement);
    });
}

// Click event for toggling card selection
document.getElementById('player-cards').addEventListener('click', function(event) {
    const clickedCard = event.target.closest('.card');
    if (!clickedCard || !playerHand.some(card => card.id === parseInt(clickedCard.dataset.cardId))) return;

    // Toggle selection status
    clickedCard.classList.toggle('selected');

    // Update player's hand array
    const cardId = parseInt(clickedCard.dataset.cardId);
    const cardIndex = playerHand.findIndex(card => card.id === cardId);
    playerHand[cardIndex].selected = !playerHand[cardIndex].selected;
});

function endGame() {
    // Evaluate hand
    const handValue = evaluateHand(playerHand);
    // Pay winnings
    balance += handValue;
    document.getElementById('balance-amount').innerText = balance;
    // Display message
    document.getElementById('message').innerText = `Hand value: $${handValue}`;
}

function evaluateHand(hand) {
    // Dummy evaluation for now
    return Math.floor(Math.random() * 100); // Just a random value as a placeholder
}

initializeGame();
