$(document).ready(function () {
    $('#map').height($(window).height() - 100);
    $.ajax({
        dataType: "json",
        url: 'marketdata.json',
//  data: data,
        success: function (data) {
            createMyMap(data);
        }
    });

    google.charts.load('current', {'packages': ['corechart']});



    /**
     * Function to create a map and place markers on it
     * @param array dataObj
     * @returns void
     */
    function createMyMap(dataObj) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 41.881832, lng: -87.623177},
            zoom: 10
        });

        $.each(dataObj.data, function (index, value) {
            if (index === 'data' || true) {
//            console.log(value, index);
                createMapMarker(value, map);
            }

        });
    }

    /**
     * Function to accept an array and create google map markers along with info windows.
     * @param array dataObj
     * @param google map instance mapObj
     * @returns void
     */
    function createMapMarker(dataObj, mapObj) {
//console.log(lat, lng);
        var myLatLng = {lat: parseFloat(dataObj[18]), lng: parseFloat(dataObj[19])};
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: mapObj,
            title: dataObj[8]
        });
        var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h4>' + dataObj[8] + '</h4>' +
                '<div id="bodyContent">' +
                '<em>' + dataObj[9] + '</em>' +
                '<p>Open on ' + dataObj[10] + 's.<br/>Open from ' + dataObj[11] + ' to ' + dataObj[12] + '</p>' +
                '</div>' +
                '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
            updatePlaceDetails(dataObj);
            updateGraphDetails(dataObj);
        });
    }

    /**
     * Function to display the selected place information once a marker is clicked.
     * @param array placeObj
     * @returns void
     */
    function updatePlaceDetails(placeObj) {
//    console.log(placeObj);
        $('#placeTitle').text(placeObj[8]);
        $('#placeAddress').text(placeObj[9]);
        $('#openDays').text('Open on ' + placeObj[10] + 's');
        $('#openTime').text(placeObj[11] + ' to ' + placeObj[12]);
    }

    /**
     * Function to update charts to represent vendors' details on clicking the marker.
     * @param array graphDetails
     * @returns void
     */
    function updateGraphDetails(graphDetails) {
        var totalHrs = parseInt(graphDetails[12]) - parseInt(graphDetails[11]);
        totalHrs = Math.abs(totalHrs);
//        var totalDays = getTotalDays()
        drawChart(totalHrs, 10);
    }

    /**
     * Function to draw google charts to represent vendor information whose corresponding marker has been clicked.
     * @param float hrs
     * @param float days
     * @returns void
     */
    function drawChart(hrs, days) {

        var data = google.visualization.arrayToDataTable([
            ["Open hrs", "", {role: "style"}],
            ["Open hours", hrs, "#b87333"],
            ["Days", days, "silver"],
        ]);

        var view = new google.visualization.DataView(data);
//    view.setColumns([0, 1,
//        {calc: "stringify",
//            sourceColumn: 1,
//            type: "string",
////            role: "annotation"
//        },
//        2]);

        var options = {
            title: "Stats",
            width: 600,
            height: 400,
            bar: {groupWidth: "30%"},
            legend: {position: "none"},
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
        chart.draw(view, options);
    }
});
