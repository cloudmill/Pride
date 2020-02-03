var header = {
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
var custom = {
  animateHover: {
    events: function() {
      $(
        ".hoverLineMoved,.btn-orange,.btn-gray,.news_item,.btn-orange-white,.btn-gray-white,.btn-orange-gray"
      ).hover(function() {
        $(this).addClass("ready");
      });
    },
    init: function() {
      this.events();
    }
  },
  animateScroll: {
    checkAndDo: function() {
      var count = 0;
      var start_anim = function(item) {
        if (count > 5) {
          item.removeClass("is-hidden");
        } else {
          setTimeout(function() {
            item.removeClass("is-hidden");
          }, count * 100);
        }
        count++;
      };
      $(document)
        .find(".is-hidden.anim-item")
        .each(function() {
          if (
            $(this).offset().top <
              $(document).scrollTop() + $(window).height() &&
            $(this).offset().top > $(document).scrollTop()
          ) {
            start_anim($(this));
          }
        });
    },
    events: function() {
      var _this = this;
      $(document).on("scroll", function() {
        _this.checkAndDo();
      });
    },
    init: function() {
      this.events();
      var _this = this;
      $(document).on("preloadingFinish", function() {
        _this.checkAndDo();
      });
    }
  },
  animateZoomOut: {
    zoomed: function() {
      $(document)
        .find(".zoom-item")
        .each(function() {
          var pos =
            $(this).offset().top + $(this).height() - $(document).scrollTop();
          var k = 0.1;
          var zoom = (pos / $(window).height()) * k + 1;

          $(this).css("transform", "scale(" + zoom + ")");
        });
    },
    events: function() {
      var _this = this;
      $(document).on("scroll", function() {
        _this.zoomed();
      });
    },
    init: function() {
      this.events();
      this.zoomed();
    }
  },
  animateFadeInLeftString: {
    create: function() {
      $(document)
        .find(".string-anim")
        .each(function() {
          var item = this;
          var stiring = item.innerHTML.replace("\n", "").replace("\t", "");
          var _wordsAr = stiring.split(" ");
          var wordsAr = [];
          _wordsAr.forEach(function(item, key) {
            if (item != "") {
              wordsAr.push(item);
            }
          });
          var temp = document.createElement("div");
          temp.innerWidth = item.innerWidth;
          temp.className = "string-anim-temp";
          item.appendChild(temp);
          var height = 0;
          var stringCount = 0;
          var stringAr = [];
          var stringBeforeAppend = "";
          for (var i = 0; i < wordsAr.length; i++) {
            if (stringBeforeAppend.length > 0) {
              stringBeforeAppend += " ";
            }
            if (temp.innerHTML.length > 0) {
              temp.innerHTML += " ";
            }
            temp.innerHTML += wordsAr[i];
            if (height == temp.scrollHeight) {
              stringBeforeAppend += wordsAr[i];
            } else {
              height = temp.scrollHeight;
              stringCount++;
              if (stringCount > 1) {
                stringAr.push(stringBeforeAppend);
                stringBeforeAppend = wordsAr[i];
                if (wordsAr.length - 1 == i) {
                  stringAr.push(stringBeforeAppend);
                }
              } else {
                stringBeforeAppend += wordsAr[i];
              }
            }
          }
          item.innerHTML = "";
          stringAr.forEach(function(line) {
            item.innerHTML +=
              '<span class="string-anim-line is-hidden"><span class="string-anim-paralax">' +
              line +
              "</span></span>";
          });
          temp.remove();
        });
    },
    checkAndDo: function() {
      var count = 0;
      var start_anim = function(item) {
        if (count > 5) {
          item.removeClass("is-hidden");
        } else {
          setTimeout(function() {
            item.removeClass("is-hidden");
          }, count * 100);
        }
        count++;
      };
      $(document)
        .find(".is-hidden.string-anim-line")
        .each(function() {
          if (
            $(this).offset().top <
              $(document).scrollTop() + $(window).height() &&
            $(this).offset().top > $(document).scrollTop()
          ) {
            start_anim($(this));
          }
        });
    },
    events: function() {
      var _this = this;
      $(document).on("scroll", function() {
        _this.checkAndDo();
      });
    },
    init: function() {
      var _this = this;
      $(document).on("preloadingFinish", function() {
        _this.create();
        _this.events();
        _this.checkAndDo();
      });
    }
  },
  animateParalaxString: {
    paralax: function() {
      $(document)
        .find(".paralax-child")
        .each(function() {
          var count = 0;
          $(this)
            .find(".string-anim-paralax")
            .each(function() {
              var pos =
                $(this).offset().top +
                $(this).height() / 2 -
                $(document).scrollTop() -
                $(window).height() / 2;
              var k = 70 + count*10;
              var paralax = (pos / $(window).height()) * k;
              if(Math.abs(paralax) < 70)
              $(this).css("transform", "translateY(" + paralax + "px)");
              count++;
              this.setAttribute('count',count)
            });
        });
    },
    events: function() {
      var _this = this;
      $(document).on("scroll", function() {
        _this.paralax();
      });
    },
    init: function() {
      var _this = this;
      $(document).on("preloadingFinish", function() {
        _this.events();
        _this.paralax();
      });
    }
  },
  animateWordToPlus:{
    events:function(){
      $('.itemToPlusParent').hover(function(){
        $(this).find('.itemToPlus').removeClass('plus')
      },function(){
        $(this).find('.itemToPlus').addClass('plus')
      })
    },
    init:function(){
      this.events()
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
  filterInMap: {
    setup: function() {
      $(".filterMap_select").each(function() {
        $(this).select2({
          minimumResultsForSearch: Infinity,
          closeOnSelect: false,
          dropdownParent: $(".wrapper .page"),
          dropdownCssClass: "filterMap_select2"
        });
      });
    },
    init: function() {
      this.setup();
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
  title_select: {
    setup: function() {
      $(".title_select").each(function() {
        $(this).select2({
          minimumResultsForSearch: Infinity,
          multiple: false,
          dropdownParent: $(".wrapper .page"),
          dropdownCssClass: "title_select2"
        });
      });
    },
    init: function() {
      this.setup();
    }
  },
  detailGaleryImgs: {
    setup: function() {
      var galleryThumbs = new Swiper(".detail_imgs_list", {
        spaceBetween: 30,
        slidesPerView: 4,
        //freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: "horizontal",
        followFinger: false,
        breakpoints: {
          1000: {
            slidesPerView: 6,
            direction: "vertical"
          },
          768: {
            slidesPerView: 5
          }
        }
      });
      var galleryTop = new Swiper(".detail_imgs_box", {
        spaceBetween: 30,
        slidesPerView: 1,
        thumbs: {
          swiper: galleryThumbs
        }
      });
    },
    events: function() {},
    init: function() {
      this.setup();
    }
  },
  detailTabsDoing: {
    events: function() {
      $(document).on("click", ".tabsBox_menu", function() {
        if ($(window).width() < 768) {
          $(this).toggleClass("active");
        }
      });
    },
    init: function() {
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
          $n(document).trigger("preloadingFinish");
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
    if ($(".filter_select").length > 0) this.filter.init();
    if ($(".filterMap").length > 0) this.filterInMap.init();
    if ($(".title_select").length > 0) this.title_select.init();
    if ($(".sort_select").length > 0) this.sort.init();
    if ($(".example").length > 0) this.example.init();
    if ($(".detail_imgs").length > 0) this.detailGaleryImgs.init();
    if ($(".tabsBox_menu").length > 0) this.detailTabsDoing.init();
    if ($(".anim-item").length > 0) this.animateScroll.init();
    if ($(".zoom-item").length > 0) this.animateZoomOut.init();
    if ($(".string-anim").length > 0) this.animateFadeInLeftString.init();
    if ($(".paralax-child").length > 0) this.animateParalaxString.init();
    if ($(".itemToPlusParent").length > 0) this.animateWordToPlus.init();
    this.preloaderInit();
  }
};
var popups = {
  setup: function() {
    if ($("#properties").length > 0)
      this.properties = new NbModal("properties", {
        windowClass: "popupFadeInRight",
        wrapperClass: "page"
      });
    this.buyOneClick = document.getPopup("buyOneClick");
    this.question = document.getPopup("question");
    this.collback_success = document.getPopup("collback_success");
    this.question_success = document.getPopup("question_success");
    this.succes = document.newPopup(
      "succes",
      {
        windowClass: "popupCenter",
        wrapperClass: "page",
        butCloseInPopup: true
      },
      "<h3>заголовок</h3><p>текст</p>"
    );
    //this.succes.open();
  },
  init: function() {
    this.setup();
  }
};
var svgMap = {
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
    var imgs = $(".dillerMap_map img");
    var img = $(".dillerMap_map img").eq(0);
    var width = img[0].naturalWidth ? img[0].naturalWidth : img.width();
    var height = img[0].naturalHeight ? img[0].naturalHeight : img.height();
    var left = 0;
    var top = 0;
    console.log(img)
    if (target == 1) {
      top = -430;
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
      top = -840;
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
    console.log(img[0].naturalWidth)
    imgs.removeClass('active')
    imgs.eq(target).addClass('active')
    imgs.css("height", height + "px");
    imgs.css("width", width + "px");
    imgs.css("margin-top", top + "px");
    imgs.css("margin-left", left + "px");
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
      var _this = this;
      $(document).on("preloadingFinish", function() {
        if (document.readyState === "complete") {
          _this.setPos(0);
        } else {
          window.onload = function() {
            _this.setPos(0);
            window.onload = null;
          };
        }
        _this.setPos(0);
      });
    }
  }
};
var priceSlider = {
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

(function() {
  custom.init();
  header.init();
  svgMap.init();
  popups.init();
  priceSlider.init();
})(jQuery);
