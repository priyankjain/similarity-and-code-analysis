/*
 * Author: Xuefeng Luo hakunamatatahenry@gmail
 */

function init(map){
	//process title
	init_title();

	//process the weather
	weather();

	//process the time
	time();

	//initialize table header
	init_market_table();

	//request markets online and process to table and map
	markets(map);

	//initialize details div
	init_right();

	init_product();
};

function redraw_map_search(latlng, zip){
	var map;

	map = new google.maps.Map(document.getElementById('map'), {
	  	center: latlng,
	  	zoom: 9
	});

	init_market_table();

	//request markets online and process to table and map
	markets(map, zip);

	//initialize details div
	init_right();

	init_product();
};

function search(){
	var text = document.getElementById("search").value;

	nav_menu("map");

	show_search_result(text);
};

//initialize details 
function init_right(){

	document.getElementById("detail_title").innerHTML = "";
	document.getElementById("detail_text").innerHTML = "";
	document.getElementById("radar").innerHTML = "";



	//add title
	var right_title = add_html_element("h3", "Market Detials");
	right_title.align = "center";
	document.getElementById("detail_title").appendChild(right_title);

	//add message
	var right_contain = add_html_element("p", "Please select one market to view details!");
	document.getElementById("detail_text").appendChild(right_contain);
};

//initialize details 
function init_product(){
	document.getElementById("product_title").innerHTML = "";
	document.getElementById("product_text").innerHTML = "";


	var product_title = add_html_element("h3", "Market Product Detials");
	product_title.align = "center";
	document.getElementById("product_title").appendChild(product_title);

	var product_contain = add_html_element("p", "Please select one market to view details!");
	document.getElementById("product_text").appendChild(product_contain);
};

//click function for nav tab
function nav_menu(id){
	//hide all div
	document.getElementById("map").style.display = "none";
	document.getElementById("markets_table").style.display = "none";
	document.getElementById("product").style.display = "none";

	//show the one
	document.getElementById(id).style.display = "block";
};

//shotcup function to create html element with text node
function add_html_element(type, text){
	//create element
	var new_element = document.createElement(type);

	//create text node
	var new_element_text = document.createTextNode(text);

	//add text node to element
	new_element.appendChild(new_element_text);

	return new_element;
};

//initialize market table header
function init_market_table(){
	document.getElementById("market_details_head").innerHTML = "";
	document.getElementById("market_details_body").innerHTML = "";

	//create tr
	var market_tr = document.createElement("tr");

	//create headers
	var market_id_th = add_html_element("th", "ID");
	var market_name_th = add_html_element("th", "Name");
	var market_address_th = add_html_element("th", "Adress");
	// var market_google_th = add_html_element("th", "Google Link");
	var market_distance_th = add_html_element("th", "Distance");
	var market_detail_th = add_html_element("th", "Details");

	//add headers to tr
	market_tr.appendChild(market_id_th);
	market_tr.appendChild(market_name_th);
	market_tr.appendChild(market_address_th);
	// market_tr.appendChild(market_google_th);
	market_tr.appendChild(market_distance_th);
	market_tr.appendChild(market_detail_th);

	//add tr to table
	document.getElementById("market_details_head").appendChild(market_tr);
};

//score market on distance, freshness, price and variety
function score_distance(distance){
	var score;

	score = 2.5/distance;

	return score;
};

function score_variety(product_num){
	var score;

	score = product_num/60;

	return score;
};

function cal_product_num(products){
	var count;

	var count_1 = (products.match(/;/g) || []).length;

	var count_2 = (products.match(/,/g) || []).length;

	count = count_1 + count_2;

	return count;
};

function show_product_details(raw_products){
	document.getElementById("product_text").innerHTML = "";

	nav_menu("product");

	var products = process_raw_products(raw_products);

	var product_num = products.length;

	if (product_num === 1){
		var product_p = add_html_element("p", "No products available online");
		document.getElementById("product_text").appendChild(product_p);
	}

	var i = 0;

	for (i; i < product_num; i++){
		var product_p = add_html_element("p", products[i]);
		document.getElementById("product_text").appendChild(product_p);


    };


};

function process_raw_products(raw_products){
	var products = [];

	products = raw_products.split(';');

	return products;
};

//show market detail on the right side
function show_market_details(market){
	//clear text area
	document.getElementById("detail_text").innerHTML = "";

	//create name and address
	var name_h4 = add_html_element("h4", market.name);
	var address_p = add_html_element("p", market.address);
	var schedule_p = add_html_element("p", market.schedule);
	var product_p = add_html_element("button", 'View Product Details');
	product_p.className = "btn btn-primary";
	product_p.addEventListener('click', function(){
		show_product_details(market.products);
	}, false);

	var br = document.createElement("br");

	//score market

	//create market data for radar chart
	var market_data = [
		[
			{axis:"Freshness",value:market.score.freshness/100},
			{axis:"Price",value:market.score.price/100},
			{axis:"Variety",value:market.score.variety},
			{axis:"Distance",value:market.score.distance},
		]
	];

	//draw radar chart
	show_market_details_radar(market_data);

	//add name and address
	document.getElementById("detail_text").appendChild(name_h4);
	document.getElementById("detail_text").appendChild(br);
	document.getElementById("detail_text").appendChild(address_p);
	document.getElementById("detail_text").appendChild(schedule_p);
	document.getElementById("detail_text").appendChild(product_p);
};

//draw radar chart with data
//refrence: D3.js
function show_market_details_radar(market_data){
	var margin = {top: 100, right: 100, bottom: 100, left: 100},
	width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
	height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

	var color = d3.scale.ordinal()
	.range(["#EDC951","#CC333F","#00A0B0"]);

	var radarChartOptions = {
	  w: width,
	  h: height,
	  margin: margin,
	  maxValue: 0.5,
	  levels: 5,
	  roundStrokes: true,
	  color: color
	};

	RadarChart(".radarChart", market_data, radarChartOptions);
};

//add market to market table
function market_table(market){
	//create tr
	var market_tr = document.createElement("tr");
	market_tr.className = "active";

	//create td
	var market_id_td = add_html_element("td", market.id);
	var market_name_td = add_html_element("td", market.name);
	var market_address_td = add_html_element("td", market.address);
	// var market_google_td = add_html_element("td", market.googlelink);
	var market_distance_td = add_html_element("td", market.distance);
	var market_detail_td = document.createElement("td");
	var market_detail_td_a = add_html_element("button", "Click");
	market_detail_td_a.className = "btn btn-primary";
	market_detail_td_a.addEventListener('click', function(){
		show_market_details(market);
	}, false);

	//add td
	market_detail_td.appendChild(market_detail_td_a);
	market_tr.appendChild(market_id_td);
	market_tr.appendChild(market_name_td);
	market_tr.appendChild(market_address_td);
	// market_tr.appendChild(market_google_td);
	market_tr.appendChild(market_distance_td);
	market_tr.appendChild(market_detail_td);

	//add tr
	document.getElementById("market_details_body").appendChild(market_tr);
};

//retrieve lat from googlelink in market details
function get_lat(string){
	var index_1 = string.indexOf("q=") + 2;
	var index_2 = string.indexOf("%2C%20");

	var lat = string.substring(index_1, index_2);

	return lat;
};

//retrieve lng from googlelink in market details
function get_lng(string){
	var index_1 = string.indexOf("%2C%20") + 6;
	var index_2 = string.indexOf("%20(");

	var lat = string.substring(index_1, index_2);

	return lat;
};

//process time
function time(){
	//create time now
	var now = new Date();

	//create html object and add to html
	var time_p = add_html_element("p", now);
	document.getElementById("time").appendChild(time_p);
};

//process weather
function output_weather(condition){
	//pass weather condition to html
	var weather_text = "Today is " + condition + "!";
	var weather_p = add_html_element("p", weather_text);

	document.getElementById("weather").innerHTML = "";
	document.getElementById("weather").appendChild(weather_p);
};

//initialize title
function init_title() {
	//clear title
	document.getElementById("title").innerHTML = "";

	//initial title
	var title_h1 = add_html_element("h1", "FFF (Find Fresh Food)");
	var title_p = add_html_element("p", "Find Fresh Food is a website to help people find the freshest and cheapest food in Greater Lafayette Area.");
	document.getElementById("title").appendChild(title_h1);
	document.getElementById("title").appendChild(title_p);
};
