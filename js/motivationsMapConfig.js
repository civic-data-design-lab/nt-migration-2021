var motivationsConfig = {
    style: 'mapbox://styles/mitcivicdata/ckuyzlxi10cgf14mw6ht4qbgp',
    accessToken: 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg',
    theme: 'motivations-map-theme',

    chapters: [


        //DESTINATION 0
        {
            id: 'map-state-1',
            alignment: 'full',
            hidden: false,
            title: 'The intention to migrate increased from 8% in 2019 to 15% in 2021',
            image: './img/motivations/caravan.jpg',
            description: 'The intention to migrate is largely economics, caused by the externalities of violence, insecurity, and natural disasters.',
            location: {
                center: [-89.0000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
        },

        //DESTINATION 2
        {
            id: 'map-state-2',
            alignment: 'full',
            hidden: false,
            title: '',
            description: 'Migration from Central America (Honduras, El Salvador and Guatemala) has dramatically increased in recent years.',
            location: {
                center: [-89.0000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
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
                center: [-87.70000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 7,
                pitch: 40,
                bearing: -15
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
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
                center: [-87.70000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 6.8,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
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
                center: [-87.70000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 6.8,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
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
                center: [-87.70000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 6.8,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
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
                center: [-87.70000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 6.8,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ],

        },


    ]
};

