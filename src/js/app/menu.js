
App.ready($ => {
  'use strict';

  const carousel = new Carousel('.carousel');

  $('[data-goto="menu"]').on('click', e => {
    App.router.navigate('/menu');
    e.preventDefault();
  });

  $('[data-goto="item"]').on('click', e => {
    App.router.navigate('/item-' + (carousel.index + 1));
    e.preventDefault();
  });

  App.router.get('/menu', req => {
    App.showPage('menu');
    App.backAction('/home');
  });

});
