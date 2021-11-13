var aspectRatio = screen.width/screen.height;
var farZoom;
var closeZoom;
var middleZoom;
var maxZoom;

if (aspectRatio < 1){
    maxZoom = Math.log(screen.width)/1.125;
    closeZoom = Math.log(screen.width)/1.3;
    middleZoom = Math.log(screen.width)/1.7;
    farZoom = Math.log(screen.width)/2.9;
}

if (aspectRatio >= 1){
    maxZoom = Math.log(screen.width)/1.025;
    closeZoom = Math.log(screen.width)/1.15;
    middleZoom = Math.log(screen.width)/1.85;
    farZoom = Math.log(screen.width)/2.1;
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
            title: 'The intention to migrate increased from 8% in 2019 to 15% in 2021',
            image: './img/motivations/mot1.jpg',
            description: 'The intention to migrate is largely economics, caused by the externalities of violence, insecurity, and natural disasters.',
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
            title: '',
            description: 'Migration from Central America (Honduras, El Salvador and Guatemala) has dramatically increased in recent years.',
            location: {
                center: [-87.7000000, 15.0000000], // initial map center in [lon, lat]
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
            // title: 'Display Title',
            // image: './images/zebra.jpg',
            description: 'These migration trends have become a topic of political debate in the United States because they receive the majority of migrants.',
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
            // title: 'Display Title',
            // image: './images/zebra.jpg',
            description: 'Migration comes at a large expense to the migrants, many who do not want to leave their country. The root causes of what motivates these migrants must be identified.',
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

            ],
            onChapterExit: [

            ],



        },

        //DESTINATION 5
        {
            id: 'map-state-5',
            alignment: 'full',
            hidden: false,
            // title: 'Display Title',
            // image: './images/zebra.jpg',
            description: 'During June 2021, close to 5,000 households in Honduras, El Salvador and Guatemala were interview by the World Food Program +International Organization on Migration to better understand their condition.',
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
            ],
            onChapterExit: [
                {
                    layer: 'ntCountriesViz',
                    opacity: 0,
                },
                {
                    layer: 'ntCountriesVizLine',
                    opacity: 0,
                }

            ],



        },

        //DESTINATION 6
        {
            id: 'map-state-6',
            alignment: 'full',
            hidden: false,
            // title: 'Display Title',
            // image: './images/zebra.jpg',
            description: 'These are their motivations....',
            location: {
                center: [-89.2500000, 14.5000000], // initial map center in [lon, lat]
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

        },

        //DESTINATION 7
        {
            id: 'map-state-7',
            alignment: 'full',
            hidden: true,
            // title: 'Display Title',
            // image: './images/zebra.jpg',
            description: 'These are their motivations....',
            // extraSpacing: true,
            location: {
                center: [-89.2500000, 14.5000000], // initial map center in [lon, lat]
                zoom: maxZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {

                }
            ],
            onChapterExit: [


            ],

        },


    ]
};

