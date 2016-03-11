var Board = require("./board")

function Game(reader){
  this.reader = reader;
  this.board  = new Board(3);
  this.moveNum = 0;
  this.currentPlayer = Board.X;
}

Game.prototype.openingDisplay = function () {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  console.log("Welcome to Tic Tac Toe!")
};

Game.prototype.display = function () {
  console.log("Current Player: " + this.currentPlayer);
  this.board.display()
};

Game.prototype.isValidMove = function (pos) {
  return (this.board.posIsInBounds(pos) && this.board.posIsEmpty(pos));
};

Game.prototype.switchPlayers = function () {
  if ( this.currentPlayer === Board.X ){
    this.currentPlayer = Board.O
  } else if ( this.currentPlayer === Board.O ){
    this.currentPlayer = Board.X
  }
};

Game.prototype.gameOver = function () {
  return ( Boolean(this.board.isFull() || this.board.winner()) );
};

Game.prototype.run = function () {
  if (this.moveNum === 0 ){
    this.openingDisplay();
    this.moveNum = 1;
  }

  if (this.gameOver()) {
    this.endMessage();
    this.board.display();
    this.reader.close();
  } else {
    this.display();
    this.playRound();
  }
};

Game.prototype.playRound = function () {
  var game = this;

  function makeMove(pos, moveIsValid) {
    process.stdout.write("\u001b[2J\u001b[0;0H");

    if ( moveIsValid ){
      game.board.placeMark(pos, game.currentPlayer)
      game.switchPlayers()
    } else {
      console.log("Invalid move, please choose another position.")
    }

    game.run();
  };

  this.getMove(makeMove);
};

Game.prototype.getMove = function (makeMove) {
  var game = this;

  questionStr = "Where would you like to place a mark? (enter in row  #, column #)\n"
  game.reader.question( questionStr, function(answer){
    pos = answer.split(",").map(function(el){ return (parseInt(el) - 1) })
    moveIsValid = game.isValidMove(pos)

    makeMove(pos, moveIsValid)
  })
};

Game.prototype.endMessage = function () {
  if (this.board.isFull()){
     console.log("It's a draw!");
   } else {
     console.log("Player " + this.board.winner() + " is the winner!");
   }
};

module.exports = Game;
