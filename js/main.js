$(document).ready(function() {
  header.init();
  custom.init();
  svgMap.init();
});

header = {
  scrolling: function(scroll) {
    if (scroll > 100) {
      $(".header").addClass("scrolled");
    } else {
      $(".header").removeClass("scrolled");
    }
  },
  events: function() {
    var _this = this;
    $(document).on("scroll", function() {
      _this.scrolling($(document).scrollTop());
    });
  },
  init: function() {
    this.events();
  }
};
custom = {
  animateHover: {
    events: function() {
      $(".hoverLineMoved").hover(function() {
        $(this).addClass("ready");
      });
    },
    init: function() {
      this.events();
    }
  },
  init: function() {
    this.animateHover.init();
  }
};
svgMap = {
  slider: function() {
    $(".dillerMap_slider").slick({
      slidesToShow: 1,
      speed: 1000,
      dots: false,
      variableWidth: true,
      centerMode: false,
      infinite: false,
      arrows: true,
      swipe:false,
    });
  },
  setPos: function(target) {
    var img = $(".dillerMap_map img");
    var width = img[0].naturalWidth;
    var height = img[0].naturalHeight;
    var left = 0;
    var top = 0;
    if (target == 1) {
      top = -600;
      width = 3140;
      height = 2224;
    }
    if (target == 2) {
      top = -800;
      left = -300;
      height = 1623;
      width = 2355;
    }
    if (target == 3) {
      top = -940;
      left = 100;
      width = 4378;
      height = 2853;
    }
    if (target == 4) {
      top = -2920;
      left = -400;
      width = 6520;
      height = 3863;
    }
    img.css("height", height + "px");
    img.css("width", width + "px");
    img.css("margin-top", top + "px");
    img.css("margin-left", left + "px");
  },
  events: function() {
    var _this = this;
    $(".dillerMap_slider").on("beforeChange", function(slider, a, b, target) {
      _this.setPos(target);
    });
    $(document).on('click','.slick-slide:not(.slick-current)',function(){
      $(".dillerMap_slider").slick('slickGoTo',$(this).attr('data-slick-index'))
    })
  },
  init: function() {
    this.slider();
    this.events();
    this.setPos(0);
  }
};
