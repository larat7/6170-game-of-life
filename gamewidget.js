GameWidget_install = function(domContainer, game) {
  var tableElm = $("<table class='table table-bordered'>");
  var tableBody = $("<tbody>");
  tableElm.append(tableBody);
  domContainer.append(tableElm);

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
}