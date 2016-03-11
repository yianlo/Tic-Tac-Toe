Board.X = "X";
Board.O = "O";
Board.NULL = "-";

function Board(size){
  this.size = size;
  this.makeGrid();
}

Board.prototype.makeComplete = function (mark) {
  return Array.apply(null, Array(this.size)).map(function(){return mark})
};

Board.prototype.makeGrid = function () {
  this.grid = [];
  for (var i = 1; i <= this.size; i++) {
    this.grid.push( this.makeComplete(Board.NULL) );
  };
};

Board.prototype.headerDisplay = function () {
  var headerStr = "  ";
  for (var i = 1; i <= this.size; i++) {
    headerStr += (" " + i.toString() + "  ");
  };
  console.log(headerStr)
};

Board.prototype.display = function () {
  this.headerDisplay()

  this.grid.forEach( function(row, i){
    console.log( (i + 1) + "| "+ row.join(" | ") + " |");
  });
};

Board.prototype.placeMark = function (pos, mark) {
  var row = pos[0];
  var col = pos[1];
  this.grid[row][col] = mark;
};

Board.prototype.posIsEmpty = function (pos) {
  return (this.grid[pos[0]][pos[1]] === Board.NULL);
};

Board.prototype.posIsInBounds = function (pos) {
  var row = pos[0],
    col = pos[1];

  return (row < this.size && row >= 0 && col < this.size && col >= 0);
};

Board.prototype.checkForWinner = function (ar) {
  var XComp = this.makeComplete(Board.X).join("")
  var OComp = this.makeComplete(Board.O).join("")

  if ( ar.join("") === XComp) {
    return Board.X;
  } else if ( ar.join("") === OComp ){
    return Board.O;
  }
};

Board.prototype.checkRow = function () {
  var board = this;
  var winner;

  this.grid.forEach( function(row){
    var winnerInRow = board.checkForWinner(row);
    if (winnerInRow){ winner = winnerInRow }
  })

  return winner;
};

Board.prototype.checkCol = function () {
  for (var i = 0; i < this.size; i++) {
    var curCol = [];
    for (var j = 0; j < this.size; j++) {
      curCol.push( this.grid[j][i] );
    }

    var winnerInCol = this.checkForWinner(curCol);
    if (winnerInCol){ return winnerInCol }
  }
};

Board.prototype.checkDiag = function () {
  var diag1 = [ this.grid[0][0], this.grid[1][1], this.grid[2][2] ];
  var diag2 = [ this.grid[0][2], this.grid[1][1], this.grid[2][0] ];

  return (this.checkForWinner(diag1) || this.checkForWinner(diag2));
};

Board.prototype.winner = function () {
  return ( this.checkRow() || this.checkCol() || this.checkDiag() );
};

Board.prototype.isFull = function () {
  var isFull = true;

  this.grid.forEach( function(row){
    if (row.indexOf(Board.NULL) > -1) { isFull = false }
  })

  return isFull
};

module.exports = Board;

// b = new Board(2);
// b.placeMark([0, 0], Board.X);
// b.display();
