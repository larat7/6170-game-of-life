/**
 * Representation of the board in the game of life.
 */

var Board = function(width, height) {
  var that = Object.create(Board.prototype);
  // generate the 8 possible directions in the board
  var DIRECTIONS = [-1, 0, +1]
                      .map(function(x, idx, arr) {
                        return arr.map(function(y) {
                          if (x == 0 && y == 0) { return null };
                          return {x: x, y: y};
                        })
                      }).flatten()
                      .filterNull();

  // an array representation of the board
  var board = [];

  // each entry in the array represents the neighbors of the cell at that index
  // in the board array
  var neighbors = [];

  /**
   * gets the rows of cells in the board
   * @return an array of arrays representing the rows in the board
   */
  that.getRows = function() {
    var rows = [];
    times(height, function() {
      rows.push([]);
    });

    rows = board.reduce(function(prev, cur, idx) {
      prev[Math.floor(idx/width)].push(cur);
      return prev;
    }, rows);

    return rows;
  };

  /**
   * updates the state of the board
   * @return {void}
   */
  that.update = function() {
    var activeNeighbors = neighbors.map(function(nb) {
      return nb.map(function(cell) {
          return cell.state();
        }).reduce(function(x, y) { return x+y; }, 0);
    });

    forEachCell(function(cell, idx) { cell.update(activeNeighbors[idx]); });
  }

  /**
   * clears the board, killing every cell in it.
   * @return {void}
   */
  that.clear = function() {
    forEachCell(function(cell) { cell.clear(); });
  }

  /**
   * for each cell in the board, runs function f
   * @param  {function} f a function to be run for every cell. it can take two
   *                      parameters (cell, idx).
   *                       cell: the current cell being processed
   *                        idx: the index of the cell in the board array
   * @return {void}
   */
  var forEachCell = function(f) {
   board.forEach(function(cell, idx) {
      f(cell, idx);
    });
  }

  /**
   * given a location in the board, gets the cell at the location
   * @param  {int} row row of the cell
   * @param  {int} col column of the cel
   * @return {Cell}     cell at the given location
   */
  var getCell = function(row, col) {
    if (row < 0 || row >= height || col < 0 || col >= width) { return null; }
    return board[row*width + col];
  }

  /**
   * gets the neighboring cells of a cell at a certain index in the board array
   * @param  {int} idx              index of cell in the board array
   * @return {array[Cell]}          neighbors of cell at index idx
   */
  var getNeighbors = function(idx) {
    var row = Math.floor(idx / width);
    var col = idx % width;
    return DIRECTIONS.map(function(d) {
                return getCell(row+d.x, col+d.y);
              }).filterNull();
  }

  /**
   * initializes the board array representing an width x height board of dead
   * cells.
   * @param  {int} width  width of the board
   * @param  {int} height height of the board
   * @return {void}
   */
  var createBoard = function(width, height) {
    // create board with all dead cells
    times(height * width, function() {
      board.push(Cell(0));
    });

    // set the neighbors array
    forEachCell(function(cell, idx) {
      neighbors.push(getNeighbors(idx));
    });
  }

  createBoard(width, height);
  Object.freeze(that);
  return that;
};