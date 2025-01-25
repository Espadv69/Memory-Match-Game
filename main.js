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
}
