/**
 * Representation of the game of life.
 */

var Game = function() {
  var that = Object.create(Game.prototype);
  // the game board
  var board = Board(32, 18);
  var gameLoop;
  var timestep = 1000;  // in milliseconds
  var running = false;

  /**
   * returns a matrix representation of the board
   * @return {array of arrays} a matrix representation of the board
   */
  that.getBoard = function() {
    return board.getRows();
  }

  /**
   * clears the board, killing all its cells.
   * @return {void}
   */
  that.clear = function() {
    board.clear();
  }

  /**
   * stops the game, if it is running.
   * @return {void}
   */
  that.stop = function() {
    if (running) {
      clearInterval(gameLoop);
      running = false;
    }
  };

  /**
   * starts the game, if it is not running.
   * @return {void}
   */
  that.start = function() {
    if (!running) {
      gameLoop = setInterval(function() {
        board.update();
      }, timestep);
      running = true;
    }
  };

  /**
   * returns whether the game is running of not
   * @return {boolean} true if the game is running, false otherwise
   */
  that.isRunning = function(){
    return running;
  }

  Object.freeze(that);
  return that;
};