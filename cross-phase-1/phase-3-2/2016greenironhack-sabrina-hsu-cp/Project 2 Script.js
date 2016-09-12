 		position: place.geometry.location
 	  }));
 	  
	  myLatLng = {lat: 40.417715, lng: -86.891895}
		
	  markers.push(new google.maps.Marker({
		  map: map,
		  icon: icon,
		  title: place.name,
		  position: myLatLng
	  }));
	  
	  myLatLng = {lat: 40.4445, lng:  -86.9136};
	  
	  markers.push(new google.maps.Marker({
		  map: map,
		  icon: icon,
		  title: place.name,
		  position: myLatLng
	  }));
	  
	  myLatLng = {lat: 41.4670736, lng:  -87.0622542};
	  
	  markers.push(new google.maps.Marker({
		  map: map,
		  icon: icon,
		  title: place.name,
		  position: myLatLng
	  }));

 	  if (place.geometry.viewport) {
 		//Only geocodes have viewport.
 		bounds.union(place.geometry.viewport);
