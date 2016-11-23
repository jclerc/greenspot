
App.ready($ => {
  'use strict';

  (function cookie() {

    const $cookie = $('[data-animation="cookie"]');

    let clicks = 0;
    App.router.on('navigate', e => {
      $cookie.removeClass('product__image_cookie-animated');
      clicks = 0;
    });

    $cookie.on('click', function (e) {
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

  let chatUnlocked = false;

  (function chat() {

    const $chat = $('[data-animation="chat-content"]');
    const $chatControls = $('[data-animation="chat-controls"]');
    const $controlInput = $chatControls.find('.message__answer');

    const $chatReply = $('[data-animation="chat-reply"]');
    const $chatAnswerWrong = $('[data-animation="chat-answer-wrong"]');
    const $chatAnswerCorrect = $('[data-animation="chat-answer-correct"]');

    $chatControls.on('submit', function (e) {
      if ($controlInput.val()) {
        $chatReply.removeClass('message_hidden').find('.message__text').text($controlInput.val());
        if ($chatControls.data('answer') == $controlInput.val()) {
          $chatAnswerCorrect.removeClass('message_hidden');
        } else {
          $chatAnswerWrong.removeClass('message_hidden');
        }

        $($chat).scrollTop($($chat).prop('scrollHeight'));
        chatUnlocked = true;
      } else {
        $controlInput.focus();
      }

      e.preventDefault();
    });

  })();

  (function phone3d() {

    const $phone3d = $('[data-animation="phone3d"]');

    let event = Modernizr.touchevents ? 'swipe' : 'click';

    $phone3d.on(event, function (e) {

      if (chatUnlocked) {
        App.router.navigate('/' + $(this).data('then'));
      }

    });

  })();

});
