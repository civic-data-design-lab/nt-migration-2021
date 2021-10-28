//MAP STYLE VARIABLES

//BASEMAPS
var landColor = [219, 109, 183] //GEOGRAPHIC LAND COLOR
var countriesFillColor = [231, 120, 194, 255] //FILL COLOR OF NOTHERN TRIANGLE COUNTRIES
var countriesBorderColor = [255, 255, 255, 255]
var countriesLineWidth = 30000
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
var arcTilt = -0
arcFilterMin = 21

let surveyPtsJson = {};
let coordArray = [];

new deck.FlyToInterpolator({speed: 2});

const deckgl = new deck.DeckGL({
    container: 'container',
    // Set your Mapbox access token here
    //   mapboxApiAccessToken: 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg',
    //   style: outcomesConfig.style,
    views: new deck._GlobeView(),
    initialViewState: {
        latitude: 15.0000000,
        longitude: -87.0000000,
        zoom: 4,
        bearing: 0,
        pitch: 30,
    },
    controller: true,

    layers: [


        // WORLD MAP
        new deck.GeoJsonLayer({
            id: 'world-map',
            data: 'data/mapbox/basemaps/far/world-far.json',
            // Styles
            filled: true,
            getFillColor: landColor,
        }),


        // NT COUNTRIES
        new deck.GeoJsonLayer({
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
        }),

        // STATES
        new deck.GeoJsonLayer({
            id: 'us-states',
            data: 'data/mapbox/basemaps/far/states-far.geojson',
            // Styles
            filled: true,
            getFillColor: countriesFillColor,
            getLineColor: countriesBorderColor,
            getLineWidth: countriesLineWidth,
        }),

        // US-SALV CIRCLES
        new deck.GeoJsonLayer({
            id: 'salv-circles',
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
            onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
        }),

        // US-HOND CIRCLES
        new deck.GeoJsonLayer({
            id: 'hond-Circles',
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
            onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
        }),

        // US-GUAT CIRCLES
        new deck.GeoJsonLayer({
            id: 'guat-Circles',
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
            onClick: info => info.object && alert(`${info.object.properties.Origin__tooltip_} to ${info.object.properties.Metro} (Population: ${info.object.properties.Round_immigrants})`)
        }),

        // ARCLAYERS!

        // EL-SALVADOR ARCLAYER
        new deck.ArcLayer({
            id: 'elsalvARc',
            data: 'data/mapbox/outcomes/salv-multiline-coords.json',
            // data: AIR_PORTS,
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
        }),

        // HONDURAS ARCLAYER
        new deck.ArcLayer({
            id: 'hondArc',
            data: 'data/mapbox/outcomes/hond-multiline-coords.json',
            // data: AIR_PORTS,
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
        }),

        // GUATEMALA ARCLAYER
        new deck.ArcLayer({
            id: 'guatArc',
            data: 'data/mapbox/outcomes/guat-multiline-coords.json',
            // data: AIR_PORTS,
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
        }),

    new deck.ScreenGridLayer({
        id: 'grid',
        data: 'data/mapbox/motivations/COORDS-ONLY.json', //{COORDINATES: [-122.42177834, 37.78346622]},
        opacity: 0.8,
        getPosition: d => d,
        // getWeight: d => d[2],    
        cellSizePixels: 8,
        // cellMarginPixels: 0.1,
        colorRange: [255,255,255,255],
    }),



    ]
});
