
/**
 * A layout is an object with two properties:
 *
 *   n:        The number of players for this map
 *   template: A 2D rectangular array representing the hexagonal grid of tiles.
 *             1 represents a tile and 0 represents an open space. See
 *             SMALL_LAYOUT for an example
 */
var SMALL_LAYOUT = {
  n: 2,
  template: [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ]
};
