
App.ready($ => {
  'use strict';

  var carousel = new Carousel('.carousel');

  $('[data-goto="menu"]').on('click', e => {
    App.router.navigate('/menu');
    e.preventDefault();
  });

  $('[data-goto="item"]').on('click', e => {
    App.router.navigate('/item-' + (carousel.index + 1));
    e.preventDefault();
  });

  App.router.get('/menu', function (req) {
    $('.page').hide();
    $('.page_menu').show();
  });

});
