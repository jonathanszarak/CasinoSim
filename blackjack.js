let deck, dealerHand, playerHand, balance, betAmount;

function initializeGame() {
    balance = 1000;
    document.getElementById('balance-amount').innerText = balance;
    document.getElementById('bet').style.display = 'block';
    document.getElementById('controls').style.display = 'none';
    document.getElementById('message').innerText = '';
}

function startGame() {
    betAmount = parseInt(document.getElementById('bet-amount').value);
    if (betAmount > balance) {
        document.getElementById('message').innerText = 'Insufficient balance!';
        return;
    }
    balance -= betAmount;
    document.getElementById('balance-amount').innerText = balance;
    document.getElementById('bet').style.display = 'none';
    document.getElementById('controls').style.display = 'block';
    document.getElementById('message').innerText = '';
    deck = createDeck();
    shuffleDeck(deck);
    dealerHand = [drawCard(), drawCard()];
    playerHand = [drawCard(), drawCard()];
    updateHands();
}

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
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

function drawCard() {
    return deck.pop();
}

function updateHands() {
    document.getElementById('dealer-cards').innerHTML = dealerHand.map((card, index) => {
        if (index === 0 && document.getElementById('controls').style.display === 'block') {
            return '<div class="card">?</div>';
        }
        return `<div class="card">${card.value} of ${card.suit}</div>`;
    }).join('');
    document.getElementById('player-cards').innerHTML = playerHand.map(card => 
        `<div class="card">${card.value} of ${card.suit}</div>`).join('');
}

function hit() {
    playerHand.push(drawCard());
    updateHands();
    if (calculateHandValue(playerHand) > 21) {
        endGame('Bust! You lose.');
    }
}

function stand() {
    while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(drawCard());
    }
    updateHands();
    determineWinner();
}

function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;
    for (let card of hand) {
        if (card.value === 'A') {
            aces++;
            value += 11;
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    }
    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }
    return value;
}

function determineWinner() {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);
    if (dealerValue > 21 || playerValue > dealerValue) {
        endGame('You win!');
        balance += betAmount * 2;
    } else if (playerValue < dealerValue) {
        endGame('You lose.');
    } else {
        endGame('It\'s a tie.');
        balance += betAmount;
    }
    document.getElementById('balance-amount').innerText = balance;
}

function endGame(message) {
    document.getElementById('message').innerText = message;
    document.getElementById('controls').style.display = 'none';
    document.getElementById('bet').style.display = 'block';
}

initializeGame();
