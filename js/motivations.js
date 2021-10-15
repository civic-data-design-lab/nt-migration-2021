// VARIABLES
// D3 CHART VARIABLES
const width = 1370;
const height = 860;

// data variables
let keys = [];
const motivOrder = {
    "econ": 0,
    "reun": 1,
    "sec": 2,
    "clim": 3,
    "oth": 4
};
const motivDetailOrder = {
    "1": 0, "2": 0, "6": 0, "7": 0, "8": 0,
    "12": 1,
    "10": 2, "11": 2,
    "3": 3, "4": 3, "5": 3,
    "9": 4, "13": 4, "14": 4, "15": 4, "16": 4
};
let motivationsData = [];
let motivsIndex = {};

// define svg
const svg = d3.select("#frame-motivations")
    .append("svg")
        .attr("id", "viz-motivations")
        .attr("viewBox", [0, 0, width, height])

// tooltip
const divMotivs = d3.select("body").append("div")
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
    .range([0, sqLen * numPerRow]);

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
                let rspId = data[i].rsp_id2;
                motivsIndex[rspId] = {};
                motivsIndex[rspId]['initial'] = i;
            }
        // }

        // sort by motivations
        // if (!motivsIndex.rsp12.motivs) {
            motivsSortData = data.sort((a, z) => {
                let motivCatIndex1 = sortCompare(motivOrder[a.motiv_cat.split('-')[0]], motivOrder[z.motiv_cat.split('-')[0]]);
                // if same first motivation listed compare number of categories per response
                if (motivCatIndex1 == 0) {
                    let catRspIndex = sortCompare(a.motiv_cat.substr(-1), z.motiv_cat.substr(-1));
                    // if same number of categories per response compare 2nd motivation
                    if (catRspIndex == 0) {
                        let motivCatIndex2 = sortCompare(motivOrder[a.motiv_cat.split('-')[1]], motivOrder[z.motiv_cat.split('-')[1]]);
                        // if same 2nd motivation compare detailed response
                        if (motivCatIndex2 == 0 && (typeof(a.mig_ext_motivo == 'string' && 1 < z.mig_ext_motivo == 'string'))) {
                            return sortCompare(motivDetailOrder[a.mig_ext_motivo.toString().split(' ')[0]], motivDetailOrder[z.mig_ext_motivo.toString().split(' ')[0]]);
                        }
                        return motivCatIndex2
                    }
                    return catRspIndex;
                }
                return motivCatIndex1;
            });
            // add motivations index to index dictionary
            for (let i = 0; i < motivsSortData.length; i++) {
                let rspId = motivsSortData[i].rsp_id2;
                motivsIndex[rspId]['motivs'] = i;
            }
        // }

        // sort by income per capita tier
        // if (!motivsIndex.rsp12.income) {
            incomeSortData = data.sort((a, z) => {
                if (a.income_per_capita_tier == z.income_per_capita_tier) {
                    let motivCatIndex1 = sortCompare(motivOrder[a.motiv_cat.split('-')[0]], motivOrder[z.motiv_cat.split('-')[0]]);
                    // if same first motivation listed compare number of categories per response
                    if (motivCatIndex1 == 0) {
                        let catRspIndex = sortCompare(a.motiv_cat.substr(-1), z.motiv_cat.substr(-1));
                        // if same number of categories per response compare 2nd motivation
                        if (catRspIndex == 0) {
                            let motivCatIndex2 = sortCompare(motivOrder[a.motiv_cat.split('-')[1]], motivOrder[z.motiv_cat.split('-')[1]]);
                            // if same 2nd motivation compare detailed response
                            if (motivCatIndex2 == 0 && (typeof(a.mig_ext_motivo == 'string' && 1 < z.mig_ext_motivo == 'string'))) {
                                return sortCompare(motivDetailOrder[a.mig_ext_motivo.toString().split(' ')[0]], motivDetailOrder[z.mig_ext_motivo.toString().split(' ')[0]]);
                            }
                            return motivCatIndex2
                        }
                        return catRspIndex;
                    }
                    return motivCatIndex1;
                }
                return sortCompare(a.income_per_capita_tier, z.income_per_capita_tier);
            });
            // add income index to index dictionary
            for (let i = 0; i < incomeSortData.length; i++) {
                let rspId = incomeSortData[i].rsp_id2;
                motivsIndex[rspId]['income'] = i;
            }
        // }

        // sort by cari classification
        // if (!motivsIndex.rsp12.cari) {
            cariSortData = data.sort((a, z) => {
                if (a.CARI == z.CARI) {
                    let motivCatIndex1 = sortCompare(motivOrder[a.motiv_cat.split('-')[0]], motivOrder[z.motiv_cat.split('-')[0]]);
                    // if same first motivation listed compare number of categories per response
                    if (motivCatIndex1 == 0) {
                        let catRspIndex = sortCompare(a.motiv_cat.substr(-1), z.motiv_cat.substr(-1));
                        // if same number of categories per response compare 2nd motivation
                        if (catRspIndex == 0) {
                            let motivCatIndex2 = sortCompare(motivOrder[a.motiv_cat.split('-')[1]], motivOrder[z.motiv_cat.split('-')[1]]);
                            // if same 2nd motivation compare detailed response
                            if (motivCatIndex2 == 0 && (typeof(a.mig_ext_motivo == 'string' && 1 < z.mig_ext_motivo == 'string'))) {
                                return sortCompare(motivDetailOrder[a.mig_ext_motivo.toString().split(' ')[0]], motivDetailOrder[z.mig_ext_motivo.toString().split(' ')[0]]);
                            }
                            return motivCatIndex2
                        }
                        return catRspIndex;
                    }
                    return motivCatIndex1;
                }
                return sortCompare(a.CARI, z.CARI);
            });
            // add cari index to index dictionary
            for (let i = 0; i < cariSortData.length; i++) {
                let rspId = cariSortData[i].rsp_id2;
                motivsIndex[rspId]['cari'] = i;
            }
        }

        data.sort((a, z) => sortCompare(a.rsp_id2 > z.rsp_id2));

        plotInitialGrid(motivationsData);

        console.log(keys);
        console.log(motivationsData);
    });

// FUNCTIONS
// motivations index order
function sortCompare(a, z) {
    return (a == z) ? 0
    : (a < z) ? -1
    : 1;
}

// index lookup
function findIndex(rspId, sortBy) {
    return (sortBy == "motivs") ? motivsIndex[rspId].motivs
    : (sortBy == "income") ? motivsIndex[rspId].income
    : (sortBy == "cari") ? motivsIndex[rspId].cari
    : motivsIndex[rspId].initial;
};
// look up country
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
// update sort index position
function indexPos(d, sortBy, triPos) {
    let sortIndex = findIndex(d.rsp_id2, sortBy);

    // motivations layout rearange index
    if (sortBy == "motivs") {
        if (triPos == "botLeft") {
            // to oth from sec
            if (1530 <= sortIndex && sortIndex <= 1538) {
                sortIndex += (6 * numPerRow) + 35;
            }
            // to oth from reun
            else if (1477 <= sortIndex && sortIndex <= 1486) {
                sortIndex += (7 * numPerRow) + 22;
            }
            // to oth from econ
            else if (1366 <= sortIndex && sortIndex <= 1379) {
                sortIndex += (9 * numPerRow) + 7;
            }
            // to clim from econ
            else if (1302 <= sortIndex && sortIndex <= 1305) {
                sortIndex += (7 * numPerRow) - 14;
            }
            // security
            else if (1520 <= sortIndex && sortIndex <= 1529) {
                sortIndex += 25;
            }
            // to sec from econ (3 categories)
            else if (d.rsp_id2 == 'rsp1358-5') {
                sortIndex += (3 * numPerRow) + 9;
            }
            // to sec from econ
            else if (1237 <= sortIndex && sortIndex <= 1252) {
                sortIndex += (5 * numPerRow) + 47;
            }
            // reun
            else if (1463 <= sortIndex && sortIndex <= 1476) {
                sortIndex += 12 - numPerRow;
            }
            // to reun from econ (3 categories)
            else if (d.rsp_id2 == 'rsp1364' || d.rsp_id2 == 'rsp1450') {
                sortIndex += numPerRow - 5;
            }
            // to reun from econ (last 2 flipped)
            else if (1174 <= sortIndex && sortIndex <= 1183) {
                sortIndex += (5 * numPerRow) - 18;
            }
            // econ (and sec)
            else if (d.motiv_cat.includes("sec") && 1184 <= sortIndex && sortIndex <= 1236) {
                sortIndex -= 29;
            }
            // econ (and clim) (flipped)
            else if (d.motiv_cat.includes("clim") && 1253 <= sortIndex && sortIndex <= 1301) {
                sortIndex -= 53;
            }
            // econ (and oth)
            else if (d.motiv_cat.includes("oth") && 1306 <= sortIndex && sortIndex <= 1365) {
                sortIndex -= (2 * numPerRow) - 14;
            }
            // econ (3 categories)
            else if (1380 <= sortIndex && sortIndex <= 1382) {
                sortIndex -= 2 * numPerRow;
            }
            // econ (3 categories)
            else if (d.rsp_id2 == "rsp1039-2") {
                sortIndex -= (2* numPerRow) + 6;
            }
            else if (d.rsp_id2 == "rsp1418-1") {
                sortIndex -= (2* numPerRow) + 7;
            }
        }
        else if (triPos == "topRight") {
            // to oth from sec (flipped)
            if (1521 <= sortIndex && sortIndex <= 1529) {
                sortIndex += (7 * numPerRow) - 3;
            }
            // to oth from reun (flipped)
            else if (1463 <= sortIndex && sortIndex <= 1476) {
                sortIndex += (8 * numPerRow) + 8;
            }
            // to oth from econ (flipped)
            else if (d.rsp_id2 == 'rsp4864' || d.rsp_id2 == 'rsp4867' || d.rsp_id2 == 'rsp4957-2') {
                sortIndex += (10 * numPerRow) + 10;
            }
            // to oth from econ
            else if (1306 <= sortIndex && sortIndex <= 1362) {
                sortIndex += (10 * numPerRow) + 11;
            }
            // to clim from econ
            else if (1253 <= sortIndex && sortIndex <= 1301) {
                // 1279 - 1301
                sortIndex += (7 * numPerRow) + 35;
            }
            // sec (flipped)
            else if (1529 <= sortIndex && sortIndex < 1538) {
                sortIndex += 25;
            }
            // to sec from econ (flipped)
            else if (d.rsp_id2 == 'rsp4510' || d.rsp_id2 == 'rsp4515' || d.rsp_id2 == 'rsp4560-1' || d.rsp_id2 == 'rsp4703-1' || d.rsp_id2 == 'rsp4703-2' || d.rsp_id2 == 'rsp4723' || d.rsp_id2 == 'rsp4738' || d.rsp_id2 == 'rsp4805' || d.rsp_id2 == 'rsp4959' || d.rsp_id2 == 'rsp4489-2') {
                sortIndex += (6 * numPerRow) + 17;
            }
            // to sec from econ
            else if (1184 <= sortIndex && sortIndex <= 1226) {
                sortIndex += (6 * numPerRow) + 25;
            }
            // reun
            else if (1477 <= sortIndex && sortIndex <= 1486) {
                sortIndex -= numPerRow + 2;
            }
            // to reun from sec (flipped)
            else if (d.rsp_id2 == 'rsp1418-2') {
                sortIndex -= numPerRow + 31;
            }
            // to reun from econ
            else if (1155 <= sortIndex && sortIndex <= 1173) {
                sortIndex += (5 * numPerRow) - 6;
            }
            // econ (and sec)
            else if (d.motiv_cat.includes("sec") && 1237 <= sortIndex && sortIndex <= 1252) {
                sortIndex -= 53;
            }
            // econ (and clim)
            else if (d.motiv_cat.includes("clim") && 1302 <= sortIndex && sortIndex <= 1305) {
                sortIndex -= 53;
            }
            // econ (and oth)
            else if (d.motiv_cat.includes("oth") && 1366 <= sortIndex && sortIndex <= 1379) {
                sortIndex -= (2 * numPerRow) + 1;
            }
        }
        else if (triPos == "top") {
            // to oth from econ
            if (d.rsp_id2 == 'rsp3254') {
                sortIndex += (10 * numPerRow) - 6;
            }
            // to clim from econ
            if (d.rsp_id2 == 'rsp1418-1') {
                sortIndex += (6 * numPerRow) - 17;
            }
            // to sec from econ
            if (d.rsp_id2 == 'rsp1039-2') {
                sortIndex += (4 * numPerRow) - 21;
            }
            // to reun from sec
            if (d.rsp_id2 == 'rsp999') {
                sortIndex -= numPerRow + 36;
            }
            // to reun from econ
            if (d.rsp_id2 == 'rsp3187-1' || d.rsp_id2 == 'rsp3187-2') {
                sortIndex += numPerRow + 11;
            }
            // econ (3 categories)
            else if (d.rsp_id2 == "rsp1364" || d.rsp_id2 == "rsp1450") {
                sortIndex -= (2 * numPerRow) + 2;
            }
            // econ (3 categories) (flip to right)
            else if (d.rsp_id2 == "rsp1358-5") {
                sortIndex -= (2 * numPerRow) + 5;
            }
        }
        else if (triPos == "right") {
            // to oth from econ
            if (d.rsp_id2 == 'rsp3187-1' || d.rsp_id2 == 'rsp3187-2') {
                sortIndex += (10 * numPerRow) - 6;
            }
            // to oth from econ (flip to top)
            if (d.rsp_id2 == 'rsp1364' || d.rsp_id2 == 'rsp1450') {
                sortIndex += (10 * numPerRow) - 9;
            }
            // sec
            else if (d.rsp_id2 == 'rsp999') {
                sortIndex += numPerRow - 6;
            }
            // to sec from econ
            else if (d.rsp_id2 == 'rsp1418-1') {
                sortIndex += (4 * numPerRow) - 22;
            }
            // to reun from econ
            else if (d.rsp_id2 == 'rsp3254') {
                sortIndex += numPerRow + 8;
            }
            // to reun from econ
            else if (d.rsp_id2 == 'rsp1039-2' || d.rsp_id2 == 'rsp1358-5') {
                sortIndex += numPerRow + 6;
            }
        }
        // if 1 category (square)
        else {
            // other
            if (1539 <= sortIndex) {
                sortIndex += (4 * numPerRow) + 29;
            }
            // security
            else if (1487 <= sortIndex && sortIndex < 1539) {
                sortIndex += 25;
            }
            // reunion
            else if (1388 <= sortIndex && sortIndex < 1487) {
                sortIndex += 12 - numPerRow;
            }
        }
    }
    else if (sortBy == "income") {
        
    }
    else if (sortBy == "cari") {
        
    }
    return sortIndex;
}

// triangle path
function trianglePath(d, sortBy, triPos) {
    let sortIndex = indexPos(d, sortBy, triPos);
    
    const nx = sortIndex % numPerRow;
    const ny = Math.floor(sortIndex / numPerRow);

    if (triPos == "botLeft") {
        if (sortBy == "motivs" && (
            (d.motiv_cat.includes("reun") && 1155 <= sortIndex && sortIndex <= 1174) || 
            (d.motiv_cat.includes("clim") && 1253 - 53 <= sortIndex && sortIndex <= 1301 - 53) || 
            (d.rsp_id2 == "rsp1039-2") || 
            (d.rsp_id2 == "rsp1418-1")
        )) {
            // flip to top right
            triPath = "M " + (scale(nx)) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";
        }
        else {
            triPath = "M " + scale(nx) + " " + (scale(ny)) + " L " + scale(nx) + " " + (scale(ny) + sqLen) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";
        }
    }
    else if (triPos == "topRight") {
        if (sortBy == "motivs" && (
            (d.motiv_cat == "sec-oth-2" && (1521 + (7 * numPerRow) - 3) <= sortIndex && sortIndex <= (1529 + (7 * numPerRow) - 3)) || 
            (d.motiv_cat == "reun-oth-2" && (1463 + (8 * numPerRow) + 8) <= sortIndex && sortIndex <= (1476 + (8 * numPerRow) + 8)) || 
            (d.rsp_id2 == 'rsp4864' || d.rsp_id2 == 'rsp4867' || d.rsp_id2 == 'rsp4957-2') || 
            (d.motiv_cat == "sec-oth-2" && (1529 + 25 <= sortIndex && sortIndex < 1538 + 25)) || 
            (d.rsp_id2 == 'rsp4510' || d.rsp_id2 == 'rsp4515' || d.rsp_id2 == 'rsp4560-1' || d.rsp_id2 == 'rsp4703-1' || d.rsp_id2 == 'rsp4703-2' || d.rsp_id2 == 'rsp4723' || d.rsp_id2 == 'rsp4738' || d.rsp_id2 == 'rsp4805' || d.rsp_id2 == 'rsp4959' || d.rsp_id2 == 'rsp4489-2') || 
            (d.rsp_id2 == 'rsp1418-2') || 
            (d.rsp_id2 == 'rsp4718-4' || d.rsp_id2 == 'rsp4957-1')
        )) {
            // flip to bottom left
            triPath = "M " + scale(nx) + " " + (scale(ny)) + " L " + scale(nx) + " " + (scale(ny) + sqLen) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";
        }
        else if (sortBy == "motivs" && d.motiv_cat.includes("clim") && (1279 + (7 * numPerRow) + 35) <= sortIndex && sortIndex <= (1301 + (7 * numPerRow) + 35)) {
            // flip to bottom left and shift left 22
            const nx = (sortIndex - 22) % numPerRow;
            const ny = Math.floor((sortIndex - 22) / numPerRow);
            triPath = "M " + scale(nx) + " " + (scale(ny)) + " L " + scale(nx) + " " + (scale(ny) + sqLen) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";
        }
        else {
            triPath = "M " + (scale(nx)) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";
        }
    }
    else if (triPos == "top") {
        if (d.rsp_id2 == "rsp1358-5") {
            // flip to right
            triPath = "M " + (scale(nx) + sqLen/2) + " " + (scale(ny) + sqLen/2) + " L " + (scale(nx) + sqLen) + " " + (scale(ny)) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";
        }
        else {
            triPath = "M " + (scale(nx)) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + scale(ny) + " L " + (scale(nx) + sqLen/2) + " " + (scale(ny) + sqLen/2) + " Z";
        }
    }
    else if (triPos == "right") {
        if (d.rsp_id2 == 'rsp1364' || d.rsp_id2 == 'rsp1450') {
            // flip to top
            triPath = "M " + (scale(nx)) + " " + scale(ny) + " L " + (scale(nx) + sqLen) + " " + scale(ny) + " L " + (scale(nx) + sqLen/2) + " " + (scale(ny) + sqLen/2) + " Z";
        }
        else {
            triPath = "M " + (scale(nx) + sqLen/2) + " " + (scale(ny) + sqLen/2) + " L " + (scale(nx) + sqLen) + " " + (scale(ny)) + " L " + (scale(nx) + sqLen) + " " + (scale(ny) + sqLen) + " Z";
        }
    }
    return triPath;
}

// plot initial squares grid
function plotInitialGrid(data) {
    // squares
    svg.append("g")
            .attr("class", "g-sq")
        .selectAll("rect")
        .data(data.filter(item => item.motiv_cat.endsWith('1')))
        .enter()
        .append("rect")
            .attr("id", d => "sq-" + d.rsp_id2)
            .attr("class", "square")
            .attr("x", d => {
                const iInitial = findIndex(d.rsp_id2, 'initial');
                const nx = iInitial % numPerRow;
                return scale(nx);
            })
            .attr("y", d => {
                const iInitial = findIndex(d.rsp_id2, 'initial');
                const ny = Math.floor(iInitial / numPerRow);
                return scale(ny);
            })
            .attr("width", sqLen)
            .attr("height", sqLen)
            .attr("fill", d => {
                let motiv = d.motiv_cat.split('-')[0];
                return lookUpMotiv(motiv, "color");
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
        .data(data.filter(item => !item.motiv_cat.endsWith('1')))
        .enter()
        .append("path")
            .attr("id", d => "tri-bl-" + d.rsp_id2)
            .attr("class", "tri-bl")
            .attr("d", d => trianglePath(d, "initial", "botLeft"))
            .attr("fill", d => {
                let motiv = d.mig_ext_motivo.split(' ')[0];
                return lookUpMotivDetail(motiv, "color");
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
        
        // triangle top-right for 2 responses
        svg.append("g")
                .attr("class", "g-tri-tr")
            .selectAll("path")
            .data(data.filter(item => item.motiv_cat.endsWith('2')))
            .enter()
            .append("path")
                .attr("id", d => "tri-tr-" + d.rsp_id2)
                .attr("class", "tri-tr")
                .attr("d", d => trianglePath(d, "initial", "topRight"))
                .attr("fill", d => {
                    let motiv1 = d.mig_ext_motivo.split(' ')[0];
                    let motivCat1 = d.motiv_cat.split('-')[0];
                    let motivCat2 = d.motiv_cat.split('-')[1];
                    if (lookUpMotivDetail(motiv1, "category") == motivCat1) {
                        return lookUpMotiv(motivCat2, "color");
                    }
                    else {
                        return lookUpMotiv(motivCat1, "color");
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
            .data(data.filter(item => item.motiv_cat.endsWith('3')))
            .enter()
            .append("path")
                .attr("id", d => "tri-t-" + d.rsp_id2)
                .attr("class", "tri-t")
                .attr("d", d => trianglePath(d, "initial", "top"))
                .attr("fill", d => {
                    let motiv2 = d.mig_ext_motivo.split(' ')[1];
                    return lookUpMotivDetail(motiv2, "color");
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
            .data(data.filter(item => item.motiv_cat.endsWith('3')))
            .enter()
            .append("path")
                .attr("id", d => "tri-r-" + d.rsp_id2)
                .attr("class", "tri-r")
                .attr("d", d => trianglePath(d, "initial", "right"))
                .attr("fill", d => {
                    let motiv3 = d.mig_ext_motivo.split(' ')[2];
                    return lookUpMotivDetail(motiv3, "color");
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

// plot initial squares grid
function updatePlotSort(sortBy) {
    const time = 1000;
    // squares
    svg.select(".g-sq")
        .selectAll("rect")
        .transition()
            .duration(time)
            .attr("x", d => {
                const sortIndex = indexPos(d, sortBy);
                // let sortIndex = findIndex(d.rsp_id2, sortBy);
                // if (sortBy == "motivs" && sortIndex > 1387) {
                //     sortIndex += 12 + numPerRow;
                // }
                const nx = sortIndex % numPerRow;
                return scale(nx);
            })
            .attr("y", d => {
                const sortIndex = indexPos(d, sortBy);
                // let sortIndex = findIndex(d.rsp_id2, sortBy);
                const ny = Math.floor(sortIndex / numPerRow);
                return scale(ny);
            });
    
    // triangle bottom-left
    svg.select(".g-tri-bl")
        .selectAll("path")
        .transition()
            .duration(time)
            .attr("d", d => trianglePath(d, sortBy, "botLeft"));
        
        // triangle top-right
        svg.select(".g-tri-tr")
            .selectAll("path")
            .transition()
                .duration(time)
                .attr("d", d => trianglePath(d, sortBy, "topRight"));

        // triangle top for 3 responses
        svg.select(".g-tri-t")
            .selectAll("path")
            .transition()
                .duration(time)
                .attr("d", d => trianglePath(d, sortBy, "top"));

        // triangle right for 3 responses
        svg.select(".g-tri-r")
            .selectAll("path")
            .transition()
                .duration(time)
                .attr("d", d => trianglePath(d, sortBy, "right"));
}

$(".btn").on("click", function() {
    btnId = "#" + $(this).attr("id");
    sortBy = $(this).attr("id").slice(4);

    if ($(btnId).hasClass("active")) {
        $(btnId).removeClass("active");
        updatePlotSort("initial");
    }
    else {
        $(".btn").removeClass("active");
        $(btnId).addClass("active");
        updatePlotSort(sortBy);
    }
})