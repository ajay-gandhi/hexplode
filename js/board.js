
/**
 * Creates a new board with the given layout (see layouts.js).
 */
function Board (layout) {
  var self = this;

  this.turn = -1;
  this.playing = false;
  this.started = false;
  this.tile_count = (new Array(layout.n)).fill(0);

  // Create tiles
  this.tiles = layout.template.map(function (drow) {
    return drow.map(function (is_tile) {
      return is_tile == 1 ? new Tile() : false;
    });
  });

  // Initialize tiles
  this.tiles.forEach(function (drow, y) {
    drow.forEach(function (tile, x) {
      if (tile) {
        tile.init(self, x, y, -1);
      }
    });
  });
}

/**
 * Renders the tile into HTML.
 */
Board.prototype.render = function (selector) {
  var self = this;
  self.board_el = $('<div class="board"></div>');
  selector.append(self.board_el);

  for (var y = 0; y < self.tiles.length; y++) {
    for (var x = 0; x < self.tiles[y].length; x++) {

      // Create a new row for all x = 0 and y = 0
      var new_row = $('<div class="row"></div>');
      if (y == 0) {
        self.board_el.prepend(new_row);
      } else if (x == 0) {
        self.board_el.append(new_row);
      }

      var rows = self.board_el.children('.row');
      // Render the tiles
      self.tiles[y][x].render(rows.eq(rows.length - x - 1));
      // Bind events for the tiles
      self.tiles[y][x].bind();
    }
  }

  self.board_el.find('.row').each(function () {
    $(this).find('.tile').last().css('margin', 0);
  });

  self.board_el.width(self.board_el.width() + 'px');
}

/**
 * Halts the game if a player has won.
 */
Board.prototype.check_game_over = function () {
  // All players must have played at least once
  if (this.started) {
    for (var i = 0; i < board.tile_count.length; i++) {
      // Game over if any player 0 tiles
      if (board.tile_count[i] == 0) {
        console.log('Game over!');
        this.playing = false;
        this.started = false;
        return true;
      }
    }
  }
  return false;
}

/*

(0,0) (1,0) (2,0)
(0,1) (1,1) (2,1)
(0,2) (1,2) (2,2)



            (2,0)
      (1,0)       (2,1)
(0,0)       (1,1)       (2,2)
      (0,1)       (1,2)
            (0,2)

*/
