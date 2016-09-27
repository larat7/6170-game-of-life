var times = function (i, f) {
  if (i === 0) return;
  f();
  times (i-1, f);
}