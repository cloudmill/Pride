var NbPopup = {
  setup: function() {
    var _this = this;
    for (elem of this.items) {
      _this.popups[elem.id] = {
        id: elem.id,
        body: elem,
        bg:{
          color: elem.getAttribute('data-bg-color')
        }
      };
    }
  },
  events: function() {
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
  },
  init: function() {
    this.wrapper = document.getElementById("nbp-container");
    this.bg = document.getElementById("nbp-background")
    this.items = document.getElementsByClassName("nbp-item");
    this.btnsOpen = document.getElementsByClassName("nbp-open");
    this.btnsClose = document.getElementsByClassName("nbp-close");
    this.popups = [];
    this.baseTimeAnimate = 300;
    this.setup();
    this.events();
  },
  open: function(item) {
    this.wrapper.classList.add("active");
    item.body.classList.add("active");
    this.bg.style.backgroundColor = item.bg.color;
    var _this = this;
    setTimeout(function() {
      _this.wrapper.classList.add("open");
      _this.wrapper.classList.remove("active");
      item.body.classList.add("open");
      item.body.classList.remove("active");
    }, this.baseTimeAnimate,
    function(){
      
    });
  },
  close: function() {
    this.wrapper.classList.remove("open");
    this.wrapper.classList.add("active");
    this.bg.setAttribute('style','')
    for(item of this.items){
      if(item.classList.contains('open')){
        item.classList.remove("open");
        item.classList.add("active");
      }
    }
    var _this = this;
    setTimeout(function() {
      _this.wrapper.classList.remove("active");
      for(item of _this.items){
        item.classList.remove("active");
      }
    }, this.baseTimeAnimate);
  }
};
(function() {
  NbPopup.init();
})();
