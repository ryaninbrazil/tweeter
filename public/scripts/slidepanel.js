$(function() {
  $(".compose").click(function () {
  $(".new-tweet").slideToggle("slow");
  $("#tweet-content").focus();  
  });
});