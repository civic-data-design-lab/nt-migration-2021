// VARIABLES
// D3 CHART VARIABLES
const width = 1370;
const height = 720;

// data variables
let keys = [];
let motivs = ["econ", "clim", "sec", "reun", "oth"];
let motivationsData = [];

// define svg
const svg = d3.select("#frame-motivations")
    .append("svg")
        .attr("id", "viz-motivations")
        .attr("viewBox", [0, 0, width, height])

// square dimensions
const sqLen = 20;
const gap = 4;
const numPerRow = 56;

// colors
function colorMotivs(motivCode) {
    return motivCode == "econ" ? "#1540c4" // economics
        : motivCode == "clim" ? "#00a99d" // climate
        : motivCode == "sec" ? "#93278f" // security
        : motivCode == "reun" ?  "#eb4927" // reunification
        : motivCode == "oth" ?  "#f1a650" // other
        : "#CCCCCC";
};

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
            .attr("class", "g-sq")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("id", d => "sq-" + d.rsp_id)
            .attr("class", "square")
            .attr("x", (d,i) => {
                const nx = i % numPerRow;
                return scale(nx);
            })
            .attr("y", (d,i) => {
                const ny = Math.floor(i / numPerRow);
                return scale(ny);
            })
            .attr("width", d => {
                return d.motiv_cat.endsWith('1') ? sqLen
                : 0;
            })
            .attr("height", d => {
                return d.motiv_cat.endsWith('1') ? sqLen
                : 0;
            })
            .attr("fill", d => {
                let motiv = d.motiv_cat.split('-')[0];
                return colorMotivs(motiv);
            })

    // triangle bottom-left
    svg.append("g")
            .attr("class", "g-tri-bl")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
            .attr("id", d => "tri-bl-" + d.rsp_id)
            .attr("class", "tri-bl")
            .attr("d", (d, i) => {
                const nx = i % numPerRow;
                const ny = Math.floor(i / numPerRow);
                let triBotLeft = "M " + scale(nx) + " " + (scale(ny) + gap/2) + " L " + scale(nx) + " " + (scale(ny) + sqLen) + " L " + (scale(nx) + sqLen - gap/2) + " " + (scale(ny) + sqLen) + " Z";

                return (!d.motiv_cat.endsWith('1')) ? triBotLeft
                : null;
            })
            .attr("fill", d => {
                let motiv = d.motiv_cat.split('-')[0];
                return colorMotivs(motiv);
            })
        
        // triangle top-right
        svg.append("g")
                .attr("class", "g-tri-tr")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("id", d => "tri-bl-" + d.rsp_id)
                .attr("class", "tri-bl")
                .attr("d", (d, i) => {
                    const nx = i % numPerRow;
                    const ny = Math.floor(i / numPerRow);
                    let triTopRight = "M " + (scale(nx) + gap/2) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen - gap/2) + " Z";

                    return (d.motiv_cat.endsWith('2')) ? triTopRight
                    : null;
                })
                .attr("fill", d => {
                    let motiv = d.motiv_cat.split('-')[1];
                    return colorMotivs(motiv);
                })

        // triangle top for 3 responses
        svg.append("g")
                .attr("class", "g-tri-tr")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("id", d => "tri-bl-" + d.rsp_id)
                .attr("class", "tri-bl")
                .attr("d", (d, i) => {
                    const nx = i % numPerRow;
                    const ny = Math.floor(i / numPerRow);
                    let triTop = "M " + (scale(nx) + gap/2) + " " + scale(ny) + " L " + (scale(nx) + sqLen - gap/2) + " " + scale(ny) + " L " + (scale(nx) + sqLen/2) + " " + (scale(ny) + sqLen/2 - gap/2) + " Z";

                    return (d.motiv_cat.endsWith('3')) ? triTop
                    : null;
                })
                .attr("fill", d => {
                    let motiv = d.motiv_cat.split('-')[1];
                    return colorMotivs(motiv);
                })

        // triangle right for 3 responses
        svg.append("g")
                .attr("class", "g-tri-tr")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("id", d => "tri-bl-" + d.rsp_id)
                .attr("class", "tri-bl")
                .attr("d", (d, i) => {
                    const nx = i % numPerRow;
                    const ny = Math.floor(i / numPerRow);
                    let triRight = "M " + (scale(nx) + sqLen/2 + gap/2) + " " + (scale(ny) + sqLen/2) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + gap/2) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen - gap/2) + " Z";

                    return (d.motiv_cat.endsWith('3')) ? triRight
                    : null;
                })
                .attr("fill", d => {
                    let motiv = d.motiv_cat.split('-')[2];
                    return colorMotivs(motiv);
                })
};