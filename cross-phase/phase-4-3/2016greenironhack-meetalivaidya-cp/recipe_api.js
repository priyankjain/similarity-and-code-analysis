var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://www.food2fork.com/api/search?key=11e66980c40022acba2969b12d925b42&sort=t",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "d18538df-b136-f1c2-23e6-66364a859a08"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});


/*
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://www.food2fork.com/api/search?key=11e66980c40022acba2969b12d925b42&sort=t");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "bee94542-86a7-a90d-e6eb-36beb599db10");

xhr.send(data);
*/
/*


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear()-1; //data not available for recent dates

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
    console.log(today);
  
var xmlhttp = new XMLHttpRequest();
//var url = "http://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/";
var url = "http://www.food2fork.com/api/search?key=11e66980c40022acba2969b12d925b42&sort=t"; 
//var token = "MVBSOBYURjJUHjDAtDxQUMwPXrwpinxd";    
    
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = (JSON.parse(xmlhttp.responseText)).results;
        console.log(myArr);
        //myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080/app');
//xmlhttp.setRequestParams();
xmlhttp.send();

function myFunction(arr) {
    var out = "Its a clear day!";
    if (arr[2].value <3); // Less precipitation
    document.getElementById("isdayclear").innerHTML = out;
}   
   
   */
