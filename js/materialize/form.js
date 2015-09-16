define(["jquery","Materialize"],function($,Materialize){
  var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
  $('input[autofocus]').siblings('label, i').addClass('active');
  $(document).on('change', input_selector, function () {
    if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) $(this).siblings('label').addClass('active');
    $.validate_field($(this));
  });
  Materialize.updateTextFields(); 
  $(document).on('reset', function(e) {
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
  $(document).on('focus', input_selector, function () { $(this).siblings('label, i').addClass('active'); });
  $(document).on('blur', input_selector, function () {
    var $inputElement = $(this);
    if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) $inputElement.siblings('label, i').removeClass('active');
    if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) $inputElement.siblings('i').removeClass('active');
    $.validate_field($inputElement);
  });
  $.validate_field = function(object) {
    var hasLength = object.attr('length') !== undefined, lenAttr = parseInt(object.attr('length')), len = object.val().length;
    if (object.val().length === 0 && object[0].validity.badInput === false) {
      if (object.hasClass('validate')) object.removeClass('valid').removeClass('invalid');
    } else {
      if (object.hasClass('validate')) {
        if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) object.removeClass('invalid').addClass('valid');
        else object.removeClass('valid').addClass('invalid');
      }
    }
  };

});
