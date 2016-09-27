// Representation of a cell in the board.

var Cell = function(state) {
  var that = Object.create(Cell.prototype);
  // the state of the cell: 0 for dead, 1 for alive

  // updates the next state the of the cell
  that.update = function(neighbors) {
    var activeNeighbors = neighbors.map(function(cell) {
      return cell.state();
    }).reduce(function(x, y) { return x+y; }, 0);

    // cell dies from under/overpopulation
    // cell becomes alive from reprodution
    // otherwise it stays the same
    if (activeNeighbors < 2 || activeNeighbors > 3) {
      state = 0;
    } else if (activeNeighbors == 3) {
      state = 1;
    }
  }

  // returns the state of the cell, whether it's alive or dead
  that.state = function() {
    return state;
  }

  Object.freeze(that);
  return that;
};