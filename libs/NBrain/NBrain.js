if (typeof Object.assign != "function") {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      "use strict";
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
  };
}






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
            $n(document).trigger("mousewhell", _this._getDelta(e));
          },
          { passive: false }
        );
      } else if ("onmousewheel" in document) {
        document.addEventListener(
          "mousewheel",
          function(e) {
            $n(document).trigger("mousewhell", _this._getDelta(e));
          },
          { passive: false }
        );
      } else {
        document.addEventListener(
          "MozMousePixelScroll",
          function(e) {
            $n(document).trigger("mousewhell", _this._getDelta(e));
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
    $n(".nbt-container").each(function(elem) {
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
      for (var i = 0; i < _this.tabs[indexCont].butsList.length; i++) {
        var but = _this.tabs[indexCont].butsList[i];
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
    });
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
          for (var i = 0; i < _this.tabs[parent_id].butsList.length; i++) {
            var item = _this.tabs[parent_id].butsList[i];
            item.classList.remove("active");
          }
          target.classList.add("active");
          for (var i = 0; i < _this.tabs[parent_id].tabsList.length; i++) {
            var item = _this.tabs[parent_id].tabsList[i];
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
            $n(document).trigger("flopClose", target);
          } else {
            target.classList.add("active");
            $n(document).trigger("flopOpen", target);
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
//NbFlops
(function() {
  ////////
  //
  //NbFlops
  //
  ////////
  "use strict";
  var NbFlops = window.NbFlops || {};
  window.NbFlops = NbFlops;
  NbFlops = function() {};
})();

//
//NbEasyDOM
(function() {
  ////////
  //
  //NbEasyDOM
  //
  ////////
  "use strict";
  var NbEasyDOM = window.NbEasyDOM || {};
  window.NbEasyDOM = NbEasyDOM;
  NbEasyDOM = function(selector) {
    var elems = {};
    if (typeof selector === "string") {
      elems = document.querySelectorAll(selector);
    } else if (selector) {
      elems[0] = selector;
      elems.length = 1;
    } else {
      elems = {};
      elems.length = 0;
    }
    var NbEDOM = (function() {
      ///////////////////////////
      ///////////////////////BASE
      var obj = function() {
        var ob = this;
        ob.length = elems.length;
        ob.eventsList = [];
        for (var i = 0; i < ob.length; i++) {
          ob[i] = elems[i];
        }
        return ob;
      };
      obj.prototype.constructor = function() {
        var ob = this;
        return ob;
      };
      ///////////////////////////
      //////////////////////ELEMS
      obj.prototype.find = function(selector) {
        var ob = this;
        if (typeof selector === "string") {
          var stack = ob.pushStack();
          ob.each(function(item, key) {
            ob.findSelf(selector, item, stack);
          });
          return stack;
        }
        return ob;
      };
      obj.prototype.findSelf = function(selector, elem, stack) {
        var findes = elem.querySelectorAll(selector);
        stack.pushStack(findes);
      };
      obj.prototype.pushStack = function(findes) {
        var ob = this;
        if (!findes) return $n();
        for (var i = 0; i < findes.length; i++) {
          ob[ob.length] = findes[i];
          ob.length++;
        }
        return ob;
      };
      obj.prototype.each = function(handler) {
        var ob = this;
        for (var i = 0; i < elems.length; i++) {
          handler(elems[i], i);
        }
        return ob;
      };
      obj.prototype.append = function(elem) {
        var ob = this;
        elems.appendChild(elem);
        return ob;
      };

      ///////////////////////////
      /////////////////////EVENTS
      obj.prototype.on = function(event, handler) {
        var ob = this;
        if (ob.length >= 1) {
          var handlerElem = function(e) {
            /* var data = e.detail.data; */
            handler(e/* , data.a, data.b, data.c, data.d */);
          };
          ob.each(function(elem) {
            elem.addEventListener(event, handlerElem);
          });

          ob.eventsList.push({ name: event, handler: handlerElem });
          return true;
        }
      };
      obj.prototype.off = function(event, handler) {
        var ob = this;
        ob.each(function(elem) {
          elem.removeEventListener(event, handler);
        });
      };
      obj.prototype.trigger = function(name, a, b, c, d) {
        var ob = this;
        var data = {
          a: a == "self" ? ob : a,
          b: b,
          c: c,
          d: d
        };
        var event;
        if (typeof Event === "function") {
          event = new Event(name);
        } else {
          event = document.createEvent("Event");
          event.initEvent(name, true, true);
        }
        document.dispatchEvent(event);
      };

      ///////////////////////////
      /////////////////ATTRIBUTES
      obj.prototype.attr = function(name, value) {
        var ob = this;
        console.log("dd", ob);
        if (ob.length == 0) ob = document.documentElement;
        if (!value) {
          if (ob.hasAttribute(name)) return ob.getAttribute(name);
          else {
            return null;
          }
        }
        ob.each(function(elem) {
          elem.setAttribute(name, value);
        });
        return ob;
      };
      return new obj();
    })(document);

    return NbEDOM;
  };
  window.$n = NbEasyDOM;
})();
//
//ModalsWindows
(function() {
 
  ////////
  //
  //ModalsWindows
  //
  ////////
  ("use strict");
  var NbModal = window.NbModal || {};
  window.NbModal = NbModal;
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
            .appendChild(wrapperContainer);
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
    $n(".nbm-open[data-id=" + T.options.windowID + "]").on("click", function(
      e
    ) {
      e.preventDefault();
      T.open();
    });
    $n(".nbm-close").on("click", function() {
      T.close();
    });

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
        console.log($n(".nbm-item.open,.nbm-item.active"));
        var id = $n(".nbm-item.open,.nbm-item.active").attr("id");
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
    T.wrapperContainerInner.appendChild(itemHTML);
    T.popup.remove();
    T.popup = document.getElementById(T.options.windowID);

    $n(document).trigger("NbModal-init", T);

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
      $n(document).trigger("NbModal-open", T);
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

        $n(document).trigger("NbModal-close", T);
      }, T.timeAnimation);
    }
  };
  function setInDataAttr() {
    $n(".popup[data-nbm-popup-init]").each(function(item) {
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
(function() {
  ////////
  //
  //XHRequests
  //
  ////////
  "use strict";
  var NbXHR = window.NbXHR || {};
  window.NbXHR = NbXHR;
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
    $n(document).trigger("XHR-newPage", T);

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
    $n(document).trigger("XHR-backPage", T);

    T.createRequest(succes, failed);
  };
  NbXHR.prototype.nextPage = function() {
    var T = this;
    T.currentPage_id++;
    T.offsetPage++;
    var succes = function() {}.bind(T);
    var failed = function() {}.bind(T);

    $n(document).trigger("XHR-nextPage", T);
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
      $n(document).trigger("XHR-load", T);

      setTimeout(function() {
        var elem_ = document.getElementsByClassName("iframeDoc");
        if (elem_.length > 1) {
          elem_[1].remove();
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
      $n(document).trigger("XHR-loadNewDoc", T);

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
      $n(document.head)
        .find('title,meta,[type="image/png"]')
        .each(function(elem) {
          if (elem.remove) elem.remove();
        });
      $n(_html.head)
        .find("*")
        .each(function(elem) {
          var find = false;
          $n(document.head)
            .find("*")
            .each(function(elem2) {
              if (elem2.outerHTML == elem.outerHTML) find = true;
            });

          if (!find && elem.tagName) $n(document.head).append(elem);
        });

      wrapper.classList.remove("only-fp");
      wrapper.classList.add(newWrapper.classList);
      if (document.readyState === "complete") {
        $n(document).trigger("XHR-complate", T);
      } else {
        window.onload = function() {
          $n(document).trigger("XHR-complate", T);

          window.onload = null;
        };
      }
    };
  };
  NbXHR.prototype.init = function() {
    var T = this;
    T._pullStory();
    T._setEvents();
    $n(document).trigger("XHR-init", T);
  };
})();
//
//Init all
(function() {
  NbWhellEvent._init();
  NbTabs._init();
  NbFlops._init();
})(document);
