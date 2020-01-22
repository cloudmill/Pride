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
var NbTabs = {
  _setup: function() {
    var tabsContainers = document.getElementsByClassName("nbt-container");
    this.tabs = [];
    var _this = this;
    var indexCont = 0;
    for (elem of tabsContainers) {
      var tempId = "nbt_" + parseInt(Math.random() * 10000);
      elem.id = tempId;
      _this.tabs[indexCont] = {
        wrapper: elem,
        id: indexCont,
        butsList: elem.querySelectorAll(".nbt-menu-item"),
        tabsList: elem.querySelectorAll(".nbt-tab"),
        buts: [],
        tabs: []
      };
      var index = 0;
      for (but of _this.tabs[indexCont].butsList) {
        var tempIdTab = "nbt_item_" + parseInt(Math.random() * 10000);
        but.setAttribute("data-id", tempIdTab);
        but.setAttribute("data-index", index);
        _this.tabs[indexCont].tabsList[index].id = tempIdTab;
        _this.tabs[indexCont].tabsList[index].setAttribute("data-index", index);
        _this.tabs[indexCont].buts[index] = { but: but, id: index };
        _this.tabs[indexCont].tabs[index] = {
          tab: _this.tabs[indexCont].tabsList[index],
          id: index
        };
        index++;
      }
      _this.tabs[indexCont].butsList = elem.querySelectorAll(".nbt-menu-item");
      _this.tabs[indexCont].tabsList = elem.querySelectorAll(".nbt-tab");
    }
  },
  _events: function() {
    var _this = this;
    for (elemTab of this.tabs) {
      document.addEventListener(
        "click",
        function(e) {
          var index = e.target.getAttribute('data-index')
          console.log(e.target);
          for (item of elemTab.butsList) {
            item.classList.remove("active");
          }
          e.target.classList.add("active");
          for (item of elemTab.tabsList) {
            item.classList.remove("active");
          }
          elemTab.tabs[index].tab.classList.add("active");
        },
        false
      );
    }
  },
  _init: function() {
    this._setup();
    this._events();
  }
};
(function() {
  NbPopup._init();
  NbWhellEvent._init();
  NbTabs._init();
})();
