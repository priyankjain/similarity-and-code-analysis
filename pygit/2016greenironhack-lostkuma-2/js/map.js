//init the google map in the webpage         
var map, service, pos, infowindow, directionsDisplay, directionsService;
var store_info_list = new Array;


function initMap() {
    // set a center
    pos = {lat: 40.43, lng: -86.9};
    var center = {lat: 40.425, lng: -86.90};

    //create the google map
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 13
    });

    // set up info window
    infowindow = new google.maps.InfoWindow();

    // set up direction display and service
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay.setMap(map);

    // request a nearby search service
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pos,
        radius: 3500,
        type: 'grocery_or_supermarket'
    }, callback);
}


function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place_id = results[i].place_id;
                getPlaceDetails(place_id);
        }
    }
}


function createMarkerAndDetailedInfo(place, store_info) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    // clikc marker trigger event
    google.maps.event.addListener(marker, 'click', function() {  
        // add place name, if open now, place address, open in map to info window
        google_map_link = '<a target="_blank" href=' + store_info["map_url"] + '>View on Google Maps</a>'
        infowindow.setContent('<div><strong>' + store_info["name"] + '  ' + '(Open now: ' 
            + store_info["if_open_now"] + ')</strong><br>' + store_info["address"] + '<br>' + google_map_link);
        infowindow.open(map, this);
        // replace with store name and detailed info in side menu 
        setSideMenu(store_info);
        // get the route from current position to marker
        calculateAndDisplayRoute(directionsService, directionsDisplay, place);
        // display radar chart
        $(document).ready(function() {
            $(".radar-chart").css('visibility','visible');
        });
    });
}


function getPlaceDetails(place_id) {
    service.getDetails({
        placeId: place_id
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var store_info = {
                place_id: place.place_id, 
                name: place.name, 
                address: place.formatted_address, 
                map_url: place.url, 
                phone: "?", 
                website: "?",
                rating: "?",
                price: "?",
                open_hour: "?",
                if_open_now: "?"
            }  
            if (place.hasOwnProperty("formatted_phone_number")) {
                store_info["phone"] = place.formatted_phone_number;
            } 
            if (place.hasOwnProperty("website")) {
                store_info["website"] = place.website;
            } 
            if (place.hasOwnProperty("rating")) {
                store_info["rating"] = place.rating;
                store_info["user_ratings_total"] = place.user_ratings_total;
            } 
            if (place.hasOwnProperty("price_level")) {
                store_info["price"] = place.price_level;
            }
            if (place.hasOwnProperty("opening_hours")) {
                store_info["open_hour"] = place.opening_hours.weekday_text;
                if(place.opening_hours.open_now == true) {
                    store_info["if_open_now"] = 'Yes'
                } else {
                    store_info["if_open_now"] = 'No'
                }
            }
            // store_info_list.push(store_info);
            // creat marker and set click on marker event 
            // set info window and side menu content for store requested detail
             createMarkerAndDetailedInfo(place, store_info);
        } else {
        console.log('Place details request failed due to ' + status);
        }
    });
}


function calculateAndDisplayRoute(directionsService, directionsDisplay, place, selectedMode) {
    var purdue = {lat: 40.424814, lng: -86.913691};
    directionsService.route({
        origin: purdue,
        destination: place.geometry.location,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
    } else {
        console.log('Directions request failed due to ' + status);
    }
  });
}


function setSideMenu(store_info) {
    // store name
    document.getElementById("store-name").innerHTML = store_info["name"];
    // store tel
    if (store_info["phone"] != "?") {
        document.getElementById("store-phone").innerHTML = store_info["phone"];
    } else {
        document.getElementById("store-phone").innerHTML = "phone number: N/A";        
    }
    // store site
    if (store_info["website"] != "?") {
        document.getElementById("store-website").innerHTML = store_info["website"];
        document.getElementById("store-website").href = store_info["website"]
        document.getElementById("store-website").target = "_blank";
    } else {
        document.getElementById("store-website").innerHTML = "";
        document.getElementById("store-website").href = "";
        ;
    }
    // store today open hours
    var today = new Date();
    var day_of_week = today.getDay() - 1;
    if (day_of_week == -1) {
        day_of_week = 6;
    }
    if (store_info["open_hour"] != "?") {
        document.getElementById("open-hour-today").innerHTML = store_info["open_hour"][day_of_week];
    } else {
        document.getElementById("open-hour-today").innerHTML = "open hour: N/A";
    }
    // store rating
    if (store_info["rating"] != "?") {
        var stars = parseFloat(store_info["rating"]);
        var img = storeRating(stars);
        document.getElementById("store-rating").innerHTML = "Rating:  <img src=" + img + ">";
    } else {
        document.getElementById("store-rating").innerHTML = "rating: N/A";   
    }
}

// need to fix call order
function storeRating(stars) {
    var img;
    if (stars == 5) {
        img = "image/5-star.png"
    } else {
        for (i = 0; i < 5; i += 0.5) {
            if (i <= stars && stars < (i + 0.5)) {
                img = "image/" + i + "-star.png"
            }
        }
    }
    return img;
}

