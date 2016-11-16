
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

  // Turn indicator
  self.board_el.append($('<div class="indicator"></div>'));
  self.board_el.find('.indicator').css('background-color', color_map[0]);

  // Render tiles
  for (var y = 0; y < self.tiles.length; y++) {
    for (var x = 0; x < self.tiles[y].length; x++) {
      if (!self.tiles[y][x]) continue;

      // Create a new row for all x = 0 and y = 0
      var new_row = $('<div class="row"></div>');
      if (y == 0) {
        self.board_el.prepend(new_row);
        new_row.css('margin-left', (x * 97) + 'px');
      } else if (x == 0) {
        self.board_el.append(new_row);
        new_row.css('margin-left', (y * 97) + 'px');
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

Board.prototype.next_turn = function () {
  if (this.playing) {
    this.turn = (this.turn + 1) % this.tile_count.length;
    this.board_el.find('.indicator').css('background-color', color_map[this.turn]);
  }
}

/**
 * Halts the game if a player has won.
 */
Board.prototype.check_game_over = function () {
  // All players must have played at least once
  if (this.started) {
    for (var i = 0; i < this.tile_count.length; i++) {
      // Game over if any player 0 tiles
      if (this.tile_count[i] == 0) {
        console.log('Game over! Player ' + i + ' loses.');
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
