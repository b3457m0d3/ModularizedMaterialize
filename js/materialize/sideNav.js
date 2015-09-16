define(["jquery","Velocity"], function ($,velocity) {

  var methods = {
    init : function(options) {
      var defaults = {
        menuWidth: 240,
        edge: 'left',
        closeOnClick: false
      };
      options = $.extend(defaults, options);
      $(this).each(function(){
        var $this = $(this);
        var menu_id = $("#"+ $this.attr('data-activates'));
        if (options.menuWidth != 240) {
          menu_id.css('width', options.menuWidth);
        }
        var dragTarget = $('<div class="drag-target"></div>');
        $('body').append(dragTarget);
        if (options.edge == 'left') {
          menu_id.css('left', -1 * (options.menuWidth + 10));
          dragTarget.css({'left': 0}); // Add Touch Area
        } else {
          menu_id.addClass('right-aligned') // Change text-alignment to right
            .css('right', -1 * (options.menuWidth + 10))
            .css('left', '');
          dragTarget.css({'right': 0}); // Add Touch Area
        }
        if (menu_id.hasClass('fixed')) {
            if (window.innerWidth > 992) menu_id.css('left', 0);
        }
        if (menu_id.hasClass('fixed')) {
          $(window).resize( function() {
            if (window.innerWidth > 992) {
              if ($('#sidenav-overlay').css('opacity') !== 0 && menuOut) {
                removeMenu(true);
              } else {
                menu_id.removeAttr('style');
                menu_id.css('width', options.menuWidth);
              }
            } else if (menuOut === false){
              if (options.edge === 'left') menu_id.css('left', -1 * (options.menuWidth + 10));
              else menu_id.css('right', -1 * (options.menuWidth + 10));
            }
          });
        }
        if (options.closeOnClick === true) {
          menu_id.on("click.itemclick", "a:not(.collapsible-header)", function(){
            removeMenu();
          });
        }
        function removeMenu(restoreNav) {
          panning = false;
          menuOut = false;
          $('body').css('overflow', '');
          $('#sidenav-overlay').velocity({opacity: 0}, {duration: 200, queue: false, easing: 'easeOutQuad',
            complete: function() {
              $(this).remove();
            } });
          if (options.edge === 'left') {
            dragTarget.css({width: '', right: '', left: '0'});
            menu_id.velocity(
              {left: -1 * (options.menuWidth + 10)},
              { duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function() {
                  if (restoreNav === true) {
                    menu_id.removeAttr('style');
                    menu_id.css('width', options.menuWidth);
                  }
                }

            });
          } else {
            dragTarget.css({width: '', right: '0', left: ''});
            menu_id.velocity(
              {right: -1 * (options.menuWidth + 10)},
              { duration: 200,
                queue: false,
                easing: 'easeOutCubic',
                complete: function() {
                  if (restoreNav === true) {
                    menu_id.removeAttr('style');
                    menu_id.css('width', options.menuWidth);
                  }
                }
              });
          }
        }
        var panning = false;
        var menuOut = false;
        dragTarget.on('click', function(){
          removeMenu();
        });
        dragTarget.hammer({
          prevent_default: false
        }).bind('pan', function(e) {
          if (e.gesture.pointerType == "touch") {
            var direction = e.gesture.direction;
            var x = e.gesture.center.x;
            var y = e.gesture.center.y;
            var velocityX = e.gesture.velocityX;
            $('body').css('overflow', 'hidden');
            if ($('#sidenav-overlay').length === 0) {
              var overlay = $('<div id="sidenav-overlay"></div>');
              overlay.css('opacity', 0).click( function(){
                removeMenu();
              });
              $('body').append(overlay);
            }
            if (options.edge === 'left') {
              if (x > options.menuWidth) { x = options.menuWidth; }
              else if (x < 0) { x = 0; }
            }
            if (options.edge === 'left') {
              if (x < (options.menuWidth / 2)) { menuOut = false; }
              else if (x >= (options.menuWidth / 2)) { menuOut = true; }
              menu_id.css('left', (x - options.menuWidth));
            } else {
              if (x < (window.innerWidth - options.menuWidth / 2)) menuOut = true;
              else if (x >= (window.innerWidth - options.menuWidth / 2)) menuOut = false;
              var rightPos = -1 *(x - options.menuWidth / 2);
              if (rightPos > 0) rightPos = 0;
              menu_id.css('right', rightPos);
            }
            var overlayPerc;
            if (options.edge === 'left') {
              overlayPerc = x / options.menuWidth;
              $('#sidenav-overlay').velocity({opacity: overlayPerc }, {duration: 50, queue: false, easing: 'easeOutQuad'});
            } else {
              overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
              $('#sidenav-overlay').velocity({opacity: overlayPerc }, {duration: 50, queue: false, easing: 'easeOutQuad'});
            }
          }
        }).bind('panend', function(e) {
          if (e.gesture.pointerType == "touch") {
            var velocityX = e.gesture.velocityX;
            panning = false;
            if (options.edge === 'left') {
              if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
                menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
                dragTarget.css({width: '50%', right: 0, left: ''});
              } else if (!menuOut || velocityX > 0.3) {
                $('body').css('overflow', '');
                menu_id.velocity({left: -1 * (options.menuWidth + 10)}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
                  complete: function () {
                    $(this).remove();
                  }});
                dragTarget.css({width: '10px', right: '', left: 0});
              }
            } else {
              if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
                menu_id.velocity({right: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
                dragTarget.css({width: '50%', right: '', left: 0});
              } else if (!menuOut || velocityX < -0.3) {
                $('body').css('overflow', '');
                menu_id.velocity({right: -1 * (options.menuWidth + 10)}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
                  complete: function () {
                    $(this).remove();
                  }});
                dragTarget.css({width: '10px', right: 0, left: ''});
              }
            }
          }
        });
          $this.click(function() {
            if (menuOut === true) {
              menuOut = false;
              panning = false;
              removeMenu();
            } else {
              $('body').css('overflow', 'hidden');
              $('body').append(dragTarget);
              if (options.edge === 'left') {
                dragTarget.css({width: '50%', right: 0, left: ''});
                menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
              } else {
                dragTarget.css({width: '50%', right: '', left: 0});
                menu_id.velocity({right: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                menu_id.css('left','');
              }
              var overlay = $('<div id="sidenav-overlay"></div>');
              overlay.css('opacity', 0).click(function(){
                menuOut = false;
                panning = false;
                removeMenu();
                overlay.velocity({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',
                  complete: function() {
                    $(this).remove();
                  } });
              });
              $('body').append(overlay);
              overlay.velocity({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad',
                complete: function () {
                  menuOut = true;
                  panning = false;
                }
              });
            }
            return false;
          });
      });
    },
    show : function() {
      this.trigger('click');
    },
    hide : function() {
      $('#sidenav-overlay').trigger('click');
    }
  };
  $.fn.sideNav = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      return methods.init.apply( this, arguments );
    } else $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.sideNav' );
  }; // Plugin end
});
