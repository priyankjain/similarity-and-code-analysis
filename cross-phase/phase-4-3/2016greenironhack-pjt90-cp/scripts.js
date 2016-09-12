var map, marker, infowindow, urlzip, url, xmlhttp, zip, latitude, longitude,storage,globalmarker,incaseoferror;
 var disableListener = false;
 
 //initialize map on homepage
     //    marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
     //});
 
    //function clearMarkers() {
    //    console.log("Entered clearMarkers");
    //    google.maps.Map.prototype.markers = new Array();

    //    google.maps.Map.prototype.addMarker = function (marker) {
    //        this.markers[this.markers.length] = marker;
    //    };

    //    google.maps.Map.prototype.getMarkers = function () {
    //        return this.markers
    //    };

    //    google.maps.Map.prototype.clearMarkers = function () {
    //        for (var i = 0; i < this.markers.length; i++) {
    //            this.markers[i].setMap(null);
    //        }
    //        this.markers = new Array();
    //    };
    //}

 

    //Code for placing current location marker on mouse click
     function placeMarker(location) {
         if (disableListener) {
             return;
                 map: map
             });
         }
        //clearMarkers();
         geocodeLatLng(geocoder, map, infowindow);
     }
     google.maps.event.addListener(map, 'click', function (event) {
 
                             function setMarkers(washedData,map)
                             {
                                globalmarker = [];
                                storage = [];
                                storage = washedData;
                                 marketMarker = [];
                                 var marketMarker;
                                 var image = {
                                 //display markers on map
                                 for (var i=0; i<washedData.length;i++)
                                 {
                                    console.log(i);
                                    //disableListener = true;
                                     var market = washedData[i];
                                    //console.log(market);
                                     myLatlng = new google.maps.LatLng(market[4], market[3]);
                                     marketMarker[i] = new google.maps.Marker({
                                         position: myLatlng,
                                         map: map,
                                         icon: image,
                                         shape: shape,
                                        title: market[0],
                                         zIndex: 1
                                     });
                                    marketMarker[i].addListener("click", function (event) {
                                        var lat=0, long=0, counter = 0,title;
                                        title = this.title;
                                        console.log(title);
                                       
                                        for (counter in storage)
                                        {
                                            if(storage[counter][0]==title)
                                            {
                                                console.log(storage);
                                                console.log(storage[counter]);
                                                document.getElementById('market-name').innerHTML = storage[counter][0];
                                                document.getElementById('dates').innerHTML = storage[counter][1];
                                                document.getElementById('hours').innerHTML = storage[counter][2];
                                                document.getElementById('website').innerHTML = storage[counter][6];
                                                document.getElementById('organic').innerHTML = "Organic? - " + storage[counter][5];
                                                document.getElementById('bakedgoods').innerHTML = "Baked Goods? - " + storage[counter][7];
                                                document.getElementById('cheese').innerHTML = "Cheese? - " + storage[counter][8];
                                                document.getElementById('crafts').innerHTML = "Crafts? - " + storage[counter][9];
                                                document.getElementById('flowers').innerHTML = "Flowers? - " + storage[counter][10];
                                                document.getElementById('eggs').innerHTML = "Eggs? - " + storage[counter][11];
                                                document.getElementById('seafood').innerHTML = "Seafood? - " + storage[counter][12];
                                                document.getElementById('herbs').innerHTML = "Herbs? - " + storage[counter][13];
                                                document.getElementById('vegetables').innerHTML = "Vegetables? - " + storage[counter][14];
                                                document.getElementById('honey').innerHTML = "Honey? - " + storage[counter][15];
                                                document.getElementById('jams').innerHTML = "Seafood? - " + storage[counter][16];
                                                document.getElementById('mushrooms').innerHTML = "Mushrooms? - " + storage[counter][17];

                                                break;
 
                                            }
                                            counter++;
                                        }
                                     });
                                    globalmarker = marketMarker;
                                 }
                                //disableListener = false;
 
                                 
                                 //add markers on the map
