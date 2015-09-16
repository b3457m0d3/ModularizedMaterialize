define(["jquery"],function($){
  $(document).on('change', '.file-field input[type="file"]', function () {
    var file_field = $(this).closest('.file-field');
    var path_input = file_field.find('input.file-path');
    var files      = $(this)[0].files;
    var file_names = [];
    for (var i = 0; i < files.length; i++) { file_names.push(files[i].name); }
    path_input.val(file_names.join(", "));
    path_input.trigger('change');
  });
});
