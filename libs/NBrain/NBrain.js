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
        var width_ =
          !target.hasAttribute("data-width") ||
          window.innerWidth <= Number(target.getAttribute("data-width"));
        if (clicked && width_) {
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
//
//NbEasyDOM
var NbEasyDOM = window.NbEasyDOM || {};
var nbe;
(function() {
  ////////
  //
  //NbEasyDOM
  //
  ////////
  "use strict";
  NbEasyDOM = (function() {
    NbEasyDOM = function(opts) {
      var T = this;
      T.defaults = {};
      T.initials = {};
      T = Object.assign(T, T.defaults);
      T.options = Object.assign({}, T.initials, opts);
      //T.init();
    };
    return NbEasyDOM;
  })();
  NbEasyDOM.prototype.$ = function(selector, parent) {
    if (parent)
      return Array.prototype.slice.call(parent.querySelectorAll(selector));
    else return Array.prototype.slice.call(document.querySelectorAll(selector));
  };
  nbe = new NbEasyDOM();
})();
//
//ModalsWindows
var NbModal = window.NbModal || {};
(function() {
  ////////
  //
  //ModalsWindows
  //
  ////////
  "use strict";
  var popups = [];
  var bodyScrollPos = null;
  NbModal = (function() {
    var initialID = 0;
    var wrapperContainer = null;
    var wrapperContainerInner = null;
    var wrapperContainerBg = null;
    var wrapperClose = null;
    NbModal = function(ID, opts, content) {
      var T = this;

      T.initialID = initialID++;
      if (T.initialID === 0) {
        wrapperContainer = document.createElement("div");
        wrapperContainer.classList.add("nbm-container");
        wrapperContainer.id = "nbm-container";
        wrapperContainer.innerHTML =
          '<div class="nbm-container-inner" id="nbm-container-inner">' +
          '<div class="nbm-background" id="nbm-background"></div>' +
          '<div class="nbm-close" id="nbm-close"><span></span></div></div>';
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
        wrapperClose = document.getElementById("nbm-close");
      }
      T.defaults = {
        wrapperContainer: wrapperContainer,
        wrapperContainerInner: wrapperContainerInner,
        defaultClassItem: "nbm-item",
        wrapperContainerBg: wrapperContainerBg,
        wrapperClose: wrapperClose,
        timeAnimation: 300,
        butOffset: {
          x: 30,
          y: 30
        }
      };
      T.initials = {
        windowID: ID,
        serialNumber: "nbm-modal-" + T.initialID,
        windowType: "modal",
        background: false,
        windowClass: null,
        wrapperClass: null,
        windowTypeAnimate: "fade",
        typeInit: "normal",
        butCloseInPopup: false
      };
      T = Object.assign(T, T.defaults);
      T.options = Object.assign({}, T.initials, opts);
      if (content) {
        var popup = document.createElement("div");
        popup.innerHTML = content;
        T.popup = popup;
      } else {
        T.popup = document.getElementById(ID);
      }

      if (!T.popup) return false;
      T.init(true);
      popups[T.options.windowID] = T;
    };
    return NbModal;
  })();
  NbModal.prototype.setEvents = function() {
    var T = this;

    for (var elem of document.querySelectorAll(
      ".nbm-open[data-id=" + T.options.windowID + "]"
    )) {
      elem.addEventListener("click", function(event) {
        event.preventDefault();
        T.open();
      });
    }
    for (var elem of document.querySelectorAll(".nbm-close")) {
      elem.addEventListener("click", function() {
        T.close();
      });
    }
    if (T.initialID === 0) {
      window.addEventListener("scroll", function() {
        var wrapper = document.getElementById("nbm-container");
        if (
          wrapper.classList.contains("open") ||
          wrapper.classList.contains("active")
        ) {
          document.documentElement.scrollTop = bodyScrollPos;
        }
      });
      window.addEventListener("resize", function() {
        var id = nbe.$(".nbm-item.open,.nbm-item.active")[0].id;
        popups[id].refresh();
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
  NbModal.prototype.refresh = function() {
    var T = this;

    if (T.options.butCloseInPopup) {
      T.wrapperClose.style.top =
        T.popup.offsetTop - T.popup.offsetHeight / 2 + T.butOffset.y + "px";
      T.wrapperClose.style.left =
        T.popup.offsetLeft +
        T.popup.offsetWidth / 2 -
        17 -
        T.butOffset.x +
        "px";
    } else {
      T.wrapperClose.setAttribute("style", "");
    }
  };
  NbModal.prototype.open = function() {
    var T = this;

    bodyScrollPos = document.documentElement.scrollTop;
    T.wrapperContainer.classList.add("active");
    T.wrapperContainer.classList.add(T.options.wrapperClass);
    T.popup.classList.add("active");
    if (T.options.background)
      T.wrapperContainerBg.style.backgroundColor = T.options.background;

    if (T.options.butCloseInPopup) {
      T.wrapperClose.style.top =
        T.popup.offsetTop - T.popup.offsetHeight / 2 + T.butOffset.y + "px";
      T.wrapperClose.style.left =
        T.popup.offsetLeft +
        T.popup.offsetWidth / 2 -
        17 -
        T.butOffset.x +
        "px";
    } else {
      T.wrapperClose.setAttribute("style", "");
    }
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
  NbModal.prototype.close = function() {
    var T = this;
    if (T.popup.classList.contains("open")) {
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
  function setInDataAttr() {
    nbe.$(".popup[data-nbm-popup-init]").forEach(function(item) {
      var opts = {
        windowType: item.getAttribute("data-windowType") || "modal",
        background: item.getAttribute("data-background") ? 1 : false,
        windowClass: item.getAttribute("data-windowClass") || null,
        wrapperClass: item.getAttribute("data-wrapperClass") || null,
        windowTypeAnimate:
          item.getAttribute("data-windowTypeAnimate") || "fade",
        typeInit: item.getAttribute("data-typeInit") || "normal",
        butCloseInPopup: item.getAttribute("data-butCloseInPopup") || false
      };
      popups[item.id] = new NbModal(item.id, opts);
    });
  }
  Document.prototype.getPopup = function(id) {
    return popups[id];
  };
  Document.prototype.newPopup = function(id, opts, content) {
    popups[id] = new NbModal(id, opts, content);
    return popups[id];
  };
  setInDataAttr();
})();
//
//XHRequests
var NbXHR = window.NbXHR || {};
(function() {
  ////////
  //
  //XHRequests
  //
  ////////
  "use strict";
  NbXHR = (function() {
    var inited_NbXHR = false;
    NbXHR = function(opts) {
      var T = this;
      this.store = [];
      this.pause = 300;
      this.currentPage_id = 0;
      this.offsetPage = 0;
      T.defaults = {};
      T.initials = {
        classLink: "nbx-link",
        workWithPopButs: true
      };
      T = Object.assign(T, T.defaults);
      T.options = Object.assign({}, T.initials, opts);
      T.init();
      inited_NbXHR = true;
    };
    if (inited_NbXHR) {
      new console.error("failed inited");
      return false;
    }
    return NbXHR;
  })();

  NbXHR.prototype._pullStory = function() {
    var T = this;
    if (history.length == 2) {
      var href = document.location.href;
      var pageInf = {
        id: 0,
        href: href
      };
      T.store.push(pageInf);
      history.replaceState(pageInf, null, href);
    } else {
      for (var i = 0; i < history.length - 1; i++) {
        T.store.push({
          id: i,
          url: null
        });
      }
    }
  };
  NbXHR.prototype._setEvents = function() {
    var T = this;
    document.addEventListener(
      "click",
      function() {
        if (this.classLink.contains(T.options.classLink)) {
          var href = this.getAttribute("href");
          if (
            href[0] != "#" &&
            href.indexOf("tel:") != 0 &&
            href.indexOf("mailto:") != 0 &&
            href.indexOf("callto:") != 0 &&
            href != "" &&
            !this.hasAttribute("download") &&
            (!this.hasAttribute("target") ||
              this.getAttribute("target") != "_blank")
          ) {
            if (!this.hasAttribute("data-fail-xhr")) {
              e.preventDefault();
              T.hrefTo = href;
              T.targetClick = this;
              T.newPage();
            }
          }
        }
      },
      false
    );
    $(document).on("click", "." + T.options.classLink, function(e) {
      var href = $(this).attr("href");
      if (
        href[0] != "#" &&
        href.indexOf("tel:") != 0 &&
        href.indexOf("mailto:") != 0 &&
        href.indexOf("callto:") != 0 &&
        href != "" &&
        !$(this).is("[download]") &&
        (!$(this).attr("target") || $(this).attr("target") != "_blank")
      ) {
        if ($(this).attr("data-fail-xhr") == undefined) {
          e.preventDefault();
          T.hrefTo = href;
          T.targetClick = $(this);
          T.newPage();
        }
      }
    });
    if (T.options.workWithPopButs)
      window.addEventListener("popstate", function(e) {
        if (e.state) {
          T.hrefTo = e.state.href;
          if (e.state.id < T.currentPage_id) {
            T.backPage();
          } else if (e.state.id > T.currentPage_id) {
            T.nextPage();
          }
        }
      });
  };
  NbXHR.prototype.newPage = function() {
    var T = this;
    var succes = function() {
      var T = this;
      if (T.offsetPage < 0) {
        T.store.splice(
          T.currentPage_id + 1,
          T.store.length - 1 - T.currentPage_id
        );
      }
      var lastStore = T.store[T.store.length - 1];
      var next_id = lastStore ? lastStore.id + 1 : 0;
      var pageInf = {
        id: next_id,
        href: T.hrefTo
      };
      T.store.push(pageInf);
      history.pushState(pageInf, null, T.hrefTo);
      T.currentPage_id = next_id;
      if (!document.location.href.split("#")[1]) {
        var top_ = document.body.scrollTop;
        var timeInterval_ = setInterval(function() {
          document.body.scrollTop -= top_ / 100;
          if (document.body.scrollTop == 0) {
            clearInterval(timeInterval_);
          }
        }, 10);
      }
    }.bind(T);
    var failed = function() {
      var T = this;
      console.log("failed__________new-page");
      if (T.targetClick) {
        T.targetClick.setAttribute("data-fail-xhr", "fail");
        T.targetClick.click();
      }
    }.bind(this);
    document.dispatchEvent(
      new CustomEvent("XHR-newPage", {
        detail: { xhr: T }
      })
    );
    T.createRequest(succes, failed);
  };
  NbXHR.prototype.backPage = function() {
    var T = this;
    T.currentPage_id--;
    T.offsetPage--;
    var succes = function() {
      console.log("succes");
    }.bind(T);
    var failed = function() {
      console.log("failed");
    }.bind(T);
    document.dispatchEvent(
      new CustomEvent("XHR-backPage", {
        detail: { xhr: T }
      })
    );
    T.createRequest(succes, failed);
  };
  NbXHR.prototype.nextPage = function() {
    var T = this;
    T.currentPage_id++;
    T.offsetPage++;
    var succes = function() {}.bind(T);
    var failed = function() {}.bind(T);
    document.dispatchEvent(
      new CustomEvent("XHR-nextPage", {
        detail: { xhr: T }
      })
    );
    T.createRequest(succes, failed);
  };
  NbXHR.prototype.refreshState = function() {
    var T = this;
    T.targetClick = null;
    T.hrefTo = null;
  };
  NbXHR.prototype.createRequest = function(succes, failed, href) {
    var T = this;
    if (href) T.hrefTo = href;
    if (window.XMLHttpRequest) {
      T.XHR = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      T.XHR = new ActiveXObject("Microsoft.XMLHTTP");
    }
    T.XHR.onload = function() {
      document.dispatchEvent(
        new CustomEvent("XHR-load", {
          detail: { xhr: T }
        })
      );
      setTimeout(function() {
        var elem_ = document.getElementsByClassName("iframeDoc");
        if (elem_.length > 1) {
          elem_[1].parentNode.removeChild(elem_[1]);
        }
        if (T.XHR.status == 200 || T.XHR.status == 404) {
          succes();
          T.reloadPageDoing(T.XHR.response);
          T.XHR.onload = null;
        } else {
          failed();
        }
        T.refreshState();
      }, T.pause);
    };
    T.XHR.onerror = function() {
      failed();
      T.XHR.onerror = null;
      T.refreshState();
    };
    T.XHR.open("POST", T.hrefTo, true);
    T.XHR.send();
  };
  NbXHR.prototype.subDocument = function(string) {
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.className = "iframeDoc";
    document.body.appendChild(iframe);
    var head = string.slice(
      string.indexOf("<head>") + 6,
      string.indexOf("</head>")
    );
    var body = string.slice(
      string.indexOf("<body>") + 6,
      string.indexOf("</body>")
    );
    iframe.contentDocument.body.innerHTML = body;

    iframe.contentDocument.head.innerHTML = head;
    return iframe;
  };
  NbXHR.prototype.reloadPageDoing = function(temp_html) {
    var T = this;
    var iframe = T.subDocument(temp_html);
    iframe.onload = function() {
      document.dispatchEvent(
        new CustomEvent("XHR-loadNewDoc", {
          detail: { xhr: T }
        })
      );
      var html = this.contentDocument;
      console.log("reload ________");
      function replaceDOM(_class, _parent) {
        var _old = document.getElementsByClassName(_class)[0];
        var _new = html.getElementsByClassName(_class)[0];
        if (!_old) {
          _parent.append(_new);
        } else {
          _parent.replaceChild(_new, _old);
        }
      }
      var wrapper = document.getElementsByClassName("wrapper")[0];
      var newWrapper = document.getElementsByClassName("wrapper")[0];
      replaceDOM("page", wrapper);
      replaceDOM("header", wrapper);
      replaceDOM("footer", wrapper);
      nbe
        .$('title,meta,[type="image/png"]', document.head)
        .forEach(function(elem) {
          if (elem.remove) elem.remove();
        });
      nbe.$("*", _html.head).forEach(function(elem) {
        var find = false;
        nbe.$("*", document.head).forEach(function(elem2) {
          if (elem2.outerHTML == elem.outerHTML) find = true;
        });
        if (!find && elem.tagName) document.head.appendChild(elem);
      });
      wrapper.classList.remove("only-fp");
      wrapper.classList.add(newWrapper.classList);
      if (document.readyState === "complete") {
        document.dispatchEvent(
          new CustomEvent("XHR-complate", {
            detail: { xhr: T }
          })
        );
      } else {
        window.onload = function() {
          document.dispatchEvent(
            new CustomEvent("XHR-complate", {
              detail: { xhr: T }
            })
          );
          window.onload = null;
        };
      }
    };
  };
  NbXHR.prototype.init = function() {
    var T = this;
    T._pullStory();
    T._setEvents();
    document.dispatchEvent(
      new CustomEvent("XHR-init", {
        detail: { xhr: T }
      })
    );
  };
})();
//
//Init all
(function() {
  NbWhellEvent._init();
  NbTabs._init();
  NbFlops._init();
})();
