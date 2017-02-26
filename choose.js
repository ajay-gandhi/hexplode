
var solo = false;

$(document).ready(function () {
  Object.keys(LAYOUTS).forEach(function (l) {
    $('#container').append(
      '<a href="game.html?layout=' + l + '" data-has-ai="' + (LAYOUTS[l].n == 2)
      + '">' + l + '</a><br />'
    );
  });

  $('#is-solo').click(function () {
    solo = !solo;
    $(this).text(solo ? 'Single Player' : 'Multi Player');

    $('#container a[data-has-ai=false]').toggle(!solo);

    if (solo) {
      $('#container a').each(function () {
        $(this).attr('href', $(this).attr('href') + '&solo=true');
      });
    } else {
      $('#container a').each(function () {
        var prev_h = $(this).attr('href')
        $(this).attr('href', prev_h.substring(0, prev_h.indexOf('&')));
      });
    }
  });
});
