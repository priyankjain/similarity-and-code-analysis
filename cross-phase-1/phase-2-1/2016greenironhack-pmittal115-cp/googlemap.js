/**
Google map information.
**/


//init the google map in the webpage         
function initMap() {

   //alert(timeStamp());
    //variables for map and marks
    var elevator,
        map,
        marker,
        infowindow,
        xmlhttp,
        url = "";

    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.4226506, lng: -86.8843108},
        zoom: 13
    });
    //create a marker at the centre
    marker = new google.maps.Marker({
        position: {lat: 40.4226506, lng: -86.8843108},
        map: map,
        title: 'Lafayette'
    });

    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("Lafayette City");
                            infowindow.open(map, marker);
                        });

}
