var aspectRatio = screen.width / screen.height;
var farZoom;
var closeZoom;
var middleZoom;
var maxZoom;

if (aspectRatio < 1) {
    maxZoom = Math.log(screen.width) / 1.125;
    closeZoom = Math.log(screen.width) / 1.3;
    middleZoom = Math.log(screen.width) / 1.7;
    farZoom = Math.log(screen.width) / 2.9;
}

if (aspectRatio >= 1) {
    maxZoom = Math.log(screen.width) / 1.05;
    closeZoom = Math.log(screen.width) / 1.15;
    middleZoom = Math.log(screen.width) / 1.85;
    farZoom = Math.log(screen.width) / 2.1;
}



var motivationsConfig = {
    style: 'mapbox://styles/mitcivicdata/ckuyzlxi10cgf14mw6ht4qbgp',
    accessToken: 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg',
    theme: 'scrolly-container-motivations',

    chapters: [


        //DESTINATION 0
        {
            id: 'map-state-1',
            alignment: 'full',
            hidden: false,
            title: 'The Intention to Migrate has Increased Significantly',
            image: './img/motivations/mot1.jpg',
            description: 'Approximately four out of every ten households (43%) indicated a desire to migrate in 2021, compared to 8% in 2019. The intention to migrate is largely driven by economics and compounded by external violence, insecurity, and natural disasters.',
            location: {
                center: [-87.700000, 15.0000000], // initial map center in [lon, lat]
                zoom: middleZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'worldMapViz',
                    opacity: 1,
                },
                {
                    layer: 'ntCountriesViz',
                    opacity: 1,
                },
                {
                    layer: 'ntCountriesVizLine',
                    opacity: 1,
                }
            ],
            onChapterExit: [
                {
                    layer: 'worldMapViz',
                    opacity: 1,
                }
            ],
        },

        //DESTINATION 2
        {
            id: 'map-state-2',
            alignment: 'full',
            hidden: false,
            title: 'Migration Increases are Concerning to the U.S.',
            description: 'Increases in migration hae generated concern in the U.S., who receive the majority of migrants from the northern countries in Central America.',
            location: {
                center: [-87.7000000, 15.0000000], // initial map center in [lon, lat]
                zoom: closeZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'worldMapViz',
                    opacity: 1,
                },
                {
                    layer: 'ntCountriesViz',
                    opacity: 1,
                },
                {
                    layer: 'ntCountriesVizLine',
                    opacity: 1,
                },
                {
                    layer: 'worldMapViz',
                    opacity: 0,
                }

            ],
            onChapterExit: [
                {
                    layer: 'worldMapViz',
                    opacity: 0,
                },
                {
                    layer: 'ntCountriesViz',
                    opacity: 1,
                },
                {
                    layer: 'ntCountriesVizLine',
                    opacity: 1,
                }
            ],
        },

        //DESTINATION 3
        {
            id: 'map-state-3',
            alignment: 'full',
            hidden: false,
            title: 'Migration has Large Costs for Migrants',
            description: 'Migration comes at a large expense to the migrants, many of whom do not want to leave their country. Migrants often leave because they need to provide for their families and have limited social services to turn to for help.',
            location: {
                center: [-89.2000000, 14.5000000], // initial map center in [lon, lat]
                zoom: maxZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'ntCountriesViz',
                    opacity: 0,
                },
                {
                    layer: 'ntCountriesVizLine',
                    opacity: 0,
                }

            ],
            onChapterExit: [
            ],





        },

        //DESTINATION 4
        {
            id: 'map-state-4',
            alignment: 'full',
            hidden: false,
            title: 'Migrant Motivations are Complex',
            description: 'In order to understand the complex reasons for migration, close to 5,000 households in El Salvador, Guatemala, and Honduras were interviewed in June 2021 by the World Food Programme (WFP) and the International Organization for Migration (IOM) to better understand their conditions.',
            location: {
                center: [-89.2000000, 15.5000000], // initial map center in [lon, lat]
                zoom: maxZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [


            ],
            onChapterExit: [


            ],



        }

    ]
};

