function showCircle(market) {

	if (market == 0) {
		var circleSize = 110; 
	    $('#circle1').circleProgress({
	        // value: 0.75,
	        size: circleSize,
	        lineCap: 'round',
	        fill: {
	            gradient: ["white"]
	        }
	    });
	    $('#circle2').circleProgress({
	        // value: 0.75,
	        size: circleSize,
	        lineCap: 'round',
	        fill: {
	            gradient: ["white"]
	        }
	    });

	    $('#circle3').circleProgress({
	        // value: 0.75,
	        size: circleSize,
	        lineCap: 'round',
	        fill: {
	            gradient: ["white"]
	        }
	    });
	    setTimeout(function() { 
	    	$('#circle1').circleProgress('value', 0.95); 
	    	$('#circle2').circleProgress('value', 0.97);
	    	$('#circle3').circleProgress('value', 0.90);
	    }, 500);
	    setTimeout(function() { 
	    	$('#circle1').circleProgress('value', 0.05); 
	    	$('#circle2').circleProgress('value', 0.05);
	    	$('#circle3').circleProgress('value', 0.05);
	    }, 1300);

	} else {
		// console.log(maxDistance);
		// console.log(market.distance);
		$('#circle1').circleProgress('value', 1 - market.distance / maxDistance + 0.01);
		// console.log(market.products.length);
		$('#circle2').circleProgress('value', market.products.length / productsKinds + 0.01);
		console.log(maxDuration);
		console.log(market.duration);
		$('#circle3').circleProgress('value', market.duration / maxDuration + 0.01);

	}


}


