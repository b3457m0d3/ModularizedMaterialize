define(["jquery","Velocity","easing"],function ($,velocity) {
  $.fn.scrollTo = function(elem) {
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
    return this;
  };
  $.fn.dropdown = function (option) {
    var defaults = { inDuration: 300, outDuration: 225, constrain_width: true, hover: false, gutter: 0, belowOrigin: false, alignment: 'left' };
    this.each(function(){
    var origin = $(this), options = $.extend({}, defaults, option), activates = $("#"+ origin.attr('data-activates'));
    function updateOptions() {
      if (origin.data('induration') !== undefined) options.inDuration = origin.data('inDuration');
      if (origin.data('outduration') !== undefined) options.outDuration = origin.data('outDuration');
      if (origin.data('constrainwidth') !== undefined) options.constrain_width = origin.data('constrainwidth');
      if (origin.data('hover') !== undefined) options.hover = origin.data('hover');
      if (origin.data('gutter') !== undefined) options.gutter = origin.data('gutter');
      if (origin.data('beloworigin') !== undefined) options.belowOrigin = origin.data('beloworigin');
      if (origin.data('alignment') !== undefined) options.alignment = origin.data('alignment');
    }
    updateOptions();
    origin.after(activates);
    function placeDropdown() {
      updateOptions();
      activates.addClass('active');
      if (options.constrain_width === true) activates.css('width', origin.outerWidth()); else activates.css('white-space', 'nowrap');
      var offset = 0;
      if (options.belowOrigin === true) offset = origin.height();
      var offsetLeft = origin.offset().left, activatesLeft, width_difference, gutter_spacing;
      if (offsetLeft + activates.innerWidth() > $(window).width()) options.alignment = 'right'; else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) options.alignment = 'left';
      if (options.alignment === 'left') {
        width_difference = 0;
        gutter_spacing = options.gutter;
        activatesLeft = origin.position().left + width_difference + gutter_spacing;
        activates.css({ left: activatesLeft });
      } else if (options.alignment === 'right') {
        var offsetRight = $(window).width() - offsetLeft - origin.innerWidth();
        width_difference = 0;
        gutter_spacing = options.gutter;
        activatesLeft =  ( $(window).width() - origin.position().left - origin.innerWidth() ) + gutter_spacing;
        activates.css({ right: activatesLeft });
      }
      activates.css({position: 'absolute',top: origin.position().top + offset});
      activates.stop(true, true).css('opacity', 0).slideDown({ queue: false, duration: options.inDuration, easing: 'easeOutCubic', complete: function() {
        $(this).css('height', '');
      }}).animate( {opacity: 1}, {queue: false, duration: options.inDuration, easing: 'easeOutSine'});
    }
    function hideDropdown() {
      activates.fadeOut(options.outDuration);
      activates.removeClass('active');
    }
    if (options.hover) {
      var open = false;
      origin.unbind('click.' + origin.attr('id'));
      origin.on('mouseenter', function(e){ // Mouse over
        if (open === false) {
          placeDropdown();
          open = true;
        }
      });
      origin.on('mouseleave', function(e){
        var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
        if(!$(toEl).closest('.dropdown-content').is(activates)) {
          activates.stop(true, true);
          hideDropdown();
          open = false;
        }
      });
      activates.on('mouseleave', function(e){ // Mouse out
        var toEl = e.toElement || e.relatedTarget;
        if(!$(toEl).closest('.dropdown-button').is(origin)) {
          activates.stop(true, true);
          hideDropdown();
          open = false;
        }
      });
    } else {
      origin.unbind('click.' + origin.attr('id'));
      origin.bind('click.'+origin.attr('id'), function(e){
        if ( origin[0] == e.currentTarget && ($(e.target).closest('.dropdown-content').length === 0) ) {
          e.preventDefault(); // Prevents button click from moving window
          placeDropdown();
        } else {
          if (origin.hasClass('active')) {
            hideDropdown();
            $(document).unbind('click.' + activates.attr('id'));
          }
        }
        if (activates.hasClass('active')) {
          $(document).bind('click.'+ activates.attr('id'), function (e) {
            if (!activates.is(e.target) && !origin.is(e.target) && (!origin.find(e.target).length > 0) ) {
              hideDropdown();
              $(document).unbind('click.' + activates.attr('id'));
            }
          });
        }
      });
    } // End else
    origin.on('open', placeDropdown);
    origin.on('close', hideDropdown);
   });
  }; // End dropdown plugin
});
