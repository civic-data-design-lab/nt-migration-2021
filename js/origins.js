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
const width = 1000;
const height = 3000;

// define svg
const svg = d3.select("#frame-origins")
    .append("svg")
        .attr("id", "viz-origins")
        .attr("viewBox", [0, 0, width, height]);

// Compute values.
const X = d3.map(data, x);
const Y = d3.map(data, y);
const Z = d3.map(data, z);

// series for area curves
const series = d3.stack()
    .keys(zDomain)
    .value(([y, I], z) => X[I.get(z)])
    // .order(order)
    .offset(offset)

(d3.rollup(I, ([i]) => i, i => Y[i], i => Z[i]))
    .map(s => s.map(d => Object.assign(d, {i: d.data[1].get(s.key)})));

// construct scales and axes
const xScale = d3.scaleLinear(xDomain, xRange);
const yScale = d3.scaleLinear(yDomain, yRange);
const color = d3.scaleOrdinal(zDomain, colors);
const yAxis = d3.axisLeft(yScale).ticks(height / 100, xFormat).tickSizeOuter(0);

// area
const area = d3.area()
    .curve(d3.curveMonotoneY) // convert to curve
    .x0(([x1]) => xScale(x1))
    .x1(([, x2]) => xScale(x2))
    .y(({i}) => yScale(Y[i]));

// load csv data and callback function
const dataset = d3.csv("./data/origins_migrants.csv", d3.autoType)
    .then(function(data) {
        if (!keys.length) {
            keys = data.columns;
        }

        if (!originsData.length) {
            originsData = data;
        }

        // plotTimeline(originsData);

        console.log(keys);
        console.log(originsData);
    });

// FUNCTIONS

// plot timeline steamgraph
function plotTimeline(data) {
    // areas
    svg.append("g")
            .attr("class", "g-sq")
        .selectAll("path")
        .data(series)
        .join("path")
            .attr("fill", ([{i}]) => color(Z[i]))
            .attr("d", area);
}

$(document).ready(function() {

})