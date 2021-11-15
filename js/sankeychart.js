var tooltip = floatingTooltip('gates_tooltip');

const countryText = {
    "GTM": "Guatemala",
    "HND": "Honduras",
    "SLV": "El Salvador"
};
const occuAttr = {
    "Agricultural production or labor": {"label": "Agriculture", "color": "#f28c77", "class": "agriculture"},
    "Informal work": {"label": "Informal Work", "color": "#e2729c", "class": "informal"},
    "Salaried employment": {"label": "Salaried Work", "color": "#ec84cb", "class": "salary"},
    "Own business": {"label": "Own Business", "color": "#b470c8", "class": "business"},
    "Domestic work": {"label": "Domestic Work", "color": "#d667ce", "class": "domestic"},
    "Student (may or may not attend classes regularly)": {"label": "Student", "color": "#f28c77", "class": "student"},
    "Unemployed": {"label": "Unemployed", "color": "#9e7ab9", "class": "unemployed"}
};

const occuAttrb = {
    "Agricultural production or labor": {"label": "28%", "color": "#eb4927", "class": "agriculture"},
    "Informal work": {"label": "22%", "color": "#d11f63", "class": "informal"},
    "Salaried employment": {"label": "15%", "color": "#e23cad", "class": "salary"},
    "Own business": {"label": "6%", "color": "#881da8", "class": "business"},
    "Domestic work": {"label": "4%", "color": "#bf0eb2", "class": "domestic"},
    "Student (may or may not attend classes regularly)": {"label": "20%", "color": "#e03448", "class": "student"},
    "Unemployed": {"label": "6%", "color": "#662d91", "class": "unemployed"}
};

const occuAttrc = {
    "Agricultural production or labor": {"label": "17%", "color": "#eb4927", "class": "agriculture"},
    "Informal work": {"label": "30%", "color": "#e03448", "class": "informal"},
    "Salaried employment": {"label": "21%", "color": "#d11f63", "class": "salary"},
    "Own business": {"label": "5%", "color": "#e23cad", "class": "business"},
    "Domestic work": {"label": "6%", "color": "#bf0eb2", "class": "domestic"},
    "Student (may or may not attend classes regularly)": {"label": "15%", "color": "#881da8", "class": "student"},
    "Unemployed": {"label": "5%", "color": "#662d91", "class": "unemployed"}
};

// set the dimensions and margins of the graph
var margin = {top: 30, right: 300, bottom: 100, left: 290},
    width = 700 ,
    height = 1300;  
    const sqLen1 = 90;
const sideWidths = 190;

// format variables
var formatNumber = d3.format(",.0f"), // zero decimal places
    format = function(d) { return formatNumber(d); };
  //   color = d3.scaleOrdinal(d3.schemeCategory10);
  
// append the svg object to the body of the page
var svg = d3.select("#chartsank").append("svg")
    .attr("viewBox", [-(sideWidths + sqLen1), 0, width + (sideWidths + sqLen1)+ margin.left , height+margin.bottom+margin.top]);
//   .append("g")
//     .attr("transform", 
//           "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(14)
    .nodePadding(12)
    .size([width, height]);

var path = sankey.links();

// load the data
d3.csv("./data/sankey.csv").then(function(data) {

  //set up graph in same style as original example but empty
  sankeydata = {"nodes" : [], "links" : []};

  data.forEach(function (d) {
    sankeydata.nodes.push({ "name": d.source });
    sankeydata.nodes.push({ "name": d.target });
    sankeydata.links.push({ "source": d.source,
                       		"target": d.target,
                       		"value": +d.value, 
                      		 "origin": d.country,
                      		 "dest": d.mig_ext_country});
   });

  // return only the distinct / unique nodes
 sankeydata.nodes = Array.from(
    d3.group(sankeydata.nodes, d => d.name),
	([value]) => (value)
  );

  // loop through each link replacing the text with its index from node
  sankeydata.links.forEach(function (d, i) {
    sankeydata.links[i].source = sankeydata.nodes
      .indexOf(sankeydata.links[i].source);
    sankeydata.links[i].target = sankeydata.nodes
      .indexOf(sankeydata.links[i].target);
  });

  // now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  sankeydata.nodes.forEach(function (d, i) {
    sankeydata.nodes[i] = { "name": d,  };
  });
  

  

  graph = sankey(sankeydata);

// add in the links
   var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
    .attr("d", d3.sankeyLinkHorizontal())
//       .attr("class", "link")
      .attr("class", d => {            sourceClass = occuAttr[d.source.name.split('-')[1]].class;
            return "link " + sourceClass;
   
      })
      .style("stroke","#3BA8B6")
      .style("stroke-width","2")
//       .attr("d", path)
//       .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; })
        // .on('mouseover', showDetail)
        .on('mouseover', function (event, d)  {
            showDetail(d);
                sourceClass = occuAttr[d.source.name.split('-')[1]].class;
                sourceColor = occuAttr[d.source.name.split('-')[1]].color
                 sourceClassb = occuAttrb[d.target.name].class;
                sourceColorb = occuAttrb[d.target.name].color
                // select links with this class
                d3.selectAll("." + sourceClass)
                    .raise()
                    .transition()
                  .ease(d3.easeLinear)
                    .duration(300)

                    // .style("stroke", function(l) {
                    //     return l.source.name === d.source.name ? color(d.source.name.replace(/ .*/, "")) : "#b3e7e8";
                    // });
                    
                    .style("stroke", sourceColor);
                // select nodes with this class
                d3.selectAll(".source-" + sourceClass)
                    .transition()        
                    .duration(300)
                    .style("stroke","#fff")
                    .style("stroke-width","2")
                    .style("fill", sourceColor);
                d3.selectAll(".target-" + sourceClassb)
                    .transition()
                    .duration(300)
                    .style("stroke","#fff")
                    .style("stroke-width","2")
                    .style("fill", sourceColorb);
                d3.select(this)
                .attr("stroke-width","2");
               //  d3.selectAll(".occbefper" + sourceClass)
//                     .transition()        
//                     .duration(300)
//                     .style("fill", sourceColor);
                 
        })
      .on('mouseout', function(event, d) {
          hideDetail(d);
          link.transition()
           .ease(d3.easeLinear)
            .duration(300)
            .style("stroke", "#3BA8B6");
            d3.selectAll('.node').transition()
       		.ease(d3.easeLinear)
            .duration(300)
             .style("stroke","#fff")
            .style("stroke-width","0")
            .style("fill", "#3BA8B6");
        
        });
// // add the link titles
//   link.append("title")
//         .text(function(d) {
//     		    return d.source.name + " → " + 
//                 d.target.name + "\n" + format(d.value); });

// add in the nodes
   







  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g");
     //  .attr("class", "node");

// add the rectangles for the nodes
 node.append("rect")
      .attr("class", function(d) {
            if (d.name.startsWith('-')) {
                sourceClass = occuAttr[d.name.split('-')[1]].class;
                return "node source-" + sourceClass;
            }
            else {
                sourceClass = occuAttr[d.name].class;
                return "node target-" + sourceClass;
            }
      })
      .attr("x", function(d) { return d.x0; })
      .attr("y", function(d) { return d.y0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("width", sankey.nodeWidth())
     //  .style("fill", "#d11f63" )
   //    .style("stroke", "#fff")
	.style("fill", "#3BA8B6");

// add in the title for the nodes
//   node.append("text")
//       .attr("x", function(d) { return d.x0 - 6; })
//       .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "end")
//       .text(function(d) { return d.name; })
//     .filter(function(d) { return d.x0 < width / 2; })
//       .attr("x", function(d) { return d.x1 + 6; })
//       .attr("text-anchor", "start");
// 
// });
node.append("text")
      .attr("x", function(d) { return d.x0 - 15; })
      .attr("y", function(d) { return d.y0 - 30 ; })
      .attr("dy", "1.45em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .attr("class","occbef")
      .style("fill","#fff")
      .classed("node source-", false)
      .text(function(d) { 
      
            if (d.name.startsWith('-')) {
                return occuAttr[d.name.split('-')[1]].label;
            }
            else {
                return occuAttr[d.name].label; 
            }
        })
      
//       .style("font-size", "18px")
    .filter(function(d) { return d.x0 > width / 2; })
      .attr("x",  + sankey.nodeWidth() + width)
      .classed("node target-", false)
      .attr("class","occaft")
      .attr("text-anchor", "start");
      
node.append("text")
      .attr("x", function(d) { return d.x0 - 15; })
      .attr("y", function(d) { return d.y0 - 14 ; })
      .attr("dy", "1.45em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .attr("class","occbefper")
      .style("fill","#fff")
      .classed("node source-", false)
      .text(function(d) { 
      
            if (d.name.startsWith('-')) {
                return occuAttrb[d.name.split('-')[1]].label;
            }
            else {
                return occuAttrc[d.name].label; 
            }
        })
      
//       .style("font-size", "18px")
    .filter(function(d) { return d.x0 > width / 2; })
      .attr("x",  + sankey.nodeWidth() + width)
      .classed("node target-", false)
      .attr("class","occaftper")
      .attr("text-anchor", "start");
      

      
 
    
function showDetail(d) {
 

// 	 $("#event-img").empty();
// 	 callImages = function (d) {
//     if (d.source.name === '-Agricultural production or labor') {
//       ".profiles2-img";
//     }   
//    else if (d.source.name === '-Student (may or may not attend classes regularly)') 
//       ".profiles3-img";
//       
// 	else if (d.source.name === '-Informal work') 
//      ".profiles4-img";
//       
//     else if (d.source.name === '-Salaried employment') 
//      ".profiles2-img";
//       
//      else if (d.source.name === '-Domestic work') 
//       ".profiles3-img";  
//       
//        else if (d.source.name === '-Own business') 
//      ".profiles4-img";  
//       
//        else if (d.source.name === '-Unemployed') 
//     ".profiles2-img";  
//           
//       else {
//       ".profiles3-img";
//     }
//     };
//     
//     const eventTemplate = $(".event-img");
//     callImages.eventTemplate.children().appendTo("#event-img");
    
    
      
    $("#gates_tooltip").empty();
    const tooltipTemplate = $(".tooltip.template");
    let tooltipContent = tooltipTemplate.clone();
    let beforeColor = occuAttr[d.source.name.split('-')[1]].color;
    let afterColor = occuAttrb[d.target.name].color;

    tooltipContent.find(".side-color").css("background", "linear-gradient(" + beforeColor + ", " + afterColor + ")");
    tooltipContent.find(".text-color-before").css("color", beforeColor);
    tooltipContent.find(".text-color-after").css("color", afterColor);
    tooltipContent.find(".label-before").html(occuAttr[d.source.name.split('-')[1]].label);
    tooltipContent.find(".label-after").html(occuAttr[d.target.name].label);
    tooltipContent.find(".label-origin").html(countryText[d.origin]);
    tooltipContent.find(".label-dest").html(d.dest);

    tooltipContent.children().appendTo("#gates_tooltip");

    // tooltip.showTooltip(content, d3.event);
    tooltip.showTooltip(event);
  } 

  function hideDetail(d) {  		
    tooltip.hideTooltip();
//     d3.selectAll("text")       
//     .style("fill", "#fff");
  }
// the function for moving the nodes
//   function dragmove(d) {
//     d3.select(this).attr("transform", 
//         "translate(" + d.x + "," + (
//                 d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
//             ) + ")");
//     sankey.relayout();
//     link.attr("d", path);
//   }


});

  
  