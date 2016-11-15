
/**
 * Initializes the tile with the given parameters.
 */
function Tile(cap, x, y, color) {
  this.cap   = cap;
  this.hits  = 0;
  this.x     = x;
  this.y     = y;
  this.color = color;
}

/**
 * Perform a hit on the tile as the given player.
 */
Tile.prototype.hit = function (board, color) {
  if (this.color != color) return false;

  this.hits++;
  if (this.hits == this.cap) {
    this.hits  = 0;
    this.color = false;

    // Trigger neighbors
    console.log('TODO:', 'trigger neighbors');
  }
}
