
// Map players to tile colors
var color_map = ['#44DD44', '#DD4444', '#DDDD44', '#4444DD'],
    open_tile = '#BBBBBB';

function Tile () {
  this.neighbors = false;
  this.tile_el = false;
}

/**
 * Initializes the tile with the given parameters.
 */
Tile.prototype.init = function (board, x, y, color) {
  this.board     = board;
  this.neighbors = get_neighbors(board.tiles, x, y);
  this.cap       = this.neighbors.length;
  this.hits      = 0;
  this.x         = x;
  this.y         = y;
  this.color     = color;
}

/**
 * Perform a hit on the tile as the given player. If `convert` is provided and
 * positive, the tile is converted to `convert` color.
 */
Tile.prototype.hit = function (color, convert) {
  if (!this.board.playing) return;
  if (!this.neighbors) return console.error('`hit` failed: tile not initialized.');
  if (this.color != color && convert == -1) return false;

  this.hits++;
  if (convert >= 0) {
    if (this.color >= 0) this.board.tile_count[this.color]--;
    this.color = convert;
    this.board.tile_count[this.color]++;
  }
  if (this.hits == this.cap) {
    this.hits = 0;
    this.board.tile_count[this.color]--;
    this.color = -1;

    // Trigger neighbors
    setTimeout(function (neighbors) {
      // neighbors.forEach(function (n) { n.hit(color, color); });
      for (var i = 0; i < neighbors.length; i++) {
        neighbors[i].hit(color, color);
      }

      this.board.check_game_over(color);
    }, 750, this.neighbors);

  }

  // Update tile
  this.update();

  return this;
}

/**
 * Renders the tile into the given selector.
 */
Tile.prototype.render = function (selector) {
  this.tile_el = $('<div class="tile"></div>')
    .attr('data-x', this.x)
    .attr('data-y', this.y)
    .append('<div class="trigger"></div>')
    .append('<div class="content">0/' + this.cap + '</div>')
    .append('<div class="tile-pre"></div>')
    .append('<div class="tile-main"></div>')
    .append('<div class="tile-post"></div>');
  selector.append(this.tile_el);
  return this;
}

/**
 * Initializes events for the tile. Must be called after `render`.
 */
Tile.prototype.bind = function () {
  var self = this;
  if (!this.board) return console.error('`bind` failed: tile not initialized.');
  if (!this.tile_el) return console.error('`bind` failed: tile not rendered.');

  this.tile_el.find('.trigger').click(function () {
    // Start the game if not started
    if (self.board.turn == -1) {
      self.board.turn = 0;
      self.board.playing = true;
    } else if (self.board.turn == self.board.tile_count.length - 1) {
      self.board.started = true;
    }

    // Only valid move if this tile is open or owned by this player
    if (self.color == -1 || self.color == self.board.turn) {
      // Tile was previously unused
      if (self.color == -1) {
        self.color = self.board.turn;
        self.board.tile_count[self.board.turn]++;
      }
      self.hit(self.board.turn, -1);
      self.board.next_turn();
    }
  });
  return this;
}

/**
 * Update the tile's rendering according to its fields. Must be called after
 * `render`.
 */
Tile.prototype.update = function () {
  if (!this.tile_el) return console.error('`update` failed: tile not rendered.');

  this.set_color(this.color == -1 ? open_tile : color_map[this.color]);
  this.tile_el.find('.content').first().text(this.hits + '/' + this.cap);

  return this;
}

/**
 * Sets the color of a tile.
 */
Tile.prototype.set_color = function (color) {
  if (!this.tile_el) return console.error('`set_color` failed: tile not rendered.');

  this.tile_el.find('.tile-pre').css('borderRightColor', color);
  this.tile_el.find('.tile-post').css('borderLeftColor', color);
  this.tile_el.find('.tile-main').css('backgroundColor', color);
  return this;
}

/**
 * Creates a list of neighboring tiles for position x, y
 *
 *  Above: -,+
 *  UpRig: o,+
 *  DoRig: +,o
 *  Below: +,-
 *  DoLef: o,-
 *  UpLef: -,o
 */
var get_neighbors = function (b, x, y) {
  var ym = b.length,
      xm = b[0].length;
  var n = [];

  if (x - 1 >= 0 && y + 1 < ym && b[y + 1][x - 1]) n.push(b[y + 1][x - 1]); // above
  if (y + 1 < ym && b[y + 1][x])                   n.push(b[y + 1][x    ]); // upper right
  if (x + 1 < xm && b[y][x + 1])                   n.push(b[y    ][x + 1]); // lower right
  if (x + 1 < xm && y - 1 >= 0 && b[y - 1][x + 1]) n.push(b[y - 1][x + 1]); // below
  if (y - 1 >= 0  && b[y - 1][x])                  n.push(b[y - 1][x    ]); // lower left
  if (x - 1 >= 0  && b[y][x - 1])                  n.push(b[y    ][x - 1]); // upper left
  return n;
}

/**
 * Generates a darker color given a hex string.
 */
var darker_color = function (og) {
  var offset = -40;
  var r = parseInt(og.substring(1, 3), 16) - offset;
  var g = parseInt(og.substring(3, 5), 16) - offset;
  var b = parseInt(og.substring(5, 7), 16) - offset;
  return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}
