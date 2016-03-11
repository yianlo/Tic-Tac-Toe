var TTT = require('../ttt')

var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,

  terminal: false
});

var game = new TTT.Game(reader)

game.run();
