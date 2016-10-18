//Practically all this code comes from https://github.com/alangrafu/radar-chart-d3
//I only made some additions and aesthetic adjustments to make the chart look better
//(of course, that is only my point of view)
//Such as a better placement of the titles at each line end,
//adding numbers that reflect what each circular level stands for
//Not placing the last level and slight differences in color
//
//For a bit of extra information check the blog about it:
//http://nbremer.blogspot.nl/2013/09/making-d3-radar-chart-look-bit-better.html
 
 var RadarChart = {
	 w: 600,
	 h: 600,
 	 factor: 1,
	 factorLegend: .85,
 	 levels: 3,
 	 maxValue: 0,
 	 radians: 2 * Math.PI,
 	 color: d3.scale.category10()
 	};
 

 	var tooltip;
 
 	//Circular segments
 	   .append("svg:text")
 	   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
 	   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
	   .attr("class", "legend")
 	   .style("font-family", "sans-serif")
	   .style("font-size", "10px")
 	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
 	   .attr("fill", "#737373")
 	   .text(Format((j+1)*cfg.maxValue/cfg.levels));
 
 	series = 0;
 
		.attr("class", "legend")
 		.text(function(d){return d})
 		.style("font-family", "sans-serif")
		.style("font-size", "11px")
 		.attr("text-anchor", "middle")
 		.attr("dy", "1.5em")
 		.attr("transform", function(d, i){return "translate(0, -10)"})
		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
 		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
 

 	d.forEach(function(y, x){
 	  dataValues = [];
 	  g.selectAll(".nodes")
 			   .style('font-size', '13px');
   }
 };
