// DOM elements
const $cardGrid = document.querySelector('.card-grid')
const $movesCounter = document.querySelector('.moves-counter')
const $restartBtn = document.querySelector('.restart-btn')

// Global variables for the game
let moves = 0 // Counter for the number of moves
let flippedCards = [] // Cards currently flipped
let matchedCards = 0 // Counter for matched pairs

// Array containing card value
const cardValue = ['🌹', '❤️', '🥛', '🍆', '🥕', '🍍', '🍎']
const deck = [...cardValue, ...cardValue] // Duplicated the cards

// Function to shuffle the deck randomly
function shuffleDeck(array) {
  return array.sort(() => Math.random() - 0.5)
}

// Function to initialize the game
function initializeGame() {
  // Reset global variables
  moves = 0
  matchedCards = 0
  flippedCards = []
  $movesCounter.textContent = moves

  // Shuffle the cards and clear the board
  const shuffledDeck = shuffleDeck(deck)
  $cardGrid.innerHTML = '' // Remove any existing cards

  // Create cards and add them to the board
  shuffledDeck.forEach((value) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.value = value // Store the card value in a data attribute
    card.textContent = '' // Initially, the card is hidden

    // Add a click event to flip the card
    card.addEventListener('click', () => flipCard(card))
    $cardGrid.appendChild(card)
  })
}

// Function to flip a card
function flipCard(card) {
  // Do nothing if the card is already flipped or matched
  if (card.classList.contains('flipped') || card.classList.contains('matched'))
    return

  // Show the card's value and flip it
  card.textContent = card.dataset.value
  card.classList.add('flipped')
  flippedCards.push(card)

  // If two cards are flipped, check if they match
  if (flippedCards.length === 2) {
    checkForMatch()
  }
}

// Function to check if the flipped cards are a match
function checkForMatch() {
  const [card1, card2] = flippedCards

  // If the cards match
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched')
    card2.classList.add('matched')

    matchedCards += 2 // Increment the matched pairs counter
    flippedCards = [] // Reset the flipped cards array
  }
}
