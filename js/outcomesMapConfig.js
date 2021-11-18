var aspectRatio = screen.width/screen.height;
var farZoom;
var closeZoom;
var middleZoom;

if (aspectRatio < 1){
    closeZoom = Math.log(screen.width)/1.2;
    middleZoom = Math.log(screen.width)/2.05;
    middleZoom2 = Math.log(screen.width)/2.5;
    farZoom = Math.log(screen.width)/2.9;

}

if (aspectRatio >= 1){
    closeZoom = Math.log(screen.width)/1.2;
    middleZoom = Math.log(screen.width)/1.65;
    middleZoom2 = Math.log(screen.width)/1.85;
    farZoom = Math.log(screen.width)/2.1;
}


var outcomesConfig = {
    style: 'mapbox://styles/mitcivicdata/ckuslqqrj0r7718mu0lg5pyuz',
    accessToken: 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg',
    theme: 'scrolly-container-outcomes',

    chapters: [

        //DESTINATION 0
        {
            id: 'map-state-0',
            alignment: 'full',
            hidden: false,
            title: '1 in 4 Households Have Migrants',
            image: './img/outcomes/out1.jpg',
            filter: '',
            paddedImage: false,
            description: '24% of households in Central America have someone who migrated in the last five years. All of these households receive remittances. The need to migrate is largely economic, caused by the externalities of violence, insecurity, and natural disasters.',
            location: {
                center: [-89.2000000, 14.5000000], // initial map center in [lon, lat]
                zoom: closeZoom,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [
            ],
            showGuat:true,
            showHond:true,
            showSalv:true,
            fadePixels: true,
        },

        //DESTINATION 1
        {
            id: 'map-state-1',
            alignment: 'left',
            hidden: false,
            title: 'The Majority of Migrants (89%) Seek to Migrate to the United States',
            image: '', 
            filter: '',
            paddedImage: '',
            description: '',
            mapLayer: 'mappedText1',
            location: {
                center: [-96.5000000, 30.0000000], // initial map center in [lon, lat]
                zoom: farZoom,
                pitch: 50,
                bearing: -35
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
            hideCountries: true,
            showGuat:true,
            showHond:false,
            showSalv:false,
            fadePixels: '',
        },

        //DESTINATION 2
        {
            id: 'map-state-2',
            alignment: 'left',
            hidden: false,
            title: '96% of Guatemalans Migrate to the United States',
            image: '', 
            filter: '',
            paddedImage: false,
            description: '',
            location: {
                center: [-96.5000000, 30.0000000], // initial map center in [lon, lat]
                zoom: middleZoom2,
                pitch: 50,
                bearing: -15
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [
            ],
            onChapterExit: [
            ],
            showGuat:false,
            showHond:true,
            showSalv:false,
            fadePixels: '',


        },



        //DESTINATION 3
        {
            id: 'map-state-3',
            alignment: 'left',
            hidden: false,
            title: '82% of Hondurans Migrate to the United States',
            image: '',
            filter: '',
            paddedImage: false,
            description: '11% of Hondurans migrate to Spain.',
            location: {
                center: [-96.5000000, 30.0000000], // initial map center in [lon, lat]
                zoom: middleZoom2,
                pitch: 50,
                bearing: 15
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
            showGuat:false,
            showHond:false,
            showSalv:true,
            fadePixels: '',
        },


        //DESTINATION 4
        {
            id: 'map-state-4',
            alignment: 'left',
            hidden: false,
            title: '94% of Salvadorans Migrate to the United States',
            image: '', 
            filter: '',
            paddedImage: '',
            description: '', 
            location: {
                center: [-96.5000000, 30.0000000], // initial map center in [lon, lat]
                zoom: middleZoom2,
                pitch: 60,
                bearing: 35
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: [],
            showGuat:true,
            showHond:true,
            showSalv:true,
            fadePixels: '',
        },

        //DESTINATION 9
        {
            id: 'map-state-9',
            alignment: 'left',
            hidden: true,
            title: '',
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
            onChapterEnter: [],
            onChapterExit: [],
            showGuat:true,
            showHond:true,
            showSalv:true,
            fadePixels: '',
            
        },

        //DESTINATION 8
        {
            id: 'map-state-10',
            alignment: 'full',
            hidden: false,
            title: 'This Diaspora Should Invest in Public Works, and Governments Should Match Those Funds',
            image: '',
            filter: '',
            paddedImage: false,
            description: 'The diaspora should use their remittances to support more than basic needs. International organizations should consider diasporas as potential agents of economic development and governance. Creating incentives for members of a diaspora to invest in public works can magnify the reach of government efforts while simultaneously enriching transnational partnerships to improve governance, for example, by matching diaspora donation with transparent and accountable commitments from the national, departmental, and municipal governments.',
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
            showGuat:true,
            showHond:true,
            showSalv:true,
            fadePixels: '',
            
        },

    ]
};

