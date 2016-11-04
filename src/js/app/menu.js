
class Carousel {

  constructor(target) {

    var $target = $(target).eq(0);
    var _this = this;

    this.elements = {
      container: $target,
      slides: $target.find('.carousel__slides'),
      items: $target.find('.carousel__item'),
    };

    this.count = this.elements.items.length;

    this.elements.items.on('click', function (e) {
      _this.goto($(this).index());
      e.preventDefault();
    });

    this.elements.container.on('swipeLeft', function (e) {
      _this.next();
      e.preventDefault();
    });

    this.elements.container.on('swipeRight', function (e) {
      _this.prev();
      e.preventDefault();
    });

    this.index = 0;

  }

  prev() {
    if (this.index > 0) {
      this.goto(this.index - 1);
    }
  }

  next() {
    if (this.index < this.count - 1) {
      this.goto(this.index + 1);
    }
  }

  goto(index) {
    if (index < 0 || index >= this.count) {
      throw new Error('Index ' + index + ' is out of bounds');
    } else if (index !== this.index) {
      var width = this.elements.slides.width();
      this.elements.slides.css('transform', 'translateX(' + -width * index + 'px)');
      this.elements.items.removeClass('carousel__item_active');
      this.elements.items.eq(index).addClass('carousel__item_active');
      this.index = index;
    }
  }

  item() {
    return this.elements.items.eq(this.index);
  }

}

(() => {
  'use strict';

  $('[data-goto="menu"]').on('click', e => {
    App.router.navigate('/menu');
    e.preventDefault();
  });

  App.router.get('/menu', function (req) {
    $('.page').hide();
    $('.page_menu').show();
  });

  var carousel = new Carousel('.carousel');

})();
