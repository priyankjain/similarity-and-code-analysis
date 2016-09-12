	/* Global variable to hold all market/store map markers */
	var Markets = [];
	var Walmarts = [];
	var markers = [];
	var distances = [];
	var scores = [];
	var prices = [];
	var WalmartPrices = [];
	var infoWindows = [];
	var Months = {
		0:'jan',
		1:'feb',
		2:'mar',
		3:'apr',
		4:'may',
		5:'jun',
		6:'jul',
		7:'aug',
		8:'sep',
		9:'oct',
		10:'nov',
		11:'dcm'
	};

	
	/* Function to query database containg produce list, compiled from state.gov webstes of Indiana, Illinois, Ohio. 
	On successful response, the function populates the selection list, where users can select the produce item to
	investigate */
	$(function() {
		$('#div1').html("test: " + $('input:radio[name=food]:checked').val());
		$.ajax({                                      
	        	url: "http://herrod-champ.sensidev.com/api.php",                  //the script to call to get data          
              		type: 'post',
              		datatype: "json",
              		data : {"column":"*",
                  		"table": $('input:radio[name=food]:checked').val(),
                  		"order_by" : "food_name"},
              		success: function(data) {          //on recieve of reply
                		var id;
               	 		var fname;
                		for (x = 0; x < data.length; x++) {
                  			fname = data[x]['food_name'];
                  			$('.selector').append($('<option />').val(data[x]['food_id']).text(data[x]['food_name']));
                		}
                		$('#div1').html("<b>id: </b>"+id+"<b> name: </b>"+fname);
              		},
			aysn:false
            	});
	});


	/* Listener function that queries a produce database.  This function is updates the selction list based on the button
	pressed by the user, either Fruits or Vegetables */
	$("input[name=food]:radio").change(function () {
        	$('#selector5').html("");
		$.ajax({                                      
              		url: "http://herrod-champ.sensidev.com/api.php",                  //the script to call to get data          
              		type: 'post',
              		datatype: "json",
              		data : {"column":"*",
                  		"table": $('input:radio[name=food]:checked').val(),
                  		"order_by" : "food_name"},
              		success: function(data) {          //on recieve of reply
                		var id;
                		var fname;
                		for (x = 0; x < data.length; x++) {
                  			fname = data[x]['food_name'];
                  			$('#selector5').append($('<option />').val(data[x]['food_id']).text(data[x]['food_name']));
                		}
                		$('#div1').html("<b>id: </b>"+id+"<b> name: </b>"+fname);
              		},
			async:false
            	});
		itemListener.change();
	});

	/* Listener function to query database, when user changes from fruits to vegetables in the second item selection input*/	
	$("input[name=food2]:radio").change(function () {
        	$('#selector6').html("");
		$.ajax({                                      
              		url: "http://herrod-champ.sensidev.com/api.php",                  //the script to call to get data          
              		type: 'post',
              		datatype: "json",
              		data : {"column":"*",
                  		"table": $('input:radio[name=food2]:checked').val(),
                  		"order_by" : "food_name"},
              		success: function(data) {          //on recieve of reply
                		var id;
                		var fname;
                		for (x = 0; x < data.length; x++) {
                  			fname = data[x]['food_name'];
                  			$('#selector6').append($('<option />').val(data[x]['food_id']).text(data[x]['food_name']));
                		}
                		$('#div1').html("<b>id: </b>"+id+"<b> name: </b>"+fname);
              		},
			async:false
            	});
	});
	
	/* POST function to query db server containing dataset of farmers markets in the West Lafayette area (A subset taken from Data.gov).
	callBack function called to handle to data response.*/
	function getMarkets() {
		$.post('http://herrod-champ.sensidev.com/api.php', {"column":"*","table":"local_markets"}, function(data){Markets = data; placeMarkers();}); 
	}
	/* callBack function to handle market query response data.  The function creates a google map marker
	for each market result, adds a custom icon, puts the marker on the map, adds marker to the global
	list of markers, and adds a click listener to each marker. */
	function placeMarkers() {
	  var image = {
		url: "site_includes/marker2.png", 
		size: new google.maps.Size(25, 45),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(13,45)
	  }; 
	  for (x = 0; x < Markets.length; x++) {
	    $('.selector2').append($('<option />').val(Markets[x].table_name).text(Markets[x].name));
	    var marker = new google.maps.Marker({
	      position: {lat: Number(Markets[x].lat), lng: Number(Markets[x].lng)},
	      animation: google.maps.Animation.DROP,
	      map: map,
	      icon: image,
	      title: Markets[x].name
	    });
	    marker.value = Markets[x].table_name;
	    Markets[x].marker = marker;
	    markers.push(marker);
		var infoWindow = new google.maps.InfoWindow({
			content: ''
		});
		Markets[x].infoWindow = infoWindow;
	  }
	  getWalmarts();
	};

	/* Function to add info windows to each map marker.
	@param marker - the marker to bind window to
	@param map - the map container the marker
	@param infowindow - window object to show above marker
	@param desription - information to display in window */
	function bindInfoWindow(marker, map, infowindow, description) {
    		marker.addListener('click', function() {
			closeAllInfoWindows();
			var distance = 0;
			var price = 0;
			var freshscore = 0;
			$('#selector1').val(this.value);
			for (i = 0; i < Markets.length; i++) {
				if (this.value == Markets[i].table_name) {
					distance = Markets[i].distancetext;
					price = Markets[i].price;
					freshscore = Markets[i].freshscore;
				}
			}
			for (i = 0; i < Walmarts.length; i++) {
				if (this.title == Walmarts[i].marker.title) {
					distance = Walmarts[i].distancetext;
					price = (Walmarts[i].price == 0) ? "(Not listed)" : Walmarts[i].price;
					freshscore = Walmarts[i].freshscore;
				}
			}
        		infowindow.setContent(description + distance + '<br>Price: $' + price + '<br>Fresh Score: ' + freshscore + '</p></div>');
        		infowindow.open(map, this);
    		});
	}

	/* Closes any and all marker info windows */
	function closeAllInfoWindows() {
		for (i = 0; i < Markets.length; i++) {
			Markets[i].infoWindow.close();
		}
		for (i = 0; i < Walmarts.length; i++) {
			Walmarts[i].infoWindow.close();
		}
	}
	/* Function to query walmart's open api, and retrieve the walmart location in the west lafayette, lafayette area */
	function getWalmarts() {
		$.get('http://herrod-champ.sensidev.com/walmart.php', function(data){
			var patt = new RegExp('4790');
			for (i = 0; i < data.length; i++) {
				if (patt.test(data[i]['zip'])) {
					Walmarts.push(data[i]);
					//Markets.push(data[i]);
					Walmarts[i].count = 1;
					if (i > 0 && Walmarts[i-1]['name'] == Walmarts[i]['name']) {
						Walmarts[i].count = Walmarts[i-1].count + 1;
						Walmarts[i].name += " " + Walmarts[i].count;
					}
				}
			}	
			placeWalmarts();	
		});
	}

	/* Places Warmart markers on map*/
	function placeWalmarts() {
           var image = {
                 url: "site_includes/walmart-icon.png", 
                 size: new google.maps.Size(30,30),
                 origin: new google.maps.Point(0,0),
                 anchor: new google.maps.Point(15,15),
           }; 
           for (x = 0; x < Walmarts.length; x++) {
	     var table_name = (Walmarts[x].name).toLowerCase().replace(/ /g,"_");
	     if (Walmarts[x].count > 1) {
		table_name += "_" + Walmarts[x].count;
	     }
	     Walmarts[x].table_name = table_name;
             $('.selector2').append($('<option />').val(table_name).text(Walmarts[x].name));
	     var marker = new google.maps.Marker({
               position: {lat: Number(Walmarts[x].coordinates[1]), lng: Number(Walmarts[x].coordinates[0])},
               animation: google.maps.Animation.DROP,
               map: map,
               icon: image,
               title: (Walmarts[x].count > 1) ? Walmarts[x].name+" "+Walmarts[x].count : Walmarts[x].name
             });
             marker.value = table_name;
	     Walmarts[x].marker = marker;	//add Walmart locaiton/object to global array
             markers.push(marker);
		var infoWindow = new google.maps.InfoWindow({
			content: ''
		});
		Walmarts[x].infoWindow = infoWindow;
           }
	   getLocation();	//fire location procedure
         };

	/* Target market listener function.
	onChagne -- removes animations from all other markers, re-animates target market icon, and calculate distance to new, target market */
	$('#selector1').change(function() {
	  closeAllInfoWindows();
	  for (i = 0; i < Markets.length; i++) {
	    if (Markets[i].table_name == this.value) {
	      google.maps.event.trigger(Markets[i].marker, 'click');
	      break;
	    }
	  }
	  for (i = 0; i < Walmarts.length; i++) {
	    if (Walmarts[i].table_name == this.value) {
	      google.maps.event.trigger(Walmarts[i].marker, 'click');
	      break;
	    }
	  }
	
	});
	
	/* Target produce item listener function.
	onChange -- calls updateChartPrice*/
	var itemListener = $('#selector5').change(function() {
		closeAllInfoWindows();
         	updateAllPrices(this.value);
		calcFreshness();
		bindAllWindows();
		constructChartData();
		drawRadarChart();
	});

	/* Function to dynamically update radar chart to reflect the price of the target product from the target market*/
	/* INCOMPLETE */
	function updateAllPrices(food_id) {
		for (i = 0; i < Markets.length; i++) {
			$.ajax({
				type: 'POST',
				url: 'http://herrod-champ.sensidev.com/api.php',
				data: {"column":"price","table": Markets[i].table_name, "where" : "produce_id = " + food_id},
				success: function (data) {
					Markets[i].price = data[0]['price'];
					Markets[i].item = $('#selector5 option:selected').text();
				},
				async:false
			});
		}
		for (i = 0; i < Walmarts.length; i++) {
			$.ajax({
				type: 'POST',
				url: 'http://herrod-champ.sensidev.com/api.php',
				data: {"column":"price","table": "walmart_supercenter", "where" : "produce_id = " + food_id},
				success: function (data) {
					Walmarts[i].price = data[0]['price'];
					Walmarts[i].item = $('#selector5 option:selected').text();
				},
				async:false
			});
		}
 	};

	/* Helper function to return a Market object given a table name*/
	function returnMarketByTableName(val) {
		for (i = 0; i < Markets.length; i++) {
			if (Markets[i].table_name == val)
				return Markets[i];
		}
	};

	/* Function to get the User's location*/
	function getLocation() {
    		if (navigator.geolocation) {
   			navigator.geolocation.getCurrentPosition(showPosition, showError);
    		} else { 
        		alert('Geolocation is not supported by this browser.');
    		}
	};

	/* Function to put a marker on google map, representing the user,
	registers a listener to calculate a distance everytime user marker is dragged-and-dropped.
	@param: position -- the geolocation position object returned from navigator*/
	var user_loc;
	function showPosition(position) {
    		var lat = position.coords.latitude; 
    		var lng = position.coords.longitude;
		user_loc = new google.maps.Marker({
                	position: {lat: Number(lat), lng: Number(lng)},
                	animation: google.maps.Animation.DROP,
                	map: map,
                	draggable: true,
			title: "You are here!"
                });
		user_loc.addListener('dragend', calcAllDistances);
		calcAllDistances();
		updateAllPrices($('#selector5').val());
		calcFreshness();
	};

	/* Function calulates the distances from the usesrs location to all listed markets */
	function calcAllDistances() {
		var origin = {lat:user_loc.position.lat(),lng:user_loc.position.lng()};
		var destinations = [];
		for (i = 0; i < Markets.length; i++) {
			destinations.push(
				new google.maps.LatLng(
					Markets[i].marker.position.lat(), Markets[i].marker.position.lng()
			));
		}
		for (i = 0; i < Walmarts.length; i++) {
			destinations.push(
				new google.maps.LatLng(
					Walmarts[i].marker.position.lat(), Walmarts[i].marker.position.lng()
			));
		}
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix( {
			origins: [origin],
			destinations: destinations,
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.IMPERIAL,
    			avoidHighways: false,
    			avoidTolls: false,
		}, callback2);
		
		function callback2(response, status) {
			if (status == google.maps.DistanceMatrixStatus.OK) {
   				var origins = response.originAddresses;
  				var destinations = response.destinationAddresses;

    				for (var i = 0; i < origins.length; i++) {
      					var results = response.rows[i].elements;
      					for (var j = 0; j < results.length; j++) {
        					var element = results[j];
        					var distance = element.distance;
						if (j < Markets.length) {
							Markets[j].distance = distance.value;
							Markets[j].distancetext = distance.text;
						} else {
							Walmarts[j-Markets.length].distance = distance.value;
							Walmarts[j-Markets.length].distancetext = distance.text;
						}
      					}
    				}
				closeAllInfoWindows();		//necessary update functions
				bindAllWindows();
				constructChartData();
				drawRadarChart();
  			}
		}

	};
	
	/* Function to update all marker info windows */
	function bindAllWindows() {
		for (i = 0; i < Markets.length; i++) {
			bindInfoWindow(Markets[i].marker, map, Markets[i].infoWindow, '<div><h5><a href="' + Markets[i].webpage + '">' + Markets[i].name + 
					'</a></h5><h6>' + (Markets[0].item).charAt(0).toUpperCase() + (Markets[0].item).slice(1) + 
					'</h6><p class="lead"> Distance: ');
		}
		for (i = 0; i < Walmarts.length; i++) {
			bindInfoWindow(Walmarts[i].marker, map, Walmarts[i].infoWindow, '<div><h5><a href="www.walmart.com"' + Walmarts[i].name + 
					'</a></h5><h6>' + (Markets[0].item).charAt(0).toUpperCase() + (Markets[0].item).slice(1) +
					 '</h6><p class="lead"> Distance: ');
		}
	}

	/* Function that creates, standardizes, and updates data for the radar chart */
	function constructChartData() {
		chartData = [];
		blobTitles = []
		for (i = 0; i < Markets.length; i++) {
			chartData.push([
				{axis:"Freshness", value: Markets[i].freshscore/5},	//standardize scores on a scale of 5
				{axis:"Cost",value: 1-Markets[i].price/10},		//invert and standardize price on scale of $10
				{axis:"Distance",value: 1-(Markets[i].distance/16100)}	//invert and standardize distance on a scale of 10 miles 
			]);
			blobTitles.push(Markets[i].name);
		}
		for (i = 0; i < Walmarts.length; i++) {
			chartData.push([
				{axis:"Freshness", value: Walmarts[i].freshscore/5},
				{axis:"Cost",value: 1-Walmarts[i].price/10},
				{axis:"Distance",value: 1-(Walmarts[i].distance/16100)}
			]);
			blobTitles.push(Walmarts[i].name);
		}
	};

	/*  Function to query Climate Data Online
	  uses thresholds from: http://extension.cropsciences.illinois.edu/handbook/pdfs/chapter01.pdf
	*/
	function getClimateScore() {
		var URL = 'http://www.ncdc.noaa.gov/cdo-web/api/v2/data?';
		var DATASET = 'GHCNDMS';
		var LOCATIONID = 'FIPS:18';
		var STATION = 'GHCND:USC00129430';
		var MEAN_TEMP = 'MNTM';
		var TOT_PREC = 'TPCP';
		var d = new Date();
		var ENDDATE = '' + d.toISOString().substring(0,10);
		d.setMonth(d.getMonth()-3)
		d.setDate(1);
		var STARTDATE = '' + d.toISOString().substring(0,10);
		var prec_score = 0;
		var temp_score = 0;
		$.ajax({
			type: "GET",
			url: URL,
			data: {	'datasetid':DATASET,
				'locationid':LOCATIONID,
				'startdate':STARTDATE,
				'enddate':ENDDATE,
				'stationid':STATION,
				'datatypeid':TOT_PREC},
			headers: {'token':'cFCGKLrkeIKQAwylahKidnJiptJugIKx'},
			success: function (data) {
				var total = 0;
				for (i = 0; i < data.metadata.resultset.count; i++)
					total += data.results[i].value;
				var prec_diff = Math.abs(3048 - total)/10; 	// Using optimal value of 304.8mm/12in of precipitaion in 3-month period.
				if (prec_diff <= 2.718281828459)
					prec_score = 0;
				else if (prec_diff >= 148.4131591)
					prec_score = 5;
				else
					prec_score = Math.log(prec_diff); 	// Using natural log to put worst-score threshold at a difference of 148.4mm/5.84in per 3-months
			},
			dataType: 'json',
			async:false
		});

		$.ajax({
			type: "GET",
			url: URL,
			data: {	'datasetid':DATASET,
				'locationid':LOCATIONID,
				'startdate':STARTDATE,
				'enddate':ENDDATE,
				'stationid':STATION,
				'datatypeid':MEAN_TEMP},
			headers: {'token':'cFCGKLrkeIKQAwylahKidnJiptJugIKx'},
			success: function (data) {
				var total = 0;
				for (i = 0; i < data.metadata.resultset.count; i++)
					total += data.results[i].value;
				var temp_diff = Math.abs(600 - total)/10;	//absolute value of the difference between optimal and previous temperatures
				if (temp_diff <= 2)
					temp_score = 5;
				else if (temp_diff >= 32)
					temp_score = 0;
				else
					temp_score = Math.log(score)/Math.log(2);	//calculate a temperature history score using log base 2
			},
			dataType: 'json',
			async:false
		});
		return (temp_score+prec_score)/2;

	}

	/* Function to get and calculate a seasonal score for the selected food.
	Seasnoal score is calculated by the proximity to the produce items seasonal harvest */
	function getSeasonScore() {
		var table = "fruits";
		var food_id = $('#selector5').val();
		if (food_id > 18)
			table = "veggies";
		var seasonScore = 0;
		$.ajax({
			type: 'POST',
			url: 'http://herrod-champ.sensidev.com/api.php',
			data: {"column":"*","table": table, "where" : "food_id = " + food_id},
			success: function(data) {
				var d = new Date();
				var month = d.getMonth();
				var scoreScale = "654321123456";	//string oriented to calculate scores based on the current time
				for (i = 0; i < month; i++) {
					scoreScale = scoreScale.charAt(11) + scoreScale.substr(0,11);
				}
				for (i = 0; i < 12; i++) {
					if (data[0][Months[i]] == 'S') {
						seasonScore += Number(scoreScale.charAt(i));
					}
				}
			},
			async:false
		});
		return seasonScore*5/42;
	}

	/* Retrieve user freshness ratings from database */
	function getUserScore(table) {
		var food_id = $('#selector5').val();
		var userScore = 0;
		$.ajax({
			type: 'POST',
			url: 'http://herrod-champ.sensidev.com/api.php',
			data: {"column":"freshness","table": table, "where" : "produce_id = " + food_id},
			success: function(data) {
				userScore = Number(data[0].freshness);
			},
			async:false
		});
		return userScore;
	}

	/* Calculate the fresh score from the climate score, seasonal score, and user freshness rating. Scores are long floats
	That are rounded and stores for each market */
	function calcFreshness() {
		var climateScore = getClimateScore();
		var seasonScore = getSeasonScore();
		for (i = 0; i < Markets.length; i++) {
			var userScore = getUserScore(Markets[i].table_name);
			Markets[i].freshscore = parseFloat(Math.round((climateScore + seasonScore + userScore)/3 * 10) / 10).toFixed(1);
		}
		var freshscore = (climateScore + seasonScore + getUserScore("walmart_supercenter"))/3;
		for (i = 0; i < Walmarts.length; i++)
			Walmarts[i].freshscore = parseFloat(Math.round(freshscore * 10) / 10).toFixed(1);
	}

	/* Function to log an error in the geolocation acquisition process
	mainly used for testing */
	function showError(error) {
    		var position = {"coords":{"latitude": 40.435020, "longitude": -86.905733}};	// Default Marker Position when user location can not be aquired
		showPosition(position)
		switch(error.code) {
        	  case error.PERMISSION_DENIED:
            		console.log('User denied the request for Geolocation.');
            		break;
        	  case error.POSITION_UNAVAILABLE:
            		console.log('Location information is unavailable.');
            		break;
        	  case error.TIMEOUT:
            		console.log('The request to get user location timed out.');
            		break;
        	  case error.UNKNOWN_ERROR:
            		console.log('An unknown error occurred.');
            		break;
    		}
	};

	/* Function to initialize google map */
	function initMap() {
        	map = new google.maps.Map(document.getElementById('map'), {
           	center: {lat: 40.417117, lng: -86.888270},
           		zoom: 12,
	   		mapTypeControl: false,
	  		streetViewControl: false,
	   		zoomControl: true,
	   		draggable: true,
	   		scrollwheel: false,
         	});
	}

	/* Code to detect the device used by the client, 
	   used for determining different site behaviors*/
	function detectmob() { 
       		if( navigator.userAgent.match(/Android/i)
         	 || navigator.userAgent.match(/webOS/i)
         	 || navigator.userAgent.match(/iPhone/i)
	 	 || navigator.userAgent.match(/iPad/i)
	 	 || navigator.userAgent.match(/iPod/i)
	 	 || navigator.userAgent.match(/BlackBerry/i)
	 	 || navigator.userAgent.match(/Windows Phone/i)
	 	) {
	  		return true;
		}  else {
    	  		return false;
  		}
	}

	/* Function to make map stick during scroll */
	function sticky_relocate() {
        	var window_top = $(window).scrollTop();
         	var div_top = $('#map-anchor').offset().top;
	 	if (window_top > div_top && !detectmob()) {
             		$('#map-holder').addClass('stick');
	     		$('#map-holder').width($('#map-column').width());
		} else {
 	        	$('#map-holder').removeClass('stick');
        	}
     	}

	/* Scroll listener function */
 	$(function () {
        	$(window).scroll(sticky_relocate);
         	sticky_relocate();
	});

	/* Radar Chart Code */
	var margin = {top: 60, right: 60, bottom: 60, left: 60},
		width = Math.min(457.5, window.innerWidth - 10) - margin.left - margin.right,
		height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
			
	var chartData = [
		[//Historic Lafayette Farmers Market
			{axis:"Freshness",value:0.8},
			{axis:"Cost",value:0.45},
			{axis:"Distance",value:0.29},
		],[//Purdue Campus Farmers Market
			{axis:"Freshness",value:0.27},
			{axis:"Cost",value:0.9},
			{axis:"Distance",value:0.5},
		],[//West Lafayette Farmers Market
			{axis:"Freshness",value:0.46},
			{axis:"Cost",value:0.10},
			{axis:"Distance",value:0.7},
		]
	];

	// Colors for radar chart blobs
	var color = d3.scale.ordinal().range(["#EDC951","#CC333F","#00A0B0","#E50076","#94E58B","#FFC3A0"]);
				
	// Radar Chart settings
	var radarChartOptions = {
		  w: width,
		  h: height,
		  margin: margin,
		  maxValue: .5,
		  levels: 3,
		  roundStrokes: true,
		  color: color
		};
	
	// Call function to draw the Radar chart
	function drawRadarChart() {
		RadarChart(".radarChart", chartData, radarChartOptions, blobTitles);
	}

	$(document).ready(function (e) {
		getMarkets();
	});
