// Representation of a cell in the board.

var Cell = function(state) {
  var that = Object.create(Cell.prototype);

  var subscribers = [];

  that.subscribe = function(subscriber) {
    subscribers.push(subscriber);
  }

  var publish = function(){
    subscribers.forEach(function(f) {
      f();
    })
  }

  // updates the next state the of the cell
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

  // returns the state of the cell, whether it's alive or dead
  that.state = function() {
    return state;
  }

  that.flipState = function() {
    state = (state + 1) % 2;
    publish();
  }

  that.stateString = function() {
    if (state) { return 'alive'; }
    return 'dead';

  }

  Object.freeze(that);
  return that;
};