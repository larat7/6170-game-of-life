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