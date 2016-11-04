
(() => {
  'use strict';

  $('[data-goto="home"]').on('click', e => {
    App.router.navigate('/home');
    e.preventDefault();
  });

  App.router.get('/home', function (req) {
    $('.page').hide();
    $('.page_home').show();
  });

})();
