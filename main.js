
var board;
$(document).ready(function () {
  board = new Board(SMALL_LAYOUT);

  // Draw board!
  $('#board').append('<div class="tile"></div>');
  $('.tile')
    .append('<div class="tile-pre"></div>')
    .append('<div class="tile-main"></div>')
    .append('<div class="tile-post"></div>');
});

