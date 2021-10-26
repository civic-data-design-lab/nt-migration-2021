// VARIABLES
// data variables
let keys = [];
let originsData = [];

// look up attributes
const countryText = {
    "gtm": "Guatemala",
    "hnd": "Honduras",
    "slv": "El Salvador"
};

// D3 CHART VARIABLES
const width = 800;
const height = 3000;
const margin = 30;

// define svg
const svg = d3.select("#frame-origins")
    .append("svg")
        .attr("id", "viz-origins")
        .attr("viewBox", [0, 0, width, height]);

// load csv data and callback function
const dataset = d3.csv("./data/origins_migrants.csv", d3.autoType)
    .then(function(data) {
        if (!keys.length) {
            keys = data.columns;
        }

        if (!originsData.length) {
            originsData = data;
        }

        plotStreamgraph(originsData, {
            x: d => d.pct_mig_pop,
            y: d => d.year,
            z: d => d.country
        });

        console.log(keys);
        console.log(originsData);
    });

// FUNCTIONS

// plot timeline streamgraph
function plotStreamgraph(data, {
    x = ([, x]) => x, // given d in data, returns the (quantitative) x-value
    y = ([y]) => y, // given d in data, returns the (ordinal) y-value
    z = () => 1, // given d in data, returns the (categorical) z-value
    offset = d3.stackOffsetWiggle // stack offset method
    // order = d3.stackOrderInsideOut, // stack order method
  } = {}) {
    // // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);
  
    // Compute default x- and z-domains, and unique the z-domain.
    const yDomain = d3.extent(Y);
    const zDomain = new d3.InternSet(Z);
  
    // Omit any data not present in the z-domain.
    const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));
  
    // data point for a given unique x- and z-value.
    const series = d3.stack()
        .keys(zDomain)
        .value(([y, I], z) => X[I.get(z)])
        .offset(offset)
    (d3.rollup(I, ([i]) => i, i => Y[i], i => Z[i]))
        .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));
    console.log(series);
  
    // Compute the default y-domain. Note: diverging stacks can be negative.
    const xDomain = d3.extent(series.flat(2));
  
    // Construct scales and axes.
    const xScale = d3.scaleLinear()
        .domain(xDomain)
        .range([margin, width - margin]);
    const yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([margin, height - margin]);
    const color = d3.scaleOrdinal()
        .domain(zDomain)
        .range(["#d11f63", "#eb4927", "#ea8928"]);
    const yAxis = d3.axisLeft(yScale).ticks(12).tickSizeOuter(0).tickFormat(d3.format("d"));
  
    const area = d3.area()
        .curve(d3.curveMonotoneY)
        .x0(([x1]) => xScale(x1))
        .x1(([, x2]) => xScale(x2))
        .y(({i}) => yScale(Y[i]));
  
    // stream areas
    svg.append("g")
        .selectAll("path")
        .data(series)
        .join("path")
            .attr("d", area)
            .attr("fill", ([{i}]) => color(Z[i]))
        .on("mouseover", function(event, d) {
            // divSide.style("top", (divHtml) => {
            //     return (labelList.length == 5) ? ((scale(motivAttr[d.group].yPos) - sqLen/2)/height * 100) + "%"
            //     : (labelList.length == 6) ? ((scale(incomeAttr[d.group].yPos) - sqLen/2)/height * 100) + "%"
            //     : (labelList.length == 3) ? ((scale(cariAttr[d.group].yPos) - sqLen/2)/height * 100) + "%"
            //     : null;
            //     })
            //     .style("left", ((sideWidth + sqLen/2)/width * 100) + "%")
            //     .style("display", "block");
        })
        .on("mouseout", function() {
            // divSide.style("display", "none");
        });
  
    // axis
    svg.append("g")
        .attr("transform", `translate(${margin * 2}, 0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove());
  }

$(document).ready(function() {

})