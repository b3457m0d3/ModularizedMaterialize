define(["jquery"],function($){
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
});
