
/**
 * Creates a new board, where n is the height of the board.
 */
function Board (layout) {
  var self = this;
  this.n     = n;
  this.tiles = layout;

  // Create tiles
  this.tiles.map(function (drow) {
    drow.map(function (is_tile) {
      return is_tile == 1 ? new Tile() : false;
    });
  });

  // Initialize tiles
  this.tiles.forEach(function (drow, y) {
    drow.forEach(function (tile, x) {
      if (tile) {
        tile.init(self, x, y, false);
      }
    });
  });
}

/*
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

*/
