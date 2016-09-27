// Representation of the board in the game of life.

var Board = function(width, height) {
  var that = Object.create(Board.prototype);
  var DIRECTIONS = [];
  // an array representation of the board
  var matrix = [];

  var create = function() {
    generateDirections();
    createMatrix(width, height);
  }

  that.asMatrix = function() {
    return matrix;
  };

  // returns the list of neighbors for cell in position i, j
  var getActiveNeighborsCount = function(idx) {
    var row = Math.floor(idx / width);
    var col = idx % width;
    return DIRECTIONS.map(function(d) {
                return getCell(row+d.x, col+d.y);
              }).filter(function(cell) {
                return cell != null;
              }).map(function(cell) {
                return cell.state();
              }).reduce(function(x, y) { return x+y; }, 0);
  }

  // updates the state of the board
  that.update = function() {
    var nb = matrix.flatten().map(function(cell, idx) {
        return getActiveNeighborsCount(idx);
    });

    matrix.flatten().forEach(function(cell, idx) {
      cell.update(nb[idx]);
    });
  }


  var getCell = function(row, col) {
    if (row < 0 || row >= width || col < 0 || col >= height) { return null; }
    return matrix[row][col];
  }

  var generateDirections = function() {
    [-1, 0, +1].forEach(function(x) {
      [-1, 0, +1].forEach(function(y) {
        if (x != 0 || y != 0)
          DIRECTIONS.push({x: x, y: y});
      })
    })
  }


  var createMatrix = function(width, height) {
    times(width, function() {
      var col = [];
      matrix.push(col);
      times(height, function() {
        col.push(Cell(0));
      })
    })
  }

  create();
  Object.freeze(that);
  return that;
};