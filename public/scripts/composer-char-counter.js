var maxLength = 140;
$('textarea').keyup(function() {
  var length = $(this).val().length;
  var length = maxLength-length;
  $('#chars').text(length);
});

//Find text area (inside function)
//When its value cahnges I'm going to update the counter