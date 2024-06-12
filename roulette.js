let balance = 1000;

function initializeGame() {
    document.getElementById('balance-amount').innerText = balance;
    document.getElementById('message').innerText = '';
    document.getElementById('spin-result').innerText = '';
}

function placeBet() {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    const betType = document.getElementById('bet-type').value;
    if (betAmount > balance) {
        document.getElementById('message').innerText = 'Insufficient balance!';
        return;
    }
    balance -= betAmount;
    document.getElementById('balance-amount').innerText = balance;
    spinWheel(betAmount, betType);
}

function spinWheel(betAmount, betType) {
    const spinResult = Math.floor(Math.random() * 37); // For European roulette
    document.getElementById('spin-result').innerText = `Spin Result: ${spinResult}`;
    determineWinner(spinResult, betAmount, betType);
}

function determineWinner(spinResult, betAmount, betType) {
    let win = false;
    if (betType === 'red' && isRed(spinResult)) win = true;
    if (betType === 'black' && !isRed(spinResult) && spinResult !== 0) win = true;
    if (betType === 'odd' && spinResult % 2 !== 0 && spinResult !== 0) win = true;
    if (betType === 'even' && spinResult % 2 === 0 && spinResult !== 0) win = true;
    if (betType === '1-18' && spinResult >= 1 && spinResult <= 18) win = true;
    if (betType === '19-36' && spinResult >= 19 && spinResult <= 36) win = true;

    if (win) {
        document.getElementById('message').innerText = 'You win!';
        balance += betAmount * 2;
    } else {
        document.getElementById('message').innerText = 'You lose.';
    }
    document.getElementById('balance-amount').innerText = balance;
}

function isRed(number) {
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(number);
}

initializeGame();
