define(["jquery","Velocity"],function ($,velocity) {
  $.fn.materialbox = function () {
    return this.each(function() {
      if ($(this).hasClass('initialized')) return;
      $(this).addClass('initialized');
      var overlayActive = false, doneAnimating = true, inDuration = 275, outDuration = 200, origin = $(this), placeholder = $('<div></div>').addClass('material-placeholder'), originalWidth = 0, originalHeight = 0;
      origin.wrap(placeholder);
      origin.on('click', function(){
        var placeholder = origin.parent('.material-placeholder'), windowWidth = window.innerWidth, windowHeight = window.innerHeight, originalWidth = origin.width(), originalHeight = origin.height();
        if (doneAnimating === false) {
          returnToOriginal(); return false;
        } else if (overlayActive && doneAnimating===true) {
          returnToOriginal(); return false;
        }
        doneAnimating = false;
        origin.addClass('active');
        overlayActive = true;
        placeholder.css({ width:placeholder[0].getBoundingClientRect().width, height:placeholder[0].getBoundingClientRect().height, position:'relative', top:0, left:0});
        origin.css({position: 'absolute', 'z-index': 1000}).data('width', originalWidth).data('height', originalHeight);
        var overlay = $('<div id="materialbox-overlay"></div>').css({ opacity: 0 }).click(function(){ if (doneAnimating === true) returnToOriginal(); });
        $('body').append(overlay);
        overlay.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'});
        if (origin.data('caption') !== "") {
          var $photo_caption = $('<div class="materialbox-caption"></div>');
          $photo_caption.text(origin.data('caption'));
          $('body').append($photo_caption);
          $photo_caption.css({ "display": "inline" });
          $photo_caption.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'});
        }
        var ratio = 0, widthPercent = originalWidth / windowWidth, heightPercent = originalHeight / windowHeight, newWidth = 0, newHeight = 0;
        if (widthPercent > heightPercent) {
          ratio = originalHeight / originalWidth;
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        } else {
          ratio = originalWidth / originalHeight;
          newWidth = (windowHeight * 0.9) * ratio;
          newHeight = windowHeight * 0.9;
        }
        if(origin.hasClass('responsive-img')) {
          origin.velocity({'max-width': newWidth, 'width': originalWidth}, {duration: 0, queue: false,
            complete: function(){
              origin.css({left: 0, top: 0}).velocity({
                  height: newHeight,width: newWidth,
                  left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
                  top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
                },{duration: inDuration, queue: false, easing: 'easeOutQuad', complete: function(){doneAnimating = true;}});
            }}); // End Velocity
        } else {
          origin.css('left', 0).css('top', 0).velocity({
            height: newHeight, width: newWidth,
            left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
            top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
          },{ duration: inDuration, queue: false, easing: 'easeOutQuad', complete: function(){doneAnimating = true;}}); // End Velocity
        }
      }); // End origin on click
      $(window).scroll(function() { if (overlayActive ) returnToOriginal(); });
      $(document).keyup(function(e) {
        if (e.keyCode === 27 && doneAnimating === true) // ESC key
          if (overlayActive) returnToOriginal();
      });
      function returnToOriginal() {
        doneAnimating = false;
        var placeholder = origin.parent('.material-placeholder'), windowWidth = window.innerWidth, windowHeight = window.innerHeight, originalWidth = origin.data('width'), originalHeight = origin.data('height');
        origin.velocity("stop", true);
        $('#materialbox-overlay').velocity("stop", true);
        $('.materialbox-caption').velocity("stop", true);
        $('#materialbox-overlay').velocity({opacity: 0}, {
          duration: outDuration, // Delay prevents animation overlapping
          queue: false, easing: 'easeOutQuad',complete: function(){
            overlayActive = false;
            $(this).remove();
          }
        });
        origin.velocity({ width: originalWidth, height: originalHeight, left: 0, top: 0 },{ duration: outDuration, queue: false, easing: 'easeOutQuad' });
        $('.materialbox-caption').velocity({opacity: 0}, { duration: outDuration, queue: false, easing: 'easeOutQuad', complete: function(){
            placeholder.css({ height: '', width: '', position: '', top: '', left: '' });
            origin.css({ height: '', top: '', left: '', width: '', 'max-width': '', position: '', 'z-index': '' });
            origin.removeClass('active');
            doneAnimating = true;
            $(this).remove();
          }
        });
      }
    });
  };
});
