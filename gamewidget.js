GameWidget_install = function(domContainer, game) {
  var tableBody = $("#game-body");
  var btnGroup = $("#btn-control")

  /**
   * creates a button for the control panel
   * @param  {string}   label  the button label
   * @param  {function} action function to be called when button is clicked
   * @return {obj}             the button object
   */
  var createButton = function(label, action) {
    var btn = $("<button type='button' class='btn btn-default'></button>")
      .text(label)
      .click(function(event) {
        action();
      });;
    return btn;
  }

  /**
   * adds dropdown menu with preset patterns to the control panel
   */
  var addDropdownPatterns = function() {
    var dropdown = $("#patterns-dropdown");
    $.each(game.getPresetPatterns(), function(idx, pattern) {
      var item = $("<li>");
      var href = $("<a href='#'>").text(pattern).click(function(){
        game.setPattern(pattern);
      });
      item.append(href);
      dropdown.append(item);
    });
  }

  /**
   * adds buttons to the control panel
   */
  var buildControlBar = function() {
    var startBtn = createButton("Start", function() { game.start(); })
    var stopBtn = createButton("Stop", function() { game.stop(); })
    var clearBtn = createButton("Clear", function() { game.clear(); })

    btnGroup.append(startBtn);
    btnGroup.append(stopBtn);
    btnGroup.append(clearBtn);
  }

  /**
   * builds table representing the board.
   */
  var buildTable = function() {
    $.each(game.getBoard(), function(row, value) {
      var tableRow = $("<tr>");
        $.each(value, function(col, cell){
          var cellElm = $("<td id='cell'>");

          // click event: flips state and
          cellElm.click(function(event) {
            cell.flipState();
          });

          // when cell changes state, it updates the view
          cell.subscribe(function() {
            cellElm.attr('class', cell.stateString());
          })

          tableRow.append(cellElm);
        })
      tableBody.append(tableRow)
    });
  };

  addDropdownPatterns();
  buildTable();
  buildControlBar();
}