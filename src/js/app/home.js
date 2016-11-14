
App.ready($ => {
  'use strict';

  $('[data-goto="home"]').on('click', e => {
    App.router.navigate('/home');
    e.preventDefault();
  });

  App.router.get('/home', req => App.showPage('home'));

});
