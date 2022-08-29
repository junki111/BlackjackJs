let minVal = 1
let maxVal = 13
let hasBlackJack = false
let isAlive = false
let message = ""
let cards = []
let tempCards = []
let sum = 0
const messageEl = document.getElementById("message-el")
const sumEl = document.querySelector("#sum-el")
const cardsEl = document.querySelector("#cards-el")
const newCardBtn = document.querySelector("#new-card-btn")
const startGameBtn = document.querySelector("#start-game-btn")
const finishGameBtn = document.querySelector("#finish-game-btn")

//new code
let packOfCards = []
const suits = ["♥","♦","♣","♠"]

let createDeck = () => {
    //populate all 52 playing cards
    for (let j = 0; j < suits.length; j++){
        let value = ""
        for (let i = 1; i <= 13; i++){
            switch(i){
                case 1:
                    value = "A"
                    break
                case 11:
                    value = "J"
                    break
                case 12:
                    value = "Q"
                    break
                case 13:
                    value = "K"
                    break
                default:
                    value = i
            }

            //Store the value and the suit as an object representing each card possible
            packOfCards.push(
                {
                    value: value.toString(),
                    suit: suits[j]
                }
            )
        }
    }
}

const deal = (num) => {
    for (let i = 0; i < num; i++) {
        //generate random card number from total of 52
        randCardNo = Math.floor(Math.random() * packOfCards.length)

        //add card to dealt cards array
        cards.push(packOfCards[randCardNo])

        packOfCards = packOfCards.filter(card => {
            card !== packOfCards[randCardNo]
        })
    }
    return cards
}

const pokerCards = document.getElementById("poker-cards")
let cardFrame = ''
let suitColor = ''

let renderCards = () => {
    pokerCards.innerHTML = ''

    for (let i = 0; i < cards.length; i++) {
        let cardSuit = cards[i].suit
        let cardValue = cards[i].value

        if (/♥|♦/g.test(cardSuit)) {
            suitColor = 'red'
        } else if (/♣|♠/g.test(cardSuit)) {
            suitColor = 'black'
        } else {
            suitColor = ''
        }

        if (/\d|A/gi.test(cardValue)) {
            cardFrame = 'no-pic'
        } else {
            cardFrame = 'picture'
        }

        pokerCards.innerHTML += `
            <div class="playing-card" style="transform: rotate(${randomRotation()}deg">
                <div class="card-index pos-top-left">
                    <p class="suit suit-${suitColor}">${cardValue}</p>
                    <p class="suit suit-${suitColor}">${cardSuit}</p>
                </div>
                <div class="card-index pos-bottom-right">
                    <p class="suit suit-${suitColor}">${cardValue}</p>
                    <p class="suit suit-${suitColor}">${cardSuit}</p>
                </div>
                <div class="card-frame card-frame-${cardFrame} card-frame-${cardValue} suit-${suitColor}">
                    ${suitLayout(cardValue, cardSuit)}
                </div>
            </div>
        `
    }
}

//inner card layout creation
let suitLayout = (num, suit) => {
    let layoutDivs = ''

    //for number cards
    if (num === 'A'){
        num = 1
    }

    if (num >= 1 && num <= 10) {
        for (let k = 1; k <= num; k++) {
            layoutDivs += `<div>${suit}</div>`
        }
    }

    //for picture cards
    else {
        layoutDivs = `
            <div class="card-picture card-picture-suit">
                ${suit}
            </div>
            <div class="card-picture card-picture-suit">
                ${suit}
            </div>
            <div class="card-picture card-picture-${num}">${num}</div>
            <div class="card-picture card-picture-${num}">${num}</div>
        `
    }
    return layoutDivs
}

//generate random rotation for card
let randomRotation = () => {
    let rot = (Math.random() * 3 - 1.5).toFixed(2)
    return rot
}

//EventListeners
newCardBtn.addEventListener("click", newCard)
startGameBtn.addEventListener("click", startGame)
finishGameBtn.addEventListener("click", finishGame)

newCardBtn.disabled = true
finishGameBtn.disabled = true

function generateRandom(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    let rndmNumber = Math.floor(Math.random() * (max - min + 1)) + min
	tempCards.push(rndmNumber)
	if(countCardOccurence(tempCards, rndmNumber) === 4){
		generateRandom()
		tempCards.pop()
	} else {
		if (rndmNumber === 1) {
			return 11
		} else if (rndmNumber === 11 || rndmNumber === 12 || rndmNumber === 13) {
			return 10
		}
		return rndmNumber
	}  
}

function startGame() {
    // isAlive = true
    // let firstCard = generateRandom(minVal, maxVal)
    // let secondCard = generateRandom(minVal, maxVal)
    // cards.push(firstCard, secondCard)

    // sum = firstCard + secondCard

    // renderGame()

    isAlive = true
    deal(2)
    renderCards()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += `${cards[i]} `
    }

    if (sum <= 20) {
        message = "Do you want to draw a new card?"
        startGameBtn.disabled = true
        newCardBtn.disabled = false
		finishGameBtn.disabled = false
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack!"
        isAlive = false
        hasBlackJack = true
        newCardBtn.disabled = true
		finishGameBtn.disabled = true
        startGameBtn.disabled = false
        cards = []
		tempCards = []
    } else {
        message = "You've lost! You've gone over 21!"
        isAlive = false
        newCardBtn.disabled = true
		finishGameBtn.disabled = true
        startGameBtn.disabled = false
        cards = []
		tempCards = []
    }
    messageEl.textContent = message
    sumEl.textContent = "Sum: " + sum
}

function countCardOccurence(array, what) {
    return array.filter((item) => item == what).length
}

function newCard() {
    let card = generateRandom(minVal, maxVal)
    //check if card has already been placed four times
    //if it has then generate another card before adding it to array
    if (countCardOccurence(cards, card) === 4) {
        newCard()
    } else {
        cards.push(card)
        sum += card
        renderGame()
    }
}

function finishGame() {
	isAlive = false
	message = `Congratulations!! Your final score is ${sum}`
	messageEl.textContent = message
	cardsEl.textContent = ""
	sumEl.textContent = ""
	//reset the game
	startGameBtn.disabled = false
	newCardBtn.disabled = true
	finishGameBtn.disabled = true
	cards = []
	tempCards = []
}
