
App.ready($ => {
  'use strict';

  const listener = function () {
    if (this.path().toLowerCase().indexOf('/item') === -1) {
      $('.navigation-bar').addClass('navigation-bar_hidden');
    } else {
      $('.navigation-bar').removeClass('navigation-bar_hidden');
    }
  };

  // Attach it
  App.router.on('navigate', listener);

  // And run it now
  listener.bind(App.router)();

  App.router.get('/item-:id/:step?', function (req) {
    const id = req.params.id;
    let step = req.params.step || 'step-1';

    if (step.toLowerCase().indexOf('step') === 0) {
      step = step.substr(5);
    }

    App.showPage('item-' + id, step);
    App.backAction('/menu');
  });

  $('[data-goto^="item-"]').on('click', function (e) {
    App.router.navigate('/' + $(this).data('goto'));
  });

});
