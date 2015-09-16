define(["jquery"],function ($) {
  $(document).on('click.chip', '.chip .material-icons', function (e) {
    $(this).parent().remove();
  });
});
