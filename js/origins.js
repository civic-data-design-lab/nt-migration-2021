// VARIABLES
// data variables
let keys = [];
let yearsList = [];
let countriesList = [];
let originsData = [];

// look up attributes
let originsAttr = {};
const countryText = {
    "gtm": "Guatemala",
    "hnd": "Honduras",
    "slv": "El Salvador"
};

// ScrollMagic
const controller = new ScrollMagic.Controller();

// D3 CHART VARIABLES
const width = 800;
const height = 3000;
const margin = 30;

// define svg
const svgContext = d3.select("#frame-pre1960")
    .append("svg")
        .attr("id", "viz-context")
        .attr("viewBox", [0, height-winHeight/2, width, winHeight/2]);

const svgTimeline = d3.select("#frame-origins")
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

        // distinct values
        const distinct = (value, index, self) => self.indexOf(value) === index;

        // map distinct years
        yearsList = data.map(item => item.year).filter(distinct);
        // map distinct countries
        countriesList = data.map(item => item.country).filter(distinct);

        for (let y = 0; y < yearsList.length; y++) {
            let year = yearsList[y];
            originsAttr[year] = {};

            totalYear = data.filter(d => d.year == year).reduce((accumulator, value) => (accumulator + value.mig_stock), 0);

            originsAttr[year].total_mig_stock = totalYear;

            for (let i = 0; i < countriesList.length; i++) {
                let country = countriesList[i];
                originsAttr[year][country] = {};
                row = data.filter(d => d.year == year && d.country == country);

                originsAttr[year][country].mig_stock = row[0].mig_stock;
                originsAttr[year][country].pct_mig_pop = row[0].pct_mig_pop;
                originsAttr[year][country].pop = row[0].pop;
            }
        }
        console.log(originsAttr);

        plotStreamgraph(originsData, svgContext, {
            x: d => d.pct_mig_pop,
            y: d => d.year,
            z: d => d.country
        });
        plotStreamgraph(originsData, svgTimeline, {
            x: d => d.pct_mig_pop,
            y: d => d.year,
            z: d => d.country
        });

        console.log(keys);
        console.log(originsData);
    });

// FUNCTIONS

// plot timeline streamgraph
function plotStreamgraph(data, svg, {
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
        // .range([height - margin, margin]);
    const color = d3.scaleOrdinal()
        .domain(zDomain)
        .range(["#d11f63", "#eb4927", "#ea8928"]);
    const yAxis = d3.axisLeft(yScale).ticks(12).tickSizeOuter(0).tickFormat(d3.format("d"));
  
    if (svg == svgTimeline) {
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([0, height - margin]);

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
            .attr("class", "stream")
            .attr("d", area)
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .attr("fill", ([{i}]) => color(Z[i]))
            .attr("fill-opacity", 0.9)
        .on("mouseover", function(event, d) {
            d3.selectAll(".stream")
                .transition()
                .duration(50)
                .attr("fill-opacity", 0.4)
            d3.select(this)
                .transition()
                .duration(50)
                .attr("fill-opacity", 0.9)
        })
        .on("mouseout", function() {
            d3.selectAll(".stream")
                .transition()
                .duration(50)
                .attr("fill-opacity", 0.9)
        });

        // axis
        // svg.append("g")
        //     .attr("transform", `translate(${margin * 2}, 0)`)
        //     .call(yAxis)
        //     .call(g => g.select(".domain").remove());
    }
    else {
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([height, margin]);

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
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .attr("fill", ([{i}]) => color(Z[i]))
            .attr("fill-opacity", 0.4)
}
  }

$(document).ready(function() {
    new ScrollMagic.Scene({
        triggerElement: "#frame-origins",
        duration: $("#viz-origins").height() - 2 * margin // scroll in px
    //     // offset: 50 // start this scene after scrolling for 50px
    })
    //     .setClassToggle("active")
    //     // .setPin('#my-sticky-element') // pins the element for the the scene's duration
        .addTo(controller)
        .on("progress", function(e) {
            $("#tt-year").text(Math.floor(e.progress * 60 + 1960));
            $(".label-yearspan").html((Math.floor(e.progress * 6) * 10 + 1961) + "&ndash;" + (Math.ceil(e.progress * 6) * 10 + 1960));

            year = Math.ceil(e.progress * 6) * 10 + 1960;
            $(".label-total .label-mig").text(numberWithCommas(originsAttr[year].total_mig_stock));

            for (let i = 0; i < countriesList.length; i++) {
                country = countriesList[i];
                countryClass = ".label-" + country;

                $(countryClass + " .label-mig").text(numberWithCommas(originsAttr[year][country].mig_stock));
                $(countryClass + " .label-pct").text(roundAccurately(originsAttr[year][country].pct_mig_pop * 100, 1).toFixed(1));
            }
        })
        .on("start end", function(e) {
            $(".label-yearspan").html(e.type == "start" ? "1960" : "2011&ndash;2020")
        });
})