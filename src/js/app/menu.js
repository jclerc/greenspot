
App.ready($ => {
  'use strict';

  const carousel = new Carousel('.carousel');

  $('[data-goto="menu"]').on('click', e => {
    App.router.navigate('/menu');
    e.preventDefault();
  });

  $('[data-goto="item"]').on('click', e => {
    var $item = $('.carousel__item_' + (carousel.index + 1));
    if ($item.data('enabled')) {
      App.router.navigate('/item-' + (carousel.index + 1));
    } else {
      alert('L\'objet n\'est pas encore disponible !');
    }

    e.preventDefault();
  });

  App.router.get('/menu', req => {
    App.showPage('menu');
    App.backAction('/home');
  });

});
