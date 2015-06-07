var treeData = [
  {
    "name": "Qualifications",
    "parent": "null",
    "anchor": "end",
    "offset": "-.75em",
    "children": [
      {
        "name": "Systems and Platforms",
        "parent": "Qualifications",
        "anchor": "end",
        "offset": "-.75em",
        "children": [
          {
            "name": "Windows",
            "parent": "Systems and Platforms",
            "anchor": "start",
            "offset": "-.55em",
            "children": [
              {
                "name": "Windows XP", 
                "parent": "Windows",
                "anchor": "start"
              },
              {
                "name": "Windows Vista", 
                "parent": "Windows",
                "anchor": "start"
              },
              {
                "name": "Windows 7", 
                "parent": "Windows",
                "anchor": "start"
              }
            ]
          },
          {
            "name": "Mac OSX",
            "parent": "Systems and Platforms",
            "anchor": "start"
          },
          {
            "name": "UNIX",
            "parent": "Systems and Platforms",
            "anchor": "start"
          }
        ]
      },
      {
        "name": "Languages",
        "parent": "Qualifications",
        "anchor": "end",
        "offset": "1.25em",
        "children": [
          {
            "name": "C",
            "parent": "Languages",
            "anchor": "start"
          },
          {
            "name": "Java", 
            "parent": "Languages",
            "anchor": "start"
          },
          {
            "name": "JavaScript", 
            "parent": "Languages",
            "anchor": "start",
            "offset": "1.25em",
            "children": [
              {
                "name": "jQuery", 
                "parent": "JavaScript",
                "anchor": "start"
              },
              {
                "name": "D3", 
                "parent": "JavaScript",
                "anchor": "start"
              }
            ]
          },
          {
            "name": "HTML", 
            "parent": "Languages",
            "anchor": "start"
          },
          {
            "name": "CSS", 
            "parent": "Languages",
            "anchor": "start",
            "offset": "1.25em",
            "children": [
              {
                "name": "SASS", 
                "parent": "CSS",
                "anchor": "start"
              },
              {
                "name": "SMACSS", 
                "parent": "CSS",
                "anchor": "start"
              },
              {
                "name": "BEM", 
                "parent": "CSS",
                "anchor": "start"
              }
            ]
          },
          {
            "name": "Lisp", 
            "parent": "Languages",
            "anchor": "start",
            "offset": "1.25em",
            "children": [
              {
                "name": "Scheme", 
                "parent": "Lisp",
                "anchor": "start"
              },
              {
                "name": "Racket", 
                "parent": "Lisp",
                "anchor": "start"
              }
            ]
          }

        ]
      }
    ]
  }
];

// ************** Generate the tree diagram  *****************
var margin = {top: 20, right: 120, bottom: 20, left: 140},
 width = window.innerWidth,
 height = window.innerHeight,
 duration = 1000;
 
var i = 0;

var tree = d3.layout.tree()
 .size([height, width]);

// used when the links are drawn between nodes.
// the diagonal function draws the lines between nodes
// and the projection function allows for cubic bezier flow
var diagonal = d3.svg.diagonal()
 .projection(function(d) { return [d.y, d.x]; });

// creates and appends svg with group elements for each of the nodes
var svg = d3.select("body").append("svg")
 .attr("width", window.innerWidth)
 .attr("height", window.innerHeight)
  .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
  
update(root);


/*
* function that draws the tree using the the top of the  
* data as the root 
*/
function update(source) {

  // Compute the new tree layout by running the d3
  // functions to determine the nodes and their links
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth
  // grabs the depth property from the given data object
  // and increases the y value to add space between nodes.
  nodes.forEach(function(d) { 
                    console.log(d.depth);
                    d.y = d.depth * 300; 
                });

  // Declare the nodes
  // this variable/function gets called and selects the given
  // given id to be returned
  var node = svg.selectAll("g.node")
   .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter in the nodes and append them at the calculated location
  var nodeEnter = node.enter().append("g")
   .attr("class", "node")
   .attr("transform", function(d) { 
    return "translate(" + d.y + "," + d.x + ")"; 
   })
   .on("click", click);

  // add the circles at the point for each node 
  nodeEnter.append("circle")
   .attr("r", 10);

  // add the text next to each node in the tree
  nodeEnter.append("text")
   .attr("x", function(d) {
     return d.children || d.children ? 0 : 13; 
   })
   .style("font-size", function(d) {
     return d.children || d.children ? "20px" : "14px"; 
   })
   .attr("dy", function(d) {
     return d.offset || d.offset ? d.offset : ".35em";
   })
   .attr("text-anchor", function(d) { return d.anchor; })
   .text(function(d) { return d.name; })
   .style("fill-opacity", 1);

  // // Declare the links
  // var link = svg.selectAll("path.link")
  //  .data(links, function(d) { return d.target.id; });

  // // Enter the links.
  // link.enter().insert("path", "g")
  //  .attr("class", "link")
  //  .attr("d", diagonal);

   // Transition nodes to their new position.
  var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
    .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
    .remove();

  nodeExit.select("circle")
    .attr("r", 1e-6);

  nodeExit.select("text")
    .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
    .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
    var o = {x: source.x0, y: source.y0};
    return diagonal({source: o, target: o});
    });

  // Transition links to their new position.
  link.transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
    var o = {x: source.x, y: source.y};
    return diagonal({source: o, target: o});
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });

}


function click(d) {
  console.log(d);
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}