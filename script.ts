"use strict";

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const cardsClicked = gameContainer.querySelectorAll('.clicked');

  if (!event.target.classList.contains('solved') && cardsClicked.length < 2) {
    event.target.style.backgroundColor = event.target.classList[0];
    event.target.classList.add('clicked');
  }

  const updatedClicked = gameContainer.querySelectorAll('.clicked');
  if (updatedClicked.length === 2) { solveOrReset(updatedClicked) }
}

function solveOrReset(cards) {
  if (cards[0].classList[0] === cards[1].classList[0]) {
    cards[0].classList.replace('clicked', 'solved');
    cards[1].classList.replace('clicked', 'solved');
  } else {
    setTimeout( resetCards, 1000, cards );
  }
}

function resetCards(cards) {
  for (let card of cards) {
    card.style.backgroundColor = '';
    card.classList.remove('clicked');
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */