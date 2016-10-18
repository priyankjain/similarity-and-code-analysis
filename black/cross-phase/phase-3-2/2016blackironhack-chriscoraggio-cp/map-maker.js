   var map;
   var markers = [];
  var airports = [];
 
   $(document).ready(function(){
       //create the map, import geojson and proportional circles based on population   
         center: new google.maps.LatLng(40.4237, -86.9212),
         mapTypeId: 'roadmap',
       });
      getAirports();
      initDiv();
   })
 
function getAirports(){
  $.getJSON("resources\\airports.json", function(data){
        const airport_data = JSON.parse(data);
        console.log(airport_data);
        for (var i = 0; i < airport_data['airports'].length; i++){
          airports.push(airport_data['airports'][i]);
        }
        console.log(airport_data['airports'][0].lat);
      })
  .fail(function(){
    alert("IT freaking didn't worked!");
  })
  console.log("End")
}

function initDiv(){
  map.data.addListener('click', (function(event){
        //displays the name on click
        alert(event.feature);
         new google.maps.InfoWindow({
          content: "<div id='content'>" + "Testing" + event.feature.getProperty("title") + "</div>",
          position: new google.maps.LatLng(event.feature.getProperty('LATITUDE'), event.feature.getProperty('LONGITUDE'))
        }).open(map)
      }))
}

 
function addPointToMap(point_to_add, title){
  if (typeof title === 'undefined') { title = 'Start/End'; }
   markers.push(new google.maps.Marker({
     position: new google.maps.LatLng(point_to_add.lat, point_to_add.lng),
    map,
    title
   }));
   refitMap();
 }
 
 function refitMap(){
