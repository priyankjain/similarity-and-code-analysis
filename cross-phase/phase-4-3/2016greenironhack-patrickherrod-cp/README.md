 # 2016greenironhack-patrickherrod
Readme Introduction	v. 2.0
 ```
1. Pro-Compare
 
2. Keywords: freshness, price, travel distane, user input, google maps, radar chart
 
 3. Datasets:
 	
 	Indiana (purdue): https://extension.purdue.edu/foodlink/foods.php?category=2&sort=asc
 	Illinois: https://www.agr.state.il.us/wherefreshis/whatsinseason.pdf
 	Ohio: https://ofbf.org/whats-in-season/
	Given the difficulty with web-scraping javascript pages, this application queries a database
	composed of manual entries. dbInfo.sql contains data tables and record information.
	These data sources provide sets of produce grown in the midwest climate region,
	and each item's seasonal months. This seasonal dataset is used as part of produce freshness calculations.
 
	Yes, Climate Data Online is used by this application to provide a 3 month history of temperature and rainfall
	in the West Lafayette area. Temperature and rainfall are used as part of the produce freshness calculations

	Found a dataset on data.gov listing all of the farmers marekts in the United States.  Given the scope of
	this app, that set was narrowed to the west lafayette area.
 
 	The first data set is not a data.gov set, but the compiled data from each state government site.
 
4. Pro-Compare is an application for local produce customers to use immediately before or while shopping.
A user will have the ability to select produce items and get their freshness scores, the price of the 
product at a large vendor (Walmart), and the travel distance to markets and large vendors.  User's will
use the app to aide produce comparisons between markets.
 
 	Map View:
	a. Map view is of West Lafayette and Lafayette area.
	b. Y, markers indicating market location
	c. Y, labels for market names
	d. Y, infowindow popup to show market details and item specific values
 	e. N
 
 	Data Visualization:
	a. Y, the application uses a three axis radar graph: freshness, cost, distance.
	b. Y, markers are clickable to display market specific data.  The radar charts has blobs
	      that are hoverable.  Mouseover will display the market each blob represents.
 	
 	Interaction Form:
	a. Y, there is a drop down menu populated with the produce items compiled from the state governament site.
	b. Y, the user will first choose friuts or vegetables, then choose an item. This allows shorter lists of items to choose from.
	c. Y, the user can input new markets, new items, and item freshness ratings.
	d. Y, when users select a different produce item, infowindows are updated with market and item specific details.  Users
	      can drag the marker that represent their location to calculate distances from other locations. Marker infowindows
	      and radar chart is automatically updated with new distances. Users can also click on the market names in the infowindow
	      to be directed to the market webpage.
	e. Y, users can influnce the radar chart by selecting different produce items, and by dragging the marker that represents
	      their location. 

5. To build this application, code just needs to be copied to web server.

6. Tested with: Chrome, Safari, IE
 
7. Known issues:
	1.  When testing on Safari, the blob hover market names do not appear in a readable form.
	2.  User input is not functional - only a representation.  More thought is needed to design
	    a strategy to vet user supplied information, and how to handle that information.
	3.  Local market data was provided by a random number generator to help portray the functionality.
	    There are no online data sources available for local markets.
	4.  Walmart data was not unique between the different locations. As a result, Walmart blobs highly overlap
	    due to identical cost and fresh score data points.
	5.  If a user sets their location farther than 10 miles the distance scale is skewed and radar chart is out of proportion.
 
Future features:
	1.  Added vendors, for example: Payless, Aldi, Meijer.
	2.  Increased scope. Ability to use application in many locations - Chicago, Indianapolis, anywhere.
	3.  A shopping list.  Users can mark an item, and that item's location, distance, price, and freshness score are saved.
	    The list would provide an easier consolidated list of items, at the interest of the user.
 	 
