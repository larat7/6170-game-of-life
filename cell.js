/**
 * Representation of a cell in the board.
 */

var Cell = function(state) {
  var that = Object.create(Cell.prototype);

  var subscribers = [];
  var neighbors = [];

  /**
   * adds a subscriber to changes of state of this cell
   * @param  {function} subscriber function to be execute when change of state
   *                               occurs
   * @return {void}
   */
  that.subscribe = function(subscriber) {
    subscribers.push(subscriber);
  }

  /**
   * publishes changes of state to all subscribers
   * @return {void}
   */
  var publish = function(){
    subscribers.forEach(function(f) {
      f();
    })
  }

  /**
   * updates the state of the cell according to the following rules:
   *    Any live cell with fewer than two live neighbours dies, as if caused by under-population.
   *    Any live cell with two or three live neighbours lives on to the next generation.
   *    Any live cell with more than three live neighbours dies, as if by over-population.
   *    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
   * @param  {int} activeNeighbors the number of alive neighbors surrounding
   *                               this cell
   * @return {void}
   */
  that.update = function(activeNeighbors) {
    // cell dies from under/overpopulation
    // cell becomes alive from reprodution
    // otherwise it stays the same
    if (activeNeighbors < 2 || activeNeighbors > 3) {
      state = 0;
    } else if (activeNeighbors == 3) {
      state = 1;
    }
    publish();
  }

  /**
   * returns the state of the cell, whether it's alive or dead
   * @return {int} 1 if cell is alive, 0 otherwise
   */
  that.state = function() {
    return state;
  }

  /**
   * flips the state of the cell. if cell was alive, it dies. if it was dead,
   * it becomes alive.
   * @return {void}
   */
  that.flipState = function() {
    state = (state + 1) % 2;
    publish();
  }

  /**
   * returns a string representing the state of the cell
   * @return {string} 'alive' if cell is alive, 'dead' otherwise
   */
  that.stateString = function() {
    if (state) { return 'alive'; }
    return 'dead';
  }

  /**
   * clears the state of the cell, setting it to dead.
   * @return {void}
   */
  that.clear = function() {
    state = 0;
    publish();
  }

  Object.freeze(that);
  return that;
};