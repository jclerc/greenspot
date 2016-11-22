
App.ready($ => {
  'use strict';

  (function cookie() {

    let clicks = 0;
    App.router.on('navigate', e => clicks = 0);

    $('[data-animation="cookie"]').on('click', function (e) {
      const $this = $(this);
      if (++clicks <= 3) {
        $this.removeClass('product__image_cookie-animated');
        setTimeout(_ => $this.addClass('product__image_cookie-animated'), 10);
      } else {
        App.router.navigate('/' + $this.data('then'));
      }
    });

  })();

  (function forest() {

    const $forest = $('[data-animation="forest"]');

    let clicks = 0;
    App.router.on('navigate', e => {
      clicks = 0;
      $forest.addClass('product__image-step7_1');
      for (let i = 2; i <= 5; i++) {
        $forest.removeClass('product__image-step7_' + i);
      }
    });

    $forest.on('click', function (e) {
      const $this = $(this);
      if (++clicks < 5) {
        $this.removeClass('product__image-step7_' + clicks);
        $this.addClass('product__image-step7_' + (clicks + 1));
      } else {
        App.router.navigate('/' + $this.data('then'));
      }

    });

  })();

});
