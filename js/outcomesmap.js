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



mapboxgl.accessToken = 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg';
// Initialize the basemap
var map = new mapboxgl.Map({
    container: 'map-outcomes', // container element id
    style: 'mapbox://styles/mitcivicdata/ckuslqqrj0r7718mu0lg5pyuz',
    center: [-90.0000000, 30.0000000], // initial map center in [lon, lat]
    zoom: 4,
});


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


// Load OUTCOMES - EL SALVADOR CIRCLES
map.on('load', function () {

    map.addSource('SalvCircles', {
        'type': 'geojson',
        'data': 'data/mapbox/outcomes/salv-circles.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'SalvCirclesViz',
        type: 'circle',
        source: 'SalvCircles',
        paint: {
            'circle-radius':[
                'interpolate',
                ['linear'],
                ['number', ['get', 'Imm__tot_pop']],
                0, outcomeCircleMin,
                1.5, outcomeCircleMax
            ],
            'circle-color': outcomeColor,
        },
    });

});

// Load OUTCOMES - EL SALVADOR ORIGIN CIRCLES
map.on('load', function () {

    map.addSource('SalvOriginCircles', {
        'type': 'geojson',
        'data': 'data/mapbox/outcomes/salv-origins.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'SalvOriginCirclesViz',
        type: 'circle',
        source: 'SalvOriginCircles',
        paint: {
            'circle-radius':5,
            'circle-color': outcomeColorSolid,
        },
    });

});

// Load OUTCOMES - EL SALVADOR LINES
map.on('load', function () {

    map.addSource('SalvLines', {
        'type': 'geojson',
        'data': 'data/mapbox/outcomes/salv-multiline.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'SalvLinesViz',
        type: 'line',
        source: 'SalvLines',
        paint: {
            'line-width': outcomeLineWidth,
            'line-color': outcomeColor,
        },
    });

});

// Load OUTCOMES - GUATEMALA CIRCLES
map.on('load', function () {

    map.addSource('guatCircles', {
        'type': 'geojson',
        'data': 'data/mapbox/outcomes/guat-destinations.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'guatCirclesViz',
        type: 'circle',
        source: 'guatCircles',
        paint: {
            'circle-radius':[
                'interpolate',
                ['linear'],
                ['number', ['get', 'Imm__tot_pop']],
                0, outcomeCircleMin,
                1.5, outcomeCircleMax
            ],
            'circle-color': outcomeColor,
        },
    });

});

// Load OUTCOMES - GUAT ORIGIN CIRCLES
map.on('load', function () {

    map.addSource('guatOriginCircles', {
        'type': 'geojson',
        'data': 'data/mapbox/outcomes/guat-origins.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'guatOriginCirclesViz',
        type: 'circle',
        source: 'guatOriginCircles',
        paint: {
            'circle-radius':5,
            'circle-color': outcomeColorSolid,
        },
    });

});


// Load OUTCOMES - GUATEMALA LINES
map.on('load', function () {

    map.addSource('guatLines', {
        'type': 'geojson',
        'data': 'data/mapbox/outcomes/guat-multiline.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'guatLinesViz',
        type: 'line',
        source: 'guatLines',
        paint: {
            'line-width': outcomeLineWidth,
            'line-color': outcomeColor,
        },
    });

});

// Load OUTCOMES - HOND CIRCLES
map.on('load', function () {

    map.addSource('hondCircles', {
        'type': 'geojson',
        'data': 'data/mapbox/outcomes/hond-destinations.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'hondCirclesViz',
        type: 'circle',
        source: 'hondCircles',
        paint: {
            'circle-radius':[
                'interpolate',
                ['linear'],
                ['number', ['get', 'Imm__tot_pop']],
                0, outcomeCircleMin,
                1.5, outcomeCircleMax
            ],
            'circle-color': outcomeColor,
        },
    });

});

// Load OUTCOMES - HOND ORIGIN CIRCLES
map.on('load', function () {

    map.addSource('hondOriginCircles', {
        'type': 'geojson',
        'data': 'data/mapbox/outcomes/hond-origins.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'hondOriginCirclesViz',
        type: 'circle',
        source: 'hondOriginCircles',
        paint: {
            'circle-radius':5,
            'circle-color': outcomeColorSolid,
        },
    });

});


// Load OUTCOMES - HOND LINES
map.on('load', function () {

    map.addSource('hondLines', {
        'type': 'geojson',
        'data': 'data/mapbox/outcomes/hond-multiline.json',
        'generateId': true // This ensures that all features have unique IDs
    });

    map.addLayer({
        id: 'hondLinesViz',
        type: 'line',
        source: 'hondLines',
        paint: {
            'line-width': outcomeLineWidth,
            'line-color': outcomeColor,
        },
    });

});


