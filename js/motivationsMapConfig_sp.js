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
        // {
        //     id: 'map-state-1',
        //     alignment: 'full',
        //     hidden: false,
        //     title: 'Las Intenciones de Migrar han Aumentado Significativamente',
        //     image: './img/motivations/mot1.jpg',
        //     description: 'Aproximadamente cuatro de cada diez hogares (43%) indicaron un deseo de migrar en 2021, en comparación con el 8% en 2019. La intención de migrar está impulsada en gran medida por la economía y agravada por la violencia externa, la inseguridad y los desastres naturales.',
        //     location: {
        //         center: [-87.700000, 15.0000000], // initial map center in [lon, lat]
        //         zoom: middleZoom,
        //         pitch: 0,
        //         bearing: 0
        //     },
        //     mapAnimation: 'flyTo',
        //     rotateAnimation: false,
        //     callback: '',
        //     onChapterEnter: [
        //         {
        //             layer: 'worldMapViz',
        //             opacity: 1,
        //         },
        //         {
        //             layer: 'ntCountriesViz',
        //             opacity: 1,
        //         },
        //         {
        //             layer: 'ntCountriesVizLine',
        //             opacity: 1,
        //         }
        //     ],
        //     onChapterExit: [
        //         {
        //             layer: 'worldMapViz',
        //             opacity: 1,
        //         }
        //     ],
        // },

        //DESTINATION 2
        {
            id: 'map-state-2',
            alignment: 'right',
            hidden: false,
            title: 'Se Encuestaron 5,000 Hogares',
            description: 'En abril y mayo de 2021, el World Food Programme de las Naciones Unidas (WFP) y socios internacionales y de la sociedad civil encuestaron a casi 5,000 hogares en 12 departamentos de El Salvador, Guatemala y Honduras para entender las necesidades emergentes de las comunidades migrantes y no migrantes en los países de origen. Esta encuesta fue complementada por una encuesta adicional en línea a nivel nacional con más de 6,000 respuestas individuales. Cada cuadrado representa una ubicación de la encuesta.',
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
            title: 'El Aumento de la Migración es Preocupante',
            image: './img/outcomes/out3.jpg',
            description: 'El aumento de la migración ha generado preocupación en Estados Unidos, que recibe a la mayoría de los migrantes de El Salvador, Guatemala y Honduras.',
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
            title: 'Las Migrantes Quieren Quedarse',
            image: './img/motivations/mot2.jpg',
            description: 'A pesar del creciente deseo de migrar, solo una fracción de la población encuestada planea hacerlo. La principal motivación para la migración está impulsada en gran medida por la economía.',
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

