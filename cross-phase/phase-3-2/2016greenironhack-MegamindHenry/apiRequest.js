/*
 * Author: Xuefeng Luo hakunamatatahenry@gmail
 */

//request market data
function markets(map, zip = 47906){
	var xmlhttp = new XMLHttpRequest();
	var url = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip;
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = JSON.parse(myArr);

	        //get markets number
	        var markets_num = text.results.length;

	        //process markets data to market objects
	        var i = 0;
	        for (i; i < markets_num; i++){
	        	var num = i + 1;
	        	var market_id = text.results[i].id;
	        	var market_name_distance = text.results[i].marketname;
	        	var name_index = text.results[i].marketname.indexOf(" ");
	        	var market_name = text.results[i].marketname.substring(name_index);
	        	var market_distance = text.results[i].marketname.substring(0, name_index);

	        	//process market table and map
	        	market_details(market_id, market_name, num, market_distance, map);
	        };
	    }
	};
};



//request market details data
function market_details(id, name, num, distance, map){
	var xmlhttp = new XMLHttpRequest();
	var url = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id;
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = JSON.parse(myArr);

	        //get google link in order to retrieve lat and lig
	        var latlngstring = text.marketdetails.GoogleLink;

	        //get lat from google link
	        var lat = get_lat(latlngstring);

	        //get lng from google link
	        var lng = get_lng(latlngstring);

	        var product_num = cal_product_num(text.marketdetails.Products);

	        //create market object
	        var market = {
	        	id:num,
	        	distance:distance,
	        	address:text.marketdetails.Address,
	        	googlelink:text.marketdetails.GoogleLink,
	        	products:text.marketdetails.Products,
	        	schedule:get_schedule(text.marketdetails.Schedule),
	        	name:name,
	        	location:{
	        		lat:parseFloat(lat),
	        		lng:parseFloat(lng),
	        	},
	        	score:{
	        		price:num,
	        		freshness:num,
	        		variety:score_variety(product_num),
	        		distance:score_distance(distance),
	        	},
	        };

	        //add to market table
	        market_table(market);

	        //add new google marker in map
	        new_marker(market.location, map, market);
	    }
	};
};

function get_schedule(raw_schedule){
	var schedule;

	var index = raw_schedule.indexOf(";");

	schedule = raw_schedule.substring(0, index);

	return schedule;
};

//request weather data
function weather(){
	//get weather condition from Yahoo Weather
	var xmlhttp = new XMLHttpRequest();
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%2012778445&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = JSON.parse(myArr);

	        //retrieve condition for json
	        var condition = text.query.results.channel.item.condition.text;

	        //output weather
	        output_weather(condition);
	    }
	};
};

function show_search_result(zip){
	var latlng;

	var xmlhttp = new XMLHttpRequest();
	var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&sensor=false";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = JSON.parse(myArr);

	        latlng = text.results[0].geometry.location;

	        redraw_map_search(latlng, zip);
	    }
	};
};

//reques climate data
function climate(){
	var xmlhttp = new XMLHttpRequest();
	var token = "xuoVwFiQRBuxlUAfZTjwEjwpkHSgZrfh";
	var url = "http://www.ncdc.noaa.gov/cdo-web/api/v2/datasets";
	xmlhttp.open("GET", url, true);
	xmlhttp.setRequestHeader("token", token);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = JSON.parse(myArr);
	    }
	};

};
