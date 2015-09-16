define(["jquery"], function ($) {
  $.fn.parallax = function () {
    var window_width = $(window).width();
    return this.each(function(i) {
      var $this = $(this);
      $this.addClass('parallax');
      function updateParallax(initial) {
        var container_height;
        if (window_width < 601) container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height(); else container_height = ($this.height() > 0) ? $this.height() : 500;
        var $img = $this.children("img").first(), img_height = $img.height(), parallax_dist = img_height - container_height, bottom = $this.offset().top + container_height,
          top = $this.offset().top, scrollTop = $(window).scrollTop(), windowHeight = window.innerHeight, windowBottom = scrollTop + windowHeight,
          percentScrolled = (windowBottom - top) / (container_height + windowHeight), parallax = Math.round((parallax_dist * percentScrolled));
        if (initial) $img.css('display', 'block');
        if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
      }
      $this.children("img").one("load", function() {
        updateParallax(true);
      }).each(function() { if(this.complete) $(this).load(); });
      $(window).scroll(function() {
        window_width = $(window).width();
        updateParallax(false);
      });
      $(window).resize(function() {
        window_width = $(window).width();
        updateParallax(false);
      });
    });
  };
});
