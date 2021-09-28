// VARIABLES
// D3 CHART VARIABLES
const width = 1200;
const height = 820;

// data variables
let keys = [];
let motivs = ["econ", "clim", "sec", "reun", "oth"];
let motivationsData = [];

// define svg
const svg = d3.select("#frame-motivations")
    .append("svg")
        .attr("id", "viz-motivations")
        .attr("viewBox", [0, 0, width, height])

const sqLen = 20;
const gap = 4;
const numPerRow = 50;

const scale = d3.scaleLinear()
    .domain([0, numPerRow - 1])
    .range([0, (sqLen + gap) * numPerRow]);

// load csv data and callback function
const dataset = d3.csv("./data/motivations.csv")
    .then(function(data) {
        if (!keys.length) {
            keys = data.columns;
        }

        if (!motivationsData.length) {
            motivationsData = data;
        }

        plotSquares(motivationsData);

        console.log(keys);
        console.log(motivationsData);
    });

// FUNCTIONS
function plotSquares(data) {
    // squares
    svg.append("g")
        .attr("class", "g-hh")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("id", d => "sq-" + d.rsp_id)
            .attr("class", "square")
            .attr("x", (d,i) => {
                const n = i % numPerRow;
                return scale(n);
            })
            .attr("y", (d,i) => {
                const n = Math.floor(i / numPerRow);
                return scale(n);
            })
            .attr("width", sqLen)
            .attr("height", sqLen)
            .attr("fill", "#1540c4")
};