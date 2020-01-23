////////
//
//
//попапы
//
var NbPopup = {
  _popupOpen: false,
  _bodyScrollPos: 0,
  _setPopups: function() {
    var _this = this;
    var hiddenBoxs = document.getElementsByClassName("nbp-hidden-inf");
    if (hiddenBoxs.length > 0) {
      for (elem of hiddenBoxs) {
        var newPopup = document.createElement("div");
        var attrs = elem.attributes;
        for (attr of attrs) {
          if (attr.name != "data-id" && attr.name != "data-custom-class")
            newPopup.setAttribute(attr.name, attr.value);
        }
        newPopup.className = "nbp-item";
        newPopup.classList.add(elem.getAttribute("data-custom-class"));
        newPopup.id = elem.getAttribute("data-id");
        newPopup.innerHTML =
          '<div class="nbp-content">' +
          elem.getElementsByClassName("nbp-hidden-box")[0].innerHTML +
          "</div>";
        _this.wrapper
          .getElementsByClassName("nbp-container-inner")[0]
          .append(newPopup);
        elem.remove();
      }
    }
    this.items = document.getElementsByClassName("nbp-item");
  },
  _setDefOpts: function() {
    this.wrapper = document.getElementById("nbp-container");
    this.bg = document.getElementById("nbp-background");
    this.btnsOpen = document.getElementsByClassName("nbp-open");
    this.btnsClose = document.getElementsByClassName("nbp-close");
    this.popups = [];
    this.baseTimeAnimate = 300;
  },
  _setup: function() {
    this._setDefOpts();
    this._setPopups();

    var _this = this;
    for (elem of this.items) {
      _this.popups[elem.id] = {
        id: elem.id,
        body: elem,
        bg: {
          color: elem.getAttribute("data-nbp-bgColor")
        }
      };
    }
  },
  _events: function() {
    var _this = this;
    for (elem of this.btnsOpen) {
      elem.addEventListener("click", function() {
        var temp_id = this.getAttribute("data-id");
        _this.open(_this.popups[temp_id]);
      });
    }
    for (elem of this.btnsClose) {
      elem.addEventListener("click", function() {
        _this.close();
      });
    }
    document.addEventListener("mousewhell", function(e) {
      // if (_this._popupOpen) e.detail.e.preventDefault();
    });
    window.addEventListener("scroll", function() {
      if (_this._popupOpen) {
        document.documentElement.scrollTop = _this._bodyScrollPos;
      }
    });
  },
  _init: function() {
    this._setup();
    this._events();
  },
  open: function(item) {
    this.wrapper.classList.add("active");
    item.body.classList.add("active");
    this.bg.style.backgroundColor = item.bg.color;
    var _this = this;
    this._popupOpen = true;
    this._bodyScrollPos = document.documentElement.scrollTop;
    setTimeout(function() {
      _this.wrapper.classList.add("open");
      _this.wrapper.classList.remove("active");
      item.body.classList.add("open");
      item.body.classList.remove("active");
    }, this.baseTimeAnimate);
  },
  close: function() {
    this.wrapper.classList.remove("open");
    this.wrapper.classList.add("active");
    this.bg.setAttribute("style", "");
    for (item of this.items) {
      if (item.classList.contains("open")) {
        item.classList.remove("open");
        item.classList.add("active");
      }
    }
    var _this = this;
    setTimeout(function() {
      _this.wrapper.classList.remove("active");
      for (item of _this.items) {
        item.classList.remove("active");
      }
      _this._popupOpen = false;
    }, this.baseTimeAnimate);
  }
};
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
        var tempIdTab = tempId+"-nbtItem_" + index;
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
                detail: { target: target}
              })
            );
          } else {
            target.classList.add("active");
            document.dispatchEvent(
              new CustomEvent("flopOpen", {
                detail: { target: target}
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
////////
//
//
//инициализация
//
//////
(function() {
  NbPopup._init();
  NbWhellEvent._init();
  NbTabs._init();
  NbFlops._init();
})();
