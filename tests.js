(function() {
  mocha.setup("bdd");
  var assert = chai.assert;

  describe("Game", function() {
    describe("start", function() {

      it("runs game if not running", function() {
        var game = Game(1, 1);
        game.start();
        assert.equal(true, game.isRunning());
      });

      it("runs game if already running", function() {
        var game = Game(1, 1);
        game.start();
        game.start();
        assert.equal(true, game.isRunning());
      });
    });

    describe("stop", function() {

      it("stops game if running", function() {
        var game = Game(1, 1);
        game.start();
        game.stop();
        assert.equal(false, game.isRunning());
      });

      it("stops game if already stopped", function() {
        var game = Game(1, 1);
        game.stop();
        assert.equal(false, game.isRunning());
      });

    });
  });

  describe("Board", function() {
    var getStateMatrix = function(board) {
      return board.getRows().map(function(row) {
                              return row.map(function(cell) {
                                return cell.state();
                              });
                            });
    }
    describe("getRows", function() {
      it("should return correct matrix", function() {
        var board = Board(2, 3);
        assert.deepEqual([[0, 0], [0, 0], [0, 0]], getStateMatrix(board));
      });
    });

    describe("update", function() {
      it("should update board according to the rules", function() {
        var board = Board(3, 3);
        board.getRows()[1].forEach(function(cell) {
          return cell.flipState();
        });
        assert.deepEqual([[0, 0, 0], [1, 1, 1], [0, 0, 0]], getStateMatrix(board));
        board.update();
        assert.deepEqual([[0, 1, 0], [0, 1, 0], [0, 1, 0]], getStateMatrix(board));
      });
    });

    describe("clear", function() {
      it("should kill all the cells in the board", function() {
        var board = Board(3, 3);
        board.getRows()[1].forEach(function(cell) {
          return cell.flipState();
        });
        assert.deepEqual([[0, 0, 0], [1, 1, 1], [0, 0, 0]], getStateMatrix(board));
        board.clear();
        assert.deepEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]], getStateMatrix(board));
      });
    });


  });

  describe("Cell", function() {
    describe("setState", function(){
      it("publishes an event to subscribers", function() {
        var cell = Cell(1);
        var result = false;
        cell.subscribe(function() {
          result = true;
        });
        cell.setState(0);
        assert.equal(true, result);
      });

      it("changes the state appropriately", function() {
        var aliveCell = Cell(1);
        var deadCell = Cell(0);
        aliveCell.setState(0);
        deadCell.setState(0);
        assert.equal(0, aliveCell.state());
        assert.equal(0, deadCell.state());
      })
    });

    describe("flipState", function(){
      it("publishes an event to subscribers", function() {
        var cell = Cell(1);
        var result = false;
        cell.subscribe(function() {
          result = true;
        });
        cell.flipState();
        assert.equal(true, result);
      });

      it("changes the state appropriately", function() {
        var aliveCell = Cell(1);
        var deadCell = Cell(0);
        aliveCell.flipState();
        deadCell.flipState();
        assert.equal(0, aliveCell.state());
        assert.equal(1, deadCell.state());
      })
    });

    describe("stateString", function(){
      it("returns correct string", function() {
        var aliveCell = Cell(1);
        var deadCell = Cell(0);
        assert.equal('alive', aliveCell.stateString());
        assert.equal('dead', deadCell.stateString());
      })
    });

    describe("update", function() {
      it("live cell dies from underpopulation", function() {
        var cell = Cell(1);
        cell.update(1);
        assert.equal(0, cell.state());
      });

      it("live cell dies from overpopulation", function() {
        var cell = Cell(1);
        cell.update(4);
        assert.equal(0, cell.state());
      });

      it("dead cell becomes alive from reprodution", function() {
        var cell = Cell(0);
        cell.update(3);
        assert.equal(1, cell.state());
      });

      it("cells maintain state in other situations", function() {
        var aliveCell = Cell(1);
        var deadCell = Cell(0);
        aliveCell.update(2);
        deadCell.update(2);
        assert.equal(1, aliveCell.state());
        assert.equal(0, deadCell.state());
      });

      it("publishes an event to subscribers", function() {
        var cell = Cell(1);
        var result = false;
        cell.subscribe(function() {
          result = true;
        });
        cell.update(0);
        assert.equal(true, result);
      });
    })
  });

  mocha.run();
})()