const buttons = document.querySelectorAll('.board');

const startBtn = document.getElementById("start");
const displayTurn = document.getElementById("display-turn");
const displayDraw = document.getElementById("display-draw");


let playerOne = document.getElementById("score1");
let playerTwo = document.getElementById("score2");
let currentPlayer = "X";
let turnCount = 1;
let playerMoves = {
  "X": [],
  "O": []
}

playerOne.value = 0;
playerTwo.value = 0;

window.onload = ()=> {
  playerTurn();
};

startBtn.addEventListener('click', ()=> {
  window.location.reload();
});

function playerTurn(){
  if(turnCount % 2 !== 0){
    displayTurn.innerHTML = `<h1>Player 1 turn as </h1><h2>"${currentPlayer}"</h2>`;
  } else {
    displayTurn.innerHTML = `<h1>Player 2 turn as </h1><h2>"${currentPlayer}"</h2>`;
  }
}

buttons.forEach(button => {
  
  button.addEventListener("click", function(){
    getButtonValue(this);
    checkWinner();
  });

});

function getButtonValue(button){
  
    if(button.textContent === ""){
      button.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      turnCount ++;
      playerTurn();
    }
};

function checkWinner(){
  const winnerSequences = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [1,4,7],
    [2,5,8],
    [3,6,9]
  ];

  buttons.forEach(button => {
    if(button.textContent === "X"){playerMoves["X"].push(Number(button.id));}
    if(button.textContent === "O"){playerMoves["O"].push(Number(button.id));} 
  });

  for(let seq of winnerSequences){
    if(seq.every(num => playerMoves["X"].includes(num))){
      console.log("X wins!");
      setWinner();
      playerTurn();
      reset();
      return;
    }
    else if(seq.every(num => playerMoves["O"].includes(num))){
      console.log("O wins!");
      setWinner();
      playerTurn();
      reset();
      return;
    }

  }
  if (turnCount > 9){
    displayDraw.innerHTML = `<h2> Draw !! </h2>`;
    playerTurn();
    reset();
  }
}

function setWinner(){
  if(turnCount % 2 !== 0){
    console.log("player 2 wins");
    playerTwo.value ++;

  } else {
    console.log("player 1 wins");
    playerOne.value ++;
  }
}

function reset(){
  turnCount = 1;
  buttons.forEach(button => button.textContent = "");
  playerMoves = { "X": [], "O": []};
  playerTurn();
};