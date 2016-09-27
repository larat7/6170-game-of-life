// Representation of the game of life.

var Game = function() {
  var that = Object.create(Game.prototype);
  // the game board
  var board = Board(20, 20  );
  var gameLoop;
  var timestep = 1000;  // in milliseconds
  var is_running = false;

  that.getBoard = function() {
    return board.asMatrix();
  }

  // if the game is running, stop it.
  that.stop = function() {
    if (is_running) {
      clearInterval(gameLoop);
      is_running = false;
    }
  };

  // if the game is not running, start it.
  that.start = function() {
    if (!is_running) {
      gameLoop = setInterval(function() {
        board.update();
      }, timestep);
      is_running = true;
    }
  };

  that.isRunning = function(){
    return is_running;
  }

  Object.freeze(that);
  return that;
};