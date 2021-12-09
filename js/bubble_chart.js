const countryText = {
    "GTM": "Guatemala",
    "HND": "Honduras",
    "SLV": "El Salvador"
};
const pathwayAttr = {
    "regular": {"label": "Through a Regular Pathway", "color": "#e23cad"},
    "irrregular coyote": {"label": "Using a Smuggler to Migrate", "color": "#662d91"},
    "irregular on own, with caravan": {"label": "Migrating on One's Own or with a Caravan", "color": "#faa41a"}
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
  var tooltip = floatingTooltip('viz-col');
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
    "Migrants Spent": 180,  //  $1.2 Billion Migrants Spend to Migrate
    "Migrants Spent ": width / 2.2,  // $450 Million Billion Migrants Spend to Migrate
    "Migrants Spent  ": width - 310   // {$520 Million Migrants Spend to Migrate}
  };
  
var yearsTitleX2 = {
    "$1.2 Billion": 180,  //  $1.2 Billion Migrants Spend to Migrate
    "$520 Million": width / 2.2,  // $450 Million Billion Migrants Spend to Migrate
    "$450 Million": width - 310   // {$520 Million Migrants Spend to Migrate}
  };
  
var yearsTitleX3 = {
    "Guatemala": 180,  //  $1.2 Billion Migrants Spend to Migrate
    "Honduras": width / 2.1,  // $450 Million Billion Migrants Spend to Migrate
    "El Salvador": width - 310   // {$520 Million Migrants Spend to Migrate}
  };
  
var meansTitleX = {
    "Regular Pathway": 120,
    "Irregular Pathway": width - 490
   //  "Irregular Pathway": width - 250
  };
  
var meansTitleX2 = {
    "$240 Million": 120,
    "$2.0 Billion": width - 490
   //  "Irregular Pathway": width - 250
  };
  
var meansTitleX3 = {
    "Migrants Spent to Migrate": 120,
    "Migrants Spent to Migrate  ": width - 490
   //  "Irregular Pathway": width - 250
  };
  
 var financeTitleX = {
    "56%": 330,
    "8%": width - 720,
    "36%": width - 320
  };
  
   var financeTitleX2 = {
    "Financed Migration ": 330,
    "Financed Migration": width - 720,
    "Financed Migration  ": width - 320
  };
  
     var financeTitleX3 = {
    "Entirely with Loans": 330,
    "with Some Loans": width - 720,
    "without Loans": width - 320
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
      .attr('id', 'cost-svg')
      .attr("viewBox", [-(sideWidth + sqLen), 0, width + (sideWidth + sqLen), height + 20]);
    //   .classed("svg-content-responsive", true)
    //   .classed("svg-container", true) 
    //   .attr("preserveAspectRatio", "xMidYMid meet");

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
      .attr('stroke-width', .0)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail);
      

    bubbles = bubbles.merge(bubblesE);

    bubbles.transition()
    .ease(d3.easeBounce)
      .duration(.5)
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
    remFinanceLabel();
      


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
   remFinanceLabel();

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
    remFinanceLabel();
    
  

    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeCountryPos));
    simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));

    simulation.alpha(1).restart();
  }

const controller = new ScrollMagic.Controller();

const scrollLabel = new ScrollMagic.Scene({
                                    triggerElement:".forceLink0",
                                    triggerHook:'onLeave', 
                                    duration: "500%",       
                                  })
                                  .on("enter",(e)=>{
                                  addTotalLabelCost();
//                                   upAllAnn();
                                 
                                	})

                                //   .addIndicators({name:"forceLink"})
                                  .addTo(controller);
                                  
const scrollUndoLabel = new ScrollMagic.Scene({
                                    triggerElement:".forceLink00",
                                   
                                  })
                                  .on("leave",(e)=>{
                                  groupBubbles(),
                                  remAllAnn(),
                                fillColorN(),
                                  remSlvAnn(),
                                  remGuatAnn(),
                                  remHonAnn(),
                                  remIrrSmugg(),
                                  remIrrOwnCar(),
                                   remTotalLabelCost();
                                    
                                	})
                                  .addTo(controller);



const scrollAppearUSDepartment = new ScrollMagic.Scene({
                                    triggerElement:".forceLink1",
                                    triggerHook:'onLeave', 
                                    duration: "500%",       
                                  })
                                  .on("enter",(e)=>{
                               
                                  addAllAnn();
//                                   upAllAnn();
                                 
                                	})
                                //   .addIndicators({name:"forceLink"})
                                  .addTo(controller);

const scrollUndoUSDepartment = new ScrollMagic.Scene({
                                    triggerElement:".forceLinka",
                                   
                                  })
                                  .on("leave",(e)=>{
                                  groupBubbles(),
                                  addTotalLabelCost(),
                                  remAllAnn();
                                	})
                                  .addTo(controller);
                                  
const scrollFromUSToGuatem = new ScrollMagic.Scene({
                                    triggerElement:".forceLink2",
        							triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                                  splitBubblesCountry(),
                                   remAllAnn(),
                                  addGuatAnn(),
                                  upGuatAnn();
                      
                                  
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
              //                     .addIndicators({name:"forceLink5"})
                                  .addTo(controller);

const scrollUndoSplitMeans = new ScrollMagic.Scene({
                                    triggerElement:".forceLinke",
                                    triggerHook:'onEnter',
        
                                  })
                                  .on("leave",(e)=>{
                                  splitBubblesCountry(),
                                  addGuatAnn(),
                                  addSlvAnn(),
                                  remAllAnn(),
                                  addHonAnn(),
                                  fillColorN();
                                  
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);  
                                  
const scrollHighlightIrrCoy = new ScrollMagic.Scene({
                                    triggerElement:".forceLink6",
       								 triggerHook:'onLeave',
                                  })
                                  .on("enter",(e)=>{
                             //      remAllAnn(),
                            	 addIrrSmugg(),
                             	  highlightIrreCoy();
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);

const scrollUndoHighlightIrrCoy = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkf"
        
                                  })
                                  .on("leave",(e)=>{
                  //                 remAllAnn(),
                                  remIrrSmugg(),
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
                                  remIrrSmugg(),
                                  addIrrOwnCar(),
                             	  highlightIrreOwn();
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);

const scrollUndoHighlightIrrOwn = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkg"
        
                                  })
                                  .on("leave",(e)=>{
                                  remAllAnn(),
                                  upIrrSmugg(),
                                  remIrrOwnCar(),
                                  
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
                                  remIrrOwnCar(),
                             	  highlightRegular();
                             	  addReg();
                                	})
//                                   .addIndicators({name:"forceLinke"})
                                  .addTo(controller);

const scrollUndoHighlighReg = new ScrollMagic.Scene({
                                    triggerElement:".forceLinkh"
        
                                  })
                                  .on("leave",(e)=>{
                                  // remAllAnn(),
                                  remReg(),
                                  upIrrOwnCar();
                                  
                                 
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
                                  remTotalLabelCost(),
                                  
                                  updateaxis(),
                             	 splitBubblesBee(),
                             	 addFinanceLabel(),
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
                                  
                                  addTotalLabelCost(),
                                  remFinanceLabel(),
                                  remAllAnn(),
                                 removeaxis(),
                                 addReg(),
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
					 remFinanceLabel(),
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
                                  addFinanceLabel(),
                                  remAvRegAnn();
                                	})
                               //    .addIndicators({name:"forceLink"})
                                  .addTo(controller); 


    
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
//       .transition()
//       .duration(500)
//       .style('opacity','0')
//       .transition()
// //       .ease(d3.easeLinear)
//     .duration(500)
    .style('opacity','1')
//     .delay(function(d, i) {
//     return i * 75;
//   })
      .attr('x', function (d) { return yearsTitleX[d]; })
//       .attr('y', function (d) { if (yearsTitleX[d] === "Guatemala") {return 160}; })
      .attr('y', 105)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
  var yearsData2 = d3.keys(yearsTitleX2);
    var years2 = svg.selectAll('.name')
      .data(yearsData2);

    years2.enter().append('text')
//      .transition()
//       .ease(d3.easeLinear)
//     .duration(1000)
//     .delay(function(d, i) {
//     return i * 75;
//   })
      .attr('class', 'year2')
      .attr('x', function (d) { return yearsTitleX2[d]; })
      .attr('y', 140)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
      
var yearsData3 = d3.keys(yearsTitleX3);
    var years3 = svg.selectAll('.name')
      .data(yearsData3);

years3.enter().append('rect')
.attr('class', 'year3')
  .attr('x', 178)
  .attr('y', 478)
  .attr('width', 172)
  .attr('height', 32)
  .attr('fill', '#fff');
  

years3.enter().append('rect')
.attr('class', 'year3')
  .attr('x', 665)
  .attr('y', 478)
  .attr('width', 154)
  .attr('height', 32)
  .attr('fill', '#fff');
  
years3.enter().append('rect')
	.attr('class', 'year3')
  .attr('x', 1087)
  .attr('y', 478)
  .attr('width', 181)
  .attr('height', 32)
  .attr('fill', '#fff');

years3.enter().append('text')
      .attr('class', 'year3')
      .attr('x', function (d) { return yearsTitleX3[d]; })
      .attr('y', 506)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });      
  }
  
    function showMeansTitles() {

    var nameData = d3.keys(meansTitleX);
    var nameMeans = svg.selectAll('.name')
      .data(nameData);

    nameMeans.enter().append('text')
//      .transition()
//     .duration(1000)
//     .delay(function(d, i) {
//     return i * 75;
//   })
      .attr('class', 'means')
      .attr('x', function (d) { return meansTitleX[d]; })
      .attr('y', 110)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
var nameData2 = d3.keys(meansTitleX2);
    var nameMeans2 = svg.selectAll('.name')
      .data(nameData2);

    nameMeans2.enter().append('text')
//      .transition()
//     .duration(1000)
//     .delay(function(d, i) {
//     return i * 75;
//   })
      .attr('class', 'means2')
      .attr('x', function (d) { return meansTitleX2[d]; })
      .attr('y', 140)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });   
      
var nameData3 = d3.keys(meansTitleX3);
    var nameMeans3 = svg.selectAll('.name')
      .data(nameData3);

    nameMeans3.enter().append('text')
//      .transition()
//     .duration(1000)
//     .delay(function(d, i) {
//     return i * 75;
//   })
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
//      .transition()
//     .duration(1000)
//     .delay(function(d, i) {
//     return i * 75;
//   })
      .attr('class', 'finance')
      .attr('x', function (d) { return financeTitleX[d]; })
      .attr('y', 60)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
    var financeData2 = d3.keys(financeTitleX2);
    var finance2 = svg.selectAll('.name')
      .data(financeData2);

    finance2.enter().append('text')
//      .transition()
//     .duration(1000)
//     .delay(function(d, i) {
//     return i * 75;
//   })
      .attr('class', 'finance2')
      .attr('x', function (d) { return financeTitleX2[d]; })
      .attr('y', 80)
      .attr('text-anchor', 'start')
      .text(function (d) { return d; });
      
var financeData3 = d3.keys(financeTitleX3);
    var finance3 = svg.selectAll('.name')
      .data(financeData3);

    finance3.enter().append('text')
//        .transition()
//     .duration(1000)
//     .delay(function(d, i) {
//     return i * 75;
//   })
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
    tooltipContent.find('.label-cost').filter(function () { if (d.value <= 1) return this;}).html("N.A.");
    tooltipContent.find(".label-country").html(countryText[d.year]);
    tooltipContent.find(".label-pathway").html(pathwayAttr[d.name].label);

    tooltipContent.children().appendTo("#gates_tooltip");

    // tooltip.showTooltip(content, d3.event);
    tooltip.showTooltip(event);
  }

  function hideDetail(d) {
    d3.select(this)
     .style('stroke', function (d) { if (d.value <= 1) return fillColor(d.name);})
      .style('stroke-width', function (d) { if (d.value <= 1) return .9;});
//       .style('stroke-width',function (d) { if (d.value > 1) return 0;});

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
    .domain(['irrregular coyote', 'irregular on own, with caravan', 'regular'])
    .range(['#662d91', '#faa41a', '#e23cad']);   
    
 var highlightirrcoy = d3.scaleOrdinal()
    .domain(['irrregular coyote', 'irregular on own, with caravan', 'regular'])
    .range(['#662d91', '#f9e4c5', '#ffdbf5']);    
    
var highlightirrown = d3.scaleOrdinal()
    .domain(['irrregular coyote', 'irregular on own, with caravan', 'regular'])
    .range(['#e9d7f7', '#faa41a', '#ffdbf5']); 
    
var highlightregular = d3.scaleOrdinal()
    .domain(['irrregular coyote', 'irregular on own, with caravan', 'regular'])
    .range(['#e9d7f7', '#f9e4c5', '#e23cad']);   
    
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

function addGuatAnn(){ 
		d3.select("svg")
		.append("ellipse")
		  .attr('class', "subject guat")
			   .attr("cx", 260)
			   .attr("cy", 500)
			   .attr("rx", 255)
			   .attr("ry", 255);
	d3.select("svg")
		.append('text')
		  .attr('x', 170)
		  .attr('y', 800)
			.attr('class', "annotation-note  guat")	
		  .text("Government Spent")
		  .style("fill","#6c757d");
		d3.select("svg")
		.append('text')
		  .attr('x', 170)
		  .attr('y', 837)
			.attr('class', "annotation-note-title  guat")
			.style("fill","#6c757d")
			
		  .text("$1.3 Billion");
		  d3.select("svg").append("line")          
    .style("stroke", "black")  
        .attr('class', "guat")
    .attr("x1", 165)
    .attr("y1", 750)   
    .attr("x2", 165)  
    .attr("y2", 870);
		d3.select("svg")
		.append('text')
		  .attr('x', 170)
		  .attr('y', 863)
		.attr('class', "annotation-note-medium  guat")	
		  .text("on Primary Education")
		  .style("fill","#6c757d")
		  .call(wrap,290);
		  }
  
  function remGuatAnn(){
d3.selectAll(".guat").remove();
  }
  
function upGuatAnn(){
d3.selectAll(".guat").style("opacity",1);
  }


function addHonAnn() { 
		d3.select("svg")
		.append("ellipse")
		  .attr('class', "subject hond")
			   .attr("cx", 730)
			   .attr("cy", 500)
			   .attr("rx", 200)
			   .attr("ry", 200);
	d3.select("svg")
		.append('text')
		  .attr('x', 630)
		  .attr('y', 800)
			.attr('class', "annotation-note  hond")	
		  .text("Government Spent")
		  .style("fill","#6c757d");	   
		d3.select("svg")
		.append('text')
		  .attr('x', 630)
		  .attr('y', 837)
			.attr('class', "annotation-note-title  hond")
			.style("fill","#6c757d")
		  .text("$700 Million");
d3.select("svg").append("line")          
    .style("stroke", "black")  
    .attr('class', "hond")
    .attr("x1", 625)
    .attr("y1", 683)   
    .attr("x2", 625)  
    .attr("y2", 870);
		d3.select("svg")
		.append('text')
		  .attr('x', 630)
		  .attr('y', 863)
		.attr('class', "annotation-note-medium  hond")	
		  .text("on Primary Education")
		  .style("fill","#6c757d")
		  .call(wrap,290);

		  }
		  
		  
  function remHonAnn(){
d3.selectAll(".hond").remove();
  }
  
function upHonAnn(){
d3.selectAll(".hond").style("opacity",1);
  }


function addSlvAnn(){ 
		d3.select("svg")
		.append("ellipse")
		  .attr('class', "subject salv")
			   .attr("cx", 1170)
			   .attr("cy", 500)
			   .attr("rx", 170)
			   .attr("ry", 170);
		d3.select("svg")
		.append('text')
		  .attr('x', 1090)
		  .attr('y', 800)
			.attr('class', "annotation-note  salv")	
		  .text("Government Spent")
		  .style("fill","#6c757d");	 	   
		d3.select("svg")
		.append('text')
		  .attr('x', 1090)
		  .attr('y', 837)
			.attr('class', "annotation-note-title  salv")
			.style("fill","#6c757d")
		  .text("$400 Million");
	d3.select("svg").append("line")          
    .style("stroke", "black")  
        .attr('class', "salv")
            .attr("x1", 1085)
    .attr("y1", 660)   
    .attr("x2", 1085)  
    .attr("y2", 870);
		d3.select("svg")
		.append('text')
		  .attr('x', 1090)
		  .attr('y', 863)
		.attr('class', "annotation-note-medium  salv")	
		  .text("on Primary Education")
		  .style("fill","#6c757d")
		  .call(wrap,290);
		  }
  
function remSlvAnn(){
d3.selectAll(".salv").remove();
  }
  
function upSlvAnn(){
d3.selectAll(".salv").style("opacity",1);
  }
  
function addAllAnn(){
d3.select("svg")
.append("ellipse")
  .attr('class', "subject allcirc")    
       .attr("cx", 700)
       .attr("cy", 500)
       .attr("rx", 390)
       .attr("ry", 390);
d3.select("svg")
.append('text')
  .attr('x', 1070)
  .attr('y', 830)
	.attr('class', "annotation-note-title  allcirc")
  .text("$2.9 Billion");
  d3.select("svg").append("line")          
    .style("stroke", "black")  
        .attr('class', "allcirc")
            .attr("x1", 1065)
    .attr("y1", 660)   
    .attr("x2", 1065)  
    .attr("y2", 944);
d3.select("svg")
.append('text')
  .attr('x', 1070)
  .attr('y', 860)
	.attr('class', "annotation-note-label  allcirc")	
  .text("spent by the U.S. Department of Homeland Security to apprehend El Salvadorans, Guatemalans, and Hondurans at the Southwest Border.")
  .call(wrap,250);
  }
  
function remAllAnn(){
d3.selectAll(".allcirc").remove();

}

function upAllAnn(){
d3.selectAll(".allcirc").remove();

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
    title: "7 Months Debt Irregular Migration on One's Own" },
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
  
function addIrrSmugg(){
d3.select("svg")
.append('text')
  .attr('x', 650)
  .attr('y', 830)
	.attr('class', "annotation-note-title  irrsmuggler")
	.style('fill','#662d91')
  .text("$1.7 Billion");
d3.select("svg")
.append('text')
  .attr('x', 650)
  .attr('y', 860)
	.attr('class', "annotation-note-label  irrsmuggler")

  .text("Spent Traveling with a Smuggler.")
  .call(wrap,250);
  }
  
function remIrrSmugg(){
d3.selectAll(".irrsmuggler").remove();

}

function upIrrSmugg(){
d3.select("svg")
.append('text')
  .attr('x', 650)
  .attr('y', 830)
	.attr('class', "annotation-note-title  irrsmuggler")
	.style('fill','#662d91')
  .text("$1.7 Billion");
d3.select("svg")
.append('text')
  .attr('x', 650)
  .attr('y', 860)
	.attr('class', "annotation-note-label  irrsmuggler")
	
  .text("Spent Traveling with a Smuggler.")
  .call(wrap,250);
  }
  
function addIrrOwnCar(){
d3.select("svg")
.append('text')
  .attr('x', 650)
  .attr('y', 830)
	.attr('class', "annotation-note-title  irrown")
	.style('fill','#faa41a')
  .text("$230 Million");
d3.select("svg")
.append('text')
  .attr('x', 650)
  .attr('y', 860)

	.attr('class', "annotation-note-label  irrown")	
  .text("Spent traveling on One's own or with Caravans.")
  .call(wrap,250);
  }
  
function remIrrOwnCar(){
d3.selectAll(".irrown").remove();

}

function upIrrOwnCar(){
d3.select("svg")
.append('text')
  .attr('x', 650)
  .attr('y', 830)
	.attr('class', "annotation-note-title  irrown")
	.style('fill','#faa41a')
  .text("$230 Million");
d3.select("svg")
.append('text')
  .attr('x', 650)
  .attr('y', 860)
	.attr('class', "annotation-note-label  irrown")	
  .text("Spent traveling on One's own or with Caravans.")

  .call(wrap,250);
  }
  
function addReg(){  
 d3.select(".means2").style("fill","#e23cad");}
 
 function remReg(){  
 d3.select(".means2").style("fill","black");}
 
 function addTotalLabelCost(){
d3.select("svg")
.append('text')
  .attr('x', 5)
  .attr('y', 25)
.attr('class', "annotation-note-title  totlabcost")	
  .text("Estimated Annual Spending in 2021 by Migrants Traveling to the U.S. from Central America");
  }
  
function remTotalLabelCost(){
d3.selectAll(".totlabcost").remove();}

function upTotalLabelCost(){
d3.select("svg")
.append('text')
  .attr('x', 5)
  .attr('y', 25)

	.attr('class', "annotation-note-title  totlabcost")	
  .text("Estimated Annual Spending in 2021 by Migrants Traveling to the U.S. from Central America");
  }

 function addFinanceLabel(){
d3.select("svg")
.append('text')
  .attr('x', 5)
  .attr('y', 25)
.attr('class', "annotation-note-title  finlabcost")	
  .text("Financing Migration to the U.S.");
  }
  
function remFinanceLabel(){
d3.selectAll(".finlabcost").remove();}

function upFinanceLabelt(){
d3.select("svg")
.append('text')
  .attr('x', 5)
  .attr('y', 25)

	.attr('class', "annotation-note-title  finlabcost")	
  .text("Financing Migration to the U.S.");
  }
 


// Load the data.
d3.csv('data/dots_data2.csv', display);



// setup the buttons.
setupButtons();

// function (d){ if (d.name === "irrregular coyote") return 0.04; else .023}

 function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0, //<-- 0!
        lineHeight = 1.2, // ems
        x = text.attr("x"), //<-- include the x!
        y = text.attr("y"),
        dy = text.attr("dy") ? text.attr("dy") : 0; //<-- null check
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

