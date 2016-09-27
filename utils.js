var times = function (i, f) {
  if (i === 0) return;
  f();
  times (i-1, f);
}

Array.prototype.flatten = function() {
  return this.reduce(function(prev, next) { return prev.concat(next); }, []);
};