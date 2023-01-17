let deck = [];
let playerCards = [];
let dealerCards = [];
let playerPoints = 0;
let dealerPoints = 0;

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
  let textOutput = document.getElementById('text-output').textContent = ''
  deck = createDeck();
  shuffleDeck();
  playerCards = [deck.pop(), deck.pop()];
  dealerCards = [deck.pop(), deck.pop()];

  displayHand('player', playerCards);
  displayHand('dealer', dealerCards);
}

function hit() {
  playerCards.push(deck.pop());
  if (getScore(playerCards) > 21) {
    stand()
  }
  displayHand('player', playerCards);
}

function stand() {
  while (getScore(dealerCards) < 17) {
    dealerCards.push(deck.pop());
  }

  displayHand('dealer', dealerCards);
  displayHand('player', playerCards);
  determineWinner();
}

function displayHand(who, hand) {

  let handElement = document.getElementById(who + '-hand');
  handElement.innerHTML = '';

  let titleElement = document.createElement('div');
  titleElement.innerHTML += `<b>${who.toUpperCase()}</b>`
  handElement.appendChild(titleElement);
  if (who == 'player') {
    for (let i = 0; i < hand.length; i++) {
      let cardElement = document.createElement('div');
      cardElement.innerHTML = hand[i].Value + ' of ' + hand[i].Suit;
      handElement.appendChild(cardElement);
    }

    let scoreElement = document.createElement('div');
    scoreElement.innerHTML = 'Score: ' + getScore(hand);
    handElement.appendChild(scoreElement);
  } else {
    let blurElement = document.createElement('div');
    blurElement.id = 'blur'
    for (let i = 0; i < hand.length; i++) {
      let cardElement = document.createElement('div');
      cardElement.innerHTML = hand[i].Value + ' of ' + hand[i].Suit;
      blurElement.appendChild(cardElement)
    }

    let scoreElement = document.createElement('div');
    scoreElement.innerHTML = 'Score: ' + getScore(hand);
    blurElement.appendChild(scoreElement)
    handElement.appendChild(blurElement);
  }
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
  let textOutput = document.getElementById('text-output')
  let blurElement = document.getElementById('blur')
  blurElement.id = 'noBlur'
  console.log(playerScore);
  if (playerScore > 21) {
    textOutput.style.color = 'red'
    textOutput.innerText ='You lose!'
    dealerPoints++
  } else if (dealerScore > 21) {
    textOutput.style.color = 'green'
    textOutput.innerText = 'You win!'
    playerPoints++
  } else if (playerScore > dealerScore) {
    textOutput.style.color = 'green'
    textOutput.innerText = 'You win!'
    playerPoints++
  } else if (playerScore < dealerScore) {
    textOutput.style.color = 'red'
    textOutput.innerText = 'You lose!'
    dealerPoints++
  } else {
    textOutput.style.color = 'blue'
    textOutput.innerText = 'Tie!'
  }
  document.getElementById("playerScore").innerHTML = "Player Score: " + playerPoints;
  document.getElementById("dealerScore").innerHTML = "Dealer Score: " + dealerPoints;
}