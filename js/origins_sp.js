// VARIABLES
// data variables
let keys = [];
let decadesList = [];
let countriesList = [];
let originsData = [];

let eventsKeys = [];
let eventsData = [];

// update on scroll
let currentScrollPos = $("#open").scrollTop();
let lastScrollPos = $("#open").scrollTop();
let scrollDirection = "forward";
let eventProgress = 0;
let currentYear = 1960;
let nextDecade = 1960;
let currentDecade = 1960;
let primaryEventsData = [];
let primaryEventsDate = [];
let currentEventIndex = 0;

// look up attributes
let originsAttr = {};
const countryAttr = {
    "gtm": {"label": "Guatemala", "color": "#d11f63", "colorShade": "#9d174a", "colorShadeDarker": "#691032", "background": "rgba(201, 31, 99, 0.7)"},
    "hnd": {"label": "Honduras", "color": "#eb4927", "colorShade": "#b0371d", "colorShadeDarker": "#762514", "background": "rgba(235, 73, 39, 0.7)"},
    "slv": {"label": "El Salvador", "color": "#ea8928", "colorShade": "#b0671e", "colorShadeDarker": "#754514", "background": "rgba(234, 139, 40, 0.7)"},
    "nt": {"label": "Países del norte de Centroamérica", "colorShade": "#000", "background": "linear-gradient(30deg, rgba(201, 31, 99, 0.7), rgba(235, 73, 39, 0.7), rgba(234, 139, 40, 0.7))"},
    "hnd-slv": {"colorShade": "#000", "background": "linear-gradient(30deg, rgba(235, 73, 39, 0.7), rgba(234, 139, 40, 0.7))"}
};
const monthValue = {
    "Enero": 0,
    "Febrero": 1/12,
    "Marzo": 2/12,
    "Abril": 3/12,
    "Mayo": 4/12,
    "Junio": 5/12,
    "Julio": 6/12,
    "Agosto": 7/12,
    "Septiembre": 8/12,
    "Octubre": 9/12,
    "Noviembre": 10/12,
    "Diciembre": 11/12
};
const eventAttr = {
    1: {"x1": 357, "x2": 366},
    2: {"x1": 414, "x2": 446},
    3: {"x1": 371, "x2": 409},
    4: {"x1": 370, "x2": 445},
    5: {"x1": 352, "x2": 364},
    6: {"x1": 411, "x2": 455},
    7: {"x1": 409, "x2": 460},
    8: {"x1": 340, "x2": 362},
    9: {"x1": 368, "x2": 399},
    10: {"x1": 269, "x2": 320},
    11: {"x1": 195, "x2": 623},
    12: {"x1": 359, "x2": 640},
    13: {"x1": 155, "x2": 665},
    14: {"x1": 347, "x2": 684},
    15: {"x1": 135, "x2": 686},
    16: {"x1": 228, "x2": 338},
    17: {"x1": 220, "x2": 337},
    18: {"x1": 216, "x2": 337},
    19: {"x1": 210, "x2": 338},
    20: {"x1": 209, "x2": 338},
    21: {"x1": 343, "x2": 732},
    22: {"x1": 74, "x2": 739},
    23: {"x1": 72, "x2": 741},
    24: {"x1": 56, "x2": 752},
    25: {"x1": 44, "x2": 174},
    26: {"x1": 38, "x2": 764},
    27: {"x1": 34, "x2": 767},
    28: {"x1": 34, "x2": 169}
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
// update event
function updateEvent(eventIndex) {
    const eventTooltip = $("#tt-event");
    const event = eventsData.filter(item => item.event_index == eventIndex)[0];

    if (event.start_month != null) {
        eventTooltip.find(".event-month").html(" " + event.start_month);
    }
    else {
        eventTooltip.find(".event-month").empty();
    }

    if (event.end_year != null) {
        eventTooltip.find(".event-end-year").html("&ndash;" + event.end_year);
    }
    else {
        eventTooltip.find(".event-end-year").empty();
    }

    if (event.image != null) {
        eventTooltip.find(".event-title").css({"color": "#000", "background": "rgba(255, 255, 255, 0.4)"});
        eventTooltip.find(".event-img").css({"background": countryAttr[event.country].background, "display": "block"});
        eventTooltip.find(".event-img>img").attr("src", "./img/origins/" + event.image);
    }
    else {
        eventTooltip.find(".event-title").css({"color": "#fff", "background": countryAttr[event.country].background});
        eventTooltip.find(".event-img").css("display", "none");
    }

    eventTooltip.find(".event-year").html(event.start_year);
    eventTooltip.find(".event-type").html(event.event_type);
    eventTooltip.find(".event-title").html(event.event);
    eventTooltip.find(".event-descr").html(event.description);
};
// find closest event
function findClosestPrimaryEventIndex(scrollYear) {
    const closest = primaryEventsDate.reduce((a, b) => {
        let aDiff = Math.abs(a - scrollYear);
        let bDiff = Math.abs(b - scrollYear);

        if (aDiff == bDiff) {
            return a > b ? a : b;
        }
        else {
            return aDiff > bDiff ? b : a;
        }
    });
    primaryEventIndex = primaryEventsDate.indexOf(closest);
    eventIndex = primaryEventsData[primaryEventIndex].event_index;
    return eventIndex;
};
// highlight migrant count labels
function highlightMigrantCounts(countryCode) {
    if (countryCode == "nt") {
        $(".label-total").animate({color:"#fff", backgroundColor:"#000"}, 100)
            .animate({color:"#000",backgroundColor:"rgba(255,255,255,0)"},1000);

        for (let i = 0; i < countriesList.length; i ++) {
            country = countriesList[i];
            countryId = "#label-" + country;

            $(countryId + " .text-label").animate({color:"#fff", backgroundColor: countryAttr[country].color}, 100)
                .animate({color: countryAttr[country].color,backgroundColor:"rgba(255,255,255,0)"},1000);
        }
    }
    else if (countryCode == "hnd-slv") {
        $("#label-hnd .text-label").animate({color:"#fff", backgroundColor: countryAttr["hnd"].color}, 100)
            .animate({color: countryAttr["hnd"].color,backgroundColor:"rgba(255,255,255,0)"},1000);
        $("#label-slv .text-label").animate({color:"#fff", backgroundColor: countryAttr["slv"].color}, 100)
            .animate({color: countryAttr["slv"].color,backgroundColor:"rgba(255,255,255,0)"},1000);
    }
    else {
        countryId = "#label-" + countryCode;

        $(countryId + " .text-label").animate({color:"#fff", backgroundColor: countryAttr[countryCode].color}, 100)
            .animate({color: countryAttr[countryCode].color,backgroundColor:"rgba(255,255,255,0)"},1000);
    }
}

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
            // console.log(Z[i]);
            // highlightMigrantCounts(Z[i]);
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
                .attr("opacity", 0.5);
                // .attr("opacity", l => {
                //     return (l.country == Z[i]) ? 0.8
                //     :(l.country == "nt" || l.country == "hnd-slv") ? 0.5
                //     : 0.3;
                // });
        })
        .on("mouseout", function() {
            d3.selectAll(".stream")
                .transition()
                .duration(50)
                .attr("fill-opacity", 0.8)
            d3.selectAll(".event")
                .transition()
                .duration(50)
                .attr("opacity", 0.3);
                // .attr("opacity", l => {
                //     return (l.country == "nt" || l.country == "hnd-slv") ? 0.2
                //     : 0.6
                // })
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
            // .attr("stroke", d => countryAttr[d.country].colorShade)
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .attr("opacity", 0.3)
            // .attr("opacity", d => {
            //     return (d.country == "nt" || d.country == "hnd-slv") ? 0.2
            //     : 0.6
            // })
        .on("mouseover", function(event, d) {
            country = d.country;
            updateEvent(d.event_index);
            // highlightMigrantCounts(d.country);

            if (country == "hnd-slv") {
                d3.selectAll(".stream")
                    .transition()
                    .duration(50)
                    .attr("fill-opacity", 0.8)

                d3.select(".stream.gtm")
                    .transition()
                    .duration(50)
                    .attr("fill-opacity", 0.4)
            }
            else if (country != "nt") {
                d3.selectAll(".stream")
                    .transition()
                    .duration(50)
                    .attr("fill-opacity", 0.4)

                d3.select(".stream." + country)
                    .transition()
                    .duration(50)
                    .attr("fill-opacity", 0.8)
            };
            // d3.selectAll(".event")
            //     .transition()
            //     .duration(50)
                // .attr("opacity", l => {
                //     return (l.country == "nt" || l.country == "hnd-slv") ? 0.2
                //     : 0.3;
                // });
            d3.select(this)
                .transition()
                .duration(50)
                .attr("opacity", 0.7);
                // .attr("opacity", d => {
                //     return (country == "nt" || country == "hnd-slv") ? 0.6
                //     : 1
                // })
                // .attr("stroke", d => {
                //     return (country == "nt" || country == "hnd-slv") ? countryAttr[d.country].colorShade
                //     : countryAttr[d.country].colorShadeDarker
                // });
        })
        .on("mouseout", function() {
            d3.selectAll(".stream")
                .transition()
                .duration(50)
                .attr("fill-opacity", 0.8);

            d3.selectAll(".event")
                .transition()
                .duration(50)
                .attr("opacity", 0.3)
                // .attr("stroke", d => countryAttr[d.country].colorShade)
                // .attr("opacity", l => {
                //     return (l.country == "nt" || l.country == "hnd-slv") ? 0.2
                // : 0.6
                // })
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
        decadesList = data.map(item => item.year).filter(distinct);
        // map distinct countries
        countriesList = data.map(item => item.country).filter(distinct);

        for (let y = 0; y < decadesList.length; y++) {
            let year = decadesList[y];
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
        // console.log(originsData);
    });
    
// load csv event data and callback function
d3.csv("./data/origins_events_sp.csv", d3.autoType)
    .then(function(data) {
        if (!eventsKeys.length) {
            eventsKeys = data.columns;
        }

        if (!eventsData.length) {
            eventsData = data;
        }

        if (!primaryEventsData.length) {
            primaryEventsData = data.filter(item => item.priority == "primary");
        }

        if (!primaryEventsDate.length) {
            primaryEventsDate = primaryEventsData.map(item => {
                return (2019 <= item.start_year) ? item.start_year - 1 + monthValue[item.start_month]
                : (item.start_month != null) ? item.start_year + monthValue[item.start_month]
                : item.start_year;
            });
        }

        plotEvents(eventsData);

        // console.log(eventsKeys);
        // console.log(eventsData);
    });

$(document).ready(function() {
    let vizHeight = $("#viz-origins").height();

    function getDivHeight(id) {
        if (id == "viz-origins") {
            vizHeight = $("#viz-origins").height();
            return vizHeight;
        }
        else {
            return $(id).height();
        }
    }

    // ScrollMagic
    const controller = new ScrollMagic.Controller();

    sceneTimeline = new ScrollMagic.Scene({
        triggerElement: "#frame-origins",
        duration: getDivHeight("viz-origins") - 2 * margin // scroll in px
    //     // offset: 50 // start this scene after scrolling for 50px
    })
    //     .setClassToggle("active")
    //     // .setPin('#my-sticky-element') // pins the element for the the scene's duration
        .addTo(controller)
        .on("update", function(e) {
            currentScrollPos = $("#open").scrollTop();

            // change scroll direction
            if (lastScrollPos < currentScrollPos && scrollDirection != "forward") {
                scrollDirection = "forward";
                nextDecade = Math.ceil(eventProgress * 6) * 10 + 1960;
                // console.log("change scroll direction, now forward");
                // console.log(nextDecade);
            }
            else if (lastScrollPos > currentScrollPos && scrollDirection != "reverse") {
                scrollDirection = "reverse";
                nextDecade = Math.floor(eventProgress * 6) * 10 + 1960;
                // console.log("change scroll direction, now reverse");
                // console.log(nextDecade);
            }
            lastScrollPos = currentScrollPos;
            // console.log(scrollDirection);
            // console.log("current decade: " + currentDecade);
            // console.log("next decade: " + nextDecade);
            // console.log("current year: " + currentYear);
        })
        .on("progress", function(e) {
            eventProgress = e.progress;
            currentYear = Math.floor(e.progress * 60 + 1960);
            currentDecade = Math.ceil(e.progress * 6) * 10 + 1960;
            lastDecade = Math.floor(e.progress * 6) * 10 + 1960;
        
            $("#tt-year").text(currentYear);
            $(".label-yearspan").html((lastDecade + 1) + "&ndash;" + currentDecade);

            $(".label-total .label-mig").text(numberWithCommas(roundLargeFigures(originsAttr[currentDecade].total_mig_stock, 2)));

            for (let i = 0; i < countriesList.length; i++) {
                country = countriesList[i];
                countryId = "#label-" + country;

                $(countryId + " .label-mig").text(numberWithCommas(roundLargeFigures(originsAttr[currentDecade][country].mig_stock, 2)));
                $(countryId + " .label-pct").text(roundAccurately(originsAttr[currentDecade][country].pct_mig_pop * 100, 1).toFixed(1));
            }

            // every new decade
            if (scrollDirection == "forward" && currentYear > nextDecade || scrollDirection == "reverse" && nextDecade > currentYear) {
                highlightMigrantCounts("nt");
                // $(".label-total").animate({color:"#fff", backgroundColor:"#000"}, 100)
                //     .animate({color:"#000",backgroundColor:"rgba(255,255,255,0)"},1000);

                // for (let i = 0; i < countriesList.length; i ++) {
                //     country = countriesList[i];
                //     countryId = "#label-" + country;

                //     $(countryId + " .text-label").animate({color:"#fff", backgroundColor: countryAttr[country].color}, 100)
                //         .animate({color: countryAttr[country].color,backgroundColor:"rgba(255,255,255,0)"},1000);
                // }
                if (scrollDirection == "forward") {
                    nextDecade = currentDecade;
                }
                else if (scrollDirection == "reverse") {
                    nextDecade = lastDecade;
                }
                // console.log(nextDecade);
            }

            // find closest event
            closestEventIndex = findClosestPrimaryEventIndex(currentYear)
            if (currentEventIndex != closestEventIndex) {
                updateEvent(closestEventIndex);
                currentEventIndex = closestEventIndex;
            }
            // console.log(findClosestPrimaryEventIndex(currentYear));
        })
        .on("start end", function(e) {
            $(".label-yearspan").html(e.type == "start" ? "1960" : "2011&ndash;2020")
        });

    // window resize
    $(window).resize(function() {
        vizHeight = $("#viz-origins").height();
        sceneTimeline.on("progress", function(e) {
            currentYear = Math.floor(e.progress * 60 + 1960);
            currentDecade = Math.ceil(e.progress * 6) * 10 + 1960;

            $("#tt-year").text(currentYear);
            $(".label-yearspan").html((Math.floor(e.progress * 6) * 10 + 1961) + "&ndash;" + currentDecade);

            $(".label-total .label-mig").text(numberWithCommas(roundLargeFigures(originsAttr[currentDecade].total_mig_stock, 2)));

            for (let i = 0; i < countriesList.length; i++) {
                country = countriesList[i];
                countryId = "#label-" + country;

                $(countryId + " .label-mig").text(numberWithCommas(roundLargeFigures(originsAttr[currentDecade][country].mig_stock, 2)));
                $(countryId + " .label-pct").text(roundAccurately(originsAttr[currentDecade][country].pct_mig_pop * 100, 1).toFixed(1));
            }
        })
        .refresh();
    });
})