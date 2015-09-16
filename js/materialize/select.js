define(["jquery"],function($){
  // Select Plugin
  $.fn.material_select = function (callback) {
    $(this).each(function(){
      $select = $(this);
      if ( $select.hasClass('browser-default')) return; // Continue to next (return false breaks out of entire loop)
      var lastID = $select.data('select-id');
      if (lastID) {
        $select.parent().find('span.caret').remove();
        $select.parent().find('input').remove();
        $select.unwrap();
        $('ul#select-options-'+lastID).remove();
      }
      if(callback === 'destroy') {
          $select.data('select-id', null).removeClass('initialized');
          return;
      }
      var uniqueID = Materialize.guid();
      $select.data('select-id', uniqueID);
      var wrapper = $('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr('class'));
      var options = $('<ul id="select-options-' + uniqueID+'" class="dropdown-content select-dropdown"></ul>');
      var selectOptions = $select.children('option');
      var label;
      if ($select.find('option:selected') !== undefined) label = $select.find('option:selected'); else label = options.first();
      selectOptions.each(function () {
        options.append($('<li class="' + (($(this).is(':disabled')) ? 'disabled' : '') + '"><span>' + $(this).html() + '</span></li>'));
      });
      options.find('li').each(function (i) {
        var $curr_select = $select;
        $(this).click(function () {
          if (!$(this).hasClass('disabled')) {
            $curr_select.find('option').eq(i).prop('selected', true);
            $curr_select.trigger('change');
            $curr_select.siblings('input.select-dropdown').val($(this).text());
            if (typeof callback !== 'undefined') callback();
          }
        });
      });
      $select.wrap(wrapper);
      var dropdownIcon = $('<span class="caret">&#9660;</span>');
      if ( $select.is(':disabled') ) dropdownIcon.addClass('disabled');
      var sanitizedLabelHtml = label.html().replace(/"/g, '&quot;');
      var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID +'" value="'+ sanitizedLabelHtml +'"/>');
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);
      $('body').append(options);
      if (!$select.is(':disabled')) $newSelect.dropdown({"hover": false});
      if ($select.attr('tabindex')) $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
      $select.addClass('initialized');
      $newSelect.on('focus', function(){
        $(this).trigger('open');
        label = $(this).val();
        selectedOption = options.find('li').filter(function() {
          return $(this).text().toLowerCase() === label.toLowerCase();
        })[0];
        activateOption(options, selectedOption);
      });
      $newSelect.on('blur', function(){
        $(this).trigger('close');
      });
      activateOption = function(collection, newOption) {
        collection.find('li.active').removeClass('active');
        $(newOption).addClass('active');
        collection.scrollTo(newOption);
      };
      filterQuery = [];
      onKeyDown = function(event){
        if(event.which == 9){
          $newSelect.trigger('close');
          return;
        }
        if(event.which == 40 && !options.is(":visible")){
          $newSelect.trigger('open');
          return;
        }
        if(event.which == 13 && !options.is(":visible")) return;
        event.preventDefault();
        letter = String.fromCharCode(event.which).toLowerCase();
        var nonLetters = [9,13,27,38,40];
        if (letter && (nonLetters.indexOf(event.which) === -1)){
          filterQuery.push(letter);
          string = filterQuery.join("");
          newOption = options.find('li').filter(function() {
            return $(this).text().toLowerCase().indexOf(string) === 0;
          })[0];
          if(newOption) activateOption(options, newOption);
        }
        if(event.which == 13){
          activeOption = options.find('li.active:not(.disabled)')[0];
          if(activeOption){
            $(activeOption).trigger('click');
            $newSelect.trigger('close');
          }
        }
        if(event.which == 40){
          newOption = options.find('li.active').next('li:not(.disabled)')[0];
          if(newOption) activateOption(options, newOption);
        }
        if(event.which == 27) $newSelect.trigger('close');
        if(event.which == 38){
          newOption = options.find('li.active').prev('li:not(.disabled)')[0];
          if(newOption) activateOption(options, newOption);
        }
        setTimeout(function(){ filterQuery = []; }, 1000);
      };
      $newSelect.on('keydown', onKeyDown);
    });
  };
});
