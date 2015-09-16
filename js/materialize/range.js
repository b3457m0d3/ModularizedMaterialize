define(["jquery","Velocity","domReady!"],function($,Velocity,doc){
  var range_type = 'input[type=range]', range_mousedown = false, left;
  $(range_type).each(function () {
    var thumb = $('<span class="thumb"><span class="value"></span></span>');
    $(this).after(thumb);
  });
  var range_wrapper = '.range-field';
  $(doc).on('change', range_type, function(e) {
    var thumb = $(this).siblings('.thumb');
    thumb.find('.value').html($(this).val());
  });
  $(doc).on('input mousedown touchstart', range_type, function(e) {
    var thumb = $(this).siblings('.thumb');
    if (thumb.length <= 0) {
      thumb = $('<span class="thumb"><span class="value"></span></span>');
      $(this).append(thumb);
    }
    thumb.find('.value').html($(this).val());
    range_mousedown = true;
    $(this).addClass('active');
    if (!thumb.hasClass('active')) thumb.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:'easeOutExpo'});
    //left = (e.pageX===undefined || e.pageX===null)? e.originalEvent.touches[0].pageX-$(this).offset().left : e.pageX-$(this).offset().left;//mobile / desktop
    if(e.pageX === undefined || e.pageX === null){//mobile

      left = e.originalEvent.touches[0].pageX - $(this).offset().left;
      //console.log(e.originalEvent);
    } else { // desktop
       left = e.pageX - $(this).offset().left;
    }

    var width = $(this).outerWidth();
    if (left < 0) left = 0; else if (left > width) left = width;
    thumb.addClass('active').css('left', left);
    thumb.find('.value').html($(this).val());
  });
  $(doc).on('mouseup touchend', range_wrapper, function() {
    range_mousedown = false;
    $(this).removeClass('active');
  });
  $(doc).on('mousemove touchmove', range_wrapper, function(e) {
    var thumb = $(this).children('.thumb'), left;
    if (range_mousedown) {
      if (!thumb.hasClass('active')) thumb.velocity({height:'30px',width:'30px',top:'-20px',marginLeft:'-15px'},{duration:300,easing:'easeOutExpo'});
      left = (e.pageX===undefined || e.pageX===null)? e.originalEvent.touches[0].pageX-$(this).offset().left : e.pageX-$(this).offset().left;//mobile or desktop
      var width = $(this).outerWidth();
      if (left < 0) left = 0; else if (left > width) left = width;
      thumb.addClass('active').css('left', left);
      thumb.find('.value').html(thumb.siblings(range_type).val());
    }
  });
  $(doc).on('mouseout touchleave', range_wrapper, function() {
    if (!range_mousedown) {
      var thumb = $(this).children('.thumb');
      if (thumb.hasClass('active')) thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: '-6px'}, { duration: 100 });
      thumb.removeClass('active');
    }
  });
});
