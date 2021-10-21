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


//MAP COLORS
var countryFillColor = "#322DCD" 
var partialFillColor = "rgba(120,141,231,0.5)"
var countryBoundaryColor = "rgba(255,255,255,0.3)"
var borderWidth = 5
var borderColor = 'rgba(255,255,255,1)'

// outcome destination styles
var outcomeColor = 'rgba(235,235,255,0.5)'
var outcomeColorSolid = 'rgba(235,235,255,1)'
var outcomeLineWidth = 3
var outcomeCircleMin = 2
var outcomeCircleMax = 40


// Load COUNTRY BOUNDARIES
map.on('load', function () {

    map.addSource('worldmap', {
        'type': 'geojson',
        'data': 'data/mapbox/basemaps/medium/world-medium.json',
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
            'line-width': borderWidth,
            'line-color': borderColor
        },
    });
});

// Load NT-COUNTRIES SURVEY POINTS
map.on('load', function () {

    map.addSource('ntCountriesSurvey', {
        'type': 'geojson',
        'data': 'data/mapbox/motivations/nt-survey-points.geojson',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'ntCountriesSurveyViz',
        type: 'circle',
        source: 'ntCountriesSurvey',
        paint: {
            'circle-color': outcomeColorSolid,
            'circle-radius' : outcomeCircleMin
            
        },
    });

});



