
/**
 * Dummy class. Basically used to take up space, equivalent of invisible,
 * unusable tiles.
 */

function Dummy () {
  this.is_tile = false;
  this.tile_el = false;
}

/**
 * Initializes the dummy with the given parameters.
 */
Dummy.prototype.init = function (board, x, y) {
  this.board     = board;
  this.x         = x;
  this.y         = y;
}

/**
 * Renders the ummy into the given selector.
 */
Dummy.prototype.render = function (selector) {
  this.tile_el = $('<div class="tile dummy"></div>')
    .attr('data-x', this.x)
    .attr('data-y', this.y)
    .append('<div class="tile-pre"></div>')
    .append('<div class="tile-main"></div>')
    .append('<div class="tile-post"></div>');
  selector.append(this.tile_el);
  return this;
}
