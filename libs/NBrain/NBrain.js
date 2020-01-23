////////
//
//
//событие колесика мыши
//
//////
var NbWhellEvent = {
  _getDelta: function(e) {
    e = e || window.event;
    return (delta = e.deltaY || e.detail || e.wheelDelta);
  },
  _setEvents: function() {
    var _this = this;
    if (document.addEventListener) {
      if ("onwheel" in document) {
        document.addEventListener(
          "wheel",
          function(e) {
            document.dispatchEvent(
              new CustomEvent("mousewhell", {
                detail: { e: e, delta: _this._getDelta(e) }
              })
            );
          },
          { passive: false }
        );
      } else if ("onmousewheel" in document) {
        document.addEventListener(
          "mousewheel",
          function(e) {
            document.dispatchEvent(
              new CustomEvent("mousewhell", {
                detail: { e: e, delta: _this._getDelta(e) }
              })
            );
          },
          { passive: false }
        );
      } else {
        document.addEventListener(
          "MozMousePixelScroll",
          function(e) {
            document.dispatchEvent(
              new CustomEvent("mousewhell", {
                detail: { e: e, delta: _this._getDelta(e) }
              })
            );
          },
          {
            passive: false
          }
        );
      }
    } else {
      document.attachEvent("onmousewheel", onWheel);
    }
  },
  _init: function() {
    this._setEvents();
  }
};
////////
//
//
//табы
//
//////
var NbTabs = {
  _setup: function() {
    var tabsContainers = document.getElementsByClassName("nbt-container");
    this.tabs = [];
    var _this = this;
    var indexCont = 0;
    for (elem of tabsContainers) {
      var tempId = "nbt_" + indexCont;
      elem.id = tempId;
      elem.setAttribute("data-index", indexCont);
      _this.tabs[indexCont] = {
        wrapper: elem,
        id: indexCont,
        XMLid: tempId,
        butsList: elem.querySelectorAll(".nbt-menu-item"),
        tabsList: elem.querySelectorAll(".nbt-tab")
      };
      var index = 0;
      for (but of _this.tabs[indexCont].butsList) {
        var tempIdTab = tempId + "-nbtItem_" + index;
        but.setAttribute("data-id", tempIdTab);
        but.setAttribute("data-index", index);
        _this.tabs[indexCont].tabsList[index].id = tempIdTab;
        _this.tabs[indexCont].tabsList[index].setAttribute("data-index", index);
        index++;
      }
      _this.tabs[indexCont].butsList = elem.querySelectorAll(".nbt-menu-item");
      _this.tabs[indexCont].tabsList = elem.querySelectorAll(".nbt-tab");
      indexCont++;
    }
  },
  _events: function() {
    var _this = this;
    document.addEventListener(
      "click",
      function(e) {
        var clicked = false;
        var target = e.target;
        if (
          e.target.closest(".nbt-menu-item") ||
          e.target.classList.contains("nbt-menu-item")
        ) {
          clicked = true;
          target = e.target.classList.contains("nbt-menu-item")
            ? e.target
            : e.target.closest(".nbt-menu-item");
        }
        if (clicked) {
          var index = target.getAttribute("data-index");
          var parent_id = target
            .closest(".nbt-container")
            .getAttribute("data-index");
          for (item of _this.tabs[parent_id].butsList) {
            item.classList.remove("active");
          }
          target.classList.add("active");
          for (item of _this.tabs[parent_id].tabsList) {
            item.classList.remove("active");
          }
          _this.tabs[parent_id].tabsList[index].classList.add("active");
        }
      },
      false
    );
  },
  get: function(tab, action) {
    parent = document.querySelectorAll(tab)[0];
    if (action == "currentTab") {
      return parent.querySelectorAll(".nbt-tab.active")[0];
    }
    if (action == "currentIndex") {
      return parent
        .querySelectorAll(".nbt-tab.active")[0]
        .getAttribute("data-index");
    }
  },
  _init: function() {
    this._setup();
    this._events();
  }
};
////////
//
//
//переключатель
//
//////
var NbFlops = {
  _events: function() {
    document.addEventListener(
      "click",
      function(e) {
        var clicked = false;
        var target = e.target;
        if (
          e.target.closest(".nbf-item") ||
          e.target.classList.contains("nbf-item")
        ) {
          clicked = true;
          target = e.target.classList.contains("nbf-item")
            ? e.target
            : e.target.closest(".nbf-item");
        }
        if (clicked) {
          if (target.classList.contains("active")) {
            target.classList.remove("active");
            document.dispatchEvent(
              new CustomEvent("flopClose", {
                detail: { target: target }
              })
            );
          } else {
            target.classList.add("active");
            document.dispatchEvent(
              new CustomEvent("flopOpen", {
                detail: { target: target }
              })
            );
          }
        }
      },

      false
    );
  },
  _init: function() {
    this._events();
  }
};

var NbModal = window.NbModal || {};
(function() {
  ////////
  //
  //ModalsWindows
  //
  ////////
  "use strict";
  NbModal = (function() {
    var initialID = 0;
    var wrapperContainer = null;
    var wrapperContainerInner = null;
    var wrapperContainerBg = null;
    NbModal = function(ID, opts) {
      var T = this;

      T.initialID = initialID++;
      if (T.initialID === 0) {
        wrapperContainer = document.createElement("div");
        wrapperContainer.classList.add("nbm-container");
        wrapperContainer.id = "nbm-container";
        wrapperContainer.innerHTML =
          '<div class="nbm-container-inner" id="nbm-container-inner">' +
          '<div class="nbm-background" id="nbm-background"></div>' +
          '<div class="nbm-close"><span></span></div></div>';
        if (document.getElementsByClassName("wrapper"))
          document
            .getElementsByClassName("wrapper")[0]
            .append(wrapperContainer);
        else
          document.body.append(
            '<div class="wrapper">' + wrapperContainer.OuterHTML + "</div>"
          );
        wrapperContainer = document.getElementById("nbm-container");
        wrapperContainerInner = document.getElementById("nbm-container-inner");
        wrapperContainerBg = document.getElementById("nbm-background");
      }
      T.defaults = {
        wrapperContainer: wrapperContainer,
        wrapperContainerInner: wrapperContainerInner,
        defaultClassItem: "nbm-item",
        wrapperContainerBg: wrapperContainerBg,
        timeAnimation: 300
      };
      T.initials = {
        windowID: ID,
        serialNumber: "nbm-modal-" + T.initialID,
        windowType: "modal",
        windowPos: ["center", "center"],
        bacground: "#ffffff",
        windowClass: null,
        wrapperClass: null,
        windowTypeAnimate: "fade",
        typeInit: "normal"
      };
      T = Object.assign(T, T.defaults);
      T.options = Object.assign({}, T.initials, opts);
      T.popup = document.getElementById(ID);
      if (!T.popup) return false;
      T.init(true);
    };
    return NbModal;
  })();

  NbModal.prototype.bodyScrollPos = null;

  NbModal.prototype.setEvents = function() {
    var T = this;

    for (elem of document.querySelectorAll(
      ".nbm-open[data-id=" + T.options.windowID + "]"
    )) {
      elem.addEventListener("click", function() {
        T.open();
      });
    }
    for (elem of document.querySelectorAll(".nbm-close")) {
      elem.addEventListener("click", function() {
        T.close();
      });
    }
    if (T.initialID === 0) {
      window.addEventListener("scroll", function() {
        var wrapper = document.getElementById("nbm-container");
        if (wrapper.classList.contains("open") || wrapper.classList.contains("active")) {
          document.documentElement.scrollTop = T.__proto__.bodyScrollPos;
        }
      });
    }
  };
  NbModal.prototype.init = function(creation) {
    var T = this;

    var itemHTML = document.createElement("div");
    itemHTML.classList.add(T.defaultClassItem);
    if (creation) {
      T.options.windowClass ? itemHTML.classList.add(T.options.windowClass) : 1;
      itemHTML.id = T.options.windowID;
    }

    itemHTML.innerHTML =
      "<div class='nbm-item-content'>" + T.popup.innerHTML + "</div>";
    T.wrapperContainerInner.append(itemHTML);
    T.popup.remove();
    T.popup = document.getElementById(T.options.windowID);

    document.dispatchEvent(
      new CustomEvent("NbModal-init", {
        detail: { modal: T }
      })
    );

    T.setEvents();
  };
  NbModal.prototype.open = function() {
    var T = this;

    T.__proto__.bodyScrollPos = document.documentElement.scrollTop;
    T.wrapperContainer.classList.add("active");
    T.wrapperContainer.classList.add(T.options.wrapperClass);
    T.popup.classList.add("active");
    T.wrapperContainerBg.style.backgroundColor = T.options.bacground;

    setTimeout(function() {
      T.wrapperContainer.classList.add("open");
      T.wrapperContainer.classList.remove("active");
      T.popup.classList.add("open");
      T.popup.classList.remove("active");

      document.dispatchEvent(
        new CustomEvent("NbModal-open", {
          detail: { modal: T }
        })
      );

    }, T.timeAnimation);
  };
  NbModal.prototype.close = function(all) {
    var T = this;
    if(T.popup.classList.contains('open')){

      T.wrapperContainer.classList.add("active");
      T.wrapperContainer.classList.remove("open");
      T.popup.classList.add("active");
      T.popup.classList.remove("open");
      setTimeout(function() {
        T.wrapperContainerBg.setAttribute("style", "");
        T.wrapperContainer.classList.remove("active");
        T.wrapperContainer.classList.remove(T.options.wrapperClass);
        T.popup.classList.remove("active");

        document.dispatchEvent(
          new CustomEvent("NbModal-close", {
            detail: { modal: T }
          })
        );

      }, T.timeAnimation);
    }
  };
})();
(function() {
  NbWhellEvent._init();
  NbTabs._init();
  NbFlops._init();
  
  
})();
