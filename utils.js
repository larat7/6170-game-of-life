/**
 * Util functions
 */

/**
 * executes a fuction i times
 * @param  {int} i the number of times to execute the function
 * @param  {function} f the function to be executed
 * @return {void}
 */
var times = function (i, f) {
  if (i === 0) return;
  f();
  times (i-1, f);
}

/**
 * filters all null entries in an array
 * @return {array} array without null instances
 */
Array.prototype.filterNull = function() {
  return this.filter(function(val) {
                return val != null;
              });
};

/**
 * flattens an array of arrays
 * @return {array} a flat array
 */
Array.prototype.flatten = function() {
  return this.reduce(function(prev, next) { return prev.concat(next); }, []);
};

// Util functions to quickly create some standard patterns
var addGlider = function(width, row, col) {
  var pos = row*width + col;
  return [1,
          width+2,
          2*width, 2*width+1, 2*width+2].map(function(val) {
            return val + pos;
          });
}

var addBeacon = function(width, row, col) {
  var pos = row*width + col;
  return [0, 1,
          width, width+1,
          2*width+2, 2*width+3,
          3*width+2, 3*width+3].map(function(val) {
            return val + pos;
          });
}

var addExploder = function(width, row, col) {
  var pos = row*width + col;
  return [1,
          width, width+1, width+2,
          2*width, 2*width+2,
          3*width+1].map(function(val) {
            return val + pos;
          });
}

var addSpaceship = function(width, row, col) {
  var pos = row*width + col;
  return [1, 2, 3, 4,
          width, width+4,
          2*width+4,
          3*width, 3*width+3].map(function(val) {
            return val + pos;
          });
}