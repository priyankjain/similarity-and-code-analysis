 var input;
 var freshness_by_weather;
 var final_freshness;
var wind_mile, humid;
var gauge1, config1;
 
 function startTime() {
 	// setup clock
 
 function seasonalVeggies() {
 	// get list of seasonal veggies for this month
	var seasonal_veggies = [];
 	var veggies = VEGGIES;
 	for (var key in veggies) {
 		var seasons_of_veggie;
		seasons_of_veggie = veggies[key][0];
 		for (var i = 0; i < seasons_of_veggie.length; i++) {
 			if (seasons_of_veggie[i] == month) {
 				seasonal_veggies.push(key.replace(/_/, " "));
 
 
 function getWeatherDataCallback(result) {
	console.log("current weather: ");
	console.log(result);
 	// get current weather raw
     var wind = result.list[0]["speed"];
    var wind_deg = result.list[0]["deg"];
    var wind_dirc = calculateWindDirectoin(wind_deg);
    wind_mile = Math.floor(wind * 2.237);
    document.getElementById("wind-speed").innerHTML = "<strong>Wind: " + wind_dirc + " " 
    													+ wind_mile + "mile/hr</strong>";
	document.getElementById("wind-speed-sm").innerHTML = "Wind: " + wind_dirc + " " 
    													+ wind_mile + "mile/hr";

     var tmax = result.list[0]["temp"]["max"];
     var tmin = result.list[0]["temp"]["min"];
    var tmorn = Math.floor(result.list[0]["temp"]["morn"] * 1.8 + 32);
    var tnight = Math.floor(result.list[0]["temp"]["night"] * 1.8 + 32);
    humid = result.list[0]["humidity"];
    document.getElementById("humid-text").innerHTML = "<strong>Humidity: " + humid +"%</strong>";
    document.getElementById("humid-text-sm").innerHTML = "Humidity: " + humid +"%";

    document.getElementById("temp-day").innerHTML= tmorn + "&#8457";
    document.getElementById("temp-night").innerHTML= tnight + "&#8457";
    document.getElementById("temp-day-sm").innerHTML= "day: " + tmorn + "&#8457";
    document.getElementById("temp-night-sm").innerHTML= "night: " + tnight + "&#8457";
 
     var weather_condition = result.list[0]["weather"][0];
     var weather_main = weather_condition["main"];
     icon_url = "http://openweathermap.org/img/w/" + weather_icon + ".png";
 
     $("#weather-icon").attr("src", icon_url);
    document.getElementById("current-weather").innerHTML = weather_main;
 
     current_weather_data = {
     	"WIND": wind, 
 
     // extract features
     input = extractFeatures(current_weather_data);
		console.log("prediction: " + freshness_by_weather);
 		
 		// import other extracted features data from datasheet
 		var freshness_by_farmersmarket = DATA_SHEET.FarmersMarket[0][month];
 	});
 }
 
function calculateWindDirectoin(degree) {
	var direction_list = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	var num = Math.floor((degree - 22.5) / 45 + 0.5);
	var direction = direction_list[num];
	return direction
}

function onDocumentReady1() {
	var powerGauge = gauge('#power-gauge1', {
		size: 200,
		clipWidth: 200,
		clipHeight: 130,
		ringWidth: 40,
		maxValue: 60,
		transitionMs: 4000,
	}, '#e60000');
	powerGauge.render();
	
	function updateReadings() {
		powerGauge.update(wind_mile);
	}
	updateReadings();
}

function onDocumentReady2() {
	var powerGauge = gauge('#power-gauge2', {
		size: 200,
		clipWidth: 200,
		clipHeight: 130,
		ringWidth: 40,
		maxValue: 100,
		transitionMs: 4000,
	}, '#178bca');
	powerGauge.render();
	
	function updateReadings() {
		powerGauge.update(humid);
	}
	updateReadings();
}
 
 // api request daily weather predict in great lafayette area
 $.ajax({
 // load decision tree
 var setupTree = loadDecisionTree();
 
// trafic layer on/off
$(document).ready(function() {
	$("#layer-traffic").prop("checked", true);
	$("#layer-traffic").change(function() {
		if ($("#layer-traffic").is(":checked")) {
			trafficLayer.setMap(map);
		} else {
			trafficLayer.setMap(null);
		}
	});
	$("#bar-reset").click(function() {
		$(".bar-graph").css("visibility", "hidden")
		var data = [];
		name_click = [];
		store_info_click = [];
		barGraph(data);
	});
});

if ( !window.isLoaded ) {
	window.addEventListener("load", function() {
		onDocumentReady1();
		onDocumentReady2();
	}, false);
} else {
	onDocumentReady1();
	onDocumentReady2();
}
