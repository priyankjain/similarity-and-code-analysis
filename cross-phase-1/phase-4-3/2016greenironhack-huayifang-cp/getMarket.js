var lastId = 0;
var oldText = "1 ： West Lafayette Farmers Market";
var maxDistance = 0;
var maxDuration = 0;
var productsKinds = 0;
var Hours = 0;
var openStatus = new Array();
var markets_num = 0;
 
function getResults(map, zip, infowindow) {
     var xmlhttp = new XMLHttpRequest();
     var url = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip;
     xmlhttp.open("GET", url, true);
             var myArr = xmlhttp.responseText;
             var text = JSON.parse(myArr);
             
            // console.log(text);
 			 //get markets number
		markets_num = text.results.length;
 
 		//process markets data to market objects
 		var i = 0;
		var nameList = new Array();

 		for (i; i < markets_num; i++){
 			var num = i + 1,
 				marketId = text.results[i].id,
 				marketName = text.results[i].marketname.substring(nameIndex),
 				marketDistance = text.results[i].marketname.substring(0, nameIndex);
 				
				//show all the markets on the list
				nameList.push(text.results[i].marketname.substring(nameIndex));
				showMarketName(nameList);


 				//mark markets on the map
	        	getMarketDetails(marketId, marketName, num, marketDistance, map, infowindow);	
 		}
		// console.log(nameList);
 
         }
     };
 }
 
function getMarketDetails(id, name, num, distance, map, infowindow) {
 	var xmlhttp = new XMLHttpRequest();
 	var url = "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id;
 	xmlhttp.open("GET", url, true);
 	        //get lng from google link
 	        var lng = get_lng(latlngstring);
 
	        var sche = getSchedule(text.marketdetails.Schedule);

	        var duration = openHours(sche);
	        // console.log(duration);

 	        //create market object
 	        var market = {
 	        	id:num,
 	        	address:text.marketdetails.Address,
 	        	googlelink:text.marketdetails.GoogleLink,
 	        	products:text.marketdetails.Products,
	        	schedule:sche,
 	        	name:name,
	        	duration:duration,
 	        	location:{
 	        		lat:parseFloat(lat),
 	        		lng:parseFloat(lng),
 	        	},
 	        };
 
            if (market.products.length > productsKinds) {
                productsKinds = market.products.length;

            }

            if (market.duration - maxDuration >= 0) {
            	maxDuration = market.duration;
            }
            // console.log(market.schedule);

			if (market.distance - maxDistance >= 0) {
				maxDistance = market.distance;
				// console.log(maxDistance);
			}
			setMarker(market.location, map, market, market.id, infowindow);
 		}
 	};
 }
 
function openHours(schedule) {
	if (schedule == "Unknown") {
		return 0;
	}
	var colonIndex1 = schedule.indexOf(":");
	colonIndex1 = schedule.indexOf(":", colonIndex1 + 1);
	var hafen = schedule.indexOf("-");
	var colonIndex2 = schedule.indexOf(":", hafen);	
	var str = schedule.substring(colonIndex1 - 2, colonIndex1);
	if (str.substring(0, 1) == ":") {
		str = str.substring(1, 2);
	}
	var str2 = schedule.substring(colonIndex2 - 2, colonIndex2).trim();
	if (str2.substring(0, 1) == "-") {
		str2 = str2.substring(1, 2);
	}

	var smallHour = parseInt(str);
	var largeHour = parseInt(str2);
	// console.log(smallHour);

	// console.log(largeHour);


	var hafen = schedule.indexOf("-");
	var isPm = schedule.substring(hafen - 2, hafen);
	if (isPm == "PM" || isPm == "pm") {
		smallHour += 12;
	}
	var length = schedule.length;
	isPm = schedule.substring(length - 2, length);
	if (isPm == "PM" || isPm == "pm") {
		largeHour += 12;
	}
	return largeHour - smallHour;	

}

 //retrieve lat from googlelink in market details
 function get_lat(string){
 	var index_1 = string.indexOf("q=") + 2;
 
 	schedule = raw_schedule.substring(0, index);
 

	if (schedule == "") {
		schedule = "Unknown";
	}

	// console.log(openStatus);

	checkOpen(schedule);
 	return schedule;





}

function findMon(Eng) {
	if (Eng == "April") {
		return 4;
	}
	if (Eng == "May") {
		return 5;
	}	
	if (Eng == "June") {
		return 6;
	}
	if (Eng == "July") {
		return 7;
	}
	if (Eng == "August") {
		return 8;
	}
	if (Eng == "September") {
		return 9;
	}
	if (Eng == "October") {
		return 10;
	}
	if (Eng == "November") {
		return 11;
	}
}

function checkOpen(schedule) {
		if (schedule == "Unknown") {
			openStatus.push(0);
		} else if (schedule.includes("April") || schedule.includes("May") || schedule.includes("June") || schedule.includes("July") || schedule.includes("August") || schedule.includes("September") || schedule.includes("October") || schedule.includes("November")) {
			var dt = new Date();
			var toIndex = schedule.indexOf("to");
			var before = schedule.substring(0, toIndex).trim();
			var afterEnd = schedule.indexOf(" ");
			afterEnd = schedule.indexOf(" ", afterEnd + 1);
			var afterBegin = afterEnd;
			afterEnd = schedule.indexOf(" ", afterEnd + 1);
			var after = schedule.substring(afterBegin + 1, afterEnd);
			var month = parseInt(dt.getMonth());
			if (month <= findMon(after) && month >= findMon(before)) {
				var colonIndex1 = schedule.indexOf(":");
				colonIndex1 = schedule.indexOf(":", colonIndex1 + 1);
				var hafen = schedule.indexOf("-");
				var colonIndex2 = schedule.indexOf(":", hafen);	
				var str = schedule.substring(colonIndex1 - 2, colonIndex1);
				if (str.substring(0, 1) == ":") {
					str = str.substring(1, 2);
				}
				var str2 = schedule.substring(colonIndex2 - 2, colonIndex2).trim();
				if (str2.substring(0, 1) == "-") {
					str2 = str2.substring(1, 2);
 				}
 
				var smallHour = parseInt(str);
				var largeHour = parseInt(str2);
				var smallMin = parseInt(schedule.substring(colonIndex1 + 1, colonIndex1 + 3));
				var largeMin = parseInt(schedule.substring(colonIndex2 + 1, colonIndex2 + 3));


				var date = parseInt(dt.getDate());
				var month = parseInt(dt.getMonth());
				var hour = parseInt(dt.getHours());
				var min = parseInt(dt.getMinutes());
				var day;
				switch (new Date().getDay()) {
				    case 0:
				        day = "Sunday".substring(0, 3);
				        break;
				    case 1:
				        day = "Monday".substring(0, 3);
				        break;
				    case 2:
				        day = "Tuesday".substring(0, 3);
				        break;
				    case 3:
				        day = "Wednesday".substring(0, 3);
				        break;
				    case 4:
				        day = "Thursday".substring(0, 3);
				        break;
				    case 5:
				        day = "Friday".substring(0, 3);
				        break;
				    case  6:
				        day = "Saturday".substring(0, 3);
				        break;
				}
				if (schedule.substring(colonIndex1 - 3, colonIndex1) == day) {
					if (min < largeHour && min > smallHour || ((min == smallHour || min == largeHour) && (min >= smallMin) && (min <= largeMin))) {
						openStatus.push(1);
					} else {
						openStatus.push(0);
					}
				} else {
					openStatus.push(0);
				}


			} else {
				openStatus.push(0);
			}
		} else {
			var dt = new Date();
			var smallMonth = parseInt(schedule.substring(0, 2));
            var smallDate = parseInt(schedule.substring(3, 5));
            var largeMonth = parseInt(schedule.substring(14, 16));
            var largeDate = parseInt(schedule.substring(17, 19));
			var colonIndex1 = schedule.indexOf(":");
			colonIndex1 = schedule.indexOf(":", colonIndex1 + 1);
			var hafen = schedule.indexOf("-");
			var colonIndex2 = schedule.indexOf(":", hafen);	
			var str = schedule.substring(colonIndex1 - 2, colonIndex1);
			if (str.substring(0, 1) == ":") {
				str = str.substring(1, 2);
			}
			var str2 = schedule.substring(colonIndex2 - 2, colonIndex2).trim();
			if (str2.substring(0, 1) == "-") {
				str2 = str2.substring(1, 2);
			}

			var smallHour = parseInt(str);
			var largeHour = parseInt(str2);
			var smallMin = parseInt(schedule.substring(colonIndex1 + 1, colonIndex1 + 3));
			var largeMin = parseInt(schedule.substring(colonIndex2 + 1, colonIndex2 + 3));


			var date = parseInt(dt.getDate());
			var month = parseInt(dt.getMonth());
			var hour = parseInt(dt.getHours());
			var min = parseInt(dt.getMinutes());
			var day;
			switch (new Date().getDay()) {
			    case 0:
			        day = "Sunday".substring(0, 3);
			        break;
			    case 1:
			        day = "Monday".substring(0, 3);
			        break;
			    case 2:
			        day = "Tuesday".substring(0, 3);
			        break;
			    case 3:
			        day = "Wednesday".substring(0, 3);
			        break;
			    case 4:
			        day = "Thursday".substring(0, 3);
			        break;
			    case 5:
			        day = "Friday".substring(0, 3);
			        break;
			    case  6:
			        day = "Saturday".substring(0, 3);
			        break;
			}
			if (month < largeMonth && month > smallMonth || ((month == smallMonth || month == largeMonth) && (date >= smallDate) && (date <= largeDate))) {
				if (schedule.substring(colonIndex1 - 3, colonIndex1) == day) {
					if (min < largeHour && min > smallHour || ((min == smallHour || min == largeHour) && (min >= smallMin) && (min <= largeMin))) {
						openStatus.push(1);
					} else {
						openStatus.push(0);
					}
				} else {
					openStatus.push(0);
				}
			} else {
				openStatus.push(0);
			}
		}
		
}

function setMarker(latlng, map, market, id, infowindow){
 	var marker, count;
 	
 	
 	marker = new google.maps.Marker({
 		position:latlng,
 		map: map,
		icon: 'http://google-maps-icons.googlecode.com/files/green'+ count + '.png',
		animation: google.maps.Animation.DROP,
 	});
 

 		//if another window is open, close it
         if(infowindow) {
             infowindow.close();
         }
 	    //show_market_details(market);
	    infowindow.setContent('<a style=" text-decoration: none; color: #9e9e9e;" href=' + market.googlelink + '><h1 style="font-size: 15px;">' + market.name + '</h1></a>' + 'Address: ' + market.address + '<br>' + 'Open-hours: ' + market.schedule + '<br>');
 	    infowindow.open(map, marker);
        $("#storeList").children().children().eq(lastId).html("<li>" + oldText + "<il>");
        oldText = $("#storeList").children().children().eq(id - 1).text();
        // console.log(marker.googlelink);
        showCircle(market);
        lastId = id - 1;
        $("#storeList").children().children().eq(id - 1).html("<li><b>" + oldText + "</b><il>");



	    //set the menu information about the market
        // document.getElementById("website").innerHTML = "<a href=\"" +  market.link+ "\">" + market.link + "</a>";
        // document.getElementById("open-status").innerHTML = market.schedule;
   	});
 
 	return marker;
 }

