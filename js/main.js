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
  filter: {
    setup: function() {
      $(".filter_select").each(function() {
        $(this).select2({
          minimumResultsForSearch: Infinity,
          closeOnSelect: false,
          multiple: true,
          dropdownParent: $(".wrapper .page"),
          dropdownCssClass: "filter_select2"
        });
      });

      if ($(".filter").height() < $(".filter .content").height()) {
        $(".filter_showAll").addClass("active");
      }
    },
    events: function() {
      function selects() {
        $(".filter_select").on("select2:close", function() {
          $(this)
            .parent()
            .removeClass("active");
        });
        $(".filter_select").on("select2:open", function() {
          $(this)
            .parent()
            .addClass("active");
          $(".select2-results")
            .find(".select2_products-count")
            .remove();
          $(".select2-results")
            .find(".select2_buts")
            .remove();
          var buts =
            "<div class='select2_buts'><a href='' class='btn btn-gray select2_clear'>Сбросить</a><a href='' class='btn btn-orange select2_set'>Применить</a></div>";
          $(".select2-results").append(buts);
        });
        $(document).on("click", ".select2_clear,.select2_set", function(e) {
          e.preventDefault();
          var count = 1;
          if (
            $(".select2-results").find(".select2_products-count").length == 0
          ) {
            $(".select2-results").append(
              '<div class="select2_products-count">Найдено товаров: ' +
                count +
                "</div>"
            );
            $(".select2-results")
              .find(".select2_products-count")
              .animate(
                {
                  height: "50px"
                },
                300
              );
          } else {
            $(".select2-results")
              .find(".select2_products-count")
              .text("Найдено товаров: " + count);
          }
        });
      }
      function sliders() {
        close = function(item) {
          if ($(".filter_slider_box .filter_slider_base").attr("data-value")) {
            var val = $(".filter_slider_box .filter_slider_base")
              .attr("data-value")
              .split(",");
            $(".filter_slider_box .filter_slider_base").attr(
              "data-slider-value",
              "[" + val[0] + "," + val[1] + "]"
            );
          }
          $(".filter_slider_box")
            .find(".filter_slider_products-count")
            .remove();
          if ($(".filter_slider_box").length > 0)
            $(".filter_slider_base").slider("destroy");
          var newHtml = $(".page")
            .find(".filter_slider_box")
            .html();
          item.find(".filter_hide").html(newHtml);
          $(".page")
            .find(".filter_slider_box")
            .remove();
        };
        $(".filter_slider_open").click(function(e) {
          e.preventDefault();

          var html = $(this)
            .find(".filter_hide")
            .html();
          if (!$(this).hasClass("active")) {
            $(".wrapper .page").append(
              '<div class="filter_slider_box">' + html + "</div>"
            );
            $(".page")
              .find(".filter_slider_box")
              .css("left", $(this).offset().left)
              .width(
                $(this)
                  .parent()
                  .width() - 60
              );
            $(".page")
              .find(".filter_slider_box")
              .css("top", $(this).offset().top + $(this).height());

            var val = $("input.filter_slider_base")
              .attr("data-slider-value")
              .split(",");
            val[0] = val[0].replace("[", "");
            val[1] = val[1].replace("]", "");
            $(".filter_slider_min span").text(val[0]);
            $(".filter_slider_max span").text(val[1]);
            $(".filter_slider_base").slider({});
          } else {
            close($(this));
          }
          $(this).toggleClass("active");
        });
        $(document).mouseup(function(e) {
          var container = $(".filter_slider_open,.filter_slider_box");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            close($(this));
            $(".filter_slider_open").removeClass("active");
          }
        });
        $(document).on("slide", ".filter_slider_base", function(slideEvt) {
          $(".filter_slider_min span").text(slideEvt.value[0]);
          $(".filter_slider_max span").text(slideEvt.value[1]);
        });
        $(document).on(
          "click",
          ".filter_slider_clear,.filter_slider_set",
          function(e) {
            e.preventDefault();
            var count = 1;
            if (
              $(".filter_slider_box").find(".filter_slider_products-count")
                .length == 0
            ) {
              $(".filter_slider_box").append(
                '<div class="filter_slider_products-count">Найдено товаров: ' +
                  count +
                  "</div>"
              );
              $(".filter_slider_box")
                .find(".filter_slider_products-count")
                .animate(
                  {
                    height: "50px"
                  },
                  300
                );
            } else {
              $(".filter_slider_box")
                .find(".filter_slider_products-count")
                .text("Найдено товаров: " + count);
            }
          }
        );
      }

      $(".filter_showAll").click(function(e) {
        e.preventDefault();
        $(".filter").addClass("opened");
      });
      $(".filter_close").click(function(e) {
        e.preventDefault();
        $(".filter").removeClass("opened");
        $(".filter").attr("style", "");
      });

      sliders();
      selects();
    },
    init: function() {
      this.setup();
      this.events();
    }
  },
  example: {
    events: function() {
      $(document).on("click", ".example", function() {
        $(this).toggleClass("opened");
      });
    },
    init: function() {
      this.events();
    }
  },
  sort: {
    setup: function() {
      $(".sort_select").each(function() {
        $(this).select2({
          minimumResultsForSearch: Infinity,
          multiple: false,
          dropdownParent: $(".wrapper .page"),
          dropdownCssClass: "sort_select2"
        });
      });
    },
    events: function() {
      $(document).on("click", ".sort_pos button", function() {
        $(".sort_pos button").removeClass("active");
        $(".catList_typePos").removeClass("grid");
        $(".catList_typePos").removeClass("list");
        $(".catList_typePos").addClass($(this).attr("data-class"));
        $(this).addClass("active");
      });
      $(window).on("resize", function() {
        if (
          $(".catList_typePos").length > 0 &&
          $(".catList_typePos").hasClass("list") &&
          $(window).width() < 768
        ) {
          $(".catList_typePos").addClass("grid");
          $(".catList_typePos").removeClass("list");
        }
      });
    },
    init: function() {
      this.setup();
      this.events();
    }
  },
  preloaderInit: function() {
    var imgs = $(".wrapper").find("*:not(script)");
    var items = [];
    imgs.each(function() {
      var url = "";
      if (
        $(this).css("background-image") != "none" &&
        $(this)
          .css("background-image")
          .split("-")[0] != "linear"
      ) {
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
            var event = new Event('preloadingFinish');
            document.dispatchEvent(event);
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
    if ($(".filter").length > 0) this.filter.init();
    if ($(".sort").length > 0) this.sort.init();
    if ($(".example").length > 0) this.example.init();
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
    if ($(".dillerMap_slider").length > 0) {
      this.slider();
      this.events();
      var _this =this;
      $(document).on('preloadingFinish',function(){
        _this.setPos(0);
      })
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
