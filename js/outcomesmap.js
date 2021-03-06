var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
}

var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty',
    'full': 'fully'
}


// SCALE ALIGNMENTS
var pixelSize;
var labelSize;
var responsiveBorderWidth

if (aspectRatio < 1) {

    pixelSize = 6;
    labelSize = 12
    responsiveBorderWidth = 3
}

if (aspectRatio >= 1) {
    pixelSize = 12;
    labelSize = 17
    responsiveBorderWidth = 5
}


//MAP STYLE VARIABLES

//BASEMAPS
var landColor = [219, 109, 183] //GEOGRAPHIC LAND COLOR
var countriesFillColor = [231, 120, 194, 255] //FILL COLOR OF NOTHERN TRIANGLE COUNTRIES
var countriesBorderColor = [255, 255, 255, 255]
// var countriesLineWidth = 20000
var SelectHighlightColor = [255, 255, 255] //HIGHLIGHT ON HOVER OR CLICK

document.getElementById("map").style.background = 'rgb(209, 99, 173)'


//CIRCLES
var pointScale = 350 //SCALE OF POINTS
var pointColor = [255, 255, 255, 255 * 0.5]
var circleBorder = [255, 255, 255, 0]
var circleBorderWidth = 2

//ARCLAYERS
var arcSourceColor = [255, 158, 237, 255 * 0.8]
var arcTargetColor = [255, 200, 245, 255 * 0.2]
var arcWidth = 0.0000015
var arcHeight = 0.5
var arcTilt = 0
var arcFilterMin = 40

//INACTIVE STATE
var inactiveColor = [255, 255, 255, 0]

function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
        var options = {};
        if (layer.duration) {
            var transitionProp = prop + "-transition";
            options = { "duration": layer.duration };
            map.setPaintProperty(layer.layer, transitionProp, options);
        }
        map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
}

var story = document.getElementById('story');
var features = document.createElement('div');
features.setAttribute('id', 'features');

var header = document.createElement('div');

outcomesConfig.chapters.forEach((record, idx) => {
    var container = document.createElement('div');
    var mapChapter = document.createElement('div');

    if (record.image) {
        var image = new Image();
        var imageContainer = document.createElement('div');

        if (record.paddedImage == true) {
            image.className = "padded-image"

        }


        imageContainer.className = "ribbon-image"

        image.src = record.image;
        mapChapter.appendChild(imageContainer);
        imageContainer.appendChild(image)

        if (record.filter) {
            var imageFilter = document.createElement("div");
            imageFilter.id = 'scrolly-overlay'
            mapChapter.appendChild(imageFilter);
        }


    }


    // INJECT AND STYLE TEXT FOR HERO, NON IMAGE TEXT
    if (record.title || record.description || record.footnote) {

        let storyText = document.createElement('div');


        if (!record.image) {
            storyText.className = 'scrollytelling-text'
            mapChapter.appendChild(storyText)
        }
        if (record.image) {
            storyText.className = 'scrollytelling-caption'
            mapChapter.appendChild(storyText)
        }

        if (record.title) {
            var title = document.createElement('h2');
            title.className = 'scrollytelling'
            title.innerText = record.title;
            storyText.appendChild(title);
        }

        if (record.description) {
            var story = document.createElement('h3');
            story.className = "scrollytelling description"
            story.innerHTML = record.description;
            storyText.appendChild(story);
        }

        if (record.footnote){
            const footy = document.createElement('span')
            footy.className = 'scrollytelling new-footer'
            footy.innerHTML = '* ' + record.footnote + ' '; 
            storyText.appendChild(footy)

            const footyLink = document.createElement('a')
            footyLink.className = 'scrollytelling new-footer'
            footyLink.innerHTML = '[external reference]';
            footyLink.setAttribute('href', record.footnoteLink)
            footyLink.style.pointerEvents = 'auto'
            footy.appendChild(footyLink)
        }

    }




    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }

    mapChapter.classList.add(outcomesConfig.theme);
    container.appendChild(mapChapter);
    container.classList.add(alignments[record.alignment] || 'centered');
    if (record.hidden) {
        container.classList.add('hidden');
    }
    features.appendChild(container);

});

story.appendChild(features);

var footer = document.createElement('div');

if (outcomesConfig.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = outcomesConfig.footer;
    footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
    footer.classList.add(outcomesConfig.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

mapboxgl.accessToken = outcomesConfig.accessToken;

const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";
    return {
        url: url //+ suffix
    }
}

var map = new mapboxgl.Map({
    container: 'map',
    style: outcomesConfig.style,
    center: outcomesConfig.chapters[0].location.center,
    zoom: outcomesConfig.chapters[0].location.zoom,
    bearing: outcomesConfig.chapters[0].location.bearing,
    pitch: outcomesConfig.chapters[0].location.pitch,
    interactive: false,
    transformRequest: transformRequest
});


// instantiate the scrollama
var scroller = scrollama();

map.on("load", function () {

    // setup the instance, pass callback functions
    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            progress: true
        })

        .onStepEnter(response => {
            var mapChapter = outcomesConfig.chapters.find(chap => chap.id === response.element.id);
            response.element.classList.add('active');
            map[mapChapter.mapAnimation || 'flyTo'](mapChapter.location);

            if (mapChapter.onChapterEnter.length > 0) {
                mapChapter.onChapterEnter.forEach(setLayerOpacity);
            }


            if (mapChapter.callback) {
                window[mapChapter.callback]();
            }
            if (mapChapter.rotateAnimation) {
                map.once('moveend', function () {
                    const rotateNumber = map.getBearing();
                    const rotationAmount = 30
                    map.rotateTo(rotateNumber + rotationAmount, {
                        duration: 34000, easing: function (t) {
                            return t;
                        }
                    });
                });
            }

        })

        .onStepExit(response => {
            var mapChapter = outcomesConfig.chapters.find(chap => chap.id === response.element.id);
            response.element.classList.remove('active');
            if (mapChapter.onChapterExit.length > 0) {
                mapChapter.onChapterExit.forEach(setLayerOpacity);
            }

            if (mapChapter.fadePixels == true) {
                fade(ntSurvey, 'ntSurvey', 150, true)
            }
            if ((mapChapter.fadePixels) && (mapChapter.fadePixels == false)) {
                fade(ntSurvey, 'ntSurvey', 150, false)
            }

            // SHOW GUAT LAYERS
            if (mapChapter.showGuat && mapChapter.showGuat == true) {
                fade(guatArc, 'guatArc', 255, true);
                fade(guatDestinations, 'guatDestinations', 255, true);

            }
            else {
                fade(guatArc, 'guatArc', 255, false);
                fade(guatDestinations, 'guatDestinations', 255, false);
            }

            //SHOW HOND LAYERS
            if (mapChapter.showHond && mapChapter.showHond == true) {
                fade(hondArc, 'hondArc', 255, true);
                fade(hondDestinations, 'hondDestinations', 255, true);

            }
            else {
                fade(hondArc, 'hondArc', 255, false);
                fade(hondDestinations, 'hondDestinations', 255, false);
            }

            //SHOW SALV LAYERS
            if (mapChapter.showSalv && mapChapter.showSalv == true) {
                fade(salvArc, 'salvArc', 255, true);
                fade(salvDestinations, 'salvDestinations', 255, true);

            }
            else {
                fade(salvArc, 'salvArc', 255, false);
                fade(salvDestinations, 'salvDestinations', 255, false);
            }
        });


});

// setup resize event
window.addEventListener('resize', scroller.resize);

//MAP COLORS
var countryFillColor = "#e778c2"
var partialFillColor = "rgba(231,120,194,0.5)"
var countryBoundaryColor = "rgba(255,255,255,0.3)"
var borderWidth = 5
var borderColor = 'rgba(255,255,255,1)'

// outcome destination styles
var outcomeColor = 'rgba(255,200,245,0.5)'
var outcomeColorSolid = 'rgba(255,200,245,1)'
var outcomeLineWidth = 3
var outcomeCircleMin = 3
var outcomeCircleMax = 40

// STANDARD MAPBOX
// Load COUNTRY BOUNDARIES
map.on('load', function () {

    map.addSource('worldmap', {
        'type': 'geojson',
        'data': 'data/mapbox/basemaps/far/world-far.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'worldMapViz',
        type: 'fill',
        source: 'worldmap',
        paint: {
            "fill-color": partialFillColor,
        },
    });

});

// Load STATE BOUNDARIES
map.on('load', function () {

    map.addSource('states', {
        'type': 'geojson',
        'data': 'data/mapbox/basemaps/far/states-far.geojson',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'statesViz',
        type: 'fill',
        source: 'states',
        paint: {
            "fill-color": countryFillColor,
            "fill-outline-color": countryBoundaryColor
        },
    });

    map.addLayer({
        id: 'statesVizLine',
        type: 'line',
        source: 'states',
        paint: {
            'line-width': responsiveBorderWidth,
            'line-color': borderColor
        },
    });

});

// Load NT-COUNTRIES
map.on('load', function () {

    map.addSource('ntCountries', {
        'type': 'geojson',
        'data': 'data/mapbox/basemaps/close/nt-countries-close.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'ntCountriesViz',
        type: 'fill',
        source: 'ntCountries',
        paint: {
            "fill-color": countryFillColor,
            "fill-outline-color": countryBoundaryColor
        },
    });

    map.addLayer({
        id: 'ntCountriesVizLine',
        type: 'line',
        source: 'ntCountries',
        paint: {
            'line-width': responsiveBorderWidth,
            'line-color': borderColor
        },
    });
});



//   MY DECK DATA

const worldMap = new deck.MapboxLayer({
    id: 'world-map',
    type: deck.GeoJsonLayer,
    data: 'data/mapbox/basemaps/far/world-far.json',
    // Styles
    filled: true,
    getFillColor: landColor,
})


// STATES
// const statesMap = new deck.MapboxLayer({
//     type: deck.GeoJsonLayer,
//     id: 'us-states',
//     data: 'data/mapbox/basemaps/far/states-far.geojson',
//     // Styles
//     filled: true,
//     getFillColor: countriesFillColor,
//     getLineColor: countriesBorderColor,
//     getLineWidth: countriesLineWidth,


// })


// NT COUNTRIES
// const ntCountries = new deck.MapboxLayer({
//     type: deck.GeoJsonLayer,
//     id: 'nt-countries',
//     data: 'data/mapbox/basemaps/close/nt-countries-close.json',
//     // Styles
//     filled: true,
//     getFillColor: countriesFillColor,
//     getLineColor: countriesBorderColor,
//     getLineWidth: countriesLineWidth,

//     // Interactive props
//     // pickable: true,
//     // autoHighlight: true,
//     highlightColor: SelectHighlightColor,
//     onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)

// })

// US-SALV CIRCLES
const salvDestinations = new deck.MapboxLayer({
    id: 'salvDestinations',
    type: deck.GeoJsonLayer,
    data: 'data/mapbox/outcomes/salv-destinations.json',
    // Styles
    pointType: 'circle',
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 0,
    getPointRadius: r => r.properties.Imm__tot_pop * 100,
    getFillColor: inactiveColor,
    // Interactive props
    // pickable: true,
    // autoHighlight: true,
    // highlightColor: SelectHighlightColor,
    lineWidthUnits: 'pixels',
    getLineColor: [182, 40, 187, 255],
    getLineWidth: circleBorderWidth,
    polygonOffset: 10,
    parameters: {
        depthTest: false
    },
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)

})

// US-GUAT CIRCLES
const guatDestinations = new deck.MapboxLayer({
    id: 'guatDestinations',
    type: deck.GeoJsonLayer,
    data: 'data/mapbox/outcomes/guat-destinations.json',
    // Styles
    pointType: 'circle',
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 0,
    getPointRadius: r => r.properties.Imm__tot_pop * 100,
    getFillColor: inactiveColor,
    // Interactive props
    // pickable: true,
    // autoHighlight: true,
    // highlightColor: SelectHighlightColor,
    lineWidthUnits: 'pixels',
    getLineColor: [250, 180, 60, 255],
    getLineWidth: circleBorderWidth,
    parameters: {
        depthTest: false
    },
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
})

// US-HOND CIRCLES
const hondDestinations = new deck.MapboxLayer({
    id: 'hondDestinations',
    type: deck.GeoJsonLayer,
    data: 'data/mapbox/outcomes/hond-destinations.json',
    // Styles
    pointType: 'circle',
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 0,
    getPointRadius: r => r.properties.Imm__tot_pop * 100,
    getFillColor: inactiveColor,
    // Interactive props
    // pickable: true,
    // autoHighlight: true,
    // highlightColor: SelectHighlightColor,
    lineWidthUnits: 'pixels',
    getLineColor: [59, 167, 201, 255],
    getLineWidth: circleBorderWidth,
    parameters: {
        depthTest: false
    },
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
})


// SALV ARCLAYER
const salvArc = new deck.MapboxLayer({
    id: 'salvArc',
    type: deck.ArcLayer,
    data: 'data/mapbox/outcomes/salv-multiline-coords.json',
    dataTransform: d => d.features.filter(f => f.properties.Rank_Immigrants < arcFilterMin),
    // Styles
    getSourcePosition: d => [d.properties.START_X, d.properties.START_Y],
    getTargetPosition: d => [d.properties.END_X, d.properties.END_Y],
    getSourceColor: [182, 40, 187, 0],
    getTargetColor: [255, 255, 255, 0],
    getWidth: w => Math.sqrt(w.properties.Round_total_MSA_population * arcWidth),
    getHeight: arcHeight,
    pickable: false,
    autoHighlight: false,
    highlightColor: SelectHighlightColor,
    getTilt: arcTilt,
    // transitions: {
    //     getSourceColor: {
    //         duration: 3000
    //     },
    //     getTargetColor: {
    //         duration: 3000
    //     },

    // },
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
});

// GUATEMALA ARCLAYER
const guatArc = new deck.MapboxLayer({
    id: 'guatArc',
    type: deck.ArcLayer,
    data: 'data/mapbox/outcomes/guat-multiline-coords.json',
    dataTransform: d => d.features.filter(f => f.properties.Rank_Immigrants < arcFilterMin),
    // Styles
    getSourcePosition: d => [d.properties.START_X, d.properties.START_Y],
    getTargetPosition: d => [d.properties.END_X, d.properties.END_Y],
    getSourceColor: [250, 180, 60, 0],
    getTargetColor: [255, 255, 255, 0],
    getWidth: w => Math.sqrt(w.properties.Round_total_MSA_population * arcWidth),
    getHeight: arcHeight,
    pickable: false,
    autoHighlight: false,
    highlightColor: SelectHighlightColor,
    getTilt: arcTilt,
    // transitions: {
    //     getSourceColor: {
    //         duration: 3000
    //     },
    //     getTargetColor: {
    //         duration: 3000
    //     },

    // },
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
});

// HOND ARCLAYER
const hondArc = new deck.MapboxLayer({
    id: 'hondArc',
    type: deck.ArcLayer,
    data: 'data/mapbox/outcomes/hond-multiline-coords.json',
    dataTransform: d => d.features.filter(f => f.properties.Rank_Immigrants < arcFilterMin),
    // Styles
    getSourcePosition: d => [d.properties.START_X, d.properties.START_Y],
    getTargetPosition: d => [d.properties.END_X, d.properties.END_Y],
    getSourceColor: [59, 167, 201, 0],
    getTargetColor: [255, 255, 255, 0],
    getWidth: w => Math.sqrt(w.properties.Round_total_MSA_population * arcWidth),
    getHeight: arcHeight,
    pickable: false,
    autoHighlight: false,
    highlightColor: SelectHighlightColor,
    getTilt: arcTilt,
    // transitions: {
    //     getSourceColor: {
    //         duration: 3000
    //     },
    //     getTargetColor: {
    //         duration: 3000
    //     },

    // },
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
});

// SURVEY GRID
const ntSurvey = new deck.MapboxLayer({
    id: 'ntSurvey',
    type: deck.ScreenGridLayer,
    data: 'data/mapbox/motivations/nt-survey-points.geojson',
    getPosition: p => p.geometry.coordinates,
    cellSizePixels: pixelSize,
    colorRange: [255, 255, 255, 255],
});

// COUNTRY LABELS
const countryLabels = new deck.MapboxLayer({
    id: 'nt-country-labels',
    type: deck.TextLayer,
    data: [
        { name: 'Guatemala', coordinates: [-90.666233, 14.784638] },
        { name: 'Honduras', coordinates: [-86.066233, 14.884638] },
        { name: 'El Salvador', coordinates: [-89.066233, 13.684638] },
    ],
    getPosition: d => d.coordinates,
    getText: d => d.name,
    getSize: labelSize,
    sizeUnits: 'pixels',
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'center',
    background: true,
    backgroundPadding: [3, 1],
    fontWeight: 1000,
    getColor: [209, 99, 173],
    fontFamily: 'neue-haas-grotesk-text, sans-serif',
});




map.on('load', () => {
    map.addLayer(ntSurvey);
    map.addLayer(countryLabels);
    map.addLayer(salvDestinations);
    map.addLayer(guatDestinations);
    map.addLayer(hondDestinations);
    map.addLayer(guatArc);
    map.addLayer(salvArc);
    map.addLayer(hondArc);

    map.setLayerZoomRange('nt-country-labels', middleZoom, closeZoom + 0.25);

});


function fade(prop, strProp, target, inOutBool) {
    let countUp = 0;

    setInterval(function () {
        if (countUp < target) {
            countUp++


            if (prop.props.cellSizePixels) {

                if (inOutBool == true) {
                    var negPixelRemapped = 1 - (countUp / target)
                    prop.setProps({ opacity: negPixelRemapped })

                    if (negPixelRemapped > 0.5) {
                        prop.setProps({ cellSizePixels: pixelSize * negPixelRemapped })
                    }

                    if (prop.props.opacity == 0) {
                        map.removeLayer(strProp)
                    }
                }

                if (inOutBool == false) {

                    if (!map.getLayer(strProp)) {
                        map.addLayer(prop)
                    }
                    var PixelRemapped = countUp / target
                    prop.setProps({ opacity: PixelRemapped })

                    if (PixelRemapped > 0.5) {
                        prop.setProps({ cellSizePixels: pixelSize * PixelRemapped })
                    }


                }


            }

            if (prop.props.getSourceColor) {  //TRANSITIONS FOR ARCLAYER
                var startColor = prop.props.getSourceColor

                if (inOutBool == true) {
                    if (map.getLayer(strProp) == null) {
                        map.addLayer(prop)
                    }


                    // if arc
                    var opacityFactor = 0.7
                    if (prop.props.getSourceColor[3] < (255 * opacityFactor)) {

                        currentColor = prop.props.getSourceColor
                        currentColor[3] = countUp * opacityFactor
                        // currentColor[3] = 255


                        prop.setProps({ getSourceColor: currentColor })
                        prop.setProps({ getTargetColor: [255, 255, 255, countUp * 0.3] })
                    }

                }

                if (inOutBool == false) {
                    countDown = target - countUp

                    if (startColor[3] > 1) {

                        currentColor = prop.props.getSourceColor
                        currentColor[3] = countDown

                        prop.setProps({ getSourceColor: currentColor })
                        prop.setProps({ getTargetColor: [255, 255, 255, countDown * 0.3] })
                    }


                    if (countDown <= 1) {
                        if (map.getLayer(strProp) != null) {
                            map.removeLayer(strProp)
                        }

                    }

                }
            }

            if (prop.props.getFillColor) { //TRANSITIONS FOR SCATTERPLOTS

                var opacityCircleFactor = 0.5
                if (inOutBool == true) {
                    // if fill

                    var newLineWidth = circleBorderWidth * (countUp / target)
                    var growingRadius = pointScale * (countUp / target)

                    if (prop.props.getFillColor[3] < (254 * opacityCircleFactor)) {
                        prop.setProps({ getFillColor: [255, 255, 255, countUp * opacityCircleFactor] })
                        prop.setProps({ getLineWidth: newLineWidth })
                        prop.setProps({ pointRadiusScale: growingRadius })
                    }

                }

                if (inOutBool == false) {

                    countDown = target - countUp

                    currentLineColor = prop.props.getLineColor

                    var shrinkRadius = pointScale - (pointScale * (countUp / target))
                    var newLineWidth = circleBorderWidth - (circleBorderWidth * (target / countUp + 0.01))

                    // if fill
                    // prop.setProps({ getFillColor: [255, 255, 255, countDown * 0.8] })
                    if (prop.props.getFillColor[3] > 0) {
                        prop.setProps({ getFillColor: [255, 255, 255, countDown * opacityCircleFactor] })
                        prop.setProps({ getLineWidth: newLineWidth })
                        prop.setProps({ pointRadiusScale: shrinkRadius })
                    }


                }


            }

        }
    }, 5);
}



