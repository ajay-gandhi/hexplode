
var board;
$(document).ready(function () {
  var which_layout = get_url_param('layout');
  var layout = LAYOUTS[which_layout] || LAYOUTS['Small'];

  var solo = get_url_param('solo') === 'true';

  board = new Board(layout, solo);
  board.render($('#board'));
});

// https://davidwalsh.name/query-string-javascript
var get_url_param = function (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
