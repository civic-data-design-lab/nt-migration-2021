var aspectRatio = screen.width / screen.height;
var farZoom;
var closeZoom;
var middleZoom;
var maxZoom;

if (aspectRatio < 1) {
    if (screen.width < 760) {
        maxZoom = Math.log(screen.width) / 1.125;
        closeZoom = Math.log(screen.width) / 1.3;
        middleZoom = Math.log(screen.width) / 1.7;
    }
    else {
        maxZoom = Math.log(screen.width) / 1.1;
        closeZoom = Math.log(screen.width) / 1.2;
        middleZoom = Math.log(screen.width) / 1.5;
    }
}

if (aspectRatio >= 1) {
    maxZoom = Math.log(screen.width) / 1.05;
    closeZoom = Math.log(screen.width) / 1.15;
    middleZoom = Math.log(screen.width) / 1.85;
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
            title: 'Intentions to Migrate have Increased Significantly',
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
            alignment: 'right',
            hidden: false,
            title: '5,000 Households were Surveyed',
            description: 'In April and May 2021, nearly 5,000 households in 12 departments across El Salvador, Guatemala, and Honduras were surveyed by the UN World Food Programme (WFP) and international and civil-society partners to understand the emerging needs of migrant and non-migrant communities in the countries of origin. This was complimented by a nationally representative online survey with more than 6,000 individual responses. Each square cell represents a survey location.',
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
                    opacity: 1,
                }

            ],
            onChapterExit: [
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
        },

        //DESTINATION 3
        {
            id: 'map-state-3',
            alignment: 'full',
            hidden: false,
            title: 'Migration Increase is Concerning',
            image: './img/outcomes/out3.jpg',
            description: 'Increases in migration have generated concern in the U.S., which receives the majority of migrants from El Salvador, Guatemala, and Honduras.',
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
                    opacity: 1,
                },


            ],
            onChapterExit: [
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

            ],
        },
        
        //DESTINATION 4
        {
            id: 'map-state-4',
            alignment: 'full',
            hidden: false,
            title: 'Migrants Want to Stay',
            image: './img/motivations/mot2.jpg',
            description: 'Despite a rising desire to migrate, only a fraction of the surveyed population plan to do so. The primary motivation for migration is largely driven by economics.',
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
                    layer: 'ntCountriesViz',
                    opacity: 1,
                },
                {
                    layer: 'ntCountriesVizLine',
                    opacity: 1,
                }

            ],
            onChapterExit: [
            ],

        },


    ]
};

