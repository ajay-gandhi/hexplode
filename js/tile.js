
var color_map = ['#66CC66', 'red'],
    open_tile = '#999999';

function Tile () {
  this.neighbors = false;
  this.tile_el = false;
}

/**
 * Initializes the tile with the given parameters.
 */
Tile.prototype.init = function (board, x, y, color) {
  this.neighbors = get_neighbors(board.tiles, x, y);
  this.cap       = this.neighbors.length;
  this.hits      = 0;
  this.x         = x;
  this.y         = y;
  this.color     = color;
}

/**
 * Perform a hit on the tile as the given player. If `convert` is provided, the
 * tile is converted to `convert` color.
 */
Tile.prototype.hit = function (color, convert) {
  if (!this.neighbors) return console.error('`hit` failed: tile not initialized.');
  if (this.color != color && convert == -1) return false;

  this.hits++;
  if (convert >= 0) this.color = convert;
  if (this.hits == this.cap) {
    this.hits  = 0;
    this.color = -1;

    // Trigger neighbors
    this.neighbors.forEach(function (nb) {
      nb.hit(color, color);
      nb.update();
    });
  }
  return this;
}

/**
 * Renders the tile into the given selector.
 */
Tile.prototype.render = function (selector) {
  this.tile_el = $('<div class="tile">0/' + this.cap + '</div>')
    .attr('data-x', this.x)
    .attr('data-y', this.y)
    .append('<div class="trigger"></div>')
    .append('<div class="tile-pre"></div>')
    .append('<div class="tile-main"></div>')
    .append('<div class="tile-post"></div>');
  selector.append(this.tile_el);
  return this;
}

/**
 * Initializes events for the tile. Must be called after `render`.
 */
Tile.prototype.bind = function (board) {
  var self = this;
  if (!this.tile_el) return console.error('`bind` failed: tile not rendered.');

  this.tile_el.find('.trigger').click(function () {
    // Start the game if not started
    if (board.turn == -1) board.turn = 0;

    // Only valid move if this tile is open or owned by this player
    if (self.color == -1 || self.color == board.turn) {
      self.color = self.color == -1 ? board.turn : self.color;
      self.hit(board.turn, -1);
      board.turn = (board.turn + 1) % board.n_players;
      self.update();
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

  var textNode = this.tile_el.contents().first();
  textNode.replaceWith(this.hits + '/' + this.cap);

  return this;
}

/**
 * Sets the color of a tile.
 */
Tile.prototype.set_color = function (color) {
  if (!this.tile_el) return console.error('`set_color` failed: tile not rendered.');

  this.tile_el.find('.tile-pre').css('border-right', '30px solid ' + color);
  this.tile_el.find('.tile-post').css('border-left', '30px solid ' + color);
  this.tile_el.find('.tile-main').css('background-color', color);
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
  var ym = b.length - 1,
      xm = b[0].length - 1;
  var n = [];

  if (x - 1 >= 0 && y + 1 <= ym && b[y + 1][x - 1]) n.push(b[y + 1][x - 1]); // above
  if (y + 1 <= ym && b[y + 1][x])                   n.push(b[y + 1][x    ]); // upper right
  if (x + 1 <= xm && b[y][x + 1])                   n.push(b[y    ][x + 1]); // lower right
  if (x + 1 <= xm && y - 1 >= 0 && b[y - 1][x + 1]) n.push(b[y - 1][x + 1]); // below
  if (y - 1 >= 0  && b[y - 1][x])                   n.push(b[y - 1][x    ]); // lower left
  if (x - 1 >= 0  && b[y][x - 1])                   n.push(b[y    ][x + 1]); // upper left
  return n;
}
