
define(["jquery","Hammer","hammerify","Velocity","easing"],function($,Hammer,hammerify,velocity){
  // Hardcoded .staggered-list scrollFire
  // var staggeredListOptions = [];
  // $('ul.staggered-list').each(function (i) {
  //   var label = 'scrollFire-' + i;
  //   $(this).addClass(label);
  //   staggeredListOptions.push({ selector: 'ul.staggered-list.' + label, offset: 200, callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
  // });
  // scrollFire(staggeredListOptions);
  var swipeLeft = false;
  var swipeRight = false;
  // Dismissible Collections
  $('.dismissable').each(function() {
    $(this).hammer({
      prevent_default: false
    }).bind('pan', function(e) {
      if (e.gesture.pointerType === "touch") {
        var $this = $(this);
        var direction = e.gesture.direction;
        var x = e.gesture.deltaX;
        var velocityX = e.gesture.velocityX;
        $this.velocity({ translateX: x }, {duration: 50, queue: false, easing: 'easeOutQuad'});
        if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) swipeLeft = true;
        if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) swipeRight = true;
      }
    }).bind('panend', function(e) {
      if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {
        swipeRight = false;
        swipeLeft = false;
      }
      if (e.gesture.pointerType === "touch") {
        var $this = $(this);
        if (swipeLeft || swipeRight) {
          var fullWidth;
          if (swipeLeft) { fullWidth = $this.innerWidth(); } else { fullWidth = -1 * $this.innerWidth(); }
          $this.velocity({ translateX: fullWidth }, {duration: 100, queue: false, easing: 'easeOutQuad', complete: function() {
            $this.css('border', 'none');
            $this.velocity({height: 0, padding: 0}, {duration: 200, queue: false, easing: 'easeOutQuad', complete: function(){ $this.remove();}});
          }});
        } else $this.velocity({ translateX: 0}, {duration: 100, queue: false, easing: 'easeOutQuad'});
        swipeLeft = false;
        swipeRight = false;
      }
    });



  // time = 0
  // // Vertical Staggered list
  // $('ul.staggered-list.vertical li').velocity(
  //     { translateY: "100px"},
  //     { duration: 0 });

  // $('ul.staggered-list.vertical li').each(function() {
  //   $(this).velocity(
  //     { opacity: "1", translateY: "0"},
  //     { duration: 800, delay: time, easing: [60, 25] });
  //   time += 120;
  // });

  // // Fade in and Scale
  // $('.fade-in.scale').velocity(
  //     { scaleX: .4, scaleY: .4, translateX: -600},
  //     { duration: 0});
  // $('.fade-in').each(function() {
  //   $(this).velocity(
  //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
  //     { duration: 800, easing: [60, 10] });
  // });
});
});
