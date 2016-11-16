
/**
 * A layout is a property of this object. The key is the public name of the
 * layout, and the value is an object with the following properties:
 *
 *   n:        The number of players for this map
 *   template: A 2D rectangular array representing the hexagonal grid of tiles.
 *             1 represents a tile and 0 represents an open space. See
 *             SMALL_LAYOUT for an example
 */
LAYOUTS = {
  'Small': {
    n: 2,
    template: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },

  'Medium': {
    n: 2,
    template: [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ]
  },

  'Large': {
    n: 2,
    template: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ]
  },

  'Triangle': {
    n: 3,
    template: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0]
    ]
  },
}