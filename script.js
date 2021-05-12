'use strict';

//Choosing Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = 1 - activePlayer;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//Button Roll
const randomNumbers = function () {
    return Math.trunc(Math.random() * 6) + 1;
};

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

btnRoll.addEventListener('click', function () {
    if (playing) {
        const diceVal = randomNumbers();

        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceVal}.png`;

        if (diceVal != 1) {
            currentScore += diceVal;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        //Add current score to score0El and score1El
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //currentScore = 0;
        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--winner', 'player--active');
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    scores[0] = 0;
    scores[1] = 0;
});