 
     //create the google map
     map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.4219, lng: -86.9125},
         zoom: 12
     });
     //create a marker at the centre
     marker = new google.maps.Marker({
        position: {lat: 40.4219, lng: -86.9125},
         map: map,
         title: 'Lafayette'
     });
