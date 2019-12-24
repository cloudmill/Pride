$(document).ready(function(){
  header.init();
}) 

header = {
  scrolling:function(scroll){
    if(scroll>0){
      $('.header').addClass('scrolled')
    }else{
      $('.header').removeClass('scrolled')
    }
  },
  events:function(){
    var _this = this;
    $(document).on('scroll',function(){
      _this.scrolling($(document).scrollTop());
    })
  },
  init:function(){
    this.events();
  }
}