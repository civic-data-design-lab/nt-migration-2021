var outcomesConfig = {
    style: 'mapbox://styles/mitcivicdata/ckuslqqrj0r7718mu0lg5pyuz',
    accessToken: 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg',
    theme: 'outcomes-map-theme',

    chapters: [

        //DESTINATION 0
        {
            id: 'map-state-0',
            alignment: 'right',
            hidden: false,
            title: 'Second Title',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat enim commodi quia asperiores consequuntur minus laborum? Officiis ullam doloribus tempore necessitatibus aliquam voluptates consectetur reprehenderit nisi, recusandae, cupiditate, expedita perspiciatis earum totam itaque nemo fugiat? Ea, accusantium excepturi quia provident perspiciatis debitis vitae cupiditate molestiae cumque voluptate eligendi laudantium nulla aliquam modi corporis. Architecto, illo deserunt eveniet sequi ad dolorum delectus, necessitatibus corrupti libero tempore nobis accusantium ab consectetur perspiciatis ullam laborum sint consequatur praesentium tenetur, ipsam velit? Saepe esse, illo expedita rerum beatae ipsam architecto cum aliquid, qui repellat magnam culpa suscipit! Consectetur dolor iusto earum quisquam in corporis!',
            location: {
                center: [-90.0000000, 30.0000000], // initial map center in [lon, lat]
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
            alignment: 'right',
            hidden: false,
            // title: 'Display Title',
            // image: './images/zebra.jpg',
            description: 'ssssss.',
            location: {
                center: [-87.0000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 6,
                pitch: 60,
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
            ]


        },



        //DESTINATION 2
        {
            id: 'map-state-2',
            alignment: 'right',
            hidden: false,
            title: 'Second Title',
            image: './img/zebra.jpg',
            description: 'Copy these sections to add to your story.',
            location: {
                center: [-87.0000000, 15.0000000], // initial map center in [lon, lat]
                zoom: 5,
                pitch: 45,
                bearing: 10
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },


        //DESTINATION 3
        {
            id: 'map-state-3',
            alignment: 'right',
            hidden: false,
            title: 'Second Title',
            image: './img/zebra.jpg',
            description: 'Copy these sections to add to your story.',
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

