
App.ready($ => {
  'use strict';

  const $progress = $('.navigation-bar__progress');
  const listener = function () {
    let path = this.path().toLowerCase();
    if (path.indexOf('/item') === -1) {
      $('.navigation-bar').addClass('navigation-bar_hidden');
      $progress.css('transform', null);
    } else {
      $('.navigation-bar').removeClass('navigation-bar_hidden');

      setTimeout(_ => {

        let state = App.getCurrentState();
        let $page = $('.page_' + state.currentPage);
        let totalSteps = $page.children('.step').length;
        let progress = 100 - state.currentStep * 100 / totalSteps;

        $progress.css('transform', 'translateX(-' + progress + '%)');

      }, 1);
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
