Readme

Twitter and Food Almanac geographic mapping 

Keywords: fresh groceries, cheap food, farmers market

Description of the datasets and function design

[name] [link] [data type] [data columns used] [data amount] Please provide a name+link+basicInfo to each dataset you have used.
I used the food almanac dataset it is filtered through one of the python scripts I uploaded

I also use a script that loops through the twitter API by geographic location (zipcode) a sample can be found on my github account

[Y/N] Do you use the primary dataset ”online climate data” from data.gov?
	Yes I use it and pull data live for the general lafayette area
[Y/N] [List] Are all these datasets from data.gov? If not, where are they coming from (links)?
No I utilized the twitter API and wrote my own python script to pull from it, It can be found in my github account, however I removed my credentials from the script for privacy reasons. 
https://dev.twitter.com/overview/documentation
Brief Description
The twitter API allowed me to pull tweet text, location, retweet amount, and many other variables that are found in the documenation. 


Use a paragraph to introduce your project.
My project provides two cognisent views that shows where one can find fresh, cheap, famers markets and also another view where one can determine where people are talking about these same keywords in Indiana. 

Map View:

Y Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
	(on a county and zipcode scale)
N Markers for location of markets
N Labels for markets' names
N InfoWindow to show detail information of a market
Y [describe] Any other cover on the map (for example, cloud cover to show the weather effect)
yes incorporates the weather data
Data Visualization: mentioned above and in captions on the viz

Y [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...) visualized lafayette weather conditions (updated live)
Y [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
hover over to view tweet counts as well as to view the food almanac metric. Also there is a rank feature to show how the geolocations rank.
Interaction Form:

N [List] Any information output? list them. (text field, text area, label, plain HTML ...) Not from my viz but multiple outputs from my scripts
Y [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...) I filtered through all the twitter json data as well as the food almanac data. (shown in python scripts)
Y [List] Any information input? List them. (comments, markers, user preference ...) User can filter by state for the food almanac data and can filter by zipcode for the twitter data. 
Y [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
[Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)
can hover over and view data as well as use filter functions.

Build Case How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript? List the dependencies you used, such as python, node.js, etc. List the steps we should follow to build the project. Your project will be built on Amazon Web Service, EC2, ubuntu 14.01 instance
The viz will run independently as the connections are hosted and connected elsewhere.

Test Case Which browsers did you test your project on? Chrome, IE, Edge, Safari, or Firefox?
all work fine. 

Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.

