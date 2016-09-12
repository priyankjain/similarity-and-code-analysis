 /////////// Inspired by the code of alangrafu ///////////
 /////////////////////////////////////////////////////////
 	
function RadarChart(id, data, options, blobTitles) {
 	var cfg = {
 	 w: 600,				//Width of the circle
 	 h: 600,				//Height of the circle
 	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
 		total = allAxis.length,					//The number of different axes
 		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format('d'),			 	//Percentage formatting
 		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
 	
 	//Scale for the radius
 		radarLine.interpolate("cardinal-closed");
 	}
 
	var blobTitle = function(d) {
		return blobTitles[d];
	}
				
 	//Create a wrapper for the blobs	
 	var blobWrapper = g.selectAll(".radarWrapper")
 		.data(data)
 			d3.select(this)
 				.transition().duration(200)
 				.style("fill-opacity", 0.7);
			tooltip
				.transition().duration(200)
				.text(blobTitle(i))
				.style("opacity", 1);	
 		})
 		.on('mouseout', function(){
 			//Bring back all blobs
 			d3.selectAll(".radarArea")
 				.transition().duration(200)
 				.style("fill-opacity", cfg.opacityArea);
			
			tooltip.transition().duration(200)
				.style("opacity", 0);
 		});
 		
 	//Create the outlines	
