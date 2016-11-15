
/**
 * Creates a new board, where n is the height of the board.
 */
function Board(n) {
  this.n     = n;
  this.tiles = [];
  // Initialize tiles
  for (var y = 0; y < n; y++) {
    this.tiles.push([]);

    for (var x = 0; x < n; x++) {
      this.tiles[y].push(new Tile(n_neighbors(x, y, n), x, y, false));
    }
  }
}

/**
 * Computes how many neighboring tiles there are for position x,y
 */
/*
Above: -,+
UpRig: o,+
DoRig: +,o
Below: +,-
DoLef: o,-
UpLef: -,o
*/
var n_neighbors(x, y, n) {
  n--;
  var neighbors = 0;
  if (x - 1 >= 0 && y + 1 <= n) neighbors++; // above
  if (y + 1 <= n)               neighbors++; // upper right
  if (x + 1 >= 0)               neighbors++; // lower right
  if (x + 1 >= 0 && y - 1 <= n) neighbors++; // below
  if (y - 1 <= n)               neighbors++; // lower left
  if (x - 1 >= 0)               neighbors++; // upper left
  return neighbors;
}

(0,0) (0,1) (0,2)
(1,0) (1,1) (1,2)
(2,0) (2,1) (2,2)


            (0,2)
      (0,1)       (1,2)
(0,0)       (1,1)       (2,2)
      (1,0)       (2,1)
            (2,0)












(0,0)                        
      (0,1)                  
(1,0)       (0,2)            
      (1,1)       (0,3)      
(2,0)       (1,2)       (0,4)
      (2,1)       (1,3)      
(3,0)       (2,2)       (1,4)
      (3,1)       (2,3)      
            (3,2)       (2,4)
                  (3,3)      
                        (3,4)
