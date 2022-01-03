var aspectRatio = screen.width/screen.height;
var farZoom;
var closeZoom;
var middleZoom;

if (aspectRatio < 1){

    if (screen.width < 760)
    {
        closeZoom = Math.log(screen.width)/1.3;
        middleZoom = Math.log(screen.width)/2.05;
        middleZoom2 = Math.log(screen.width)/2.5;
        farZoom = Math.log(screen.width)/2.9;
    }
    else
    {
        closeZoom = Math.log(screen.width)/1.2;
        middleZoom = Math.log(screen.width)/1.5;
        middleZoom2 = Math.log(screen.width)/2;
        farZoom = Math.log(screen.width)/2.1;
     

    }


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
            title: '1 de cada 4 Hogares Tiene Migrantes',
            image: './img/outcomes/out1.jpg',
            filter: '',
            paddedImage: false,
            description: 'El 24% de los hogares en El Salvador, Guatemala y Honduras tienen un miembro que migró en los últimos cinco años. La mayoría de estos hogares reciben remesas. La necesidad de migrar es en gran parte económica, provocada por las externalidades de la violencia, la inseguridad y los desastres naturales.',
            footnote:'',
            location: {
                center: [-88.000000, 14.5000000], // initial map center in [lon, lat]
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
            title: 'La Mayoría de los Migrantes Recientes Reportados (89%) Buscaron Migrar a los Estados Unidos',
            image: '', 
            filter: '',
            paddedImage: '',
            description: '',
            footnote:'Datos del Mapa: MPI. U.S. Immigrant Population by Metropolitan Area, Table 1, FY 2015-2019.',
            footnoteLink: 'https://www.migrationpolicy.org/programs/data-hub/charts/us-immigrant-population-metropolitan-area?width=850&height=850&iframe=true',
            mapLayer: 'mappedText1',
            location: {
                center: [-88.000000, 30.0000000], // initial map center in [lon, lat]
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
            title: 'El 96% de los Migrantes Guatemaltecos Viajaron a Estados Unidos',
            image: '', 
            filter: '',
            paddedImage: false,
            description: '',
            footnote:'',
            location: {
                center: [-93.000000, 30.0000000], // initial map center in [lon, lat]
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
            title: 'El 82% de los Migrantes Hondureños Viajaron a Estados Unidos',
            image: '',
            filter: '',
            paddedImage: false,
            description: 'El 11% de los migrantes hondureños reportados recientemente viajaron a España.',
            footnote:'',
            location: {
                center: [-93.000000, 30.0000000], // initial map center in [lon, lat]
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
            title: 'El 94% de los migrantes salvadoreños viajaron a Estados Unidos',
            image: '', 
            filter: '',
            paddedImage: '',
            description: '', 
            footnote:'',
            location: {
                center: [-100.000000, 30.0000000], // initial map center in [lon, lat]
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

        //DESTINATION 8
        {
            id: 'map-state-10',
            alignment: 'full',
            hidden: false,
            title: 'Esta Diáspora Debería Invertir en Obras Públicas y los Gobiernos Deberían Igualar estos Fondos',
            image: '',
            filter: '',
            paddedImage: false,
            description: 'Creating incentives for members of a diaspora to invest in public works can magnify the reach of government efforts while simultaneously enriching transnational partnerships to improve governance, for example, by matching diaspora donations with transparent and accountable commitments from the national, departmental, and municipal governments.',
            footnote:'',
            location: {
                center: [-97.000000, 30.0000000], // initial map center in [lon, lat]
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

