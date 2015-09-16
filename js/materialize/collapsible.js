define(["jquery","Velocity","easing"], function ($,velocity) {
  $.fn.collapsible = function(options) {
    var defaults = { accordion: undefined };
    options = $.extend(defaults, options);
    return this.each(function() {
      var $this = $(this), $panel_headers = $(this).find('> li > .collapsible-header'), collapsible_type = $this.data("collapsible");
      $this.off('click.collapse', '.collapsible-header');
      $panel_headers.off('click.collapse');
      function accordionOpen(object) {
        $panel_headers = $this.find('> li > .collapsible-header');
        if (object.hasClass('active')) object.parent().addClass('active'); else object.parent().removeClass('active');
        if (object.parent().hasClass('active')) object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        else object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        $panel_headers.not(object).removeClass('active').parent().removeClass('active');
        $panel_headers.not(object).parent().children('.collapsible-body').stop(true,false).slideUp({ duration: 350,easing: "easeOutQuart",queue: false, complete: function() {
          $(this).css('height', '');
        }});
      }
      function expandableOpen(object) {
        if (object.hasClass('active')) object.parent().addClass('active'); else object.parent().removeClass('active');
        if (object.parent().hasClass('active')) object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
        else object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
      }
      function isChildrenOfPanelHeader(object) {
        var panelHeader = getPanelHeader(object);
        return panelHeader.length > 0;
      }
      function getPanelHeader(object) {
        return object.closest('li > .collapsible-header');
      }
      if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
        $panel_headers = $this.find('> li > .collapsible-header');
        $panel_headers.on('click.collapse', function (e) {
          var element = $(e.target);
          if (isChildrenOfPanelHeader(element)) element = getPanelHeader(element);
          element.toggleClass('active');
          accordionOpen(element);
        });
        accordionOpen($panel_headers.filter('.active').first());
      } else { // Handle Expandables
        $panel_headers.each(function () {
          $(this).on('click.collapse', function (e) {
            var element = $(e.target);
            if (isChildrenOfPanelHeader(element)) element = getPanelHeader(element);
            element.toggleClass('active');
            expandableOpen(element);
          });
          if ($(this).hasClass('active')) expandableOpen($(this));
        });
      }
    });
  };
});
