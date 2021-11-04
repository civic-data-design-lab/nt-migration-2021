// VARIABLES
// data variables
let keys = [];
let yearsList = [];
let countriesList = [];
let originsData = [];

let eventsKeys = [];
let eventsData = [];

// look up attributes
let originsAttr = {};
const countryAttr = {
    "gtm": {"label": "Guatemala", "color": "#d11f63", "colorShade": "#9d174a", "colorShadeDarker": "#691032"},
    "hnd": {"label": "Honduras", "color": "#eb4927", "colorShade": "#b0371d", "colorShadeDarker": "#762514"},
    "slv": {"label": "El Salvador", "color": "#ea8928", "colorShade": "#b0671e", "colorShadeDarker": "#754514"},
    "nt": {"label": "Northern countries in Central America", "colorShade": "#000"}
};
const monthValue = {
    "January": 0,
    "February": 1/12,
    "March": 2/12,
    "April": 3/12,
    "May": 4/12,
    "June": 5/12,
    "July": 6/12,
    "August": 7/12,
    "September": 8/12,
    "October": 9/12,
    "November": 10/12,
    "December": 11/12
};
const eventAttr = {
    1: {"x1": 357, "x2": 366},
    2: {"x1": 414, "x2": 446},
    3: {"x1": 371, "x2": 409},
    4: {"x1": 416, "x2": 445},
    5: {"x1": 370, "x2": 410},
    6: {"x1": 352, "x2": 364},
    7: {"x1": 411, "x2": 455},
    8: {"x1": 409, "x2": 460},
    9: {"x1": 340, "x2": 362},
    10: {"x1": 368, "x2": 399},
    11: {"x1": 269, "x2": 320},
    12: {"x1": 195, "x2": 623},
    13: {"x1": 359, "x2": 640},
    14: {"x1": 155, "x2": 665},
    15: {"x1": 347, "x2": 684},
    16: {"x1": 135, "x2": 686},
    17: {"x1": 228, "x2": 338},
    18: {"x1": 220, "x2": 337},
    19: {"x1": 216, "x2": 337},
    20: {"x1": 210, "x2": 338},
    21: {"x1": 209, "x2": 338},
    22: {"x1": 343, "x2": 732},
    23: {"x1": 74, "x2": 739},
    24: {"x1": 72, "x2": 741},
    25: {"x1": 56, "x2": 752},
    26: {"x1": 44, "x2": 174},
    27: {"x1": 38, "x2": 764},
    28: {"x1": 34, "x2": 767},
    29: {"x1": 34, "x2": 169}
};

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
    // console.log(series);
  
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
            .attr("class", "steam-area")
        .selectAll("path")
        .data(series)
        .join("path")
            .attr("class", ([{i}]) => "stream nt " + Z[i])
            .attr("d", area)
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .attr("fill", ([{i}]) => countryAttr[Z[i]].color)
            .attr("fill-opacity", 0.8)
        .on("mouseover", function(event, [{i}]) {
            d3.selectAll(".stream")
                .transition()
                .duration(50)
                .attr("fill-opacity", 0.4)
            d3.select(this)
                .transition()
                .duration(50)
                .attr("fill-opacity", 0.8)
            d3.selectAll(".event")
                .transition()
                .duration(50)
                .attr("opacity", l => {
                    return (l.country == Z[i]) ? 0.8
                    :(l.country == "nt") ? 0.5
                    : 0.3;
                });
        })
        .on("mouseout", function() {
            d3.selectAll(".stream")
                .transition()
                .duration(50)
                .attr("fill-opacity", 0.8)
            d3.selectAll(".event")
                .transition()
                .duration(50)
                .attr("opacity", l => {
                    return (l.country == "nt") ? 0.5
                    : 0.8
                })
        });

        // axis
        svg.append("g")
            .attr("transform", `translate(${margin * 2}, 0)`)
            .call(yAxis)
            .call(g => g.select(".domain").remove());
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
            .attr("fill", ([{i}]) => countryAttr[Z[i]].color)
            .attr("fill-opacity", 0.4)
    }
}

// plot horizontal lines for events
function plotEvents(data) {
    const yScale = d3.scaleLinear()
        .domain([1960, 2020])
        .range([margin, height - margin]);

    // create horizontal lines per events
    svgTimeline.append("g")
            .attr("class", "events")
        .selectAll("line")
        .data(data)
        .enter()
        .append("line")
            .attr("class", d => "event line-" + d.country)
            .attr("x1", d => eventAttr[d.event_index].x1)
            .attr("x2", d => eventAttr[d.event_index].x2)
            .attr("y1", d => {
                return (2019 <= d.start_year) ? yScale(d.start_year - 1 + monthValue[d.start_month])
                : (d.start_month != null) ? yScale(d.start_year + monthValue[d.start_month])
                : yScale(d.start_year);
            })
            .attr("y2", d => {
                return (2019 <= d.start_year) ? yScale(d.start_year - 1 + monthValue[d.start_month])
                : (d.start_month != null) ? yScale(d.start_year + monthValue[d.start_month])
                : yScale(d.start_year);
            })
            .attr("stroke", d => countryAttr[d.country].colorShade)
            .attr("stroke-width", 10)
            .attr("opacity", d => {
                return (d.country == "nt") ? 0.5
                : 0.8
            })
        .on("mouseover", function(event, d) {
            country = d.country;

            if (country != "nt") {
                d3.selectAll(".stream")
                    .transition()
                    .duration(50)
                    .attr("fill-opacity", 0.4)

                d3.select(".stream." + country)
                    .transition()
                    .duration(50)
                    .attr("fill-opacity", 0.8)
            };
            d3.selectAll(".event")
                .transition()
                .duration(50)
                .attr("opacity", l => {
                    return (l.country == "nt") ? 0.2
                    : 0.3;
                });
            d3.select(this)
                .transition()
                .duration(50)
                .attr("opacity", d => {
                    return (country == "nt") ? 0.6
                    : 1
                })
                .attr("stroke", d => {
                    return (country == "nt") ? countryAttr[d.country].colorShade
                    : countryAttr[d.country].colorShadeDarker
                });
        })
        .on("mouseout", function() {
            d3.selectAll(".stream")
                .transition()
                .duration(50)
                .attr("fill-opacity", 0.8);

            d3.selectAll(".event")
                .transition()
                .duration(50)
                .attr("stroke", d => countryAttr[d.country].colorShade)
                .attr("opacity", l => {
                    return (l.country == "nt") ? 0.5
                : 0.8
                })
        });
}

// CALL DATA
// load csv data and callback function
d3.csv("./data/origins_migrants.csv", d3.autoType)
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
        // console.log(originsAttr);

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

        // console.log(keys);
        console.log(originsData);
    });
    
// load csv event data and callback function
d3.csv("./data/origins_events.csv", d3.autoType)
    .then(function(data) {
        if (!eventsKeys.length) {
            eventsKeys = data.columns;
        }

        if (!eventsData.length) {
            eventsData = data;
        }

        plotEvents(eventsData);

        console.log(eventsKeys);
        console.log(eventsData);
    });

$(document).ready(function() {
    let vizHeight = $("#viz-origins").height();

    function getVizHeight() {
        vizHeight = $("#viz-origins").height();
        return vizHeight;
    }

    // ScrollMagic
    const controller = new ScrollMagic.Controller();

    scene = new ScrollMagic.Scene({
        triggerElement: "#frame-origins",
        duration: getVizHeight() - 2 * margin // scroll in px
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

    // window resize
    $(window).resize(function() {
        vizHeight = $("#viz-origins").height();
        scene.on("progress", function(e) {
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
        .refresh();
    });
})