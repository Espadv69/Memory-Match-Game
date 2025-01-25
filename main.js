// DOM elements
const $cardGrid = document.querySelector('.card-grid')
const $movesCounter = document.querySelector('.moves-counter')
const $restartBtn = document.querySelector('.restart-btn')
const $congratulationsContainer = document.querySelector('.congratulations')

// Global variables for the game
let moves = 0 // Counter for the number of moves
let flippedCards = [] // Cards currently flipped
let matchedCards = 0 // Counter for matched pairs
let isChecking = false // Flag to prevent interaction while checking cards

// Array containing card value
const cardValue = ['🌹', '❤️', '🥛', '🍆', '🥕', '🍍', '🍎', '😺']
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
  isChecking = false
  $movesCounter.textContent = moves
  $congratulationsContainer.textContent = ''

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
  // Do nothing if the card is already flipped, matched, or if we are currently checking
  if (card.classList.contains('flipped') || card.classList.contains('matched') || isChecking)
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
  isChecking = true
  const [card1, card2] = flippedCards

  // If the cards match
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched')
    card2.classList.add('matched')

    matchedCards += 2 // Increment the matched pairs counter
    flippedCards = [] // Reset the flipped cards array

    // If all card are matched, display a congratulation message
    if (matchedCards === deck.length) {
      setTimeout(() => {
        const $congratulations_p = document.createElement('p')
        $congratulations_p.classList.add('congratulations-p')
        $congratulations_p.textContent =
          'Congratulations! You completed the game'
        $congratulationsContainer.appendChild($congratulations_p)
      }, 200)
    }

    // Allow interaction again
    isChecking = false
  } else {
    // If the cards don't match, flip them back after a short delay
    setTimeout(() => {
      card1.textContent = ''
      card2.textContent = ''

      card1.classList.remove('flipped')
      card2.classList.remove('flipped')

      flippedCards = [] // Reset the flipped cards array
      isChecking = false // Allow interaction again
    }, 1000)
  }

  // Increment the move counter and update the DOM
  moves++
  $movesCounter.textContent = moves
}

// Add an event to the restart button to reset the game
$restartBtn.addEventListener('click', initializeGame)

// Initialize the game when the page loads
initializeGame()
