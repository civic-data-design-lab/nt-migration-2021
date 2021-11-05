var outcomesConfig = {
    style: 'mapbox://styles/mitcivicdata/ckuslqqrj0r7718mu0lg5pyuz',
    accessToken: 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg',
    theme: 'outcomes-map-theme',

    chapters: [

        //DESTINATION -1
        {
            id: 'map-state--1',
            alignment: 'left',
            hidden: false,
            title: 'Each line represents a story of external migration.',
            image: '',
            filter: '',
            paddedImage: false,
            description: 'in every story, there are challenges. Regardless of the mode of migration, there is sacrifice, endurance, and considerable risk along the way.',
            location: {
                center: [-87.0000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 6,
                pitch: 65,
                bearing: -35
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },

        //DESTINATION 0
        {
            id: 'map-state-0',
            alignment: 'left',
            hidden: false,
            title: 'The majority of external migration from the Northern Triangle is to the United States.',
            image: './img/tmp/outcomestoUS.png',
            filter: '',
            paddedImage: true,
            description: '',
            location: {
                center: [-95.0000000, 30.0000000], // initial map center in [lon, lat]
                zoom: 3.5,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },

        //DESTINATION 1
        {
            id: 'map-state-1',
            alignment: 'full',
            hidden: false,
            title: 'But only 57% of migrants reach their destination.',
            image: './img/outcomes/climbing.jpg',
            filter: '',
            paddedImage: false,
            description: '',
            location: {
                center: [-95.0000000, 30.0000000], // initial map center in [lon, lat]
                zoom: 3.5,
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
            ]


        },



        //DESTINATION 2
        {
            id: 'map-state-2',
            alignment: 'left',
            hidden: false,
            title: 'Northern Triangle emmigration into the U.S. clusters around opportunity.',
            image: '',
            filter: '',
            paddedImage: false,
            description: 'a staggering xxxx miles away.',
            location: {
                center: [-85.0000000, 35.0000000], // initial map center in [lon, lat]
                zoom: 4.7,
                pitch: 45,
                bearing: -35
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },


        //DESTINATION 3
        {
            id: 'map-state-3',
            alignment: 'left',
            hidden: false,
            title: '',
            image: './img/outcomes/climbing.jpg',
            filter: '',
            paddedImage: false,
            description: '57% of migrants reach their destination.',
            location: {
                center: [-115.0000000, 35.0000000], // initial map center in [lon, lat]
                zoom: 4.7,
                pitch: 45,
                bearing: 25
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },



        //DESTINATION 4
        {
            id: 'map-state-4',
            alignment: 'fully',
            hidden: false,
            title: 'Increased diaspora comes with additional risk',
            image: './img/outcomes/military.jpg',
            filter: '',
            paddedImage: false,
            description: 'As the trend for external migration is only increasing in both distance and numbers, migrants are exposed to new risk factors.',
            location: {
                center: [-90.0000000, 28.0000000], // initial map center in [lon, lat]
                zoom: 3.75,
                pitch: 20,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },



    ]
};

