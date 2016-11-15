
/**
 * Creates a new board, where n is the height of the board.
 */
function Board (layout) {
  var self = this;

  // Create tiles
  this.tiles = layout.map(function (drow) {
    return drow.map(function (is_tile) {
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

/**
 * Renders the tile into HTML.
 */
Board.prototype.render = function (selector) {
  var self = this;
  var board_el = $('<div class="board"></div>');
  selector.append(board_el);

  for (var y = 0; y < self.tiles.length; y++) {
    for (var x = 0; x < self.tiles[y].length; x++) {

      // Create a new row for all x = 0 and y = 0
      var new_row = $('<div class="row"></div>');
      if (y == 0) {
        board_el.prepend(new_row);
        new_row.css('margin-left', (x * 97) + 'px');
      } else if (x == 0) {
        board_el.append(new_row);
        new_row.css('margin-left', (y * 97) + 'px');
      }

      var tile_el = $('<div class="tile">' + (y * 3 + x) + '</div>');
      // tile_el.css('margin-left', (34 * x) + 'px');
      self.tiles[y][x].render(tile_el);
      var rows = board_el.children('.row');
      rows.eq(rows.length - x - 1).append(tile_el);
    }
  }
}

/*
(0,0) (1,0) (2,0)
(0,1) (1,1) (2,1)
(0,2) (1,2) (2,2)



            (2,0)
      (1,0)       (2,1)
(0,0)       (1,1)       (2,2)
      (0,1)       (1,2)
            (0,2)


.             (2,0)
.       (1,0)       (2,1)
. (0,0)       (1,1)
.       (0,1)





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
