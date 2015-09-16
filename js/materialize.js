define(["jquery","Hammer","hammerify","Velocity","Waves"],function($,Hammer,hammerify,velocity,Waves){
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
	Materialize.Waves = function(){
		Waves.displayEffect();
	};
	return Materialize;
});
