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
  searchMob: function() {
    $(document).on('click',".header .search_but",function(e) {
      if ($(window).width() <= 950) {
        e.preventDefault();
      }
    });
    $(window).on('resize',function(){
      if ($(window).width() > 950){
        $(".header .searchMob").removeClass("active");
      }
    })
    window.addEventListener('click', function (e) {
      var searchPlace = document.querySelector(".header .searchMob")
      var searchBut = document.querySelector(".header .search_but")
      if (!searchPlace.contains(e.target) && !searchBut.contains(e.target)) {
        searchPlace.classList.remove('active');
      }else{
        if ($(window).width() <= 950 && !searchPlace.contains(e.target)) {
          $(".burger").removeClass("active");
          $(".burger-but").removeClass("active");
          $(".basket").removeClass("active");
        $(".header .cart").removeClass("active");
          searchPlace.classList.toggle('active');
        }
      }
  });
  },
  init: function() {
    this.events();
    this.burgerOpen();
    this.cartOpen();
    this.searchMob();
  }
};
var custom = {
  animateHover: {
    events: function() {
      $(
        ".hoverLineMoved,.plusBox_link,.btn-orange,.btn-gray,.news_item,.btn-orange-white,.btn-gray-white,.btn-orange-gray"
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
          var zoom;
          var paralaxY = 0;
          var k = 1;
          if ($(this).hasClass("in")) {
            var pos =
              $(window).height() +
              $(document).scrollTop() -
              $(this).offset().top -
              $(this).height();
            zoom = 1 + (pos * k) / 10000;
          } else {
            var pos =
              $(document).scrollTop() -
              $(this).offset().top; /* - $(this).height() */
            zoom = 1 - (pos * k) / 10000;
          }
          paralaxY =
            ($(document).scrollTop() -
              $(this).offset().top +
              $(".header").height() -
              50) /
            5;
          if ($(this).hasClass("no-translate")) {
            $(this).css(
              "transform",
              " scale(" + (parseFloat(zoom) + 0.03) + ")"
            );
          } else {
            $(this).css(
              "transform",
              "translateY(" + paralaxY + "px) scale(" + zoom + ")"
            );
          }
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
        .find(".string-anim,.string-anim-content > p")
        .each(function() {
          var item = this;
          var stiring = item.innerHTML.replace(/\r?\n/g, "");
          var _wordsAr = stiring.split(" ");
          var wordsAr = [];
          _wordsAr.forEach(function(item, key) {
            if (item != "") {
              wordsAr.push(item);
            }
          });
          var temp = document.createElement("div");
          $(temp).width($(item).width());
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
              if (wordsAr.length - 1 == i) {
                stringAr.push(stringBeforeAppend);
              }
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
              '<span class="string-anim-paralax"><span class="string-anim-line is-hidden">' +
              line +
              "</span></span>";
          });
          temp.remove();
        });
    },
    checkAndDo: function() {
      var count = 0;
      var start_anim = function(item) {
        if (count > 10) {
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
              var k = 70 + count * 10;
              var paralax = (pos / $(window).height()) * k;
              if (Math.abs(paralax) < 70)
                $(this).css("transform", "translateY(" + paralax + "px)");
              count++;
              this.setAttribute("count", count);
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
  animateChangeHoverBlockCross: {
    events: function() {
      $(".blockCross_item").hover(
        function() {
          if ($(window).width() > 950) {
            var img = $(this)
              .find(".item_img img")
              .eq(0);
            $(this)
              .find(".item_img")
              .addClass("show");
            var k = img[0].naturalWidth / img[0].naturalHeight;
            img.width(
              $(this)
                .find(".item_img")
                .width()
            );
            if (img.width() / k < $(".blockCross").height() + 55) {
              img.height($(".blockCross").height() + 55);
              img.width(img.height() * k);
            } else {
              img.width(
                $(this)
                  .find(".item_img")
                  .width()
              );
              img.height(img.width() / k);
            }
          } else {
            var img = $(this);
            img.attr("style", "");
          }
        },
        function() {
          $(".blockCross_item .item_img").removeClass("last");
          $(this)
            .find(".item_img")
            .addClass("last");
          $(".blockCross_item .item_img").removeClass("show");
        }
      );
    },
    init: function() {
      this.events();
    }
  },
  animateScaleIn: {
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
        .find(".is-hidden.anim-scale")
        .each(function() {
          {
            start_anim($(this));
          }
        });
    },
    init: function() {
      var _this = this;
      $(document).on("preloadingFinish", function() {
        _this.checkAndDo();
      });
    }
  },
  filter: {
    setup: function() {
      $(".filter_select").each(function() {
        $(this).select2({
          minimumResultsForSearch: Infinity,
          closeOnSelect: false,
          //multiple: true,
          dropdownParent: $(".wrapper .page"),
          dropdownCssClass: "filter_select2"
        });
      });
      if ($(".filter").height() < $(".filter .content").height()) {
        $(".filter_showAll").addClass("active");
      }
    },
    events: function() {
      var opened = null;
      function selects() {
        $(".filter_select").on("select2:close", function() {
          opened = null;
          $(this)
            .parent()
            .removeClass("active");
        });
        $(".filter_select").on("select2:open", function() {
          opened = $(this);
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
          if (this.hasAttribute("setButs")) $(".select2-results").append(buts);
        });
        $(document).on("click", ".select2_clear", function(e) {
          e.preventDefault();
          if (opened) {
            opened.val("").trigger("change");
            opened.select2("close");
          }
        });
        $(document).on("click", ".select2_set", function(e) {
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
        $(document).on("click", ".filter_slider_clear", function(e) {
          e.preventDefault();
          console.log($(".filter_slider_base"));
          var minValue = $(".filter_slider_base")
            .eq(0)
            .attr("data-slider-min");
          var maxValue = $(".filter_slider_base")
            .eq(0)
            .attr("data-slider-max");
          var defaultValue = "[" + minValue + "," + maxValue + "]";
          $(".filter_slider_base").attr("data-slider-value", defaultValue);
          $(".filter_slider_max span").text(maxValue);
          $(".filter_slider_min span").text(minValue);
          // $(".filter_slider_base").slider('setValue', defaultValue, true);
          $(".filter_slider_base").slider("refresh");
          $(".filter_slider_open").click();
        });
        $(document).on("click", ".filter_slider_set", function(e) {
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
        });
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
      $(".title_select").on("select2:open", function(e) {
        var openBox = $(document).find(".title_select2");
        openBox.css("min-width", $(window).width() + "px");
        var left =
          -openBox.offset().left +
          parseInt(openBox.css("left") ? openBox.css("left").replace("px") : 0);
        var paddleft = $(".page_head .title").offset().left;
        openBox.css("left", left + "px");
        openBox.css("padding-left", paddleft + "px");
        openBox.css("padding-right", paddleft + "px");
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
  mapPointsOpenClose: {
    events: function() {
      $(".point .point_btn").click(function() {
        $(this)
          .parent()
          .toggleClass("active");
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          var height = $(this)
            .parent()
            .find(".point_item")
            .height();
          $(this)
            .parent()
            .find(".point_content")
            .height(height + 50);
        } else {
          $(this)
            .parent()
            .find(".point_content")
            .attr("style", "");
        }
      });
    },
    init: function() {
      this.events();
    }
  },
  mapWhereBuy: {
    center: null,
    createPlaceMark: function(coords, src, sity, name, link) {
      var width = 400;
      if ($(window).width() <= 600) width = 320;
      return new ymaps.Placemark(
        coords,
        {
          hasBalloon: false
          // balloonContentHeader:
          //   '<div class="yaMap_head">' +
          //   '<img src="' +
          //   src +
          //   '" class="" height="174" width="' +
          //   width +
          //   '"/>' +
          //   "</div>",
          // balloonContentBody:
          //   '<div class="yaMap_content">' +
          //   "<p>" +
          //   sity +
          //   "</p>" +
          //   "<h3>" +
          //   name +
          //   "</h3>" +
          //   '<a href="' +
          //   link +
          //   '" class="default-btn btn-gray">Перейти к проекту<a>' +
          //   "</div>",
          // maxHeight: $(window).width() < 600 ? 174 : 260,
          // balloonContentFooter: "",
          // hintContent: name
        },
        {
          hideIconOnBalloonOpen: false,
          iconLayout: "default#image",
          iconImageHref: "images/map.png",
          iconImageSize: [44, 44],
          iconImageOffset: [-22, -22]
        }
      );
    },
    create: function() {
      var _this = this;
      myMap = new ymaps.Map(
        "map",
        {
          center: _this.center,
          zoom: 6,
          controls: []
        },
        {
          searchControlProvider: "yandex#search"
        }
      );
      clusterer = new ymaps.Clusterer({
        preset: "islands#invertedVioletClusterIcons",
        clusterIcons: [
          {
            href: "images/map.png",
            size: [66, 66],
            offset: [-33, -33]
          }
        ],
        groupByCoordinates: false,
        clusterIconColor: "black",
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false
      });
      if ($(".map_data .placeMark").length > 0) {
        $(".map_data .placeMark").each(function() {
          clusterer.add(
            _this.createPlaceMark(
              $(this)
                .attr("data-cords")
                .split(","),
              $(this).attr("data-img"),
              $(this).attr("data-sity"),
              $(this).attr("data-name"),
              $(this).attr("data-link")
            )
          );
        });
      }
      myMap.geoObjects.add(clusterer);
      if ($("#map").hasClass("hasBalloon"))
        myMap.geoObjects.options.set({ hasBalloon: false });
      if ($(window).width() < 768) {
        // myMap.behaviors.disable("drag");
      }
      myMap.events.add("click", function() {
        myMap.balloon.close();
      });
      myMap.behaviors.disable("scrollZoom");
      myMap.controls.add(
        new ymaps.control.ZoomControl({
          options: {
            size: "auto",
            float: "none",
            position: { right: 10, bottom: 40 }
          }
        })
      );
    },
    init: function() {
      var _this = this;
      this.center =
        $(".map_data .placeMark").length > 0
          ? $(".map_data .placeMark")
              .eq(0)
              .attr("data-cords")
              .split(",")
          : [55.751574, 37.573856];
      function initMap() {
        _this.create();
      }
      ymaps.ready(function() {
        initMap();
      });
    }
  },
  mapSliderInf: {
    create: function() {
      var sliderInf = new Swiper(".sliderRight_right .slider", {
        slidesPerView: 1
      });
      $(document).on("click", ".sliderRight_prev", function() {
        sliderInf.slidePrev();
      });
      $(document).on("click", ".sliderRight_next", function() {
        sliderInf.slideNext();
      });
    },
    init: function() {
      this.create();
    }
  },
  setSizeImg: {
    setSize: function() {
      $(".img-full").each(function() {
        var pwidth = $(this).width();
        var pheight = $(this).height();
        $(this)
          .find("img")
          .each(function() {
            var nwidth = this.naturalWidth;
            var nheight = this.naturalHeight;

            var k = nwidth / nheight;
            if ($(this).height() * k < pwidth) {
              $(this).addClass("height-auto");
            }
            if ($(this).width() / k < pheight) {
              $(this).removeClass("height-auto");
            }
          });
      });
    },
    init: function() {
      var _this = this;
      this.setSize();
      $(window).on("resize", function() {
        _this.setSize();
      });
    }
  },
  detailImgSlider: {
    init: function() {
      $(".newDetail_box .slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        dots: true,
        arrows: false
      });
    }
  },
  rightMenu: {
    events: function() {
      $(document).on("click", ".rightMenu-wrapper", function() {
        $(this).toggleClass("open");
      });
      this.setFixedInScroll();
    },
    posRightMenu: {
      update: function() {
        var _ = this;
        console.log("ssss");
        var itemTop = $(".rightMenu-box").offset().top;
        var headerheight = $(".header").height() - 70;
        var topScroll = $(document).scrollTop() + headerheight;
        if ($(window).width() > 950) {
          if ($(".rightMenu-wrapper > *").length == 1) {
            $(".rightMenu-container").addClass("solo");
          }
          if (topScroll >= itemTop) {
            _.setFixed();
          } else {
            _.clearFixed();
          }
        } else {
          _.clearFixed();
        }
      },
      setFixed: function() {
        var itemLeft = $(".rightMenu-box").offset().left - 1;
        var width = $(".rightMenu-box").outerWidth() / 2;
        var headerheight = $(".header").height() - 70;
        var offsetTop = 73;
        var offsetBottom = 40;
        $(".rightMenu-container").addClass("fixed");
        $(".rightMenu-container").css("right", itemLeft + "px");
        $(".rightMenu-container").css("left", "auto");
        $(".rightMenu-container").css("top", headerheight + offsetTop + "px");
        $(".rightMenu-container").width(width);
        var offseTop = headerheight + offsetTop + $(document).scrollTop();
        var heightBox = $(".rightMenu-container").height();
        var offsetTopFooter =
          $(".rightMenu-box").offset().top + $(".rightMenu-box").height();
        //var offsetTopFooter = $(".footer").offset().top;
        if (offseTop + heightBox >= offsetTopFooter - offsetBottom) {
          var translate =
            offsetTopFooter - offsetBottom - (offseTop + heightBox);
          $(".rightMenu-container").css(
            "transform",
            "translateY(" + translate + "px)"
          );
        } else {
          $(".rightMenu-container").css("transform", "translateY(" + 0 + "px)");
        }

        if (
          $(".rightMenu-container").height() >=
          $(".rightMenu-box").height() - 120
        ) {
          $(".rightMenu-container").height($(".rightMenu-box").height() - 120);
        } else {
          $(".rightMenu-container").css("height", "");
        }
      },
      clearFixed: function() {
        $(".rightMenu-container").removeClass("fixed");
        $(".rightMenu-container").css("right", "");
        $(".rightMenu-container").css("transform", "");
        $(".rightMenu-container").css("left", "");
        $(".rightMenu-container").css("top", "");
        $(".rightMenu-container").css("width", "");
        //$(".rightMenu-container").attr("style", "");
      }
    },
    setFixedInScroll: function() {
      var _ = this;
      $(document).on("scroll", function() {
        _.posRightMenu.update();
      });
      $(window).on("resize", function() {
        _.posRightMenu.update();
      });
    },
    init: function() {
      var _ = this;
      _.events();
      $(window).on("load", function() {
        _.posRightMenu.update();
      });
      ///
    }
  },
  fixedContainerLeft: {
    events: function() {
      this.setFixedInScroll();
    },
    pos: {
      update: function() {
        var _ = this;
        var itemTop = $(".fixed-box-root").offset().top;
        var headerheight = $(".header").height() - 70;
        var topScroll = $(document).scrollTop() + headerheight;
        if ($(window).width() > 768) {
          if (topScroll >= itemTop) {
            _.setFixed();
          } else {
            _.clearFixed();
          }
        } else {
          _.clearFixed();
        }
      },
      setFixed: function() {
        var width = $(".fixed-box-root").outerWidth() / 2;

        var itemLeft = $(".fixed-box-root").offset().left - width;
        var headerheight = $(".header").height() - 70;
        var offsetTop = 73;
        var offsetBottom = 0;
        $(".fixed-conteiner");
        $(".fixed-container").addClass("fixed");
        $(".fixed-container").css("left", itemLeft + "px");
        $(".fixed-container").css("top", headerheight + offsetTop + "px");
        $(".fixed-container").width(width);
        var offseTop = headerheight + offsetTop + $(document).scrollTop();

        var offsetTopFooter =
          $(".fixed-box-root").offset().top +
          $(".fixed-box-root").outerHeight();
        $(".fixed-container").each(function() {
          var heightBox = $(this).height();

          if (offseTop + heightBox >= offsetTopFooter - offsetBottom) {
            var translate =
              offsetTopFooter - offsetBottom - (offseTop + heightBox);
            $(this).css("transform", "translateY(" + translate + "px)");
          }
        });
      },
      clearFixed: function() {
        $(".fixed-container").removeClass("fixed");
        $(".fixed-container").attr("style", "");
      }
    },
    setFixedInScroll: function() {
      var _ = this;
      $(document).on("scroll", function() {
        _.pos.update();
      });
      $(window).on("resize", function() {
        _.pos.update();
      });
    },
    init: function() {
      var _ = this;
      _.events();
      $(window).on("load", function() {
        _.pos.update();
      });
      ///
    }
  },
  aboutSliders: {
    years: function() {
      var years = new Swiper(".yearSlider-years", {
        slidesPerView: 1,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: "horizontal"
      });
      var texts = new Swiper(".yearSlider-texts", {
        slidesPerView: 1,
        thumbs: {
          swiper: years
        }
      });
      $(document).on("click", ".yearSlider-prev", function() {
        texts.slidePrev();
      });
      $(document).on("click", ".yearSlider-next", function() {
        texts.slideNext();
      });
    },
    imgs: function() {
      var imgs = new Swiper(".imgSlider-slider", {
        spaceBetween: 3,
        slidesPerView: "auto",
        setWrapperSize: true,
        direction: "horizontal",
        centeredSlides: true,
        loop: true,
        breakpoints: {
          768: {
            spaceBetween: 30
          },
          550: {
            spaceBetween: 15
          }
        }
      });
      $(document).on("click", ".imgSlider-prev", function() {
        imgs.slidePrev();
      });
      $(document).on("click", ".imgSlider-next", function() {
        imgs.slideNext();
      });
    },
    init: function() {
      if ($(".yearSlider-years").length > 0) this.years();
      if ($(".imgSlider-slider").length > 0) this.imgs();
    }
  },
  detailCalcProd: {
    update: function(delta) {
      var count = parseInt(
        $("input[name=count]")
          .eq(0)
          .val()
      );
      if (delta) count += delta;
      if (count < 0) count = 0;
      $(".detail_count-value").text(count);
      $("input[name=count]").val(count);
    },
    events: function() {
      var _ = this;
      $(document).on("click", ".detail_count-minus", function() {
        _.update(-1);
      });
      $(document).on("click", ".detail_count-plus", function() {
        _.update(1);
      });
    },
    init: function() {
      this.events();
    }
  },
  cartCalcProd: {
    events: function() {
      var _ = this;
      $(document).on("click", ".product .count-minus", function() {
        var product = $(this).closest(".product");
        var count = product.find("[name=count]");
        var countNum = parseFloat(count.val());
        if (countNum > 1) {
          count.val(countNum - 1);
          _.refresh();
        } else {
          _.removeItem(product);
        }
      });
      $(document).on("click", ".product .count-plus", function() {
        var product = $(this).closest(".product");
        var count = product.find("[name=count]");
        var countNum = parseFloat(count.val());
        count.val(countNum + 1);
        _.refresh();
      });
      $(document).on("click", ".product .summ-clear", function() {
        var product = $(this).closest(".product");
        _.removeItem(product);
        _.refresh();
      });
    },
    refresh: function() {
      var items = $(".product");
      var allSumm = 0;
      items.each(function() {
        var price = parseFloat(
          $(this)
            .find("[name=price]")
            .val()
        );
        var count = parseFloat(
          $(this)
            .find("[name=count]")
            .val()
        );
        var summ = price * count;
        $(this)
          .find(".summ-value span")
          .text(perfectNum(summ));
        $(this)
          .find(".count-value")
          .text(count);
        allSumm += summ;
      });
      $(".allSumm-value span").text(perfectNum(allSumm));
    },
    removeItem: function(item) {
      console.log("Удаление эллемента: ", item.find(".product-name").text());
      item.remove();
      this.refresh();
    },
    init: function() {
      this.events();
    }
  },
  openOrderRegister: {
    center: null,
    createPlaceMark: function(coords, id) {
      var width = 400;
      if ($(window).width() <= 600) width = 320;
      var p = new ymaps.Placemark(
        coords,
        {
          hasBalloon: false
        },
        {
          hideIconOnBalloonOpen: false,
          iconLayout: "default#image",
          iconImageHref: "images/map.png",
          iconImageSize: [44, 44],
          iconImageOffset: [-22, -22]
        }
      );
      p.id = id;
      return p;
    },
    create: function() {
      var _this = this;
      myMap = new ymaps.Map(
        "map",
        {
          center: _this.center,
          zoom: 6,
          controls: []
        },
        {
          searchControlProvider: "yandex#search"
        }
      );
      clusterer = new ymaps.Clusterer({
        preset: "islands#invertedVioletClusterIcons",
        clusterIcons: [
          {
            href: "images/map.png",
            size: [66, 66],
            offset: [-33, -33]
          }
        ],
        groupByCoordinates: false,
        clusterIconColor: "black",
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false
      });
      if ($(".map_data .placeMark").length > 0) {
        $(".map_data .placeMark").each(function() {
          var mark = _this.createPlaceMark(
            $(this)
              .attr("data-cords")
              .split(","),
            $(this).attr("data-id")
          );
          mark.events.add("click", function(e) {
            var item = $(
              ".popupOrder-list [data-id=" + e.get("target").id + "]"
            );
            if (item.length) {
              var inpt = item.find("input").eq(0)[0];
              inpt.checked = !inpt.checked;
            }
          });
          clusterer.add(mark);
        });
      }

      myMap.geoObjects.add(clusterer);
      if ($("#map").hasClass("hasBalloon"))
        myMap.geoObjects.options.set({ hasBalloon: false });
      if ($(window).width() < 768) {
        // myMap.behaviors.disable("drag");
      }
      myMap.events.add("click", function() {
        myMap.balloon.close();
      });
      myMap.behaviors.disable("scrollZoom");
      myMap.controls.add(
        new ymaps.control.ZoomControl({
          options: {
            size: "auto",
            float: "none",
            position: { right: 10, bottom: 40 }
          }
        })
      );
    },
    open: function() {
      var _ = this;
      this.center =
        $(".map_data .placeMark").length > 0
          ? $(".map_data .placeMark")
              .eq(0)
              .attr("data-cords")
              .split(",")
          : [55.751574, 37.573856];
      _.create();
    },
    events: function() {
      var _ = this;
      $(document).on("click", "#setCity", function() {
        if ($("#map ymaps").length > 0) {
          $("#map ymaps").remove();
        }
        ymaps.ready(function() {
          _.open();
        });
      });
      $(document).on("click", "#selectAdress", function() {
        var box = $(document)
          .find(".popupOrder-list")
          .find("input:checked")
          .parent();
        var adress = box.find("[name=adress]").val();
        var val = box.find("[name=cityId]").val();
        var city = box.find("[name=city]").val();
        var index = box.find("[name=adressIndex]").val();
        if (val) {
          $(document)
            .find("#setCity label")
            .text(city);
          $(document)
            .find("#setCity input")
            .val(val);
          $(document)
            .find("#indexPosition")
            .val(index);
          $(document)
            .find("#adresPosition")
            .val(adress);
        } else {
          $(document)
            .find("#setCity label")
            .text("Выберите город");
          $(document)
            .find("#setCity input")
            .val("");
          $(document)
            .find("#indexPosition")
            .val("");
          $(document)
            .find("#adresPosition")
            .val("");
        }
        $("#orderCitySearch").val("");
        $(".popupOrder-list")
          .find(".hide")
          .removeClass("hide");
        _.search.s = null;
        $.fancybox.close();
      });
    },
    search: {
      s: null,
      trim: function(s) {
        s = s.replace(/^\s+/g, "");
        return s.replace(/\s+$/g, "");
      },
      find: function(str) {
        if (str.toUpperCase().indexOf(this.s.toUpperCase()) != -1) {
          return true;
        } else return false;
      },
      update: function() {
        var _ = this;
        $(".popupOrder-list")
          .find(".order-check")
          .each(function() {
            var find = false;
            $(this)
              .find("input")
              .each(function() {
                var str = $(this).val();
                if (_.find(str)) find = true;
              });
            if (find) {
              $(this).removeClass("hide");
            } else {
              $(this).addClass("hide");
            }
          });
      },
      events: function() {
        var _ = this;
        $(document).on("keyup", "#orderCitySearch", function(e) {
          _.s = _.trim($(this).val());
          _.update();
        });
      },
      init: function() {
        this.events();
      }
    },
    init: function() {
      this.search.init();
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
    if ($(".anim-scale").length > 0) this.animateScaleIn.init();
    if ($(".point .point_btn").length > 0) this.mapPointsOpenClose.init();
    if ($("#map").length > 0) this.mapWhereBuy.init();
    if ($(".sliderRight_right").length > 0) this.mapSliderInf.init();
    if ($(".blockCross").length > 0) this.animateChangeHoverBlockCross.init();
    if ($(".img-full").length > 0) this.setSizeImg.init();
    if ($(".newDetail_box .slider").length > 0) this.detailImgSlider.init();
    if ($(".rightMenu-container").length > 0) this.rightMenu.init();
    if ($(".product").length > 0) this.cartCalcProd.init();
    if ($(".detail_count").length > 0) this.detailCalcProd.init();
    if ($(".fixed-container").length > 0) this.fixedContainerLeft.init();
    if ($(".popupOrder-map").length > 0) this.openOrderRegister.init();
    this.aboutSliders.init();
    this.preloaderInit();
  }
};
var popups = {
  setup: function() {
    $(".modalbox").fancybox();
  },
  submits: function() {
    $(document).on("submit", "#question form", function(e) {
      e.preventDefault();
      var name = $(this).find("[name=name]");
      var phone = $(this).find("[name=phone]");
      var mail = $(this).find("[name=mail]");
      var text = $(this).find("[name=text]");
      var error = 0;
      $(this)
        .find("textarea,input")
        .removeClass("error");
      if (name.val() == "") {
        error++;
        name.addClass("error");
      }
      if (phone.val() == "") {
        error++;
        phone.addClass("error");
      }
      if (mail.val() == "") {
        error++;
        mail.addClass("error");
      }
      if (text.val() == "") {
        error++;
        text.addClass("error");
      }

      $(document)
        .find('[href="#question_success"]')
        .click();
    });
  },
  init: function() {
    this.setup();
    this.submits();
  }
};
var svgMap = {
  slider: function() {
    var slider_ = $(".dillerMap_slider").slick({
      slidesToShow: 1,
      speed: 1000,
      dots: false,
      variableWidth: true,
      centerMode: false,
      infinite: true,
      arrows: true,
      swipe: false
    });
    var setClasses = function(slider, id) {
      var id_next, id_after_next;
      if (id == slider.$slides.length - 1) {
        id_next = 0;
        id_after_next = 1;
      } else if (id == slider.$slides.length - 2) {
        id_next = id + 1;
        id_after_next = 0;
      } else {
        id_next = id + 1;
        id_after_next = id + 2;
      }
      $(".dillerMap .slick-slide,.dillerMap .slick-cloned").removeClass(
        "current"
      );
      $(".dillerMap .slick-slide,.dillerMap .slick-cloned").removeClass("next");
      $(".dillerMap .slick-slide,.dillerMap .slick-cloned").removeClass(
        "after_next"
      );

      $('.dillerMap [data-slick-index="' + id + '"]').addClass("current");
      $('.dillerMap [data-slick-index="' + id_next + '"]').addClass("next");
      $('.dillerMap [data-slick-index="' + id_after_next + '"]').addClass(
        "after_next"
      );

      $(".dillerMap .slick-cloned")
        .eq(id + 1)
        .addClass("current");
      $(".dillerMap .slick-cloned")
        .eq(id_next + 1)
        .addClass("next");
      $(".dillerMap .slick-cloned")
        .eq(id_after_next + 1)
        .addClass("after_next");
      if (id == slider.$slides.length - 1) {
        $(".dillerMap .slick-cloned")
          .eq(0)
          .addClass("current");
      } else {
        $(".dillerMap .slick-cloned")
          .eq(id + 1)
          .addClass("current");
      }
    };
    $(document).on("beforeChange", ".dillerMap_slider", function(
      e,
      slider,
      a,
      id
    ) {
      setClasses(slider, id);
    });
    $(".dillerMap_slider").slick("slickGoTo", 0);
  },
  setPos: function(target) {
    var imgs = $(".dillerMap_map .box");
    var img = $(".dillerMap_map img");
    var imgOne = $(".dillerMap_map img").eq(0);
    var widthPerfect = imgOne[0].naturalWidth
      ? imgOne[0].naturalWidth
      : imgOne.width();
    var heightPerfect = imgOne[0].naturalHeight
      ? imgOne[0].naturalHeight
      : imgOne.height();
    var width = widthPerfect;
    var left = 0;
    var top = 50;
    if ($(window).width() < 600) {
      top = 20;
      width = widthPerfect * 0.7;
      if (target == 1) {
        left = -100;
        top = -133;
        width = 2840;
      }
      if (target == 2) {
        top = -580;
        left = -450;
        width = 2155;
      }
      if (target == 3) {
        top = -560;
        left = -50;
        width = 4078;
      }
      if (target == 4) {
        top = -2540;
        left = -850;
        width = 6320;
      }
    } else if ($(window).width() < 950) {
      top = 20;
      width = widthPerfect * 0.7;
      if (target == 1) {
        top = -133;
        width = 2840;
      }
      if (target == 2) {
        top = -580;
        left = -300;
        width = 2155;
      }
      if (target == 3) {
        top = -560;
        left = 100;
        width = 4078;
      }
      if (target == 4) {
        top = -2540;
        left = -700;
        width = 6320;
      }
    } else {
      if (target == 1) {
        top = -93;
        width = 3140;
      }
      if (target == 2) {
        top = -580;
        left = -300;
        width = 2355;
      }
      if (target == 3) {
        top = -560;
        left = 100;
        width = 4378;
      }
      if (target == 4) {
        top = -2540;
        left = -700;
        width = 6520;
      }
    }

    img.removeClass("active");
    img.eq(target).addClass("active");
    var scale = width / widthPerfect;
    imgs.css("height", heightPerfect + "px");
    imgs.css("width", widthPerfect + "px");
    scale = parseInt(scale * 100) / 100;
    imgs.css(
      "transform",
      "translate(" + left + "px," + top + "px) scale(" + scale + ")"
    );
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

function perfectNum(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
