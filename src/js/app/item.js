
App.ready($ => {
  'use strict';

  App.router.get('/item-:id', function (req) {

    var id = req.params.id;

    $('.page').hide();
    $('.page_item-' + id).show();
  });

});
