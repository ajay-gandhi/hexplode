
var board;
$(document).ready(function () {
  board = new Board(SMALL_LAYOUT);

  board.render($('#board'));

  // // Draw board!
  // for (var y = 0; y < board.tiles.length; y++) {
  //   for (var x = 0; x < board.tiles[y].length; x++) {
  //     // Create a new column for all x = 0 and y = last (see board)
  //     if (y == 0 || x == board.tiles[y].length - 1) {
  //       $('#board').append('')
  //     }
  //   }
  // }

  // board.tiles.forEach(function (drow) {
  //   drow.forEach(function (tile) {
  //     var tile_el = $('<div class="tile"></div>');
  //     $('#board').append(tile_el);
  //     tile_el
  //       .append('<div class="tile-pre"></div>')
  //       .append('<div class="tile-main"></div>')
  //       .append('<div class="tile-post"></div>');
  //   });
  // });
});

// http://jtauber.github.io/articles/css-hexagon.html
