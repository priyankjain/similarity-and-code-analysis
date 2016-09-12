


    marker5 = new google.maps.Marker({
        position: {lat: 40.4194781, lng: -86.7357577},
        map: map,
        icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + '4').slice(-2) + '.png',
        title: 'Lafayette'
    });

    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    google.maps.event.addListener(marker5, 'click', function() {
      //location.reload();

        infowindow.setContent("Cooley Family Farm");
                            infowindow.open(map, marker5);
                            $("#sec2").empty();
                            document.getElementById("market-name").innerHTML = "Cooley Family Farm";
                            document.getElementById("street-name").innerHTML = "24 North 900 East, Lafayette, IN 47905";
                            document.getElementById("website").innerHTML = "<a href=\"" + "http://cooleyfamilyfarm.com" + "\">" + "http://cooleyfamilyfarm.com" + "</a>";
                            document.getElementById("open-status").innerHTML = timeStamp();;
                            document.getElementById("btn1").disabled = false;
                            document.getElementById("btn2").disabled = false;

});


    marker6 = new google.maps.Marker({
        position: {lat: 40.3921134, lng: -86.8574059},
        map: map,
        icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + '5').slice(-2) + '.png',
        title: 'Lafayette'
    });

    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    google.maps.event.addListener(marker6, 'click', function() {
      //location.reload();

        infowindow.setContent("Trader Bucks");
                            infowindow.open(map, marker6);
                            $("#sec2").empty();
                            document.getElementById("market-name").innerHTML = "Trader Bucks";
                            document.getElementById("street-name").innerHTML = "2330 Sagamore Pkwy S, Lafayette, IN 47905";
                            document.getElementById("website").innerHTML = "<a href=\"" + "http://traderbucksfleamarkets.com/" + "\">" + "http://traderbucksfleamarkets.com/" + "</a>";
                            document.getElementById("open-status").innerHTML = timeStamp();;
                            document.getElementById("btn1").disabled = false;
                            document.getElementById("btn2").disabled = false;

});


    marker7 = new google.maps.Marker({
        position: {lat: 40.4218258, lng: -86.9072859},
        map: map,
        icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + '6').slice(-2) + '.png',
        title: 'Lafayette'
    });

    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    google.maps.event.addListener(marker7, 'click', function() {
      //location.reload();

        infowindow.setContent("Rubia Flower Market");
                            infowindow.open(map, marker7);
                            $("#sec2").empty();
                            document.getElementById("market-name").innerHTML = "Rubia Flower Market";
                            document.getElementById("street-name").innerHTML = "224 E State St, West Lafayette, IN 47906";
                            document.getElementById("website").innerHTML = "<a href=\"" + "http://www.rubiaflowermarket.com/" + "\">" + "http://www.rubiaflowermarket.com/" + "</a>";
                            document.getElementById("open-status").innerHTML = timeStamp();;
                            document.getElementById("btn1").disabled = false;
                            document.getElementById("btn2").disabled = false;

});


    marker8 = new google.maps.Marker({
        position: {lat: 40.4311229, lng: -86.8741022},
        map: map,
        icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + '7').slice(-2) + '.png',
        title: 'Lafayette'
    });

    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    google.maps.event.addListener(marker8, 'click', function() {
      //location.reload();

        infowindow.setContent("Market Square Shopping Center");
                            infowindow.open(map, marker8);
                            $("#sec2").empty();
                            document.getElementById("market-name").innerHTML = "Market Square Shopping Center";
                            document.getElementById("street-name").innerHTML = "2200 Elmwood Ave, Lafayette, IN 47904";
                            document.getElementById("website").innerHTML = "<a href=\"" + "https://www.facebook.com/marketsquareshoppingcenter" + "\">" + "https://www.facebook.com/marketsquareshoppingcenter" + "</a>";
                            document.getElementById("open-status").innerHTML = timeStamp();;
                            document.getElementById("btn1").disabled = false;
                            document.getElementById("btn2").disabled = false;

});


    marker9 = new google.maps.Marker({
        position: {lat: 40.4539199, lng: -86.9143953},
        map: map,
        icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + '8').slice(-2) + '.png',
        title: 'Lafayette'
    });

    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    google.maps.event.addListener(marker9, 'click', function() {
      //location.reload();

        infowindow.setContent("Sunspot Natural Market");
                            infowindow.open(map, marker9);
                            $("#sec2").empty();
                            document.getElementById("market-name").innerHTML = "Sunspot Natural Market";
                            document.getElementById("street-name").innerHTML = "500 Sagamore Pkwy W, West Lafayette, IN 47906";
                            document.getElementById("website").innerHTML = "<a href=\"" + "http://sunspotnatural.tflmag.com/" + "\">" + "http://sunspotnatural.tflmag.com/" + "</a>";
                            document.getElementById("open-status").innerHTML = timeStamp();;
                            document.getElementById("btn1").disabled = false;
                            document.getElementById("btn2").disabled = false;

});


    marker10 = new google.maps.Marker({
        position: {lat: 40.4522881, lng: -86.9263006},
        map: map,
        icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + '9').slice(-2) + '.png',
        title: 'Lafayette'
    });

    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    google.maps.event.addListener(marker10, 'click', function() {
      //location.reload();

        infowindow.setContent("Asia Market");
                            infowindow.open(map, marker10);
                            $("#sec2").empty();
                            document.getElementById("market-name").innerHTML = "Asia Market";
                            document.getElementById("street-name").innerHTML = "2400 Yeager Rd, West Lafayette, IN 47906";
                            document.getElementById("website").innerHTML = "<a href=\"" + "http://www.asiaorientalmarket.com/" + "\">" + "http://www.asiaorientalmarket.com/" + "</a>";
                            document.getElementById("open-status").innerHTML = timeStamp();;
                            document.getElementById("btn1").disabled = false;
                            document.getElementById("btn2").disabled = false;

});


    marker11 = new google.maps.Marker({
        position: {lat: 40.4190638, lng: -86.8399744},
        map: map,
        icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + '10').slice(-2) + '.png',
        title: 'Lafayette'
    });

    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    google.maps.event.addListener(marker11, 'click', function() {
      //location.reload();

        infowindow.setContent("D & R");
                            infowindow.open(map, marker11);
                            $("#sec2").empty();
                            document.getElementById("market-name").innerHTML = "D & R";
                            document.getElementById("street-name").innerHTML = "105 N Creasy Ln, Lafayette, IN 47905";
                            document.getElementById("website").innerHTML = "<a href=\"" + "http://dandrmarket.net/" + "\">" + "http://dandrmarket.net/" + "</a>";
                            document.getElementById("open-status").innerHTML = timeStamp();;
                            document.getElementById("btn1").disabled = false;
                            document.getElementById("btn2").disabled = false;

});
     //create a new httprequest for this session
     xmlhttp = new XMLHttpRequest();
     //json format data resource url 
