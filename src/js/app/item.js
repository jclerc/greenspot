
App.ready($ => {
  'use strict';

  const $progress = $('.navigation-bar__progress');
  const listener = function () {
    let path = this.path().toLowerCase();
    const $navigationBar = $('.navigation-bar');

    if (path.indexOf('/item') === -1) {
      // We don't have steps
      $navigationBar.addClass('navigation-bar_hidden');
      $progress.css('transform', null);
    } else {
      // We have steps
      $navigationBar.removeClass('navigation-bar_hidden');

      setTimeout(_ => {

        let state = App.getCurrentState();
        let $overlay = $navigationBar.find('.navigation-bar__overlay');

        if (state.pageId === 'item-2' && state.stepId === 1) {
          // Special case: for phone messages
          $overlay.hide();
        } else {
          $overlay.show();
        }

        let totalSteps = state.$currentPage.children('.step').length;
        let progress = 100 - state.stepId * 100 / totalSteps;

        $progress.css('transform', 'translateX(-' + progress + '%)');

      }, 1);
    }

    setTimeout(_ => {
      let state = App.getCurrentState();
      state.$currentStep.children('.product').scrollTop(0);
    }, 1);
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

    if (step > 1) {
      App.backAction('/item-' + id + '/step-' + (step - 1));
    } else {
      App.backAction('/menu');
    }
  });

  $('[data-goto^="item-"]').on('click', function (e) {
    App.router.navigate('/' + $(this).data('goto'));
  });

});
