var width = window.innerWidth,
    height = window.innerHeight;

var i = 0;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid #fff");

svg.on("click", lines);

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function lines() {
  var m = d3.mouse(this), 
      x1 = m[0], 
      y1 = m[1], 
      i=0;


  var iterations = 0; 

  d3.timer(function() {

    var randomX = Math.floor((Math.random() * 20) + 1),
        randomY = Math.floor((Math.random() * 20) + 1),
        newX, newY;


    if (iterations < 1000) {

      //The line SVG Path we draw
      var lineDown = svg.append("line")
                    .transition()
                    .attr("x1", x1)
                    .attr("y1", y1)
                    .attr("x2", function(){ 
                      if ( iterations%2 === 0 ) {
                        newX = x1 + randomX;
                      } else {
                        newX = x1 - randomX;
                      }
                      return newX;
                    })
                    .attr("y2", y1+randomY )
                    .style("stroke", getRandomColor())            
                    .attr("stroke-width", 2)
                    .attr("fill", "none");

      lineRight = svg.append("line")
                  .transition()
                  .attr("x1", x1)
                  .attr("y1", y1)
                  .attr("x2", x1+randomX )
                  .attr("y2", function(){ 
                    if ( iterations%2 === 0 ) {
                      newY = y1 + randomY;
                    } else {
                      newY = y1 - randomY;
                    }
                    return newY;
                  })
                  .style("stroke", getRandomColor())              
                  .attr("stroke-width", 2)
                  .attr("fill", "none");

      x1 = newX;
      y1 = newY;

      iterations++;
    }

  });

  

  d3.event.preventDefault();
}
