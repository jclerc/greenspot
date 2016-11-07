
var App = ($ => {
  'use strict';

  var App = {};

  // Router
  App.router = new Grapnel();

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
