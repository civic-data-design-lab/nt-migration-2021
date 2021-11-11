var outcomesConfig = {
    style: 'mapbox://styles/mitcivicdata/ckuslqqrj0r7718mu0lg5pyuz',
    accessToken: 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg',
    theme: 'scrolly-container-outcomes',

    chapters: [

        //DESTINATION -1
        {
            id: 'map-state-0',
            alignment: 'full',
            hidden: false,
            title: '1 in 4 Households Have Migrants',
            image: './img/outcomes/family.jpeg',
            filter: '',
            paddedImage: false,
            description: '24% of households in Central America have someone who migrated in the last five years. All of these households receive remittances. The need to migrate is largely economic, caused by the externalities of violence, insecurity, and natural disasters.',
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

        //DESTINATION 1
        {
            id: 'map-state-1',
            alignment: 'full',
            hidden: false,
            title: 'The majority of migrants (89%) seek to migrate to the United States',
            image: '', //./img/tmp/outcomestoUS.png
            filter: '',
            paddedImage: '',
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

        //DESTINATION 2
        {
            id: 'map-state-2',
            alignment: 'full',
            hidden: false,
            title: '96% of Guatemalans Migrate to the United States',
            image: '', 
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
                {
                    layer: 'salvArc',
                    opacity: 0,
                    duration: 5000
                }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]


        },



        //DESTINATION 3
        {
            id: 'map-state-3',
            alignment: 'full',
            hidden: false,
            title: '82% of Hondurans migrate to the United States',
            title2: '',
            image: '',
            filter: '',
            paddedImage: false,
            description: '11% of Hondurans migrate to Spain',
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


        //DESTINATION 4
        {
            id: 'map-state-4',
            alignment: 'full',
            hidden: false,
            title: '94% of El-Salvadorians migrate to the United States',
            image: '', //./img/outcomes/climbing.jpg
            filter: '',
            paddedImage: '',
            description: '', //The rest are either caught, detained, or return home. Some are lost and never return.
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



        //DESTINATION 5
        {
            id: 'map-state-5',
            alignment: 'full',
            hidden: false,
            title: 'Just over half of migrants (57%) make it to their final destination', //Increased diaspora comes with additional risk
            image: './img/outcomes/farm.jpg',
            filter: '',
            paddedImage: false,
            description: 'Migrants work in similar industries as they did in their home countries. The United States economy depends on these migrants in industries that have labour shortages, such as agriculture, the restaurant industry, and domestic work. In 2018, nearly 74% of agriculture workers were migrants. The United States needs these migrants as much as they need us.',
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

        //DESTINATION 6
        {
            id: 'map-state-6',
            alignment: 'full',
            hidden: false,
            title: 'Insert Chart here Insert Chart here Insert Chart here Insert Chart here Insert Chart here Insert Chart here', //Increased diaspora comes with additional risk
            image: '',
            filter: '',
            paddedImage: false,
            description: '',
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

        //DESTINATION 6
        {
            id: 'map-state-7',
            alignment: 'full',
            hidden: false,
            title: '33% of migrants are returned home', //Increased diaspora comes with additional risk
            image: './img/outcomes/official.jpg', //
            filter: '',
            paddedImage: false,
            description: 'This comes at a loss to the migrants who raise large funds and experience harrowing conditions to migrate. While both origin and destination countries benefit ecnomically from migration, the cost is largely borne by the migrants themselves.',
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

        //DESTINATION 7
        {
            id: 'map-state-8',
            alignment: 'full',
            hidden: false,
            title: 'Migrants send remittances to provide for basic needs', //Increased diaspora comes with additional risk
            image: './img/outcomes/Honduran-migrants.jpg', //
            filter: '',
            paddedImage: false,
            description: '29% of households reported regularly receiving remittances from abroad. These remittances provide a lifeline to meet subsistence costs and immediate expenses rather than a means to contribute to savings, personal investment or community projects, which are cited as catalysts for development. This lifeline is helpful for the origin countries which struggle to fund social services for their populations.',
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

        //DESTINATION 8
        {
            id: 'map-state-9',
            alignment: 'full',
            hidden: true,
            title: '',
            image: '',
            filter: '',
            paddedImage: false,
            description: '',
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

        //DESTINATION 8
        {
            id: 'map-state-10',
            alignment: 'full',
            hidden: false,
            title: 'This diaspora should invest in public works, and governments should match those funds',
            image: '',
            filter: '',
            paddedImage: false,
            description: 'The diaspora should use their remittances to support more than basic needs. International organizations should consider diasporas as potential agents of economic development and governance. Creating incentives for members of a diaspora to invest in public works can magnify the reach of government efforts while simultaneously enriching transnational partnerships to improve governance, for example, by matching diaspora donation with transparent and accountable commitments from the national, departmental, and municipal governments.',
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

