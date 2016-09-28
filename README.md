# proj2-larat

##(a) what concerns you identified, and how you separated them;
first, I separated the model from the view. I also separated the static
components of the view and the ones that required event handlers.

the model was separated into Game, Board and Cell objects.
the view was separated into the gameboard and a controlpanel (although in the
same file, these two are build by different functions)

##(b) what the program modules are, what their dependences are on one another, and
whether there are any dependences that should ideally be eliminated;
the model has 3 modules, Game, Board and Cell.
the Game class contains a Board and a Board contains many Cells.
their dependency is one way, a Board doesn't know about the its in and a Cell
doens't know about the Board its in.

the view index.html runs main.js to hook it with the model.

main.js install the gamewidget. the gamewidget depends on a Game instance and it
sets event handlers for different elements in the view.

there is also an util module that is shared by all js files.

##(c) how you exploited functionals in your code;
I tried to keep my functions short and concise. I also wrote functions to
represent patterns I used a lot, like iterating over all cells in the board.
Moreover, I tried using reduce, map and filter wherever I could.
However, sometimes for-like patterns where inevitable, for example when
displaying the board, I had do to a nested loop to show it in matrix form.

##(d) any interesting design ideas you had or tradeoffs that you made.
I think representing the board internally as an array and only changing it to
a matrix for display purposes was nice. It made it easier to use functionals,
however converting the indexes was a bit annoying.

Another thing was adding listeners to change the state of each individual cell.
I could've added only one big listener for the entire board, and once that
event was fired, it would just rebuild the entire board. However, I feel like
that is unnecessary work. Having events per cell also seems more intuitive, but
it means that cells are not actually being update simultaneously. However,
iterating through the cells is so quick that it doesn't matter for the user.

