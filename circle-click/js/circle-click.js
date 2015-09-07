var width = Math.max(960, innerWidth),
    height = Math.max(500, innerHeight);

var x1 = width / 2,
    y1 = height / 2,
    x0 = x1,
    y0 = y1,
    i = 0,
    r = 100,
    τ = 2 * Math.PI;

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height)
    .on("mousedown", move);

var context = canvas.node().getContext("2d");
context.globalCompositeOperation = "lighter";
context.lineWidth = 2;

function move() {
  var mouse = d3.mouse(this),
      iterations = 0,
      x1 = mouse[0],
      y1 = mouse[1];
  d3.event.preventDefault();

  d3.timer(function() {
    if (iterations < 30) {
      context.clearRect(0, 0, width, height);

      var z = d3.hsl(++i % 360, 1, .5).rgb(),
          c = "rgba(" + z.r + "," + z.g + "," + z.b + ",",
          x = x0 += (x1 - x0) * .1,
          y = y0 += (y1 - y0) * .1;

      d3.select({}).transition()
          .duration(2000)
          .ease(Math.sqrt)
          .tween("circle", function() {
            return function(t) {
              context.strokeStyle = c + (1 - t) + ")";
              context.beginPath();
              context.arc(x1, y1, r * t, 0, τ);
              context.stroke();
            };
          });

      iterations += 1;
    }else {
      context.clearRect(0, 0, width, height);
      return;
    }
  });
}// END move()
