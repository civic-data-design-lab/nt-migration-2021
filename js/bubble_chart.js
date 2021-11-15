const countryText = {
    "GTM": "Guatemala",
    "HND": "Honduras",
    "SLV": "El Salvador"
};
const pathwayAttr = {
    "regular": {"label": "Regular Pathway", "color": "#e23cad"},
    "irrregular coyote": {"label": "Irregular Pathway with a Smuggler", "color": "#662d91"},
    "irregular on own, with caravan": {"label": "Irregular Pathway on their Own or with a Caravan", "color": "#faa41a"}
};

const financeText = {
    "1": {"label":"No Response"}
};

function bubbleChart() {
//   var width = 1500;
//   var height = 700;
const width = 1400;
const height = 1000;
const sqLen = 1;
const sideWidth = 0;
  var padding = 2;
  var tooltip = floatingTooltip('gates_tooltip');
  var center = { x: width / 2, y: height / 2 };

  var yearCenters = {
    "GTM": { x: width / 5.4, y: height / 2 },
    "HND": { x: width / 1.9, y: height / 2 },
    "SLV": { x: 2.5 * (1 * width / 3), y: height / 2 }
  };
  
    var beeCenters = {
    "all loans": { x: width / 5, y: 0 },
    "some loans": { x: width / 1.9, y:0 },
    "no loans": { x: 2.5 * (1 * width / 3), y:0 }
  };
  
var meansCenters = {
    "regular": { x: width / 7, y: height / 2 },
    "irregular on own, with caravan": { x: 2.9 * (1 * width / 5), y: height / 2 },
    "irrregular coyote": { x: 3.5 * (1 * width / 5), y: height / 2 }
  };
  
  var yearsTitleX = {
    "Guatemala": 180,  //  $1.2 Billion Migrants Spend to Migrate
    "Honduras": width / 2.2,  // $450 Million Billion Migrants Spend to Migrate
    "El Salvador": width - 310   // {$520 Million Migrants Spend to Migrate}
  };
  
var yearsTitleX2 = {
    "$1.2 Billion": 180,  //  $1.2 Billion Migrants Spend to Migrate
    "$450 Million": width / 2.2,  // $450 Million Billion Migrants Spend to Migrate
    "$520 Million": width - 310   // {$520 Million Migrants Spend to Migrate}
  };
  
var yearsTitleX3 = {
    "Migrants Spend to Migrate": 180,  //  $1.2 Billion Migrants Spend to Migrate
    "Migrants Spend to Migrate ": width / 2.2,  // $450 Million Billion Migrants Spend to Migrate
    "Migrants Spend to Migrate  ": width - 310   // {$520 Million Migrants Spend to Migrate}
  };
  
var meansTitleX = {
    "Regular Pathway": 120,
    "Irregular Pathway": width - 490
   //  "Irregular Pathway": width - 250
  };
  
var meansTitleX2 = {
    "$240 Million": 120,
    "$2.2 Billion": width - 490
   //  "Irregular Pathway": width - 250
  };
  
var meansTitleX3 = {
    "Migrants Spend to Migrate": 120,
    "Migrants Spend to Migrate  ": width - 490
   //  "Irregular Pathway": width - 250
  };
  
 var financeTitleX = {
    "56%": 50,
    "7%": width - 720,
    "36%": width - 320
  };
  
   var financeTitleX2 = {
    "Finance Migration ": 50,
    "Finance Migration": width - 720,
    "Finance Migration  ": width - 320
  };
  
     var financeTitleX3 = {
    "Entirely with Loans": 50,
    "With Some Loans": width - 720,
    "Whithout Loans": width - 320
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
    
  var posScaleMonths = d3.scaleLinear().domain([20,22000]);
    posScale.range([0, height]);
 
var posScaleRev = d3.scaleLinear().domain([22000,0]); 
    posScaleRev.range([0, height]); 
    
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

//   var fillColor = d3.scaleOrdinal()
//     .domain(['low', 'medium', 'high'])
//     .range(['#3ba7c9', '#1540c4', '#e23cad']);

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
        valuenull: d.nul,
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
        
    svg = d3.select("#frame-cost")
      .append('svg')
      .attr("viewBox", [-(sideWidth + sqLen), 0, width + (sideWidth + sqLen), height]);

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
      .attr('stroke-width', .4)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);
      

    bubbles = bubbles.merge(bubblesE);

    bubbles.transition()
    .ease(d3.easeBounce)
      .duration(1)
      .attr('r', function (d) { return d.radius; });
      
    simulation.nodes(nodes);

    groupBubbles();
  }
  
function axis() {
d3.select("svg").append("svg").attr("class","axis")
    .call(d3.axisRight(posScaleRev).ticks(5).tickFormat((d, i) => ['50', '40', '25', '15', '0'][i]).tickSize(0))
    .call(g => g.selectAll(".tick text").attr("class","axis")
        .attr("x", 4)
        .attr("dy", -5));
d3.select("svg").append("svg")
    .call(d3.axisRight(posScaleRev).ticks(5).tickFormat((d, i) => ['Months', 'Months', 'Months', 'Months', 'Months'][i]).tickSize(0))
    .call(g => g.selectAll(".tick text").attr("class","axis2")
        .attr("x", 4)
        .attr("dy", 8));
        
        
        
    }

function removeaxis(){
d3.selectAll(".axis,.axis2")
	.style("opacity",0);
	}
	
function updateaxis(){
d3.selectAll(".axis,.axis2")
	.style("opacity",1);
	}
	
	

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
      removeaxis();
       removeaxis();
    remAvRegAnn();

      


    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
	simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
    simulation.alpha(1).restart();
  }

  function splitBubbles() {
    hideYearTitles();
    hideFinanceTitles();
   showMeansTitles();
   removeaxis();
    removeaxis();
    remAvRegAnn();

    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeMeansPos));
	simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
    simulation.alpha(1).restart();
  }
  
function splitBubblesCountry() {
    hideMeansTitles();
    hideFinanceTitles();
    showYearTitles();
    removeaxis();
    remAvRegAnn();
    
  

    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeCountryPos));
    simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));

    simulation.alpha(1).restart();
  }

const controller = new ScrollMagic.Controller();

const scrollAppearUSDepartment = new ScrollMagic.Scene({
                                    triggerElement:".forceLink1",
                                    triggerHook:'onLeave', 
                                    duration: "500%",       
                                  })
                                  .on("enter",(e)=>{
                                  addAllAnn(),
                                  upAllAnn();
                                 
                                	})
                                //   .addIndicators({name:"forceLink"})
                                  .addTo(controller);

const scrollUndoUSDepartment = new ScrollMagic.Scene({
                                    triggerElement:".forceLinka",
                                   
                                  })
                                  .on("leave",(e)=>{
                                  groupBubbles(),
                                  remAllAnn();
                                	})
                                  .addTo(controller);
                                  
const scrollFromUSToGuatem = new ScrollMagic.Scene({
                                    triggerElement:".forceLink2",
        							triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                                  splitBubblesCountry(),
                                  addGuatAnn(),
                                  upGuatAnn(),
                                   remAllAnn();
                                  
                                	})
                                  .addTo(controller);

const scrollUndoFromUSToGuatem = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkb"
        
                                  })
                                  .on("leave",(e)=>{
                                  groupBubbles(),
                                  remAllAnn(),
                                   remGuatAnn();
                                  
                                	})
                                  .addTo(controller);
                                  
const scrollFromGuatToHon = new ScrollMagic.Scene({
                                    triggerElement:".forceLink3",
        							triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                    
                                  addHonAnn(),
                                  remAllAnn(),
                                  upHonAnn();                    
                                	})
                                  .addTo(controller);

const scrollUndoFromGuatToHon = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkc"
        
                                  })
                                  .on("leave",(e)=>{
                                  remAllAnn(),
                                   remHonAnn();
                                  
                                	})
                                  .addTo(controller);
                                  
const scrollFromHonToSlv = new ScrollMagic.Scene({
                                    triggerElement:".forceLink4",
        							triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                              remAllAnn(),
                                  addSlvAnn(),
                                  upSlvAnn();
                                  
                                  
                                	})
                                  .addTo(controller);

const scrollUndoFromHonToSlv = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkd"
        
                                  })
                                  .on("leave",(e)=>{
                                  remAllAnn(),
                                   remSlvAnn();
                                  
                                	})
                                  .addTo(controller);
                                  
                                  
const scrollSplitMeans = new ScrollMagic.Scene({
                                    triggerElement:".forceLink5",
        							triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                                   splitBubbles(),
                                   remHonAnn(),
                                   remGuatAnn(),
                                   remAllAnn(),
                                   remSlvAnn();
                                	})
                                  .addIndicators({name:"forceLink5"})
                                  .addTo(controller);

const scrollUndoSplitMeans = new ScrollMagic.Scene({
                                    triggerElement:".forceLinke"
        
                                  })
                                  .on("enter",(e)=>{
                                  addGuatAnn(),
                                  addSlvAnn(),
                                  remAllAnn(),
                                  addHonAnn();
                                  
                                	})
                                  .addIndicators({name:"forceLinke"})
                                  .addTo(controller);  
                                  
const scrollHighlightIrrCoy = new ScrollMagic.Scene({
                                    triggerElement:".forceLink6",
       								 triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                                  remAllAnn(),
                             	  highlightIrreCoy();
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);

const scrollUndoHighlightIrrCoy = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkf"
        
                                  })
                                  .on("leave",(e)=>{
                                  remAllAnn(),
                                  
                                    fillColorN();
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller); 
                                  
const scrollHighlightIrrOwn = new ScrollMagic.Scene({
                                    triggerElement:".forceLink7",
       								 triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                                  remAllAnn(),
                             	  highlightIrreOwn();
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);

const scrollUndoHighlightIrrOwn = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkg"
        
                                  })
                                  .on("leave",(e)=>{
                                  remAllAnn(),
                                  
                                   highlightIrreCoy();
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller); 
                                  
const scrollHighlightReg = new ScrollMagic.Scene({
                                    triggerElement:".forceLink8",
       								 triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                                  remAllAnn(),
                             	  highlightRegular();
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);

const scrollUndoHighlighReg = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkh"
        
                                  })
                                  .on("leave",(e)=>{
                                  remAllAnn(),
                                  
                                   highlightRegular();
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller); 
                                  
const scrollBeeswarm = new ScrollMagic.Scene({
                                    triggerElement:".forceLink9",
       								 triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                                  remAllAnn(),
                                  fillColorN(),
                                  axis(),
                                  updateaxis();
                             	 splitBubblesBee(),
                             	 addAvICAnn(),
                             	 upAvICAnn();
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);

const scrollUndoBeeswarm = new ScrollMagic.Scene({
                                    triggerElement:".forceLinki"
        
                                  })
                                  .on("leave",(e)=>{
                                  splitBubbles(),
                                  remAllAnn(),
                                 removeaxis(),
                                   highlightRegular(),
                                   remAvICAnn();
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller); 


                                  
const scrollLabelIrrOwn = new ScrollMagic.Scene({
                                    triggerElement:".forceLink10",
       								 triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                                  addAvIOAnn(),
                                  remAllAnn(),
                                   remAvICAnn(),
                                	upAvIOAnn();
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);

const scrollUndoLabelIrrOwn = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkj"
        
                                  })
                                  .on("leave",(e)=>{
                                  remAllAnn(),
                                   remAvIOAnn();
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller); 

const scrollLabelReg = new ScrollMagic.Scene({
                                    triggerElement:".forceLink11",
       								 triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                                 addAvRegAnn(),
                                 remAllAnn(),
                                	upAvRegAnn(),
                                	remAvIOAnn();
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);

const scrollUndoLabelReg = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkk"
        
                                  })
                                  .on("leave",(e)=>{
                                  remAllAnn(),
                                  splitBubblesBee(),
                                  remAvRegAnn();
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller); 






// 
// const scrollHighlightIrrOwn = new ScrollMagic.Scene({
//                                     triggerElement:".forceLink4"
//         
//                                   })
//                                   .on("enter",(e)=>{
//                              	  highlightIrreOwn();
//                                 	})
//                                   .addIndicators({name:"forceLink"})
//                                   .addTo(controller);
// 
// const scrollUndoHighlightIrrOwn = new ScrollMagic.Scene({
//                                     triggerElement:".forceLinkd"
//         
//                                   })
//                                   .on("leave",(e)=>{
//                                    highlightIrreCoy();
//                                   // fillColorN();
//                                 	})
//                                //    .addIndicators({name:"forceLink"})
//                                   .addTo(controller);      
//                                   
// const scrollHighlightReg = new ScrollMagic.Scene({
//                                     triggerElement:".forceLink5"
//         
//                                   })
//                                   .on("enter",(e)=>{
//                              	  highlightRegular();
//                                 	})
//                                   .addIndicators({name:"forceLink"})
//                                   .addTo(controller);
// 
// const scrollUndoHighlightReg = new ScrollMagic.Scene({
//                                     triggerElement:".forceLinke"
//         
//                                   })
//                                   .on("leave",(e)=>{
//                                    highlightIrreOwn();
//                                   fillColorN();
//                                 	})
//                                //    .addIndicators({name:"forceLink"})
//                                   .addTo(controller);                                   
// 
// const scrollSplitBee = new ScrollMagic.Scene({
//                                     triggerElement:".forceLink6"
//         
//                                   })
//                                   .on("enter",(e)=>{
//                              	 splitBubblesBee();
//                                 	})
//                                   .addIndicators({name:"forceLink"})
//                                   .addTo(controller);
// 
// const scrollUndoSplitBee = new ScrollMagic.Scene({
//                                     triggerElement:".forceLinkf"
//         
//                                   })
//                                   .on("leave",(e)=>{
//                                    highlightRegular();
//                                  splitBubbles();
//                                 	})
//                                //    .addIndicators({name:"forceLink"})
//                                   .addTo(controller);                                   
//                                   


    
  function splitBubblesBee() {
  	hideFinanceTitles();
      hideYearTitles();
      hideMeansTitles();
      showFinanceTitles();
    hideNullValues();
 //    remAvRegAnn();
 	fillColorN();
    updateaxis();

   
        

	simulation.force('x', d3.forceX().strength(forceStrength).x(nodeBeePosb));
    simulation.force('y', d3.forceY().strength(.06).y(function(d){return height - posScale(d.valuenull);}));
// 	simulation.filter(function(d){ return d.value <= 1; }).force('y', d3.forceY().strength(.06).y(5000));
	
    simulation.alpha(1).restart();
  }
  
//  function splitBubblesBeeNull() { 
//    d3.selectAll('circle').select(function(d){ if (d.value <= 1) return this;}).
//     simulation.force('y', d3.forceY().strength(.06).y(-1000));
//   
//   
// //   attr("transform", "translate(770,0)"
// //   function (d) { if (d.value <= 1) return -770;
// 
// //   simulation.force('y', d3.forceY().strength(.06).y(function (d) { if (d.value <= 1) return -770;}));
// //   simulation.alpha(1).restart();
// }

  function hideYearTitles() {
    svg.selectAll('.year,.year2,.year3').remove();
  }
  
    function hideMeansTitles() {
    svg.selectAll('.means,.means2,.means3').remove();
  }
  
    function hideFinanceTitles() {
    svg.selectAll('.finance,.finance2,.finance3').remove();
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
      .attr('y', 105)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
  var yearsData2 = d3.keys(yearsTitleX2);
    var years2 = svg.selectAll('.name')
      .data(yearsData2);

    years2.enter().append('text')
      .attr('class', 'year2')
      .attr('x', function (d) { return yearsTitleX2[d]; })
      .attr('y', 140)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
      
var yearsData3 = d3.keys(yearsTitleX3);
    var years3 = svg.selectAll('.name')
      .data(yearsData3);

    years3.enter().append('text')
      .attr('class', 'year3')
      .attr('x', function (d) { return yearsTitleX3[d]; })
      .attr('y', 160)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });      
  }
  
    function showMeansTitles() {

    var nameData = d3.keys(meansTitleX);
    var nameMeans = svg.selectAll('.name')
      .data(nameData);

    nameMeans.enter().append('text')
      .attr('class', 'means')
      .attr('x', function (d) { return meansTitleX[d]; })
      .attr('y', 105)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
var nameData2 = d3.keys(meansTitleX2);
    var nameMeans2 = svg.selectAll('.name')
      .data(nameData2);

    nameMeans2.enter().append('text')
      .attr('class', 'means2')
      .attr('x', function (d) { return meansTitleX2[d]; })
      .attr('y', 140)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });   
      
var nameData3 = d3.keys(meansTitleX3);
    var nameMeans3 = svg.selectAll('.name')
      .data(nameData3);

    nameMeans3.enter().append('text')
      .attr('class', 'means3')
      .attr('x', function (d) { return meansTitleX3[d]; })
      .attr('y', 160)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });     
      
  }
  
      function showFinanceTitles() {

    var financeData = d3.keys(financeTitleX);
    var finance = svg.selectAll('.name')
      .data(financeData);

    finance.enter().append('text')
      .attr('class', 'finance')
      .attr('x', function (d) { return financeTitleX[d]; })
      .attr('y', 60)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
    var financeData2 = d3.keys(financeTitleX2);
    var finance2 = svg.selectAll('.name')
      .data(financeData2);

    finance2.enter().append('text')
      .attr('class', 'finance2')
      .attr('x', function (d) { return financeTitleX2[d]; })
      .attr('y', 80)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
var financeData3 = d3.keys(financeTitleX3);
    var finance3 = svg.selectAll('.name')
      .data(financeData3);

    finance3.enter().append('text')
      .attr('class', 'finance3')
      .attr('x', function (d) { return financeTitleX3[d]; })
      .attr('y', 100)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
  }
  
  

  
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black').style('stroke-width','2');

    $("#gates_tooltip").empty();
    const tooltipTemplate = $(".tooltip.template");
    let tooltipContent = tooltipTemplate.clone();
    let pathwayColor = pathwayAttr[d.name].color;

    tooltipContent.find(".side-color").css("background", pathwayColor);
    tooltipContent.find(".text-color").css("color", pathwayColor);
    tooltipContent.find(".label-cost").html("$" + addCommas(d.value));
    tooltipContent.find('.label-cost').filter(function () { if (d.value <= 1) return this;}).html("Didn't Respond");
    tooltipContent.find(".label-country").html(countryText[d.year].label);
    tooltipContent.find(".label-pathway").html(pathwayAttr[d.name].label);

    tooltipContent.children().appendTo("#gates_tooltip");

    // tooltip.showTooltip(content, d3.event);
    tooltip.showTooltip(d3.event);
  }

  function hideDetail(d) {
    d3.select(this)
     .style('stroke', function (d) { if (d.value <= 1) return fillColor(d.name);})
      .style('stroke-width', function (d) { if (d.value <= 1) return .9;})
      .style('stroke-width',function (d) { if (d.value > 1) return 0;});

    tooltip.hideTooltip();
  }

  chart.toggleDisplay = function (displayName) {
    if (displayName === 'year') {
      splitBubbles();
    }   
   else if (displayName === 'country') 
      splitBubblesCountry();
      
// 	else if (displayName === 'uncolor') 
//       changeColor();
      
//     else if (displayName === 'colorb') 
//       meansColor();
      
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

// function changeColor(){
//   d3.selectAll("circle")
//     .transition()
//     .duration(2000)
//     .style('fill', function (d) { if (d.value <= 1) return "#fff" ;})
//     .style('stroke', function (d) { if (d.value <= 1) return "#662d91" ;})
// 	.style('stroke-width', function (d) { if (d.value <= 1) return .9;})
// 	.attr('fill', function (d) { if (d.value > 1) return "#662d91";});
	      // .attr('stroke-width', .1)
// 	.style("fill", function (d) { if (d.value > 1) return "#662d91" ;})
//     .style("fill", function (d) { if (d.value <= 1) return "#fff" ;});
//     .style("stroke-width",0);
// }

  var fillColor = d3.scaleOrdinal()
    .domain(['low', 'medium', 'high'])
    .range(['#662d91', '#faa41a', '#e23cad']);
    
var highlightregular = d3.scaleOrdinal()
    .domain(['low', 'medium', 'high'])
    .range(['#e9d7f7', '#fff6e8', '#e23cad']); 
    
 var highlightirrcoy = d3.scaleOrdinal()
    .domain(['low', 'medium', 'high'])
    .range(['#662d91', '#fff6e8', '#ffdbf5']);    
    
    var highlightirrown = d3.scaleOrdinal()
    .domain(['low', 'medium', 'high'])
    .range(['#e9d7f7', '#faa41a', '#ffdbf5']);  
    
 function fillColorN(){
d3.selectAll("circle")
    .transition()
    .duration(2000)

      .attr('fill', function (d) { if (d.value > 1) return fillColor(d.name);})
      .style('fill', function (d) { if (d.value <= 1) return "#fff";})
      .style('stroke', function (d) { if (d.value <= 1) return fillColor(d.name);})
      .style('stroke-width', function (d) { if (d.value <= 1) return .9;});
//       .attr('stroke', function (d) { return d3.rgb(highlightirrcoy(d.name)).darker(); })
      // .style('stroke-width', .1);
}
    
    
function highlightRegular(){
d3.selectAll("circle")
    .transition()
    .duration(2000)

      .attr('fill', function (d) { if (d.value > 1) return highlightregular(d.name);})
      .style('fill', function (d) { if (d.value <= 1) return "#fff";})
      .style('stroke', function (d) { if (d.value <= 1) return highlightregular(d.name);})
      .style('stroke-width', function (d) { if (d.value <= 1) return .9;});
//       .attr('stroke', function (d) { return d3.rgb(highlightirrcoy(d.name)).darker(); })
      // .style('stroke-width', .1);
}

function highlightIrreCoy(){
d3.selectAll("circle")
    .transition()
    .duration(2000)
      .attr('fill', function (d) { if (d.value > 1) return highlightirrcoy(d.name);})
      .style('fill', function (d) { if (d.value <= 1) return "#fff";})
      .style('stroke', function (d) { if (d.value <= 1) return highlightirrcoy(d.name);})
      .style('stroke-width', function (d) { if (d.value <= 1) return .9;});
//       .attr('stroke', function (d) { return d3.rgb(highlightirrcoy(d.name)).darker(); })
      // .style('stroke-width', .1);
}

function highlightIrreOwn(){
d3.selectAll("circle")
    .transition()
    .duration(2000)

      .attr('fill', function (d) { if (d.value > 1) return highlightirrown(d.name);})
      .style('fill', function (d) { if (d.value <= 1) return "#fff";})
      .style('stroke', function (d) { if (d.value <= 1) return highlightirrown(d.name);})
      .style('stroke-width', function (d) { if (d.value <= 1) return .9;});
//       .attr('stroke', function (d) { return d3.rgb(highlightirrcoy(d.name)).darker(); })
      // .style('stroke-width', .1);
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

const type = d3.annotationCustomType(d3.annotationCalloutCircle, {
  connector: { end: "arrow" }, note: {wrap: 370},
});

const annotations = [
  {
    note: { label: "Government Expenditure on Primary Education",
    bgPadding: {"top":-10,"left":10,"right":10,"bottom":10},
    title: "$1.3 Billion" },
    x: 260,
    y: 500,
    dy: 300,
    dx: -100,
    subject: { radius: 255, radiusPadding: 10 },
  },
];
const makeAnnotations = d3.annotation()
  
  //also can set and override in the note.padding property
  //of the annotation object
  .notePadding(10)
  .type(type)
  //accessors & accessorsInverse not needed
  //if using x, y in annotations JSON

  .annotations(annotations)

function addGuatAnn() {
d3.select("svg")
  .append("g")
  .attr('fill', "black")
  .attr("class", "annotation-group")  
  .attr("font-size", "1em")
  .call(makeAnnotations)
  }
  
  function remGuatAnn(){
d3.selectAll(".annotation-group").style("opacity",0);
  }
  
function upGuatAnn(){
d3.selectAll(".annotation-group").style("opacity",1);
  }
  

const annotations2 = [
  {
    note: { label: "Government Expenditure on Primary Education",
    bgPadding: {"top":-10,"left":10,"right":10,"bottom":10},
    title: "$700 Million" },
    x: 730,
    y: 500,
    dy: 300,
    dx: -100,
    subject: { radius: 185, radiusPadding: 10 },
  },
];
const makeAnnotations2 = d3.annotation()
  
  //also can set and override in the note.padding property
  //of the annotation object
.notePadding(10)
  .type(type)
  //accessors & accessorsInverse not needed
  //if using x, y in annotations JSON

  .annotations(annotations2)

function addHonAnn() {
d3.select("svg")
  .append("g")
  .attr('fill', "black")
  .attr("class", "annotation-groupb")
  .attr("font-size", "1em")
  .call(makeAnnotations2)
  }
  function remHonAnn(){
d3.selectAll(".annotation-groupb").style("opacity",0);
  }
  
function upHonAnn(){
d3.selectAll(".annotation-groupb").style("opacity",1);
  }
  
  
const annotations3 = [
  {
    note: { label: "Government Expenditure on Primary Education",
//     bgPadding: {"top":-10,"left":10,"right":10,"bottom":10},
    title: "$400 Million" },
    x: 1170,
    y: 500,
    dy: 300,
    dx: -100,
    subject: { radius: 130, radiusPadding: 10 },
  },
];
const makeAnnotations3 = d3.annotation()
  
  //also can set and override in the note.padding property
.notePadding(10)
  .type(type)
  //accessors & accessorsInverse not needed
  //if using x, y in annotations JSON

  .annotations(annotations3)

function addSlvAnn(){
d3.select("svg")
  .append("g")
  .attr('fill', "black")
  .attr("class", "annotation-groupc")
  .attr("font-size", "1em")
  .style("opacity",1)
  .call(makeAnnotations3);
  }
  
function remSlvAnn(){
d3.selectAll(".annotation-groupc").style("opacity",0);
  }
  
function upSlvAnn(){
d3.selectAll(".annotation-groupc").style("opacity",1);
  }
  
  const annotations4 = [
  {
    note: { label: "spent by the U.S. Department of Homeland Security to apprehend El Salvadoreans, Guatemalans, and Hondurans at the Southwest Border",
//     bgPadding: {"top":-10,"left":10,"right":10,"bottom":10},
    title: "$2.9 Billion" },
    x: 690,
    y: 500,
    dy: 250,
    dx: 320,
    subject: { radius: 390, radiusPadding: 10 },
  },
];
const makeAnnotations4 = d3.annotation()
  
  //also can set and override in the note.padding property
.notePadding(15)
  .type(type)
  //accessors & accessorsInverse not needed
  //if using x, y in annotations JSON

  .annotations(annotations4)

function addAllAnn(){
d3.select("svg")
  .append("g")
  .attr('fill', "black")
  .attr("class", "annotation-groupd")
  .attr("font-size", "1em")
  .style("opacity",1)
  .call(makeAnnotations4);
  }
  
function remAllAnn(){
d3.selectAll(".annotation-groupd").style("opacity",0);
  }
  
function upAllAnn(){
d3.selectAll(".annotation-groupd").style("opacity",1);
  }
  
 const type2 = d3.annotationCustomType(d3.annotationXYThreshold, {
   note: {wrap: 300},
//                 "lineType":"none",
//                 "orientation": "top",
//                 "align":"middle"}
}); 
  
const annotations5 = [
  {
    note: { label: "On average takes 20 months for the Migrant to pay back the cost.",
    title: "20 Months Debt Irregular Migration with Smuggler" },
    subject: {
              x1: 1500,
              x2: 100 
            },
            y: 650,
  }
];
const makeAnnotations5 = d3.annotation()
  
.notePadding(5)
  .type(type2)
  .annotations(annotations5)

function addAvICAnn(){
d3.select("svg")
  .append("g")
  .attr('fill', "#662d91")
  .attr("class", "annotation-groupe")
  .attr("font-size", "1em")
  .style("opacity",1)
  .call(makeAnnotations5);
  d3.selectAll(".annotation text").attr("transform", "translate(800,-123)");
  }
  
function remAvICAnn(){
d3.selectAll(".annotation-groupe").style("opacity",0);
  }
  
function upAvICAnn(){
d3.selectAll(".annotation-groupe").style("opacity",1);
  }
  
  
  const annotations6 = [
  {
    note: { label: "On average takes 7 months for the Migrant to pay back the cost.",
    title: "7 Months Debt Irregular Migration on Your Own" },
    subject: {
              x1: 1500,
              x2: 100 
            },
            y: 870,
  }
];

const makeAnnotations7 = d3.annotation()
  
.notePadding(5)
  .type(type2)
  .annotations(annotations6)

function addAvIOAnn(){
d3.select("svg")
  .append("g")
  .attr('fill', "#faa41a")
  .attr("class", "annotation-groupf")
  .attr("font-size", "1em")
  .style("opacity",1)
  .call(makeAnnotations7);
  d3.selectAll(".annotation text").attr("transform", "translate(800,-123)");
  }
  
function remAvIOAnn(){
d3.selectAll(".annotation-groupf").style("opacity",0);
  }
  
function upAvIOAnn(){
d3.selectAll(".annotation-groupf").style("opacity",1);
  }
  
  
  const annotations8 = [
  {
    note: { label: "On average takes 10 months for the Migrant to pay back the cost.",
    title: "10 Months Debt Regular Migration" },
    subject: {
              x1: 1500,
              x2: 100 
            },
            y: 790,
  }
];

const makeAnnotations8 = d3.annotation()
  
.notePadding(5)
  .type(type2)
  .annotations(annotations8)

function addAvRegAnn(){
d3.select("svg")
  .append("g")
  .attr('fill', "#e23cad")
  .attr("class", "annotation-groupg")
  .attr("font-size", "1em")
  .style("opacity",1)
  .call(makeAnnotations8);
  d3.selectAll(".annotation text").attr("transform", "translate(800,-82)");
  }
  
function remAvRegAnn(){
d3.selectAll(".annotation-groupg").style("opacity",0);
  }
  
function upAvRegAnn(){
d3.selectAll(".annotation-groupg").style("opacity",1);
  }


// Load the data.
d3.csv('data/dots_data2.csv', display);



// setup the buttons.
setupButtons();



