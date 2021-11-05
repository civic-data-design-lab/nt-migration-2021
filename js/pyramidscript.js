// define variables for spacing, margins, etc.
centreSpacing = 22; // spacing in between the male and female bars
margin = { left: 10, right: 10, top: 80, bottom: 25 };
const h = 700 - margin.top - margin.bottom;
const w = 550 - margin.left - margin.right;

// set up SVG
var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom);

// set up three g (group) elements to help position things and organise our chart
// g element for the bars for the male population
var gM = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// g element for the bars for the female population
var gF = svg
  .append("g")
  .attr(
    "transform",
    "translate(" +
      (margin.left + (w - centreSpacing) / 2 + centreSpacing) +
      "," +
      margin.top +
      ")"
  );
// g element for the labels
var gLabels = svg
  .append("g")
  .attr(
    "transform",
    "translate(" +
      (margin.left + (w - centreSpacing) / 2 + "," + margin.top + ")")
  );

// scale functions to map data to width/height/position
y = d3.scaleBand().range([0, h]).padding(.5);

x = d3.scaleLinear().range([0, (w - centreSpacing) / 2]);

// we will use this to create a reversed axis (right to left) for the male population later
xReverse = d3.scaleLinear().range([0, (w - centreSpacing) / 2]);

// Load data
// Everything that we need the data for has to happen inside of this function
d3.csv("./data/dots_data3.csv").then(function (data) {
  // prepare the data
  data = data.map((d) => ({
    age: d.age,
    females: +d.female,
    males: +d.male,
  }));

  // to complete our scale functions, we need to set their domains based on the values in the data
  // largest value out of all male or female counts for all years
  maxVal = d3.max(data, (d) => d3.max([d.males, d.females]));
  x.domain([0, maxVal]);
  xReverse.domain([maxVal, 0]);
  y.domain(data.map((d) => d.age));

  // create bars for male population
  gM.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => (w - centreSpacing) / 2 - x(d.females))
    .attr("y", (d) => y(d.age))
    .attr("height", y.bandwidth())
    .attr("width", (d) => x(d.females))
    .style("fill", "teal");

  // create bars for female population
  gF.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d) => y(d.age))
    .attr("height", y.bandwidth())
    .attr("width", (d) => x(d.males))
    .style("fill", "teal");

  // add labels for age groups in the centre of the chart
  gLabels
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", centreSpacing / 2)
    .attr("y", (d) => y(d.age) + y.bandwidth() / 2)
    .style("font-size", 12)
    .text((d, i) => (i != data.length - 1 ? (i % 5 == 0 ? d.age : "") : "90+"));

  // add an axis for female pop values
  gF.append("g")
   //  .attr("transform", "translate(0," + (h + 3) + ")")
//     .call(d3.axisBottom(x));

  // add an axis for male pop values
  gM.append("g")
//     .attr("transform", "translate(0," + (h + 3) + ")")
//     .call(d3.axisBottom(xReverse).ticks(w / 80, "s"));
});

// Additional labeling (we do not need the data for this)

// add a little 'Age' header at the top
gLabels
  .append("text")
  .text("Age")
  .attr("x", centreSpacing / 2)
  .attr("y", -30)
  .style("font-weight", "bold");

// add Male/Female labels
gF.append("text")
  .text("Male Migrants")
  .attr("x", (w - centreSpacing) / 2)
  .attr("y", -30)
  .style("text-anchor", "end")
  .style("font-weight", "bold");
gM.append("text")
  .text("Female Migrants")
  .attr("x", 0)
  .attr("y", -30)
  .style("text-anchor", "start")
  .style("font-weight", "bold");
  
   function showDetail(d) {
    // change outline to indicate hover state.
//     	d3.selectAll("rect").style('fill', function (d) { if (d.age >= 18) return "#b3e7e8";});
		d3.selectAll("rect").transition().duration(500).ease(d3.easeLinear).style('fill', function (d)  { if (d.age <= 17) {return "teal"} else if (d.age) {return "#b3e7e8"}});
  } 
  
     function showDetailb(d) {
    // change outline to indicate hover state.
//     	d3.selectAll("rect").style('fill', function (d) { if (d.age >= 18) return "#b3e7e8";});
		d3.selectAll("rect").transition().duration(500).ease(d3.easeLinear).style('fill', function (d)  { if (d.age >= 18 && d.age <= 34 ) {return "teal"} else if (d.age) {return "#b3e7e8"}});
  } 
  
       function showDetaila(d) {
    // change outline to indicate hover state.
//     	d3.selectAll("rect").style('fill', function (d) { if (d.age >= 18) return "#b3e7e8";});
		d3.selectAll("rect").transition().duration(500).ease(d3.easeLinear).style('fill',"teal");
  } 
  
  function hideDetail(d) {
    // change outline to indicate hover state.
    
		d3.select(this).style("fill", "#b3e7e8");
		
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
    
    setupButtons();