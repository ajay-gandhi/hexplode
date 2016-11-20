
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
      return is_tile == 1 ? new Tile() : new Dummy();
    });
  });

  // Initialize tiles
  this.tiles.forEach(function (drow, y) {
    drow.forEach(function (tile, x) {
      if (tile.is_tile) tile.init(self, x, y, -1);
      else              tile.init(self, x, y);
    });
  });
}

/**
 * Renders the tile into HTML.
 */
Board.prototype.render = function (selector) {
  var self = this;
  self.board_el = $('<div class="board">' +
    '<div class="cover"></div>' +
    '<div class="game-over"></div>' +
    '</div>');
  selector.append(self.board_el);

  // Turn indicator
  self.board_el.parent().append('<div class="indicator"></div>');
  self.board_el.parent().find('.indicator').css('background-color', color_map[0]);

  self.board_el.parent().append('<div class="main-menu-btn"><div><a href="index.html">&#8801;</a></div></div>');

  for (var y = 0; y < self.tiles.length; y++) {
    for (var x = 0; x < self.tiles[y].length; x++) {

      // Create rows for tiles
      var new_row = $('<div class="row"></div>');
      if (y == 0) {
        self.board_el.prepend(new_row);
        new_row.css('margin-left', (x * 97) + 'px');
      } else if (x == 0) {
        self.board_el.append(new_row);
        new_row.css('margin-left', (y * 97) + 'px');
      }

      // Render tiles
      var rows = self.board_el.children('.row');
      self.tiles[y][x].render(rows.eq(rows.length - x - 1));
      // Bind events for the tiles
      if (self.tiles[y][x].is_tile) self.tiles[y][x].bind();
    }
  }

  // var actual_width = (largest_size * 200) + ((largest_size - 1) * 130);
  var largest_size = Math.max(self.tiles.length, self.tiles[0].length);
  var width = (largest_size * 120) + ((largest_size - 1) * 74);
  self.board_el.css('width', width + 'px');

  self.board_el.find('.row').each(function () {
    $(this).find('.tile').last().css('margin', 0);
  });

  // Vertical centering
  self.board_el
    .css('margin-top', -(self.board_el.outerHeight(false) / 2) + 'px')
    .css('margin-left', -(self.board_el.outerWidth(false) / 2) + 'px');
}

Board.prototype.next_turn = function () {
  if (this.playing) {
    this.turn = (this.turn + 1) % this.tile_count.length;
    this.board_el.parent().find('.indicator').css('background-color', color_map[this.turn]);
  }
}

/**
 * Halts the game if a player has won. The input color is excluded from a check
 * since a player cannot lose the game on their turn.
 */
Board.prototype.check_game_over = function (c_exclude) {
  // All players must have played at least once
  if (this.started) {
    for (var i = 0; i < this.tile_count.length; i++) {
      if (i == c_exclude) continue;

      // Game over if any player has 0 tiles
      if (this.tile_count[i] == 0) {
        // Stop all animations
        this.tiles.forEach(function (drow, y) {
          drow.forEach(function (tile, x) {
            if (tile.is_tile) {
              tile.tile_el.stop();
              window.clearTimeout(tile.timeoutId);
            }
          });
        });


        this.playing = false;
        this.started = false;

        this.board_el.find('.game-over').html('Game over! ' +
          '<span style="color:' + color_map[i] + ';font-weight:bold;">Player ' +
          (i + 1) + '</span> loses.<br />' +
          '<a onClick="history.go(0)">Play again</a>');

        this.board_el.find('.cover').fadeTo('normal', 0.9);
        this.board_el.find('.game-over').fadeIn();

        return true;
      }
    }
  }
  return false;
}
