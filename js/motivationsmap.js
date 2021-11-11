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

motivationsConfig.chapters.forEach((record, idx) => {
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
    if (record.title || record.title2 || record.description) {

        let storyText = document.createElement('div');


        if(!record.image){
            storyText.className = 'scrollytelling-text'
            mapChapter.appendChild(storyText)
        }
        if(record.image){
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



    }



    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }

    mapChapter.classList.add(motivationsConfig.theme);
    container.appendChild(mapChapter);
    container.classList.add(alignments[record.alignment] || 'centered');
    if (record.hidden) {
        container.classList.add('hidden');
    }
    features.appendChild(container);
});

story.appendChild(features);

var footer = document.createElement('div');

if (motivationsConfig.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = motivationsConfig.footer;
    footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
    footer.classList.add(motivationsConfig.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

mapboxgl.accessToken = motivationsConfig.accessToken;

const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";
    return {
        url: url //+ suffix
    }
}

var map = new mapboxgl.Map({
    container: 'map',
    style: motivationsConfig.style,
    center: motivationsConfig.chapters[0].location.center,
    zoom: motivationsConfig.chapters[0].location.zoom,
    bearing: motivationsConfig.chapters[0].location.bearing,
    pitch: motivationsConfig.chapters[0].location.pitch,
    interactive: false,
    transformRequest: transformRequest,
    // antialias: true // Mapbox disables WebGL's antialiasing by default
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
            var mapChapter = motivationsConfig.chapters.find(chap => chap.id === response.element.id);
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
            var mapChapter = motivationsConfig.chapters.find(chap => chap.id === response.element.id);
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

const ntSurvey = new deck.MapboxLayer({
    id: 'nt-grid',
    type: deck.ScreenGridLayer,
    data: 'data/mapbox/motivations/nt-survey-points.geojson',
    getPosition: p => p.geometry.coordinates,
    // getWeight: d => d[2],    
    cellSizePixels: 12,
    // cellSizePixels: motivationsConfig.chapters[0].location.zoom,
    // cellMarginPixels: 0.1,
    colorRange: [255, 255, 255, 255],
});

map.on('load', () => {
    map.addLayer(ntSurvey);

    // map.setPaintProperty(layer.value, 'fill-color', color);
    map.setLayerZoomRange('nt-grid', 6, 12);
    // map.setLayoutProperty('nt-grid', 'cellSizePixels', 1);
});
