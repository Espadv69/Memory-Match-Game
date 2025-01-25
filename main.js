// DOM elements
const $cardGrid = document.querySelector('.card-grid')
const $movesCounter = document.querySelector('.moves-counter')
const $restartBtn = document.querySelector('.restart-btn')

// Global variables for the game
let moves = 0 // Counter for the number of moves
let flippedCards = [] // Cards currently flipped
let matchedCards = 0 // Counter for matched pairs
