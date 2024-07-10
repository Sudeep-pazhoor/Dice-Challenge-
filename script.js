'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btNew = document.querySelector('.btn--new');
const btRoll = document.querySelector('.btn--roll');
const btHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//initialisation (starting)
const init = function() {
scores = [0, 0];
currentScore = 0;
activePlayer = 0;
playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function(){
  document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;//if active payer is 0 then new active player to be 1 and else to be 0
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
};

//rolling dice
btRoll.addEventListener('click',function(){
  if(playing){

  
   //roll dice 
    const dice = Math.trunc(Math.random() * 6) +1;
  

   //dice display
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;//dynamically loading of img 

    //check roll 1
    if(dice!==1) {
        //add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        //if 1 then switch the player
        switchPlayer();
    }
  }
});

btHold.addEventListener('click', function(){
if(playing) {
  //add current score to active players choice
  scores[activePlayer] += currentScore;
  //scores[1] = scores[1] + currentScore
  document.getElementById(`score--${activePlayer}`).textContent =
  scores[activePlayer];

  //check player score > 100
  if(scores[activePlayer]>=50){
    //finish the game
    playing = false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);

  }else {
  //switch to next player
  switchPlayer();
  }}
});

btNew.addEventListener('click', init);