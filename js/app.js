// Create a list that holds all of your cards

const cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o',
  'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt',
  'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf',
  'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'
];

const deck = document.querySelector('.deck');

// Store opened(clicked) cards in an array
let openedCards = [];

// Store matched cards in an array
let matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// To begin the game
function begin() {
  shuffle(cards);
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = '<i class="' + cards[i] + '"></i>';
    deck.appendChild(card);
    click(card);
  }
}

// Add Event Listener for click event on card
let firstClick = true;

function click(card) {
  card.addEventListener('click', function() {
    if (firstClick) {
      setTimer();
      firstClick = false;
    }
    const cardA = card;
    const cardB = openedCards[0];
    if (openedCards.length === 1) {
      card.classList.add('open', 'show', 'disabled');
      openedCards.push(card);
      compare(cardA, cardB);
      openedCards = [];
      moveCounter();
      starRating();
    } else {
      cardA.classList.add('open', 'show', 'disabled');
      openedCards.push(cardA);
    }
  });
}

// Comparison of two cards
function compare(cardA, cardB) {
  if (cardA.innerHTML === cardB.innerHTML) {

    // if they are a match
    cardA.classList.add('match');
    cardB.classList.add('match');
    matchedCards.push(cardA, cardB);

    // if all of the cards are matching
    gameOver();
  } else {
    setTimeout(function() {
      cardA.classList.remove('open', 'show', 'disabled');
      cardB.classList.remove('open', 'show', 'disabled');
    }, 500);
  }
}

// See if the game is over
function gameOver() {
  if (matchedCards.length === 16) {
    gameResult();
  }
}

// Add the move counter
let totalMoves = document.querySelector('.moves');
let moves = 0;

function moveCounter() {
  moves++;
  totalMoves.innerHTML = moves;
}

// Add star rating system
const star = `<li><i class="fa fa-star"></i></li>`;
const starList = document.querySelector('.stars');
starList.innerHTML = star + star + star;

function starRating() {
  if (moves > 24) {
    starList.innerHTML = star;
  } else if (moves > 18) {
    starList.innerHTML = star + star;
  } else {
    starList.innerHTML = star + star + star;
  }
}

// Set a timer
const timer = document.querySelector('.timer');
let time = 0;
let timeCount;

function setTimer() {
  timeCount = setInterval(function() {
    time++;
    timer.innerHTML = time + ' seconds';
  }, 1000);
}

// Clear timer
function clearTimer() {
  clearInterval(timeCount);
}

// Get the modal values
let modal = document.querySelector('.modal');
let close = document.querySelector('.close');

// Close the modal
function closeModal() {
  close.addEventListener('click', function() {
    modal.classList.remove('show-modal');
  });
}

// End result
function gameResult() {
  if (matchedCards.length === 16) {
    clearTimer();
    totalTimeResult = timer.innerHTML;
    modal.classList.add('show-modal');
    const starRatingResult = document.querySelector('.stars').innerHTML;
    document.getElementById('finalMoveResult').innerHTML = moves;
    document.getElementById('starRatingResult').innerHTML = starRatingResult;
    document.getElementById('totalTimeResult').innerHTML = totalTimeResult;
    closeModal();

    // restart from the modal
    document.querySelector('.play-again').addEventListener('click', function() {
      modal.classList.remove('show-modal');
      restart();
    });
  };
}

// Add restart functionality - reset cards then begin again
function restart() {
  matchedCards = [];
  moves = 0;
  totalMoves.innerHTML = moves;
  starList.innerHTML = star + star + star;
  clearTimer();
  closeModal();
  firstClick = true;
  time = 0;
  timer.innerHTML = time + 's';
  deck.innerHTML = '';
  begin();
}

// Make restart button functional
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function() {
  deck.innerHTML = '';
  restart();
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Invoke the begin fnc to start/initialize the game

begin();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
