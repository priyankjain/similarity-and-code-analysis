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
    
var xmlhttp = new XMLHttpRequest();
//var url = "http://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/";
var url = "http://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:47906&startdate="+today+"&enddate="+today ; 
var token = "MVBSOBYURjJUHjDAtDxQUMwPXrwpinxd";    
    
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = (JSON.parse(xmlhttp.responseText)).results;
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.setRequestHeader("token", token);
//xmlhttp.setRequestParams();
xmlhttp.send();

function myFunction(arr) {
    var out = "Its a clear day!";
    if (arr[2].value <3); // Less precipitation
    document.getElementById("isdayclear").innerHTML = out;
}   
   
