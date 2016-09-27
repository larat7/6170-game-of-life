GameWidget_install = function(domContainer, game) {
  var tableElm = $("<table class='table table-bordered'>");
  var tableBody = $("<tbody>");
  var btnGroup = $("<div class='btn-group' role='group'>")
  tableElm.append(tableBody);
  domContainer.append(tableElm);
  domContainer.append(btnGroup);

  var createButton = function(label, action) {
    var btn = $("<button type='button' class='btn btn-default'></button>")
      .text(label)
      .click(function(event) {
        action();
      });;
    return btn;
  }

  var builtControlBar = function() {
    var startBtn = createButton("Start", function() { game.start(); })
    var stopBtn = createButton("Stop", function() { game.stop(); })
    var clearBtn = createButton("Clear", function() { game.clear(); })

    btnGroup.append(startBtn);
    btnGroup.append(stopBtn);
    btnGroup.append(clearBtn);
  }

  var buildTable = function() {
    var newTableBody = $("<tbody>");
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
      newTableBody.append(tableRow)
    });

    tableBody.replaceWith(newTableBody);
    tableBody = newTableBody;
  };

  buildTable();
  builtControlBar();
}