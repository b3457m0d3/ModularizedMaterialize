define(["jquery","Hammer","hammerify","velocity","Waves"],function($,Hammer,hammerify,velocity,Waves){
	Materialize = {};
	Materialize.guid = (function() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	  }
	  return function() {
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	  };
	})();
	Materialize.elementOrParentIsFixed = function(element) {
	    var $element = $(element);
	    var $checkElements = $element.add($element.parents());
	    var isFixed = false;
	    $checkElements.each(function(){
	        if ($(this).css("position") === "fixed") {
	            isFixed = true;
	            return false;
	        }
	    });
	    return isFixed;
	};
	Materialize.toast = function (message, displayLength, className, completeCallback) {
	    className = className || "";
	    var container = document.getElementById('toast-container');
	    if (container === null) {
	        container = document.createElement('div');
	        container.id = 'toast-container';
	        document.body.appendChild(container);
	    }
	    var newToast = createToast(message);
	    if(message) container.appendChild(newToast);
	    newToast.style.top = '35px';
	    newToast.style.opacity = 0;
	    velocity(newToast, { "top" : "0px", opacity: 1 }, {duration: 300, easing: 'easeOutCubic', queue: false});
	    var timeLeft = displayLength;
	    var counterInterval = setInterval (function(){
	      if (newToast.parentNode === null) window.clearInterval(counterInterval);
	      if (!newToast.classList.contains('panning')) timeLeft -= 20;
	      if (timeLeft <= 0) {
	        velocity(newToast, {"opacity": 0, marginTop: '-40px'}, { duration: 375, easing: 'easeOutExpo',queue: false, complete: function(){
	            if(typeof(completeCallback) === "function") completeCallback();
	            this[0].parentNode.removeChild(this[0]);
	          }
	        });
	        window.clearInterval(counterInterval);
	      }
	    }, 20);
	    function createToast(html) {
	        var toast = document.createElement('div');
	        toast.classList.add('toast');
	        if (className) {
	            var classes = className.split(' ');
	            for (var i = 0, count = classes.length; i < count; i++) toast.classList.add(classes[i]);
	        }
	        if ( typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName==="string") toast.appendChild(html);
	        else if (html instanceof jQuery) toast.appendChild(html[0]); else toast.innerHTML = html;
	        var hammerHandler = new Hammer(toast, {prevent_default: false});
	        hammerHandler.on('pan', function(e) {
	          var deltaX = e.deltaX, activationDistance = 80;
	          if (!toast.classList.contains('panning')) toast.classList.add('panning');
	          var opacityPercent = 1-Math.abs(deltaX / activationDistance);
	          if (opacityPercent < 0) opacityPercent = 0;
	          velocity(toast, {left: deltaX, opacity: opacityPercent }, {duration: 50, queue: false, easing: 'easeOutQuad'});
	        });
	        hammerHandler.on('panend', function(e) {
	          var deltaX = e.deltaX, activationDistance = 80;
	          if (Math.abs(deltaX) > activationDistance) {
	            velocity(toast, {marginTop: '-40px'}, { duration: 375, easing: 'easeOutExpo', queue: false, complete: function(){
                  if(typeof(completeCallback) === "function") completeCallback();
                  toast.parentNode.removeChild(toast);
                }
	            });
	          } else {
	            toast.classList.remove('panning');
	            velocity(toast, { left: 0, opacity: 1 }, { duration: 300, easing: 'easeOutExpo', queue: false });
	          }
	        });
	        return toast;
	    }
	};
	Materialize.updateTextFields = function() {
		var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
		$(input_selector).each(function(index, element) {
			if ($(element).val().length > 0 || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
				$(this).siblings('label').addClass('active');
			} else $(this).siblings('label, i').removeClass('active');
		});
	};
  Materialize.fadeInImage =  function(selector){
    var element = $(selector);
    element.css({opacity: 0});
    $(element).velocity({opacity: 1}, { duration: 650, queue: false, easing: 'easeOutSine' });
    $(element).velocity({opacity: 1}, { duration: 1300, queue: false, easing: 'swing', step: function(now, fx) {
          fx.start = 100;
          var grayscale_setting = now/100;
          var brightness_setting = 150 - (100 - now)/1.75;
          if (brightness_setting < 100) brightness_setting = 100;
          if (now >= 0) $(this).css({"-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)", "filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"});
	      }
      });
  };
  Materialize.showStaggeredList = function(selector) {
    var time = 0;
    $(selector).find('li').velocity({ translateX: "-100px"},{ duration: 0 });
    $(selector).find('li').each(function() {
      $(this).velocity({ opacity: "1", translateX: "0"},{ duration: 800, delay: time, easing: [60, 10] });
      time += 120;
    });
  };
  Materialize.scrollFire = function(options) {
    var didScroll = false;
    window.addEventListener("scroll", function() {
      didScroll = true;
    });
    setInterval(function() {
      if(didScroll) {
        didScroll = false;
        var windowScroll = window.pageYOffset + window.innerHeight;
        for (var i = 0 ; i < options.length; i++) {
          var value = options[i], selector = value.selector,offset = value.offset,callback = value.callback, currentElement = document.querySelector(selector);
          if ( currentElement !== null) {
            var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;
            if (windowScroll > (elementOffset + offset)) {
              if (value.done !== true) {
                var callbackFunc = new Function(callback);
                callbackFunc();
                value.done = true;
              }
            }
          }
        }
      }
    }, 100);
  };
	Materialize.setup = function(doc){
		var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
		$('input[autofocus]').siblings('label, i').addClass('active');
		$(doc).on('change', input_selector, function () {
			if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) $(this).siblings('label').addClass('active');
			$.validate_field($(this));
		});
		$(doc).ready(function() { Materialize.updateTextFields(); });
		$(doc).on('reset', function(e) {
			var formReset = $(e.target);
			if (formReset.is('form')) {
				formReset.find(input_selector).removeClass('valid').removeClass('invalid');
				formReset.find(input_selector).each(function () {
					if ($(this).attr('value') === '') $(this).siblings('label, i').removeClass('active');
				});
				formReset.find('select.initialized').each(function () {
					var reset_text = formReset.find('option[selected]').text();
					formReset.siblings('input.select-dropdown').val(reset_text);
				});
			}
		});
		$(doc).on('focus', input_selector, function () { $(this).siblings('label, i').addClass('active'); });
		$(doc).on('blur', input_selector, function () {
			var $inputElement = $(this);
			if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) $inputElement.siblings('label, i').removeClass('active');
			if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) $inputElement.siblings('i').removeClass('active');
			$.validate_field($inputElement);
		});
		$.validate_field = function(object) {
			var hasLength = object.attr('length') !== undefined, lenAttr = parseInt(object.attr('length')), len = object.val().length;
			if (object.val().length === 0 && object[0].validity.badInput === false) {
				if (object.hasClass('validate')) {
					object.removeClass('valid');
					object.removeClass('invalid');
				}
			} else {
				if (object.hasClass('validate')) {
					if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
						object.removeClass('invalid');
						object.addClass('valid');
					} else {
						object.removeClass('valid');
						object.addClass('invalid');
					}
				}
			}
		};
		// Textarea Auto Resize
		var hiddenDiv = $('.hiddendiv').first();
		if (!hiddenDiv.length) {
			hiddenDiv = $('<div class="hiddendiv common"></div>');
			$('body').append(hiddenDiv);
		}
		var text_area_selector = '.materialize-textarea';
		function textareaAutoResize($textarea) {
			var fontFamily = $textarea.css('font-family');
			var fontSize = $textarea.css('font-size');
			if (fontSize) { hiddenDiv.css('font-size', fontSize); }
			if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }
			if ($textarea.attr('wrap') === "off") hiddenDiv.css('overflow-wrap', "normal").css('white-space', "pre");
			hiddenDiv.text($textarea.val() + '\n');
			var content = hiddenDiv.html().replace(/\n/g, '<br>');
			hiddenDiv.html(content);
			if ($textarea.is(':visible')) hiddenDiv.css('width', $textarea.width()); else hiddenDiv.css('width', $(window).width()/2);
			$textarea.css('height', hiddenDiv.height());
		}
		$(text_area_selector).each(function () {
			var $textarea = $(this);
			if ($textarea.val().length) textareaAutoResize($textarea);
		});
		$('body').on('keyup keydown autoresize', text_area_selector, function () {
			textareaAutoResize($(this));
		});
		$(doc).on('change', '.file-field input[type="file"]', function () {
			var file_field = $(this).closest('.file-field');
			var path_input = file_field.find('input.file-path');
			var files      = $(this)[0].files;
			var file_names = [];
			for (var i = 0; i < files.length; i++) { file_names.push(files[i].name); }
			path_input.val(file_names.join(", "));
			path_input.trigger('change');
		});
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
			left = (e.pageX===undefined || e.pageX===null)? e.originalEvent.touches[0].pageX-$(this).offset().left : e.pageX-$(this).offset().left;//mobile / desktop
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
		Waves.displayEffect();
	};
	return Materialize;
});
