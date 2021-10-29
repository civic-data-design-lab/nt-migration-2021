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

//MAP STYLE VARIABLES

//BASEMAPS
var landColor = [219, 109, 183] //GEOGRAPHIC LAND COLOR
var countriesFillColor = [231, 120, 194, 255] //FILL COLOR OF NOTHERN TRIANGLE COUNTRIES
var countriesBorderColor = [255, 255, 255, 255]
var countriesLineWidth = 20000
var SelectHighlightColor = [255, 255, 255] //HIGHLIGHT ON HOVER OR CLICK

//CIRCLES
var pointScale = 1000 //SCALE OF POINTS
var pointColor = [255, 255, 255, 255 * 0.5]
var circleBorder = [255, 255, 255, 255]
var circleBorderWidth = 0

//ARCLAYERS
var arcSourceColor = [255, 200, 245, 255]
var arcTargetColor = [255, 200, 245, 255 * 0.2]
var arcWidth = 0.000003
var arcHeight = 0.5
var arcTilt = -45
arcFilterMin = 21

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

    if (record.title) {
        var title = document.createElement('h3');
        title.innerText = record.title;
        mapChapter.appendChild(title);
    }

    if (record.image) {
        var image = new Image();
        image.src = record.image;
        mapChapter.appendChild(image);
    }

    if (record.description) {
        var story = document.createElement('h3');
        story.className = "scrollytelling"
        story.innerHTML = record.description;
        mapChapter.appendChild(story);
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
                    const rotationAmount = 45
                    var newRotation = map.getBearing();
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
            'line-width': borderWidth,
            'line-color': borderColor
        },
    });

});

// Load NT-COUNTRIES
map.on('load', function () {

    map.addSource('ntCountries', {
        'type': 'geojson',
        'data': 'data/mapbox/basemaps/far/nt-countries-far.json',
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
            'line-width': borderWidth,
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
const statesMap = new deck.MapboxLayer({
    type: deck.GeoJsonLayer,
    id: 'us-states',
    data: 'data/mapbox/basemaps/far/states-far.geojson',
    // Styles
    filled: true,
    getFillColor: countriesFillColor,
    getLineColor: countriesBorderColor,
    getLineWidth: countriesLineWidth,


})


// NT COUNTRIES
const ntCountries = new deck.MapboxLayer({
    type: deck.GeoJsonLayer,
    id: 'nt-countries',
    data: 'data/mapbox/basemaps/far/nt-countries-far.json',
    // Styles
    filled: true,
    getFillColor: countriesFillColor,
    getLineColor: countriesBorderColor,
    getLineWidth: countriesLineWidth,

    // Interactive props
    pickable: true,
    autoHighlight: true,
    highlightColor: SelectHighlightColor,
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)

})

// US-SALV CIRCLES
const salvDestinations = new deck.MapboxLayer({
    id: 'salv-Circles',
    type: deck.GeoJsonLayer,
    data: 'data/mapbox/outcomes/salv-destinations.json',
    // Styles
    pointType: 'circle',
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: pointScale,
    getPointRadius: r => r.properties.Imm__tot_pop * 100,
    getFillColor: pointColor,
    // Interactive props
    pickable: true,
    autoHighlight: true,
    highlightColor: SelectHighlightColor,
    getLineColor: circleBorder,
    getLineWidth: circleBorderWidth,
    polygonOffset: 10,
    parameters: {
        depthTest: false
    },
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
})

// US-GUAT CIRCLES
const guatDestinations = new deck.MapboxLayer({
    id: 'guat-Circles',
    type: deck.GeoJsonLayer,
    data: 'data/mapbox/outcomes/guat-destinations.json',
    // Styles
    pointType: 'circle',
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: pointScale,
    getPointRadius: r => r.properties.Imm__tot_pop * 100,
    getFillColor: pointColor,
    // Interactive props
    pickable: true,
    autoHighlight: true,
    highlightColor: SelectHighlightColor,
    getLineColor: circleBorder,
    getLineWidth: circleBorderWidth,
    parameters: {
        depthTest: false
    },
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
})

// US-GUAT CIRCLES
const hondDestinations = new deck.MapboxLayer({
    id: 'hond-Circles',
    type: deck.GeoJsonLayer,
    data: 'data/mapbox/outcomes/hond-destinations.json',
    // Styles
    pointType: 'circle',
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: pointScale,
    getPointRadius: r => r.properties.Imm__tot_pop * 100,
    getFillColor: pointColor,
    // Interactive props
    pickable: true,
    autoHighlight: true,
    highlightColor: SelectHighlightColor,
    getLineColor: circleBorder,
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
    getSourceColor: arcSourceColor,
    getTargetColor: arcTargetColor,
    getWidth: w => Math.sqrt(w.properties.Round_total_MSA_population * arcWidth),
    getHeight: arcHeight,
    pickable: false,
    autoHighlight: false,
    highlightColor: SelectHighlightColor,
    getTilt: arcTilt,
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
    getSourceColor: arcSourceColor,
    getTargetColor: arcTargetColor,
    getWidth: w => Math.sqrt(w.properties.Round_total_MSA_population * arcWidth),
    getHeight: arcHeight,
    pickable: false,
    autoHighlight: false,
    highlightColor: SelectHighlightColor,
    getTilt: arcTilt,
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
    getSourceColor: arcSourceColor,
    getTargetColor: arcTargetColor,
    getWidth: w => Math.sqrt(w.properties.Round_total_MSA_population * arcWidth),
    getHeight: arcHeight,
    pickable: false,
    autoHighlight: false,
    highlightColor: SelectHighlightColor,
    getTilt: arcTilt,
    onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
});




map.on('load', () => {
    // map.addLayer(worldMap);
    // map.addLayer(statesMap);
    // map.addLayer(ntCountries);
    map.addLayer(guatArc);
    map.addLayer(salvArc);
    map.addLayer(hondArc);
    map.addLayer(salvDestinations);
    map.addLayer(guatDestinations);
    map.addLayer(hondDestinations);

});

