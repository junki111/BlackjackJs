let minVal = 1;
let maxVal = 13;
let hasBlackJack = false;
let isAlive = false;
let message = '';
let cards = [];
let sum = 0;
let messageEl = document.getElementById('message-el');
let sumEl = document.querySelector('#sum-el');
let cardsEl = document.querySelector('#cards-el');
let newCardBtn = document.querySelector('#new-card-btn');
let startGameBtn = document.querySelector('#start-game-btn');
newCardBtn.disabled = true;

function generateRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rndmNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (rndmNumber === 1) {
        return 11;
    } else if (rndmNumber === 11 || rndmNumber === 12 || rndmNumber === 13) {
        return 10;
    }
    return rndmNumber;
}

function startGame() {
    isAlive = true;
    let firstCard = generateRandom(minVal, maxVal);
    let secondCard = generateRandom(minVal, maxVal);
    cards.push(firstCard, secondCard);

    sum = firstCard + secondCard;

    console.log(sum);

    renderGame();
}

function renderGame() {
    console.log(cards);
    cardsEl.textContent = 'Cards: ';
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += `${cards[i]} `;
    }

    if (sum <= 20) {
        message = 'Do you want to draw a new card?';
        startGameBtn.disabled = true;
        newCardBtn.disabled = false;
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack!";
        isAlive = false;
        hasBlackJack = true;
        newCardBtn.disabled = true;
        startGameBtn.disabled = false;
        cards = [];
    } else {
        message = "You've lost! You've gone over 21!";
        isAlive = false;
        newCardBtn.disabled = true;
        startGameBtn.disabled = false;
        cards = [];
    }
    messageEl.textContent = message;
    sumEl.textContent = 'Sum: ' + sum;
}

function newCard() {
    let card = generateRandom(minVal, maxVal);
    cards.push(card);
    sum += card;
    renderGame();
}
