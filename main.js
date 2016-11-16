
var board;
$(document).ready(function () {
  board = new Board(SMALL_LAYOUT);
  board.render($('#board'));
});
