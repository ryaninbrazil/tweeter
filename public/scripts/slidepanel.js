$(function() {
  // $(function() {
      // $(".compose").slideToggle("slow"); //add this line to hide it initially
      $(".compose").click(function () {
          $(".new-tweet").slideToggle("slow");
              $("#tweet-content").focus();
           
               //append .focus() to focus the text
          ;  
      });
  
  });