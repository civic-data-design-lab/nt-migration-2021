//MAP COLORS
var countryFillColor = "#0070FF" 
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

mapboxgl.accessToken = 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg';
// Initialize the basemap
var map = new mapboxgl.Map({
    container: 'map-motivations', // container element id
    style: 'mapbox://styles/mitcivicdata/ckuyzlxi10cgf14mw6ht4qbgp',
    center: [-88.0000000, 17.0000000], // initial map center in [lon, lat]
    zoom: 5,
});


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




