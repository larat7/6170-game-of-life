// Representation of the board in the game of life.

var Board = function(width, height) {
  var that = Object.create(Board.prototype);
  var DIRECTIONS = [];
  // an array representation of the board
  var boardArr = [];

  var create = function() {
    generateDirections();
    createBoardArray(width, height);
  }

  // updates the state of the board
  that.update = function() {
    boardArr.forEach(function(cell) {
        cell.update();
    });
  }

  // returns the list of neighbors for cell in position i, j
  that.getNeighbors = function(i, j) {
    return DIRECTIONS.map(function(d) {
                return getCell(i+d.x, j+d.y);
              }).filter(function(cell) {
                return cell != null;
              })
  }

  var getCell = function(row, col) {
    if (row < 0 || row >= width || col < 0 || col >= height) { return null; }
    return boardArr[row*width + col];
  }

  var generateDirections = function() {
    [-1, 0, +1].forEach(function(x) {
      [-1, 0, +1].forEach(function(y) {
        if (x != 0 || y != 0)
          DIRECTIONS.push({x: x, y: y});
      })
    })
  }


  var createBoardArray = function(width, height) {
    times(width*height, function() {
      var cell = Cell(0); // initialize the board with dead cells
      boardArr.push(cell);
    })
  }

  create();
  Object.freeze(that);
  return that;
};