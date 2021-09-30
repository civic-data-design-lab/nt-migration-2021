// VARIABLES
// D3 CHART VARIABLES
const width = 1370;
const height = 720;

// data variables
let keys = [];
let motivsOrder = {
    "econ": 0,
    "reun": 1,
    "sec": 2,
    "clim": 3,
    "oth": 4
};
let motivationsData = [];
let motivsSortData = [];
let incomeSortData = [];
let cariSortData = [];
let motivsIndex = [];

// define svg
const svg = d3.select("#frame-motivations")
    .append("svg")
        .attr("id", "viz-motivations")
        .attr("viewBox", [0, 0, width, height])

// tooltip
var divMotivs = d3.select("body").append("div")
    .attr("id", "tt-motivs")
    .attr("class", "tooltip")
    .style("display", "none")
    .style("z-index", "10")
    .text("info");

// square dimensions
const sqLen = 24;
const gap = 4;
const numPerRow = 56;

const scale = d3.scaleLinear()
    .domain([0, numPerRow - 1])
    .range([0, (sqLen) * numPerRow]);

// load csv data and callback function
const dataset = d3.csv("./data/motivations.csv", d3.autoType)
    .then(function(data) {
        if (!keys.length) {
            keys = data.columns;
        }

        if (!motivationsData.length) {
            motivationsData = data;
        }

        // store index values for each sort
        if (!motivsIndex.length) {
            for (let i = 0; i < data.length; i++) {
                let rspId = data[i].rsp_id;
                item = {};
                item.rspId = rspId;
                item.index = i;
                motivsIndex.push(item);
            }
        }

        // if (!incomeSortData.length) {
        //     incomeSortData = data.sort((a, z) => {
        //         if (a.income_per_capita_tier == z.income_per_capita_tier) {
        //             let motivCatIndex = sortCompare(motivsOrder[a.motiv_cat.split('-')[0]], motivsOrder[z.motiv_cat.split('-')[0]]);
        //             // if same first motivation listed compare number of categories per response
        //             if (motivCatIndex == 0) {
        //                 let catRspIndex = sortCompare(a.motiv_cat.substr(-1), z.motiv_cat.substr(-1));
        //                 // if same number of categories per response compare 2nd motivation
        //                 if (catRspIndex == 0) {
        //                     return sortCompare(motivsOrder[a.motiv_cat.split('-')[1]], motivsOrder[z.motiv_cat.split('-')[1]]);
        //                 }
        //                 return catRspIndex;
        //             }
        //             return motivCatIndex;
        //         }
        //         return sortCompare(a.income_per_capita_tier, z.income_per_capita_tier);
        //     })
        // }

        // if (!cariSortData.length) {
        //     cariSortData = data.sort((a, z) => {
        //         if (a.CARI == z.CARI) {
        //             let motivCatIndex = sortCompare(motivsOrder[a.motiv_cat.split('-')[0]], motivsOrder[z.motiv_cat.split('-')[0]]);
        //             // if same first motivation listed compare number of categories per response
        //             if (motivCatIndex == 0) {
        //                 let catRspIndex = sortCompare(a.motiv_cat.substr(-1), z.motiv_cat.substr(-1));
        //                 // if same number of categories per response compare 2nd motivation
        //                 if (catRspIndex == 0) {
        //                     return sortCompare(motivsOrder[a.motiv_cat.split('-')[1]], motivsOrder[z.motiv_cat.split('-')[1]]);
        //                 }
        //                 return catRspIndex;
        //             }
        //             return motivCatIndex;
        //         }
        //         return sortCompare(a.CARI, z.CARI);
        //     })
        // }

        plotSquares(motivationsData);

        console.log(keys);
        console.log(motivationsData);
    });

// FUNCTIONS
function lookUpCountry(country) {
    return country == "GT" ? "Guatemala"
    : country == "HND" ? "Honduras"
    : country == "SLV" ? "El Salvador"
    : "unknown"
}
// motivations lookup for colors and label text
function lookUpMotiv(motivCode, attr) {
    if (attr == "color") {
        return motivCode == "econ" ? "#1540c4" // economics
        : motivCode == "clim" ? "#00a99d" // climate
        : motivCode == "sec" ? "#93278f" // security
        : motivCode == "reun" ?  "#eb4927" // reunification
        : motivCode == "oth" ?  "#f1a650" // other
        : "#CCCCCC";
    }
    else if (attr == "label") {
        return motivCode == "econ" ? "Economics"
        : motivCode == "clim" ? "Climate"
        : motivCode == "sec" ? "Security"
        : motivCode == "reun" ?  "Reunification"
        : motivCode == "oth" ?  "Other"
        : "unknown";
    }
};
function lookUpMotivDetail(motivRsp, attr) {
    if (attr == "color") {
        return (motivRsp == "1" || motivRsp == "2" || motivRsp == "6" || motivRsp == "7" || motivRsp == "8") ? "#1540c4" // economics
        : (motivRsp == "3" || motivRsp == "4" || motivRsp == "5") ? "#00a99d" // climate
        : (motivRsp == "10" || motivRsp == "11") ? "#93278f" // security
        : motivRsp == "12" ?  "#eb4927" // reunification
        : (motivRsp == "9" || motivRsp == "13" || motivRsp == "14" || motivRsp == "15" || motivRsp == "16") ?  "#f1a650" // other
        : "#333";
    }
    else if (attr == "category") {
        return (motivRsp == "1" || motivRsp == "2" || motivRsp == "6" || motivRsp == "7" || motivRsp == "8") ? "econ"
        : (motivRsp == "3" || motivRsp == "4" || motivRsp == "5") ? "clim"
        : (motivRsp == "10" || motivRsp == "11") ? "sec"
        : motivRsp == "12" ?  "reun"
        : (motivRsp == "9" || motivRsp == "13" || motivRsp == "14" || motivRsp == "15" || motivRsp == "16") ?  "oth"
        : "unknown";
    }
    else if (attr == "label") {
        return motivRsp == "1" ? "search for a better job"
        : motivRsp == "2" ? "unemployment"
        : motivRsp == "3" ? "deteriorated livelihood due to natural hazards"
        : motivRsp == "4" ?  "direct impact from a natural hazard"
        : motivRsp == "5" ?  "loss of land due to land use change"
        : motivRsp == "6" ? "lack of money for food"
        : motivRsp == "7" ? "lack of money for basic needs"
        : motivRsp == "8" ?  "to send remittances"
        : motivRsp == "9" ?  "education"
        : motivRsp == "10" ? "domestic violence"
        : motivRsp == "11" ? "unsafety"
        : motivRsp == "12" ?  "family reunification"
        : motivRsp == "13" ?  "cultural reasons"
        : motivRsp == "14" ? "health needs"
        : motivRsp == "15" ?  "adventure or tourism"
        : motivRsp == "16" ?  "other"
        : "no response";
    }
}
function motivDetailText(motivRsp) {
    let motivDetailStr = "";

    if (typeof(motivRsp) == "string") {
        let motivList = motivRsp.split(' ');

        for (let i = 0; i < motivList.length; i++) {
            if (!motivDetailStr) {
                motivDetailStr += "<span style='color:" + lookUpMotivDetail(motivList[i], 'color') + "'>" + sentenceCase(lookUpMotivDetail(motivList[i], "label")) + "</span>";
            }
            else {
                motivDetailStr += ", <span style='color:" + lookUpMotivDetail(motivList[i], 'color') + "'>" + lookUpMotivDetail(motivList[i], "label") + "</span>";
            }
        }
    }
    else {
        motivDetailStr += "<span style='color:" + lookUpMotivDetail(motivRsp, 'color') + "'>" + sentenceCase(lookUpMotivDetail(motivRsp, "label")) + "</span>";
    }
    return motivDetailStr;
}

// motivations index order
function sortCompare(a, z) {
    return (a == z) ? 0
    : (a < z) ? -1
    : 1;
}

// index lookup
function findIndex(rspId, sortBy) {
    if (sortBy == "index") {
        return motivsIndex[rspId].index;
    };
};

// create tooltip
function tooltipHtml(d, shape) {
    $("#tt-motivs").empty();
    var tooltipTemplate = $(".tooltip.template");
    var tooltip = tooltipTemplate.clone();

    if (shape == "sq" || shape == "tri-bl") {
        motivCat = d.motiv_cat.split('-')[0];
    }
    else if (shape == "tri-tr" || shape == "tri-t") {
        motivCat = d.motiv_cat.split('-')[1];
    }
    else {
        motivCat = d.motiv_cat.split('-')[2];
    }

    let motivPct = roundAccurately(motivationsData.filter((item) => item.motiv_cat.includes(motivCat)).length / motivationsData.length * 100, 0);
    let motivColor = lookUpMotiv(motivCat, "color");
    let motivLabel = lookUpMotiv(motivCat, "label");
    let countryLabel = lookUpCountry(d.country);

    tooltip.find(".side-color").css("background", motivColor);
    tooltip.find(".text-color").css("color", motivColor);
    tooltip.find(".label-motiv-pct").html(motivPct);
    tooltip.find(".label-motiv").html(motivLabel);
    tooltip.find(".label-hh").html("surveyed");
    tooltip.find(".label-motiv-detail").html(motivDetailText(d.mig_ext_motivo));
    tooltip.find(".label-country").html(countryLabel);

    tooltip.children().appendTo("#tt-motivs");
}
// tooltip position on mousemove
function divMotivsOnMousemove(event) {
    divMotivs
    .style("top", (divHtml) => {
        var divY = event.pageY;
        var ttHeight = $("#tt-motivs").outerHeight();
        var divHeight = $("#viz-motivations").height();

        if ((divY + ttHeight + 60) > winHeight) {
            divY = divY - ttHeight - 10;
        };
        return (divY + 10) + "px"
    })
    .style("left", (divHtml) => {
        var divX = event.pageX;
        var ttWidth = $("#tt-motivs").outerWidth();
        var divWidth = $("#viz-motivations").width();

        if ((divX + ttWidth + 60) > winWidth) {
            divX = divX - ttWidth - 10;
        };
        return (divX + 10) + "px"
    })
}

// plot squares grid
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
                : null;
            })
            .attr("height", d => {
                return d.motiv_cat.endsWith('1') ? sqLen
                : null;
            })
            .attr("fill", d => {
                let motiv = d.motiv_cat.split('-')[0];
                return d.motiv_cat.endsWith('1') ? lookUpMotiv(motiv, "color")
                : null;
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", gap)
        .on("mouseover", function(event, d) {
            tooltipHtml(d, "sq");
            divMotivs.style("display", "block");
        })
        .on("mousemove", function(event) {
            divMotivsOnMousemove(event);
        })
        .on("mouseout", function() {
            divMotivs.style("display", "none");
        });

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
                let triBotLeft = "M " + scale(nx) + " " + (scale(ny)) + " L " + scale(nx) + " " + (scale(ny) + sqLen) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";

                return (!d.motiv_cat.endsWith('1')) ? triBotLeft
                : null;
            })
            .attr("fill", d => {
                if (!d.motiv_cat.endsWith('1')) {
                    let motiv = d.mig_ext_motivo.split(' ')[0];
                    return lookUpMotivDetail(motiv, "color");
                }
                else {
                    return null;
                }
            })
            .attr("stroke", "#fff")
            .attr("stroke-width", gap)
        .on("mouseover", function(event, d) {
            tooltipHtml(d, "tri-bl");
            divMotivs.style("display", "block");
        })
        .on("mousemove", function(event) {
            divMotivsOnMousemove(event);
        })
        .on("mouseout", function() {
            divMotivs.style("display", "none");
        });
        
        // triangle top-right
        svg.append("g")
                .attr("class", "g-tri-tr")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("id", d => "tri-tr-" + d.rsp_id)
                .attr("class", "tri-tr")
                .attr("d", (d, i) => {
                    const nx = i % numPerRow;
                    const ny = Math.floor(i / numPerRow);
                    let triTopRight = "M " + (scale(nx)) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";

                    return (d.motiv_cat.endsWith('2')) ? triTopRight
                    : null;
                })
                .attr("fill", d => {
                    if (d.motiv_cat.endsWith('2')) {
                        let motiv1 = d.mig_ext_motivo.split(' ')[0];
                        let motivCat1 = d.motiv_cat.split('-')[0];
                        let motivCat2 = d.motiv_cat.split('-')[1];
                        if (lookUpMotivDetail(motiv1, "category") == motivCat1) {
                            return lookUpMotiv(motivCat2, "color");
                        }
                        else {
                            return lookUpMotiv(motivCat1, "color");
                        }
                    }
                    else {
                        return null;
                    }
                })
                .attr("stroke", "#fff")
                .attr("stroke-width", gap)
            .on("mouseover", function(event, d) {
                tooltipHtml(d, "tri-tr");
                divMotivs.style("display", "block");
            })
            .on("mousemove", function(event) {
                divMotivsOnMousemove(event);
            })
            .on("mouseout", function() {
                divMotivs.style("display", "none");
            });

        // triangle top for 3 responses
        svg.append("g")
                .attr("class", "g-tri-t")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("id", d => "tri-t-" + d.rsp_id)
                .attr("class", "tri-t")
                .attr("d", (d, i) => {
                    const nx = i % numPerRow;
                    const ny = Math.floor(i / numPerRow);
                    let triTop = "M " + (scale(nx)) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + scale(ny) + " L " + (scale(nx) + sqLen/2) + " " + (scale(ny) + sqLen/2) + " Z";

                    return (d.motiv_cat.endsWith('3')) ? triTop
                    : null;
                })
                .attr("fill", d => {
                    if (d.motiv_cat.endsWith('3')) {
                        let motiv2 = d.mig_ext_motivo.split(' ')[1];
                        return lookUpMotivDetail(motiv2, "color");
                    }
                    else {
                        return null;
                    }
                })
                .attr("stroke", "#fff")
                .attr("stroke-width", gap)
            .on("mouseover", function(event, d) {
                tooltipHtml(d, "tri-t");
                divMotivs.style("display", "block");
            })
            .on("mousemove", function(event) {
                divMotivsOnMousemove(event);
            })
            .on("mouseout", function() {
                divMotivs.style("display", "none");
            });

        // triangle right for 3 responses
        svg.append("g")
                .attr("class", "g-tri-r")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
                .attr("id", d => "tri-r-" + d.rsp_id)
                .attr("class", "tri-r")
                .attr("d", (d, i) => {
                    const nx = i % numPerRow;
                    const ny = Math.floor(i / numPerRow);
                    let triRight = "M " + (scale(nx) + sqLen/2) + " " + (scale(ny) + sqLen/2) + " L " + (scale(nx) + sqLen) + " " + (scale(ny)) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";

                    return (d.motiv_cat.endsWith('3')) ? triRight
                    : null;
                })
                .attr("fill", d => {
                    if (d.motiv_cat.endsWith('3')) {
                        let motiv3 = d.mig_ext_motivo.split(' ')[2];
                        return lookUpMotivDetail(motiv3, "color");
                    }
                    else {
                        return null;
                    }
                })
                .attr("stroke", "#fff")
                .attr("stroke-width", gap)
            .on("mouseover", function(event, d) {
                tooltipHtml(d, "tri-r");
                divMotivs.style("display", "block");
            })
            .on("mousemove", function(event) {
                divMotivsOnMousemove(event);
            })
            .on("mouseout", function() {
                divMotivs.style("display", "none");
            });
};