
function Tile () {
  this.neighbors = false;
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
  if (!neighbors) console.log('Tile is not initialized.');
  if (this.color != color && !convert) return false;

  this.hits++;
  if (convert) this.color = convert;
  if (this.hits == this.cap) {
    this.hits  = 0;
    this.color = false;

    // Trigger neighbors
    this.neighbors.forEach(function (n) {
      n.hit(n.color, color);
    });
  }
}

/**
 * Renders the tile into HTML.
 */
Tile.prototype.render = function (selector) {
  selector
    .append('<div class="tile-pre"></div>')
    .append('<div class="tile-main"></div>')
    .append('<div class="tile-post"></div>');
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
