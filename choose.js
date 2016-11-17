
$(document).ready(function () {
  Object.keys(LAYOUTS).forEach(function (l) {
    $('#container').append('<a href="game.html?layout=' + l + '">' + l + '</a><br />');
  });
});
