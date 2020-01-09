$(document).ready(function() {
  header.init();
  custom.init();
  svgMap.init();
  priceSlider.init();
});

header = {
  scrolling: function(scroll) {
    if (scroll > 100) {
      $(".header").addClass("scrolled");
    } else {
      $(".header").removeClass("scrolled");
    }
  },
  closeEnother: function(name) {
    if (name != "burger") {
      $(".burger").removeClass("active");
      $(".burger-but").removeClass("active");
    }
    if (name != "basket") {
      $(".basket").removeClass("active");
      $(".header .cart").removeClass("active");
    }
  },
  burgerOpen: function() {
    var _this = this;
    $(document).on("click", ".burger-but", function(e) {
      e.preventDefault();
      $(".burger").toggleClass("active");
      $(this).toggleClass("active");

      _this.closeEnother("burger");
    });
    $(window).resize(function() {
      if ($(window).width() > 950) {
        $(".burger").removeClass("active");
        $(".burger-but").removeClass("active");
      }
    });
  },
  cartOpen: function() {
    var _this = this;
    $(document).on("click", ".header .cart", function(e) {
      e.preventDefault();
      $(".basket").toggleClass("active");
      $(this).toggleClass("active");
      _this.closeEnother("basket");
    });
    $(document).on("click", ".basket_close", function(e) {
      e.preventDefault();
      $(".basket").removeClass("active");
      $(".header .cart").removeClass("active");
    });
  },
  events: function() {
    var _this = this;
    $(document).on("scroll", function() {
      _this.scrolling($(document).scrollTop());
    });
  },
  init: function() {
    this.events();
    this.burgerOpen();
    this.cartOpen();
  }
};
custom = {
  animateHover: {
    events: function() {
      $(".hoverLineMoved,.btn-orange,.btn-gray,.news_item").hover(function() {
        $(this).addClass("ready");
      });
    },
    init: function() {
      this.events();
    }
  },
  tabs: {
    createTabs: function() {
      $(".tabs").each(function(i, parent) {
        var tabsLink = $(this).find(".tabs_link");
        tabsLink.each(function(key, item) {
          var index = parseInt(Math.random() * 1000);
          var tab = $(parent)
            .find(".tab")
            .eq(key);
          $(this).attr("href", "#target-" + index);
          tab.attr("id", "target-" + index);
        });
      });
    },
    events: function() {
      $(document).on("click", ".tabs_link", function(e) {
        e.preventDefault();
        var parent = $(this).closest(".tabs");
        parent.find(".tabs_link").removeClass("active");
        $(this).addClass("active");
        parent.find(".tab").removeClass("active");
        parent.find(".tab" + $(this).attr("href")).addClass("active");
      });
    },
    init: function() {
      this.createTabs();
      this.events();
    }
  },
  preloaderInit: function() {
    var imgs = $(".wrapper").find("*:not(script)");
    var items = [];
    imgs.each(function() {
      var url = "";
      if ($(this).css("background-image") != "none") {
        var url = $(this).css("background-image");
      } else if (
        typeof $(this).attr("src") != "undefined" &&
        $(this).attr("tagName") == "img"
      ) {
        var url = $(this).attr("src");
      }

      url = url.replace('url("', "");
      url = url.replace("url(", "");
      url = url.replace('")', "");
      url = url.replace(")", "");

      if (url.length > 0) {
        items.push(url);
      }
    });
    var imgCount = items.length;
    var progress = 0;
    function refreshPreloader() {
      progress++;
      var percent = Math.round((progress / imgCount) * 100);
      var preloaderBar = document.querySelector(".preloader_progress .bar");
      $(".preloader_img .gray").css("height", 100 - percent + "%");
      $(".preloader_progress .bar").css("height", percent + "%");
      $({
        numberValue: parseInt(
          $(".preloader_progress .count")
            .text()
            .replace("%", "")
        )
      }).animate(
        { numberValue: percent },
        {
          duration: 300,
          easing: "linear",
          step: function(val) {
            $(".preloader_progress .count").text(Math.ceil(val) + "%");
          }
        }
      );
      if (imgCount == progress) {
        setTimeout(function() {
          document.querySelector(".preloader").className =
            document.querySelector(".preloader").className + " loaded";
        }, 100);
      }
    }
    setTimeout(function() {
      document.querySelector(".preloader").className =
        document.querySelector(".preloader").className + " loaded";
    }, 40000);

    items.forEach(function(item) {
      var imgLoad = $("<img></img>");
      $(imgLoad).attr("src", item);
      $(imgLoad).unbind("load");
      $(imgLoad).bind("load", function() {
        refreshPreloader();
      });
    });
  },
  init: function() {
    this.animateHover.init();
    this.tabs.init();
    this.preloaderInit();
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
      swipe: false
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
    $(document).on("click", ".slick-slide:not(.slick-current)", function() {
      $(".dillerMap_slider").slick(
        "slickGoTo",
        $(this).attr("data-slick-index")
      );
    });
  },
  init: function() {
    if($('.dillerMap_slider').length>0){
      this.slider();
      this.events();
      this.setPos(0);
    }
  }
};
priceSlider = {
  create: function() {
    $(".pS_slider").each(function() {
      $(this).slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 1000,
        dots: false,
        infinite: true,
        arrows: true,
        swipe: true,
        rows: 0,
        responsive: [
          {
            breakpoint: 951,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 621,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    });
  },
  init: function() {
    this.create();
  }
};
