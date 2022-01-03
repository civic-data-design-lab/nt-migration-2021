// define variables for spacing, margins, etc.
centreSpacing = 22; // spacing in between the male and female bars
margin = { left: 5, right: 10, top: 80, bottom: 110 };
const h = 700 - margin.top - margin.bottom;
const w = 800 - margin.left - margin.right;
const sqLen = 1;
const sideWidth = 0;

// set up SVG
var svg = d3
  .select("#chart")
  .append("svg")
   .attr("preserveAspectRatio", "xMinYMin meet")
  .classed("svg-content", true)
  .attr("viewBox", [100, 0, w + (sideWidth + sqLen - 100), h+ margin.bottom]);
//   .attr("width", w + margin.left + margin.right)
//   .attr("height", h + margin.top + margin.bottom);

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
    .attr("class","pyramid")
    .attr("x", (d) => (w - centreSpacing) / 2 - x(d.females))
    .attr("y", (d) => y(d.age)+10)
    .attr("height", y.bandwidth())
    .attr("width", (d) => x(d.females))
    .style("fill", "#fff");

  // create bars for female population
  gF.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class","pyramid")
    .attr("x", 0)
    .attr("y", (d) => y(d.age)+10)
    .attr("height", y.bandwidth())
    .attr("width", (d) => x(d.males))
    .style("fill", "#fff");

  // add labels for age groups in the centre of the chart
  gLabels
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("class","pyramid")
    .attr("x", centreSpacing / 2)
    .attr("y", (d) => y(d.age) + y.bandwidth() / 2 +10)
    .style("font-size", 10)
    .style("fill","#fff")
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
  .text("Edad")
  .attr("x", centreSpacing / 2)
  .attr("y", -0)
  .style("fill","#fff")
  .style("font-size", 13)
  .attr("class","pyramidage");

// add Male/Female labels
gF.append("text")
  .text("Masculinos")
  .attr("x", (w - centreSpacing) / 3)
  .attr("y", -0)
  .attr("class","pyramid")
  .style("fill","#fff")
  .style("text-anchor", "end");
gM.append("text")
  .text("Femeninos")
  .attr("x", 100)
  .attr("y", -0)
  .style("fill","#fff")
  .attr("class","pyramid")
  .style("text-anchor", "start");
  
  gF.append("text")
  .text("Migrantes")
  .attr("x", (w - centreSpacing) / 3)
  .attr("y", -20)
  .attr("class","pyramidmigrants")
  .style("fill","#fff")
  .style("text-anchor", "end");
gM.append("text")
  .text("Migrantes")
  .attr("x", 100)
  .attr("y", -20)
  .style("fill","#fff")
  .attr("class","pyramidmigrants")
  .style("text-anchor", "start");
    
   function showDetail(d) {
    // change outline to indicate hover state.
//     	d3.selectAll("rect").style('fill', function (d) { if (d.age >= 18) return "#b3e7e8";});
		d3.selectAll("rect").transition().duration(500).ease(d3.easeLinear).style('fill', function (d)  { if (d.age <= 17) {return "#e23cad"} else if (d.age) {return "#fff"}});
  } 
  
     function showDetailb(d) {
    // change outline to indicate hover state.
//     	d3.selectAll("rect").style('fill', function (d) { if (d.age >= 18) return "#b3e7e8";});
		d3.selectAll("rect").transition().duration(500).ease(d3.easeLinear).style('fill', function (d)  { if (d.age >= 18 && d.age <= 34 ) {return "#e23cad"} else if (d.age) {return "#fff"}});
		
  } 
  
       function showDetaila(d) {
    // change outline to indicate hover state.
//     	d3.selectAll("rect").style('fill', function (d) { if (d.age >= 18) return "#b3e7e8";});
		d3.selectAll("rect").transition().duration(500).ease(d3.easeLinear).style('fill',"#fff");
  } 
  
  function hideDetail(d) {
    // change outline to indicate hover state.
    
		d3.selectAll('svg').style("fill", "#b3e7e8");
		
	 }
	 
  function hideDetailb(d) {
    // change outline to indicate hover state.
    
		d3.selectAll(".rect,.pyramid,.pyramidage,.pyramidmigrants").transition().duration(500).ease(d3.easeLinear).style('opacity',"0");
		
		
	 }
	 
	  function ShowText(d) {
    // change outline to indicate hover state.
    
		d3.selectAll(".rect,.text,.pyramid,.pyramidage,.pyramidmigrants").transition().duration(500).ease(d3.easeLinear).style('opacity',"1");
		
		
	 }
	 

const controller = new ScrollMagic.Controller();

const scrollHighlightFirstGroup = new ScrollMagic.Scene({
                                    triggerElement:".forceLink1",
                                    triggerHook:'onLeave', 
                                    duration: "200%"       
                                  })
                                  .on("enter",(e)=>{
                                  showDetail();
                                  
                                 
                                	})
//                                   .addIndicators({name:"forceLink"})
                                .setPin({pushFollowers: false})
                                  .addTo(controller);

const scrollUndoHighlightFirstGroup = new ScrollMagic.Scene({
                                    triggerElement:".forceLinka"
        
                                  })
                                  .on("leave",(e)=>{
                                  showDetaila();
                                  
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller);  

const scrollHighlightSecondGroup = new ScrollMagic.Scene({
                                    triggerElement:".forceLink2",
                                    triggerHook:'onLeave', 
                                    duration: "200%"       
                                  })
                                  .on("enter",(e)=>{
                                  showDetailb();
                                  
                                 
                                	})
//                                   .addIndicators({name:"forceLink"})
                                .setPin({pushFollowers: false})
                                  .addTo(controller);

const scrollUndoHighlightSecondGroup = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkb"
        
                                  })
                                  .on("leave",(e)=>{
                                  showDetaila();
                                  
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller); 
                                  
const scrollHideAll = new ScrollMagic.Scene({
                                    triggerElement:".forceLink3",
                                    triggerHook:'onLeave', 
                                    duration: "200%"       
                                  })
                                  .on("enter",(e)=>{
                                  hideDetailb();
                                  
                                 
                                	})
//                                   .addIndicators({name:"forceLink"})
                                .setPin({pushFollowers: false})
                                  .addTo(controller);

const scrollUndoHideall = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkc"
        
                                  })
                                  .on("leave",(e)=>{
                                  ShowText();
                                  // showDetaila();
                                  
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller);   
                                                                    
                                  
	 
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
    
    
    
    

