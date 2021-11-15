var aspectRatio = screen.width/screen.height;
var farZoom;
var closeZoom;
var middleZoom;

if (aspectRatio < 1){
    closeZoom = Math.log(screen.width)/1.2;
    middleZoom = Math.log(screen.width)/2.05;
    farZoom = Math.log(screen.width)/2.9;

}

if (aspectRatio >= 1){
    closeZoom = Math.log(screen.width)/1.2;
    middleZoom = Math.log(screen.width)/1.65;
    farZoom = Math.log(screen.width)/2.1;
}


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
            title: '1 In 4 Households Have Migrants',
            image: './img/outcomes/out1.jpg',
            filter: '',
            paddedImage: false,
            description: '24% of households in Central America have someone who migrated in the last five years. All of these households receive remittances. The need to migrate is largely economic, caused by the externalities of violence, insecurity, and natural disasters.',
            location: {
                center: [-96.5000000, 30.0000000], // initial map center in [lon, lat]
                zoom: farZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [
            ],
            hideCountries: false,
            showGuat:true,
            showHond:true,
            showSalv:true,
        },

        //DESTINATION 1
        {
            id: 'map-state-1',
            alignment: 'full',
            hidden: false,
            title: 'The Majority Of Migrants (89%) Seek To Migrate To The United States',
            image: '', //./img/tmp/outcomestoUS.png
            filter: '',
            paddedImage: '',
            description: '',
            location: {
                center: [-96.5000000, 30.0000000], // initial map center in [lon, lat]
                zoom: farZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
            hideCountries: true,
            showGuat:true,
            showHond:true,
            showSalv:true,
        },

        //DESTINATION 2
        {
            id: 'map-state-2',
            alignment: 'full',
            hidden: false,
            title: '96% Of Guatemalans Migrate To The United States',
            image: '', 
            filter: '',
            paddedImage: false,
            description: '',
            location: {
                center: [-96.5000000, 30.0000000], // initial map center in [lon, lat]
                zoom: farZoom,
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
            hideCountries: false,
            showGuat:true,
            showHond:false,
            showSalv:false,


        },



        //DESTINATION 3
        {
            id: 'map-state-3',
            alignment: 'full',
            hidden: false,
            title: '82% Of Hondurans Migrate To The United States',
            title2: '',
            image: '',
            filter: '',
            paddedImage: false,
            description: '11% of Hondurans migrate to Spain',
            location: {
                center: [-85.0000000, 35.0000000], // initial map center in [lon, lat]
                zoom: middleZoom,
                pitch: 45,
                bearing: -35
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
            hideCountries: false,
            showGuat:false,
            showHond:true,
            showSalv:false,
        },


        //DESTINATION 4
        {
            id: 'map-state-4',
            alignment: 'full',
            hidden: false,
            title: '94% Of El-Salvadorians Migrate To The United States',
            image: '', //./img/outcomes/climbing.jpg
            filter: '',
            paddedImage: '',
            description: '', //The rest are either caught, detained, or return home. Some are lost and never return.
            location: {
                center: [-115.0000000, 35.0000000], // initial map center in [lon, lat]
                zoom: middleZoom,
                pitch: 45,
                bearing: 25
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
            hideCountries: false,
            showGuat:false,
            showHond:false,
            showSalv:true,
        },



        //DESTINATION 5
        // {
        //     id: 'map-state-5',
        //     alignment: 'full',
        //     hidden: false,
        //     title: 'Just Over Half Of Migrants (57%) Make It To Their Final Destination', //Increased diaspora comes with additional risk
        //     image: './img/outcomes/out2.jpg',
        //     filter: '',
        //     paddedImage: false,
        //     description: 'Migrants work in similar industries as they did in their home countries. The United States economy depends on these migrants in industries that have labour shortages, such as agriculture, the restaurant industry, and domestic work. In 2018, nearly 74% of agriculture workers were migrants. The United States needs these migrants as much as they need us.',
        //     location: {
        //         center: [-90.0000000, 30.0000000], // initial map center in [lon, lat]
        //         zoom: middleZoom,
        //         pitch: 0,
        //         bearing: 0
        //     },
        //     mapAnimation: 'flyTo',
        //     rotateAnimation: false,
        //     callback: '',
        //     onChapterEnter: [],
        //     onChapterExit: [],
        //     hideCountries: false,
        //     showGuat:true,
        //     showHond:true,
        //     showSalv:true,
            
        // },

        //DESTINATION 6
        // {
        //     id: 'map-state-6',
        //     alignment: 'full',
        //     hidden: false,
        //     title: 'Insert Chart Here Insert Chart Here Insert Chart Here Insert Chart Here Insert Chart Here Insert Chart Here', //Increased diaspora comes with additional risk
        //     image: '',
        //     filter: '',
        //     paddedImage: false,
        //     description: '',
        //     location: {
        //         center: [-90.0000000, 30.0000000], // initial map center in [lon, lat]
        //         zoom: farZoom,
        //         pitch: 0,
        //         bearing: 0
        //     },
        //     mapAnimation: 'flyTo',
        //     rotateAnimation: false,
        //     callback: '',
        //     onChapterEnter: [],
        //     onChapterExit: [],
        //     hideCountries: false,
        //     showGuat:true,
        //     showHond:true,
        //     showSalv:true,
            
        // },

        //DESTINATION 6
        // {
        //     id: 'map-state-7',
        //     alignment: 'full',
        //     hidden: false,
        //     title: '33% Of Migrants Are Returned Home', //Increased diaspora comes with additional risk
        //     image: './img/outcomes/out3.jpg', //
        //     filter: '',
        //     paddedImage: false,
        //     description: 'This comes at a loss to the migrants who raise large funds and experience harrowing conditions to migrate. While both origin and destination countries benefit ecnomically from migration, the cost is largely borne by the migrants themselves.',
        //     location: {
        //         center: [-90.0000000, 30.0000000], // initial map center in [lon, lat]
        //         zoom: farZoom,
        //         pitch: 0,
        //         bearing: 0
        //     },
        //     mapAnimation: 'flyTo',
        //     rotateAnimation: false,
        //     callback: '',
        //     onChapterEnter: [],
        //     onChapterExit: [],
        //     hideCountries: false,
        //     showGuat:true,
        //     showHond:true,
        //     showSalv:true,
            
        // },

        //DESTINATION 7
        // {
        //     id: 'map-state-8',
        //     alignment: 'full',
        //     hidden: false,
        //     title: 'Migrants Send Remittances To Provide For Basic Needs', //Increased diaspora comes with additional risk
        //     image: './img/outcomes/out4.jpg', //
        //     filter: '',
        //     paddedImage: false,
        //     description: '29% of households reported regularly receiving remittances from abroad. These remittances provide a lifeline to meet subsistence costs and immediate expenses rather than a means to contribute to savings, personal investment or community projects, which are cited as catalysts for development. This lifeline is helpful for the origin countries which struggle to fund social services for their populations.',
        //     location: {
        //         center: [-90.0000000, 30.0000000], // initial map center in [lon, lat]
        //         zoom: farZoom,
        //         pitch: 0,
        //         bearing: 0
        //     },
        //     mapAnimation: 'flyTo',
        //     rotateAnimation: false,
        //     callback: '',
        //     onChapterEnter: [],
        //     onChapterExit: [],
        //     hideCountries: false,
        //     showGuat:true,
        //     showHond:true,
        //     showSalv:true,
            
        // },

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
                center: [-90.0000000, 30.0000000], // initial map center in [lon, lat]
                zoom: farZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
            hideCountries: false,
            showGuat:true,
            showHond:true,
            showSalv:true,
            
        },

        //DESTINATION 8
        {
            id: 'map-state-10',
            alignment: 'full',
            hidden: false,
            title: 'This Diaspora Should Invest In Public Works, And Governments Should Match Those Funds',
            image: '',
            filter: '',
            paddedImage: false,
            description: 'The diaspora should use their remittances to support more than basic needs. International organizations should consider diasporas as potential agents of economic development and governance. Creating incentives for members of a diaspora to invest in public works can magnify the reach of government efforts while simultaneously enriching transnational partnerships to improve governance, for example, by matching diaspora donation with transparent and accountable commitments from the national, departmental, and municipal governments.',
            location: {
                center: [-90.0000000, 30.0000000], // initial map center in [lon, lat]
                zoom: farZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
            hideCountries: false,
            showGuat:true,
            showHond:true,
            showSalv:true,
            
        },



    ]
};

