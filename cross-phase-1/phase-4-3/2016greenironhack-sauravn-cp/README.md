 # 2016greenironhack-sauravn
 
## FreshVeggie
 
### Description
 
**FreshVeggie** is a web application compatible with both desktop and mobile browsers, that aims to help people to find fresh and cheap vegetables close to their location. The application has facility to check **Weather Details**, and find out nearby **Farmers Market** on Google Maps (`location and distance`) based upon the **ZipCode** you enter. It shows a graphical repersentation of `Location, Freshness, Price, Availability, Open Hours, Customer Reviews`, and also makes a price comparison among different vendors such as: Walmart and Meijer. The application also supports a **Discussion Forum** where users can share their personal experiences about the farmer markets or the vegetables they purchased or some new recipe that they tried, to create a social network among them.<br />
 	
**Unique Feature**<br />
I implemented a unique feature to suggest **"Receipe of the day"** depending upon the fresh vegetables available on that particular day, and also considering the user's 
eating and allergic preferences. Generally, people are confused about the question, "what should we cook today?". *Recipe of the Day* feature will help people to cook a
variety of amazing dishes using fresh vegetables. 
  
### Keywords
  
*Fresh Vegetables, Farmers Market, Freshness Scale, Price Comparison, Map Location, Social, Daliy Recipe* 
 
### Datasets Description
  
1. Climate Data Online (CDO) API
	Link: https://catalog.data.gov/dataset/climate-data-online-cdo
 
	I used Climate Data Online API to pull latest and historical weather information and show it on the Google Maps. I fetch the requried data in real time from the 
	API based upon the user request. Below are the `dataset` and `datatypes` that I am using to pull required information.
	```
	self.availableDatasets = [{id:'GHCND', product:'GHCND_DAILY_FORM'}];
		self.availableDatatypes = ['PRCP','SNOW','TMAX','TMIN','TAVG'];
	```
	`Request URL: http://www.ncdc.noaa.gov/cdo-web/api/v2`
 
2. USDA Farmers Market API
	Link: http://catalog.data.gov/dataset/farmers-markets-2015
 	
	I used USDA Farmers market API to find all the farmers market near your location (based on ZipCode user entered). This data is also fetched in real time based upon the 
	user request.<br />
	`accessURL = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + userZip;`
 	
	I fetched following fields from from this API:
 	```
	'<h1>' + marketName[counter].substring(4) + '</h1>' +
	'<h3>' + results['Address'] + '</h3>' +
	'<p>' + results['Products'].split(';') + '</p>' +
	'<p>' + results['Schedule'] + '</p>' +
 	```
3. Yahoo Weather API
	Link: https://developer.yahoo.com/weather/
 	
	I used Yahoo Weather API to fetch the current data for temperature, wind chill, wind speed and humidity to show it on **Gauge Meters**. 
 	
	`Request URL: https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid = 2434562&format=json&callback=callbackFunction`
 	
	```
	var windy = data.query[select].channel.wind;
	var temp = data.query.results.channel.item.condition;
	var atm =  data.query.results.channel.atmosphere;
	```
 
4. Yummly Recipe API
	https://developer.yummly.com/
 	
	I used Yummly Recipe API to fetch different variety of **Vegetarian** and **Vegan** recipes that also considers allergic preferences. 
 	
	`Request URL: http://api.yummly.com/v1/api/recipes?_app_id=9a82c4a1&_app_key=d750f8a3c48c097b49c0082762f6a0ae`
 	
	```
	info.name = meal.name;
	info.time = meal.totalTime;
	info.rating = meal.rating;
	info.source = meal.source.sourceRecipeUrl;
	info.ingredient = meal.ingredientLines;
	info.image = meal.images[0].hostedLargeUrl;
	```
 
5. Walmart Product Lookup API - Vegetables Prices**
 
 	Link: https://developer.walmartlabs.com/docs
	I got the data fetched from the Walmart API (source code given in: `js/walmart_api.js`). However, as of now, they don't have the prices listed for the vegetables so it didn't 
	help me.
 	
	`Request URL: http://api.walmartlabs.com/v1/items?ids=10449951,47769900&apiKey=x6c5uajw6f37v24zt3hs7s7n`
 
 
### Application Description
     
 Fill in the structued description:
 * Map View:
1. [Y] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example) - **YES**
2. [Y] Markers for location of markets - **YES**
3. [Y] Labels for markets' names - **YES**
4. [Y] InfoWindow to show detail information of a market - **YES**
5. [Y] [describe] Any other cover on the map (for example, cloud cover to show the weather effect) - **YES**
 
Climate Data Online (CDO) API |  USDA Farmers Market API
:----------------------------:|:-------------------------:
![](images/map-1.png)         |  ![](images/map-2.png)
 
* Data Visualization:
1. [Y] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...) - **D3 Radar Chart**
2. [Y] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...) - **YES**
 
![alt tag](images/graph1.png)
 
* Interaction Form:
1. [Y] [List] Any information output? list them. (text field, text area, label, plain HTML ...) **YES**
2. [Y] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...) **YES**
3. [Y] [List] Any information input? List them. (comments, markers, user preference ...) **YES**
4. [Y] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...) **YES**
5. [Y] [List] Interaction with data visualization? List them. (filter, sort, set variables ...) **YES**
 
![alt tag](images/form1.png)
![alt tag](images/form2.png)
 
### Build Case
 
I have developed this application on Ubuntu 14.01 VM with Apache webserver. I have used HTML5/CSS3, Javascript and JQuery, so there are no other dependencies 
involved in deploying this application.
 
### Test Case
 
Tested on Firefox, Chrome and Mobile Browsers (iPhone and Android).
