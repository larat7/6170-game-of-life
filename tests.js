(function() {
  mocha.setup("bdd");
  var assert = chai.assert;

  describe("Game", function() {
    describe("start", function() {

      it("runs game if not running", function() {
        var game = Game();
        game.start();
        assert.equal(true, game.isRunning());
      });

      it("runs game if already running", function() {
        var game = Game();
        game.start();
        game.start();
        assert.equal(true, game.isRunning());
      });
    });

    describe("stop", function() {

      it("stops game if running", function() {
        var game = Game();
        game.start();
        game.stop();
        assert.equal(false, game.isRunning());
      });

      it("stops game if already stopped", function() {
        var game = Game();
        game.stop();
        assert.equal(false, game.isRunning());
      });

    });
  });

  describe("Cell", function() {
    describe("update", function() {
      it("live cell dies from underpopulation", function() {
        var cell = Cell(1);
        var neighboors = [Cell(0), Cell(1)];
        cell.update(neighboors);
        assert.equal(0, cell.state());
      });

      it("live cell dies from overpopulation", function() {
        var cell = Cell(1);
        var neighboors = [Cell(1), Cell(1), Cell(1), Cell(1)];
        cell.update(neighboors);
        assert.equal(0, cell.state());
      });

      it("dead cell becomes alive from reprodution", function() {
        var cell = Cell(0);
        var neighboors = [Cell(1), Cell(1), Cell(1)];
        cell.update(neighboors);
        assert.equal(1, cell.state());
      });

      it("cells maintain state in other situations", function() {
        var aliveCell = Cell(1);
        var deadCell = Cell(0);
        var neighboors = [Cell(1), Cell(1)];
        aliveCell.update(neighboors);
        deadCell.update(neighboors);
        assert.equal(1, aliveCell.state());
        assert.equal(0, deadCell.state());
      });
    })
  });

  mocha.run();
})()