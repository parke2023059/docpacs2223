let deck = [];
let playerCards = [];
let dealerCards = [];

function createDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];

  for (let suit in suits) {
    for (let value in values) {
      let card = { Value: values[value], Suit: suits[suit] };
      deck.push(card);
    }
  }

  return deck;
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }

  return deck;
}

function deal() {
  deck = createDeck();
  shuffleDeck();
  playerCards = [deck.pop(), deck.pop()];
  dealerCards = [deck.pop(), deck.pop()];

  displayHand('player', playerCards);
  displayHand('dealer', dealerCards);
}

function hit() {
  playerCards.push(deck.pop());
  displayHand('player', playerCards);
}

function stand() {
  while (getScore(dealerCards) < 17) {
    dealerCards.push(deck.pop());
  }

  displayHand('dealer', dealerCards);
  determineWinner();
}

function displayHand(who, hand) {
  let handElement = document.getElementById(who + '-hand');
  handElement.innerHTML = '';

  for (let i = 0; i < hand.length; i++) {
    let cardElement = document.createElement('div');
    cardElement.innerHTML = hand[i].Value + ' of ' + hand[i].Suit;
    handElement.appendChild(cardElement);
  }

  let scoreElement = document.createElement('div');
  scoreElement.innerHTML = 'Score: ' + getScore(hand);
  handElement.appendChild(scoreElement);
}

function getScore(hand) {
  let score = 0;
  let hasAce = false;

  for (let i = 0; i < hand.length; i++) {
    let card = hand[i];
    score += getCardValue(card);
    if (card.Value === 'ace') {
      hasAce = true;
    }
  }

  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }

  return score;
}

function getCardValue(card) {
  switch (card.Value) {
    case 'ace':
      return 1;
    case 'jack':
    case 'queen':
    case 'king':
      return 10;
    default:
      return card.Value;
  }
}

function determineWinner() {
  let playerScore = getScore(playerCards);
  let dealerScore = getScore(dealerCards);

  if (playerScore > 21) {
    alert('You lose!')
  } else if (dealerScore > 21) {
    alert('You win!')
  } else if (playerScore > dealerScore) {
    alert('You win!')
  } else if (playerScore < dealerScore) {
    alert('You lose!')
  } else {
    alert('Tie!')
  }
}