**Find My Veggies** v1.2.0 - 2016-04-14   
 
 * **Note for chrome users! Firefox and Safari can skip this**  
 	**The page needs to be ran on a local server or real server!**  
 	* Nearby stores will be displayed after centering with drop pin
 	* Click on marker
 		* Info window displays store name, address, link to google map  
		* Side menu tab basic information displays detailed information  
		* Tabs are initialized at Weather, if tabs not at "Basic" or "Compare" when click on markers, it will automatically switch to "Basic" tab  
		* Side menu "Basic" has button "Get Direction", click on button  
 			* displays driving route  
 			* info window displays distance and travel time  
 	
 * Data Visualization  
	* Current traffic condition directly displayed on map  
	* Day and night weather displayed with numbers on images  
	* Wind speed and direction, humidity displayed with gauges  
	* Aster chart with labels for single store's features  
	* Stacked to grouped Bar Graph for three stores comparison  
	* side menu tab 1 - Current weather  
		* show today's day and night temperature  
		* show today's wind speed and direction, and humidity  
	* side menu tab 2 - Basic info
 		* name, phone, website, today's open hour and rating if the store have them  
		* aster chart with overall points and labels for detailed features  
		* hover over aster chart colors show info window with points  
	* side menu tab 3 - Compare stores  
		* compare recent added three stores information with bar chart with labels  
		* reset button to reset the compared data  
		* can choose grouped data or stacked data for better comparison   
	* side menu tab 4 - Seasonal vegetable chart  
 		* seasonal vegetables for this month are displayed  
	* side menu tab 5 - Store directory  
		* The list of search results of stores  
 
 * Interation Form:  
	* Information output: store links and link to google maps, google map place details output, directions, distance, and travel time for each store. Store directory tab to show detailed information    
	* Operation option: switch between different tabs, change store compare display methods. App starts with a cover which can scroll down with animation when clicking on buttons and navigation bar on top, and can scroll back up to home with full pages  
	* Information input: choose which stores information to be displayed and directly out of the map  
	* Interaction with map: turn on/off traffic layers, click on markers, info window displays, get directions  
	* Interaction with data visualization: Hover over the aster chart, detailed info window will display, store directory link to website, change display methods of the bar chart to show either grouped data or stacked data   
 
 **Content**  
 * README.txt  --This file.  
 * image  --A directory contains all images used in the website  
 * css  --A directory contains all css files  
 * js  --A directory contains all the javescript files  
	* Asterchart.js --Function to draw aster chart  
	* barGraph.js --Function to draw bar graph  
	* Gauge.js --Function to draw the gauges  
 	* datasheet.js --Processed data. Everything is scaled to a 1 to 10 scale  
	* jquery.fullPage.js --For the page scrolling effect  
 * data_processing --A directory with all data and data processing scripts used  
 	* decisiontree.py --Python file for process decisiontree using weather data  
 	* processdata.py --Python file for processing and scaling raw data  
 The project only uses HTML/CSS/Javascript. Python was used for data training and transforming, however, the results are printed out and pasted to a javascrpt file to be able to access easier for javascript further calculation.  
 
 **Test**  
The App is test in Chrome, Firefox and Safari. The Geolocation function which request the browser's location has to be ran on a local/real server on Chrome to be able to functioning since Chrome seems to block something. The hover on aster chart function doesn't seem to work on firefox, and firefox does something weird with drawing the chart with d3.  
 
 **Additional information**  
 The decision tree prediction method might not be super well defined, and the dataset for training is probably not big enough for getting a super good result sometimes. Opendata sets data processing, especially the weather data, need to be well understood and defined if to be used in practical application development.  
 
 **^ Please ignore all my random imaginations and complains unless you also go after the reasonings behind things like a mad scientist...**  
 
**Some ideas about the opendata set and goal for this project:**  
So during the process of looking up open datasets online, I found that most of the datasets, at least for those related to agricalture, ecosystem, climate, ocean, business, and consumer are at the state level, some datasets of more specific information will mostly stop at the county level. So in order to make better use of these datasets online, the goal of this kind of project will be better if adjusted to the state level but not too locally defined.... For example, there are very detailed datasets for natrual disasters about on what day and time a disaters happened at a certain location, and we can get very detailed climate, ecosystem, and ocean data. So known the method of prediction (such as machine learning algorithms), one can combine these very detailed information and train a claasifier to predict the likelihood of future disasters. Furthermore, if the algorithm is well-defined, it is not impossible to predict the likelihood of future disasters on a specific date and location <-- However this requires large amount of accurate data.  
So one thing about the goal of the project in the future requires the person who defines the problem space to know more about open datasets, and think what can be actually done with the Climate Data Online sets alone with other datasets out there.  

 I will thank my boyfriend Jason Macnak, a former Purdue graduate and a software engineer at Google, for all the mental supports during this project, as well as teaching me all the basics of programming languages patiently for the past couple months...  
 
 **Contact**  
