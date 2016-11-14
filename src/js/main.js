
var App = ($ => {
  'use strict';

  var App = {};

  // Router
  App.router = new Grapnel();

  // Show a page
  App.showPage = function (page, step) {
    $('.page').addClass('page_hidden');
    $('.page_' + page).removeClass('page_hidden');
    if (step) {
      var steps = $('.page_' + page).find('.step');
      steps.addClass('step_hidden');
      steps.filter('.step-' + step).removeClass('step_hidden');
    }
  };

  // Deffered
  var deffered = [];
  App.ready = callback => deffered.push(callback);
  $(function () {
    // Ensure deffered is run when all JS is read
    setTimeout(() => {
      for (var i = deffered.length - 1; i >= 0; i--) {
        if (typeof deffered[i] === 'function') {
          deffered[i]($);
        }
      }
    });
  });

  return App;

})(Zepto);
