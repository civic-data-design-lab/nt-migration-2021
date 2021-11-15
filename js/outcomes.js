const narrativesData = [
    {
        id: "state-1",
        title: "Just Over Half of Migrants (57%) Reach their Destination",
        description: "Migrants work in similar industries as they did in their home countries. The U.S. economy depends on these migrants in industries that have labor shortages, such as agriculture, the restaurant industry, and domestic work. In 2018, migrants composed nearly 74% of agriculture workers&mdash;the U.S. needs these migrants as much as they need us.",
        image: "./img/outcomes/out2.jpg"
    },
    {
        id: "state-2",
        title: "One Third (33%) of Migrants Return Home",
        description: "While both origin and destination countries economically benefit from migration, the cost is largely borne by the migrants themselves. After experiencing harrowing conditions to migrate, involuntarily returning home comes at the additional loss of raising the large funds required to afford the journey.",
        image: "./img/outcomes/out3.jpg"
    },
    {
        id: "state-3",
        title: "Migrants Send Remittances Home to Provide for Basic Needs",
        description: "For the 29% of households that reported regularly receiving cash assistance from abroad, remittances provide a safety net that primarily help to meet subsistence costs and immediate living expenses. Remittances are rarely used (less than 5% reported) to contribute to savings or to invest in personal or community projects, which are often cited as catalysts for development."
    }
];

// morph svg shapes animation sequence
const morphSvg = anime({
    targets: '#svg-outcomes',
    easing: 'linear',
    autoplay: false
});
const reveal1ResideUS = anime({
    targets: '#svg-outcomes #_1-reside-us .mask',
    x: 1179,
    width: 9,
    duration: 50,
    endDelay: 50,
    easing: 'easeInOutSine',
    autoplay: false
});
const reveal2ResideOther = anime({
    targets: '#svg-outcomes #_2-reside-other .mask',
    x: 1179,
    width: 9,
    delay: 50,
    duration: 50,
    easing: 'easeInOutSine',
    autoplay: false
});

// create narratives after migrant outcomes viz
function createNarratives() {
    const narrativeTemplate = $(".step.fully.active.template");
    narrativesData.forEach((item) => {
        const narrativeDiv = narrativeTemplate.clone();
        
        narrativeDiv.attr("id", narrativesData.id);
        
        if (item.hasOwnProperty("image")) {
            narrativeDiv.find(".scrollytelling-text").remove();

            narrativeDiv.find(".ribbon-image").attr("src", item.image);
            narrativeDiv.find("h2.scrollytelling").html(item.title);
            narrativeDiv.find("h3.description").html(item.description);
        }
        else {
            narrativeDiv.find(".ribbon-image").remove();
            narrativeDiv.find(".scrollytelling-caption").remove();

            narrativeDiv.find("h2.scrollytelling").html(item.title);
            narrativeDiv.find("h3.description").html(item.description);
        }

        narrativeDiv.removeClass("template").appendTo(narrativeTemplate.parent());
    });
};
createNarratives();

$(document).ready(function() {
    // ScrollMagic
    const controller = new ScrollMagic.Controller();

    sceneTimeline = new ScrollMagic.Scene({
        triggerElement: "#frame-outcomes",
        duration: winHeight // scroll in px
    })
        .addTo(controller)
        .on("progress", function(e) {
            // console.log(e.progress);
            reveal1ResideUS.seek(e.progress * 200);
            reveal2ResideOther.seek(e.progress * 200);

            if (e.progress >= 0.5) {
                $("#svg-outcomes #g-reside").fadeIn();
            }
            else {
                $("#svg-outcomes #g-reside").fadeOut();
            }
        })
});