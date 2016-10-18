 $(document).ready(function(){
   /* make map height from bottom of nav to bottom of page */
  // var windowHeight = $( window ).height();
  // var navHeight = $(".navbar").height();
  // $("#map").css( "height", windowHeight - navHeight);
 
   /* Print location search from input */
  function handleKeyPress(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that rusn

        alert("Enter was pressed was presses");
    }
  }
   var printSearchInput = function () {
     var value = $("#pac-input").val();
    $("#searchResultText").bindTo(value);
   };
 
   $("#locationSearch").click(printSearchInput);
     }
   });
 
  // datapicker
  $('#datepicker').datepicker();
 })
 
 
 /* Google Maps */
