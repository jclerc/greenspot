
App.ready($ => {
  'use strict';

  App.router.get('/item-:id/:step?', function (req) {
    var id = req.params.id;
    var step = req.params.step || 'step-1';

    if (step.toLowerCase().indexOf('step') === 0) {
      step = step.substr(5);
    }

    App.showPage('item-' + id, step);
    App.backAction('/menu');
  });

  App.router.on('navigate', function () {
    if (this.path().toLowerCase().indexOf('/item') === -1) {
      $('.navigation-bar').addClass('navigation-bar_hidden');
    } else {
      $('.navigation-bar').removeClass('navigation-bar_hidden');
    }
  });

  $('[data-goto^="item-"]').on('click', function (e) {
    App.router.navigate('/' + $(this).data('goto'));
  });

});
