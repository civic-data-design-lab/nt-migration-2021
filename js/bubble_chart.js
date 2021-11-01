const countryText = {
    "GTM": "Guatemala",
    "HND": "Honduras",
    "SLV": "El Salvador"
};
const pathwayAttr = {
    "regular": {"label": "Regular Pathway", "color": "#e23cad"},
    "irrregular coyote": {"label": "Irregular Pathway with a Smuggler", "color": "#3ba7c9"},
    "irregular on own, with caravan": {"label": "Irregular Pathway on their Own or with a Caravan", "color": "#1540c4"}
};

const financeText = {
    "1": {"label":"No Response"}
};

function bubbleChart() {
//   var width = 1500;
//   var height = 700;
const width = 1346;
const height = 800;
const sideWidth = 0;
  var padding = 2;
  var tooltip = floatingTooltip('gates_tooltip');
  var center = { x: width / 2, y: height / 2 };

  var yearCenters = {
    "GTM": { x: width / 5.5, y: height / 2 },
    "HND": { x: width / 1.9, y: height / 2 },
    "SLV": { x: 2.5 * (1 * width / 3), y: height / 2 }
  };
  
    var beeCenters = {
    "all loans": { x: width / 6.3, y: 0 },
    "some loans": { x: width / 1.9, y:0 },
    "no loans": { x: 2.5 * (1 * width / 3), y:0 }
  };
  
var meansCenters = {
    "regular": { x: width / 7, y: height / 2 },
    "irregular on own, with caravan": { x: 2.9 * (1 * width / 5), y: height / 2 },
    "irrregular coyote": { x: 3.5 * (1 * width / 5), y: height / 2 }
  };
  
  var yearsTitleX = {
    "GUATEMALA": 250,
    "HONDURAS": width - 650,
    "EL SALVADOR": width - 250
  };
  
    var meansTitleX = {
    "REGULAR PATHWAY": 200,
    "IRREGULAR PATHWAY": width - 390
   //  "Irregular Pathway": width - 250
  };
  
    var financeTitleX = {
    "ALL LOANS": 200,
    "SOME LOANS": width - 650,
    "NO LOANS": width - 250
  };
  
  var forceStrength = 0.023;
//   var svg = null;
//   var bubbles = null;
//   var nodes = [];

  function charge(d) {
    return -Math.pow(d.radius, 1) * forceStrength;
  }
  
  var posScale = d3.scaleLinear().domain([20,22000]);
    posScale.range([0, height]);

  var simulation = d3.forceSimulation()
    .velocityDecay(0.17)
    .force('collide', d3.forceCollide().radius(function(d) {
		return d.radius + padding;
		}).strength(.65))
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
//     .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked);
  simulation.stop();
  
//     var simulationB = d3.forceSimulation()
// //     .velocityDecay(0.21)
//     .force('collide', d3.forceCollide().radius(function(d) {
// 		return d.radius + padding;
// 		}))
//     .force('x', d3.forceX().strength(.2).x(center.x))
// //     .force('y', d3.forceY().strength(2).y(center.y))
//     .alphaDecay(0.3)
// //     .force('charge', d3.forceManyBody().strength(charge))
//     .on('tick', ticked);
//   simulationB.stop();

  var fillColor = d3.scaleOrdinal()
    .domain(['low', 'medium', 'high'])
    .range(['#3ba7c9', '#1540c4', '#e23cad']);

  function createNodes(rawData) {

var maxAmount = d3.max(rawData, function (d) { return +d.mig_ext_cost_total; });

    var radiusScale = d3.scalePow()
      .exponent(0.9)
      .range([2, 85])
      .domain([0, maxAmount]);

    var myNodes = rawData.map(function (d) {
      return {
        id: d.id,
        radius: radiusScale(+d.mig_ext_cost_total),
        value: +d.mig_ext_cost_total,
        name: d.mig_ext_medio,
        // org: d.organization,
        group: d.mig_ext_finance,
        year: d.country,
        x: Math.random() * 1800,
        y: Math.random() * 1000
      };
    });

    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }

  var chart = function chart(selector, rawData) {
    nodes = createNodes(rawData);
    

// 
// const svg = d3.select("#frame-motivations")
//     .append("svg")
//         .attr("id", "viz-motivations")
//         .attr("viewBox", [-(sideWidth), 0, width + (sideWidth), height]);
        
    svg = d3.select("#frame-motivations")
      .append('svg')
      .attr("viewBox", [-(sideWidth), 0, width + (sideWidth), height])

//   svg = d3.select(selector)
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height);

    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.id; });

    var bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.name); })
      .style('fill', function (d) { if (d.value <= 1) return "#fff";})
      .style('stroke', function (d) { if (d.value <= 1) return fillColor(d.name);})
      .style('stroke-width', function (d) { if (d.value <= 1) return .9;})
      // .attr('stroke', function (d) { return d3.rgb(fillColor(d.name)).darker(); })
      .attr('stroke-width', .1)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);
      

    bubbles = bubbles.merge(bubblesE);

    bubbles.transition()
    .ease(d3.easeBounce)
      .duration(1)
      .attr('r', function (d) { return d.radius; });
      
    simulation.nodes(nodes);

    groupBubbles();
  };

  function ticked() {
    bubbles
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; });
  }
  
//       function ticked() {
//     bubbles
//       .attr('cx', function (d) { return d.x; })
//       .attr('cy', function(d){return height - posScale(d.value);});
//   }

  function nodeMeansPos(d) {
    return meansCenters[d.name].x;
  }
  
    function nodeCountryPos(d) {
    return yearCenters[d.year].x;
  }
  
        function nodeBeePosb(d) {
     return beeCenters[d.group].x;
  }
  
          function nodeBeePosc(d) {
     return   posScale(d.value).y;
  }
  


  function groupBubbles() {
     hideYearTitles();
      hideMeansTitles();
      hideFinanceTitles();
      showNullValues();
      


    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
	simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
    simulation.alpha(1).restart();
  }

  function splitBubbles() {
    hideYearTitles();
    hideFinanceTitles();
   showMeansTitles();

    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeMeansPos));
	simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
    simulation.alpha(1).restart();
  }
  
function splitBubblesCountry() {
    hideMeansTitles();
    hideFinanceTitles();
    showYearTitles();
    
  

    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeCountryPos));
    simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));

    simulation.alpha(1).restart();
  }

    
  function splitBubblesBee() {
  	hideFinanceTitles();
      hideYearTitles();
      hideMeansTitles();
      showFinanceTitles();
    hideNullValues();

	simulation.force('x', d3.forceX().strength(forceStrength).x(nodeBeePosb));
    simulation.force('y', d3.forceY().strength(.06).y(function(d){return height - posScale(d.value);}));
// 	simulation.filter(function(d){ return d.value <= 1; }).force('y', d3.forceY().strength(.06).y(5000));
	
    simulation.alpha(1).restart();
  }

  function hideYearTitles() {
    svg.selectAll('.year').remove();
  }
  
    function hideMeansTitles() {
    svg.selectAll('.name').remove();
  }
  
    function hideFinanceTitles() {
    svg.selectAll('.group').remove();
  }
  
function hideNullValues() {
    svg.selectAll('circle').filter(function(d){ return d.value <= 1; }).transition().attr('y', 50000);
    // .style('stroke', "#fff" );
  }

function showNullValues() {
     svg.selectAll('circle').filter(function(d){ return d.value <= 1; });
//     .style('fill', function (d) { if (d.value <= 1) return "#fff";})
//       .style('stroke', function (d) { if (d.value <= 1) return fillColor(d.name);})
//       .style('stroke-width', function (d) { if (d.value <= 1) return .9;});

   }

  function showYearTitles() {

    var yearsData = d3.keys(yearsTitleX);
    var years = svg.selectAll('.name')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'year')
      .attr('x', function (d) { return yearsTitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }
  
    function showMeansTitles() {

    var yearsData = d3.keys(meansTitleX);
    var years = svg.selectAll('.name')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'name')
      .attr('x', function (d) { return meansTitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }
  
      function showFinanceTitles() {

    var yearsData = d3.keys(financeTitleX);
    var years = svg.selectAll('.name')
      .data(yearsData);

    years.enter().append('text')
      .attr('class', 'group')
      .attr('x', function (d) { return financeTitleX[d]; })
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text(function (d) { return d; });
  }

  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');


    $("#gates_tooltip").empty();
    const tooltipTemplate = $(".tooltip.template");
    let tooltipContent = tooltipTemplate.clone();
    let pathwayColor = pathwayAttr[d.name].color;

    tooltipContent.find(".side-color").css("background", pathwayColor);
    tooltipContent.find(".text-color").css("color", pathwayColor);
    tooltipContent.find(".label-cost").html("$" + addCommas(d.value));
    tooltipContent.find(".label-country").html(countryText[d.year]);
    tooltipContent.find(".label-pathway").html(pathwayAttr[d.name].label);

    tooltipContent.children().appendTo("#gates_tooltip");

    // tooltip.showTooltip(content, d3.event);
    tooltip.showTooltip(d3.event);
  }

  function hideDetail(d) {
    d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.group)).darker());

    tooltip.hideTooltip();
  }

  chart.toggleDisplay = function (displayName) {
    if (displayName === 'year') {
      splitBubbles();
    }   
   else if (displayName === 'country') 
      splitBubblesCountry();
      
	else if (displayName === 'uncolor') 
      changeColor();
      
    else if (displayName === 'colorb') 
      meansColor();
      
     else if (displayName === 'bee') 
      splitBubblesBee();  
          
      else {
      groupBubbles();
    }
  };

  return chart;
}


var myBubbleChart = bubbleChart();


function display(error, data) {
  if (error) {
    console.log(error);
  }
  
  myBubbleChart('#vis', data);
}


function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('.button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId);
    });
}

function changeColor(){
  d3.selectAll("circle")
    .transition()
    .duration(2000)
    .style('fill', function (d) { if (d.value <= 1) return "#fff" ;})
    .style('stroke', function (d) { if (d.value <= 1) return "#662d91" ;})
	.style('stroke-width', function (d) { if (d.value <= 1) return .9;})
	.attr('fill', function (d) { if (d.value > 1) return "#662d91";});
	      // .attr('stroke-width', .1)
// 	.style("fill", function (d) { if (d.value > 1) return "#662d91" ;})
//     .style("fill", function (d) { if (d.value <= 1) return "#fff" ;});
//     .style("stroke-width",0);
}

  var fillColor = d3.scaleOrdinal()
    .domain(['low', 'medium', 'high'])
    .range(['#3ba7c9', '#1540c4', '#e23cad']);
    
function meansColor(){
d3.selectAll("circle")
    .transition()
    .duration(2000)

      .attr('fill', function (d) { if (d.value > 1) return fillColor(d.name);})
      .style('fill', function (d) { if (d.value <= 1) return "#fff";})
      .style('stroke', function (d) { if (d.value <= 1) return fillColor(d.name);})
      .style('stroke-width', function (d) { if (d.value <= 1) return .9;});
      // .attr('stroke', function (d) { return d3.rgb(fillColor(d.name)).darker(); })
//       .style('stroke-width', .1);
}


/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}

// Load the data.
d3.csv('data/dots_data2.csv', display);

// setup the buttons.
setupButtons();
