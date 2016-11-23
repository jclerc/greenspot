
class Carousel {

  constructor(target) {

    const $target = $(target).eq(0);
    const _this = this;

    this.elements = {
      container: $target,
      slides: $target.find('.carousel__slides'),
      arrows: $target.find('.carousel__arrows'),
      items: $target.find('.carousel__item'),
    };

    this.count = this.elements.items.length;

    this.elements.items.on('click', function (e) {
      _this.goto($(this).index());
      e.preventDefault();
    });

    let arrows = this.elements.arrows;

    console.log(arrows);

    arrows.find('.carousel__arrow_left').on('click', function (e) {
      _this.prev();
      e.preventDefault();
    });

    arrows.find('.carousel__arrow_right').on('click', function (e) {
      _this.next();
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
      const width = this.elements.slides.width();
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
