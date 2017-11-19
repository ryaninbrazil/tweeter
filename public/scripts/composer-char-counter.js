$(function() {
  $('.new-tweet textarea').on('input', function() {
    let length = $(this).val().length;
    if(length > 140) {
      $(this).parent().find('.counter').text(140-length).css('color', 'red');
    } else {
      $(this).parent().find('.counter').text(140-length).css('color', 'black');
    }
  });
});

