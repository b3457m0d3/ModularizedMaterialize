define(["jquery","Velocity"], function ($,velocity) {
  $.fn.reverse = [].reverse;
  $(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn', function(e) { openFABMenu($(this)); });
  $(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn', function(e) { closeFABMenu($(this)); });
  $.fn.extend({
    openFAB: function() { openFABMenu($(this)); },
    closeFAB: function() { closeFABMenu($(this)); }
  });
  var openFABMenu = function (btn) {
    $this = btn;
    if ($this.hasClass('active') === false) {
      $this.addClass('active');
      $this.find('ul .btn-floating').velocity({ scaleY: ".4", scaleX: ".4", translateY: "40px"},{ duration: 0 });
      var time = 0;
      $this.find('ul .btn-floating').reverse().each(function () {
        $(this).velocity({ opacity: "1", scaleX: "1", scaleY: "1", translateY: "0"},{ duration: 80, delay: time });
        time += 40;
      });
    }
  };
  var closeFABMenu = function (btn) {
    $this = btn;
    $this.removeClass('active');
    var time = 0;
    $this.find('ul .btn-floating').velocity("stop", true);
    $this.find('ul .btn-floating').velocity({ opacity: "0", scaleX: ".4", scaleY: ".4", translateY: "40px"},{ duration: 80 });
  };
});
