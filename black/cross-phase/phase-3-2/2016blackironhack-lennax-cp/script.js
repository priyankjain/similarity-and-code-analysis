 /**
 * [ REDACTED ]
 **/
 
 if (typeof MYAPPLICATION === "undefined") {
     //            panControl: false,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   };
  var map = MyApp.map;

  var input = document.getElementById('destination');

  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setIcon( /** @type {google.maps.Icon} */ ({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });
 };
 
 MyApp.drawGauge = function (risk) {
   // setInterval(function () { // data.setValue(0, 1, 40 + Math.round(60 * Math.random())); // chart.draw(data, options); // }, 13000);  
 };
 
MyApp.drawLadder = function (destcases, incases) {
   "use strict";

   var cause = [
 'Heart disease',
 'Lung cancer',
 
   var breakpoint = 4;
 
  var deathColor = 'rgba(119, 190, 222, 0.95)';
  var deathMarker = {
    color: deathColor,
    line: {
      color: deathColor,
      width: 1,
    },
    symbol: 'circle',
    size: 16
  };

  var caseColor = 'rgba(211, 115, 38, 0.95)';
  var caseMarker = {
    color: caseColor,
    line: {
      color: caseColor,
      width: 1,
    },
    symbol: 'square',
    size: 16
  };

  var caseColorIn = 'rgba(229, 170, 38, 0.95)';
  var caseMarkerIn = {
    color: caseColorIn,
    line: {
      color: caseColorIn,
      width: 1,
    },
    symbol: 'diamond',
    size: 16
  };

  var dummytrace = {
    type: 'scatter',
    x: [0],
    y: [0],
    mode: 'markers',
    name: 'Deaths per 1M in USA',
    marker: deathMarker,
  };

   var smalltrace = {
     type: 'scatter',
     x: rate.slice(breakpoint, rate.length),
     textposition: 'right',
     name: 'Deaths per 1M',
     showlegend: false,
    marker: deathMarker
   };
 
   var largetrace = {
     text: cause.slice(0, breakpoint),
     textposition: 'left',
     name: 'Deaths per 1M in USA',
    showlegend: false,
    marker: deathMarker
   };
 
  //  var gbsCases = 15;
  //  var gbstrace = {
  //    type: 'scatter',
  //    x: [gbsCases],
  //    y: [gbsCases],
  //    //y: ['Guillain-Barré Syndrome'],
  //    text: ['Guillain-Barré Syndrome'],
  //    textposition: 'center',
  //    mode: 'markers',
  //    name: 'Cases per 1M in USA',
  //    //showlegend: false,
  //    marker: caseMarker
  //  };

  var zikatrace = {
     type: 'scatter',
    x: [destcases],
    y: [destcases],
    text: ['Zika Virus'],
     textposition: 'center',
    mode: 'markers',
    name: 'Cases per 1M in state',
     //showlegend: false,
    marker: caseMarker
   };
 
  var zikatrace_in = {
     type: 'scatter',
    x: [incases],
    y: [incases],
    text: ['Zika Virus (IN)'],
     textposition: 'center',
    mode: 'markers',
    name: 'Cases per 1M (IN)',
     //showlegend: false,
    marker: caseMarkerIn
   };
 
  var data = [smalltrace, largetrace,
//              gbstrace,
              zikatrace,
              zikatrace_in,
              dummytrace];
 
   var xtickvals = [0.1, 1, 10, 100, 1000];
   var xticktext = ["1 in 10 million", "1 in 1 million", "1 in 100,000", "1 in 10,000", "1 in 1,000"];
     //    b: 50,
     //    t: 80
     //  },
    showlegend: false,
     legend: {
       orientation: 'h',
     },
    annotations: [
//      {
//        x: Math.log10(gbsCases),
//        y: Math.log10(gbsCases),
//        xref: 'x',
//        yref: 'y',
//        text: 'Guillain-Barré Syndrome',
////        font: {
////          color: caseColor,
////        },
//        bgcolor: 'rgba(255, 255, 255, 0.8)',
//        bordercolor: caseColor,
//        showarrow: true,
//        arrowcolor: 'rgb(67, 67, 67)',
//        arrowhead: 2,
//        ax: 100,
//        ay: 0
//      },
      {
        x: Math.log10(incases),
        y: Math.log10(incases),
        xref: 'x',
        yref: 'y',
        text: 'Zika Virus Syndrome (IN)',
        //        font: {
        //          color: caseColor,
        //        },
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        bordercolor: caseColorIn,
        borderwidth: 2,
        showarrow: true,
        arrowwidth: 2,
        arrowcolor: 'rgb(67, 67, 67)',
        arrowhead: 2,
        ax: 100,
        ay: -10
      },
      {
        x: Math.log10(destcases),
        y: Math.log10(destcases),
        xref: 'x',
        yref: 'y',
        text: 'Zika Virus Syndrome',
        //        font: {
        //          color: caseColor,
        //        },
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        bordercolor: caseColor,
        borderwidth: 2,
        showarrow: true,
        arrowwidth: 2,
        arrowcolor: 'rgb(67, 67, 67)',
        arrowhead: 2,
        ax: 100,
        ay: -10
      }
    ],
     width: 600,
     height: 400,
     paper_bgcolor: 'rgb(254, 247, 234)',
 
   if (MyApp.validData()) {
 
    // Clear result div
    $('#result').text("");
    $('#ladder').text("");

     var destination = $('input[name="destination"]').val();
     //console.log(destination)
 
           county: county,
         },
         function (data) {
          if (data.result.error) {
             $('#result').text("Error: " + data.result.error);
             return 1
           } else {
             $('input[name=destination]').focus().select();
             //alert(data.result);
             //MyApp.drawGauge(data.result.risk);
            console.log(data.result.destrisk);
            console.log(data.result.inrisk);
            MyApp.drawLadder(data.result.destrisk, data.result.inrisk);
             //console.log(data.result.text)
            $('#result').html(data.result.text);
           }
         });
     });
   // Bind button click to submit
   $('input#submit').bind('click', MyApp.submitForm);
 
  // Loading animation code
  $(document).ajaxStart(function () {
    MyApp.disableSubmit();
    $('body').addClass("loading");
    //console.log( "Triggered ajaxStart handler." );
  });
  $(document).ajaxStop(function () {
    $('body').removeClass("loading");
    MyApp.checkSubmit();
    //console.log( "Triggered ajaxStop handler." );
  });

   // Bind enter to submit
