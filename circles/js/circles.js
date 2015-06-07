// var circle = d3.selectAll("circle");

// var svg = d3.select("svg");

// var circle = svg.selectAll("circle")
//     .data([32, 57, 112, 293]);

// var circleEnter = circle.enter().append("circle");

// circle.style("fill", "steelblue");
// circle.attr("cy", 60);
// circle.attr("cx", function(d, i) { return i * 100 + 30; });
// circle.attr("r", function(d) { return Math.sqrt(d); });
var svg = d3.select("svg");

var circle = svg.selectAll("circle")
    .data([32, 87, 112, 293]);

circle.enter().append("circle")
  	.style("fill", "steelblue")
    .attr("cy", 60)
    .attr("cx", function(d, i) { return i * 100 + 30; })
    .attr("r", function(d) { return Math.sqrt(d); })
    .transition()
    .duration(1000)
    .attr("r",0);





// d3.timer(function() {
// 	svg.selectAll("circle").attr("cx", function() { return Math.random() * 720; });
// });