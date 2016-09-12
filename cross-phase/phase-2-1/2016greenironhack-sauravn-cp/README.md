 # 2016greenironhack-sauravn
 
## Submission - 2

1. Modified the UI of the application. I used **Bootstrap CSS** `bootstrap.min.css` to develop a responsive design so that it will work for both desktop & mobile browsers.

2. Completed the task of fetching data from web API of Climate Data, and integrated it with Google Maps.

	1. Fetched data from Climate Online Data using their Web API on Ubuntu 14.04 VM. I used web API from 
	http://www.ncdc.noaa.gov/cdo-web/webservices/v2 to access this data, and generated a *Access Token* from 
	https://www.ncdc.noaa.gov/cdo-web/token.
	
	2. All the code related to fetching data from API, and showing it on Google Maps is available in `script_api.js`
	and `style_api.css`

3. To Navigate the Application
	
	1. On the home page you can see a search bar where you can type the city for which you want to fetch the climate
	data.

	2. Once you type any location and press enter, the Google Map will show all the locations fetch from the climate
	data API.

	3. Click on any one of the markers (locations), and you will see the detailed climate information for that 
	location. This information contains: *Location, name, PRCP, SNOW, TMax, TMin*.
	
	4. On the left side of the search bar there is a configuration button which has option to configure the 
	scale for temperature (C / F) and precipitation (mm / inch).

	5. On the right side of the search bar I have a Date Picker so that you can fetch data from any date, month and 
	year.

4. 	I also tried NodeJS scripts fetch the climate data and store it in json files, which I can use further to 
	combine with other datasets (when required). These NodeJS scripts are in `fetch_api_data` directory that are used to fetch a collection of locations and get the most recent (or specified by year) yearly climate data available. 

	1. **Prerequisites**: Download and install node.js (including npm) from: http://nodejs.org/.	Run this command after download this project from github: `$ npm install`. 
  			  	
 	2. Download list of all locations. Run this command: `$ nodejs getLocations.js`. Result of all the locations (cities) will be stored in a JSON file: CITIES.json.
  	
  	3. Fetch most recent data for required locations. From *CITIES.json file* I created another file *CITIES_ihack.json* which has location only for the state of Indiana, US and Chicago.		
  	```	
 	$ node app.js --dataset GHCNDMS --datatype MNTM --locations 'CITIES_ihack.json'  --probingStopYear 2010 --offset 0 --count 14	
  	```	
  	After executing this command, output json file will be stored in ./data.

5. Work in Progress

	1. Working on a Gauge meter to show the climate details of the selected location. Currently, it is showing random
	numbers.
	2. Working to fetch data from farmer's market and walmart to get the fresh vegetable stats and price comparison.
	3. Working on Bullet Chart to show the *Freshness Scale, Price Comparison, Location, Social, Daliy Recipe*.
	4. Finally, working on an innovative way to show **Receipe-of-the-Day** based on the available fresh vegetables.

-----------------------------------------------

## Submission - 1

 This is a Readme file for first submission (Phase-1). I have writen a brief description of application below, and list of features I am planning to implement. I have also
 included an wireframe diagram of the application that describes the user interface of the application. Currently, this readme file is a high-level document, however, 
 I will keep updating this document with fine details as I progress further with my coding, and/or in case of any modification in the feature list. 
  
  **NOTE**: *I am still working on fetching the data types, data columns and data size*
 
    I have used NodeJS to access the Climate Online Data.
 
    **Note**: *I have planned to prepare a **Docker File** so that the application will run inside a Linux Container, and can be easily installed on any Linux machine.*
 
 6. Test Case
 
	Checked on Firefox and Chrome
