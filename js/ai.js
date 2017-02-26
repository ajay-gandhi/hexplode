
/**
 * AI for Hexplode game. Minimax
 */

function HexplodeAI (board) {
  this.board = board;
  this.turn = 1; // AI always goes second
}

HexplodeAI.prototype.play = function () {
  var self = this;

  // List possible moves
  var my_tiles = this.board.tiles.reduce(function (acc, row) {
    return acc.concat(row.filter(function (tile) {
      return tile.color == self.turn || tile.color == -1;
    }));
  }, []);

  // For each move compute score
  var best_move = my_tiles.reduce(function (best, tile) {
    var cur_score = evaluate_play(this.board, tile, this.turn);
    console.log(cur_score);

    if (cur_score > best.score) {
      // Overwrite best
      return {
        score: cur_score,
        x: tile.x,
        y: tile.y
      }

    } else {
      return best;
    }
  }, {
    score: -1,
    x: -1,
    y: -1
  });

  // Simulate play
  this.board.tiles[best_move.y][best_move.x].tile_el.find('.trigger').click();
}

/**
 * Compute the value of a play. Considerations:
 *     Number and color (ownership) of neighbors
 *     Likelihood of cascading
 *     Likelihood of opponent cascading
 */
var evaluate_play = function (board, wt, me) {
  // Compute value of play
  var score = 6 - wt.cap + wt.hits;

  // Add some randomness lmao
  if (Math.random() > 0.85) return score + 2;

  for (var i = 0; i < wt.neighbors.length; i++) {
    var nb = wt.neighbors[i];
    if (nb.cap - nb.hits == 1 && wt.cap - wt.hits == 1) score += 2;
    if (nb.color == me) {
      // I own neighbor
      score++;

    } else if (nb.color >= 0) {
      // Opponent owns neighbor
      // score--;
      if (nb.cap - nb.hits == 1 && wt.cap - wt.hits == 2) score -= 2;
    }
  }

  return score;
}
