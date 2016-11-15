
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
 * Creates a list of neighboring tiles for position x, y
 *
 *  Above: -,+
 *  UpRig: o,+
 *  DoRig: +,o
 *  Below: +,-
 *  DoLef: o,-
 *  UpLef: -,o
 */
var get_neighbors(b, x, y) {
  var neighbors = [];
  if (x - 1 >= 0 && y + 1 <= n) neighbors.push(b[y + 1, x - 1]); // above
  if (y + 1 <= n)               neighbors.push(b[y + 1, x    ]); // upper right
  if (x + 1 >= 0)               neighbors.push(b[y,     x + 1]); // lower right
  if (x + 1 >= 0 && y - 1 <= n) neighbors.push(b[y - 1, x + 1]); // below
  if (y - 1 <= n)               neighbors.push(b[y - 1, x    ]); // lower left
  if (x - 1 >= 0)               neighbors.push(b[y,     x + 1]); // upper left
  return neighbors;
}
