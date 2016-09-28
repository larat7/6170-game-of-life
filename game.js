/**
 * Representation of the game of life.
 */

var Game = function(width, height) {
  var that = Object.create(Game.prototype);
  // the game board
  var board = Board(width, height);
  var gameLoop;
  var timestep = 500;  // in milliseconds
  var running = false;


  /**
   * sets a pattern to the board
   * @param {string} pattern the name of the pattern
   * @return {boolean} true if pattern exist, false otherwise
   */
  that.setPattern = function(pattern) {
    return board.setPattern(pattern);
  }

  /**
   * gets the preset patterns in the board
   * @return {array} an array of strings with the preset patterns names
   */
  that.getPresetPatterns = function() {
    return board.getPresetPatterns();
  }
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