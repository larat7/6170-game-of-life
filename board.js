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
    forEachCell(function(cell) { cell.setState(0); });
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

  /**
   * applies a pattern to the board
   * @param {string} pattern name of the pattern to be applied
   * @return {boolean} true if pattern exists, false otherwise
   */
  that.setPattern = function(pattern) {
    that.clear();
    var patternArr = BOARD_PATTERNS[pattern]();
    if (!patternArr) { return false; }
    patternArr.forEach(function(idx) {
      board[idx].setState(1);
    })

    return true;
  }

  /**
   * get the list of names of the preset pattern in the board
   * @return {array} array with the names of the patterns
   */
  that.getPresetPatterns = function() {
    return Object.keys(BOARD_PATTERNS);
  }

  // BOARD PATTERNS CREATORS
  // the functions below create preset patterns for the board
  // they return a list of indexes of cells that should be alive in the
  // start of the pattern
  var randomPattern = function() {
    return board.map(function(el, idx){
                  return idx;
               }).filter(function(){
                  return Math.random() < 0.5;
               })
  }

  var glideAndExplodePattern = function() {
    return addGlider(width, 0, 0)
          .concat(addGlider(width, 0, 5))
          .concat(addGlider(width, 0, 10))
          .concat(addExploder(width, 5, 0))
          .concat(addExploder(width, 5, 5))
          .concat(addExploder(width, 5, 10));
  }

  var allTheThingsPattern = function() {
    return addBeacon(width, 1, 1)
          .concat(addGlider(width, 5, 5))
          .concat(addSpaceship(width, 10, 10))
          .concat(addExploder(width, 10, 20));
  }

  var allTheSpaceshipsPattern = function(){
    return Array(3).fill(0).reduce(function(prev, cur, idx){
      return prev.concat(addSpaceship(width, idx*5, idx*5));
    }, []);
  }

  // preset board patterns
  var BOARD_PATTERNS = {
                         "glide and explode": glideAndExplodePattern,
                         "all the things": allTheThingsPattern,
                         "all the spaceships": allTheSpaceshipsPattern,
                         "random": randomPattern
                        };

  createBoard(width, height);
  Object.freeze(that);
  return that;
};