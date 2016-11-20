
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

  var backAction = e => App.router.navigate('/home');
  $('.navigation__item_left').on('click', e => backAction(e));

  App.backAction = function (callback) {
    if (typeof callback === 'function') {
      backAction = callback;
      $('.navigation__item_left').removeClass('navigation__item_hidden');
    } else if (typeof callback === 'string') {
      backAction = e => App.router.navigate(callback);
      $('.navigation__item_left').removeClass('navigation__item_hidden');
    } else {
      $('.navigation__item_left').addClass('navigation__item_hidden');
    }
  };

  // Deffered
  var deffered = [];
  App.ready = callback => deffered.push(callback);
  $(function () {
    // Ensure deffered is run when all JS is read
    setTimeout(() => {
      var callback = deffered.shift();
      while (callback) {
        callback($);
        callback = deffered.shift();
      }
    });
  });

  return App;

})(Zepto);
