weather();

//request weather data
function weather(){
	var xmlhttp,
		url;

	//get weather condition from Yahoo Weather
	xmlhttp = new XMLHttpRequest();
	url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%2012778445&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    	var myArr,
	    		text,
	    		condition;

	        myArr = xmlhttp.responseText;
	        text = JSON.parse(myArr);
	        console.log(text);
	        console.log(1);

	        //retrieve condition for json
	        condition = text.query.results.channel.item.condition.text;
	        temp = text.query.results.channel.item.condition.temp;

	        //output weather
	        output_weather(condition, temp);
	    }
	};
}

//process weather
function output_weather(condition, temp){
	//pass weather condition to html
	var weather_text = "Today is " + condition + "!";


	$("#card4").html('<CENTER><br><h1 style="font-size: 56px;">' + weather_text + '</h1>' + '<br>' +  '<h2 style="font-size: 78px;">' + temp + "F" + '</h2></CENTER>');
}
