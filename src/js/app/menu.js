
(() => {
  'use strict';

  $('[data-goto="menu"]').on('click', e => {
    App.router.navigate('/menu');
    e.preventDefault();
  });

  App.router.get('/menu', function (req) {
      $('.page').hide();
      $('.page_menu').show();
  });

})();
