const narrativesData = [
    {
        title: "Just Over Half of Migrants (57%) Reach their Destination",
        description: "Migrants work in similar industries as they did in their home countries. The U.S. economy depends on these migrants in industries that have labor shortages, such as agriculture, the restaurant industry, and domestic work. In 2018, migrants composed nearly 74% of agriculture workers&mdash;the U.S. needs these migrants as much as they need us.",
        image: "out2.jpg"
    },
    {
        title: "One Third (33%) of Migrants Return Home",
        description: "While both origin and destination countries economically benefit from migration, the cost is largely borne by the migrants themselves. After experiencing harrowing conditions to migrate, involuntarily returning home comes at the additional loss of raising the large funds required to afford the journey.",
        image: "out3.jpg"
    },
    {
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
    duration: 25,
    endDelay: 25,
    easing: 'easeInOutSine',
    autoplay: false
});
const reveal2ResideOther = anime({
    targets: '#svg-outcomes #_2-reside-other .mask',
    x: 1179,
    width: 9,
    delay: 25,
    duration: 25,
    easing: 'easeInOutSine',
    autoplay: false
});
const reveal34ReturnVolInv = anime({
    targets: '#svg-outcomes #_34-return-vol-inv .mask',
    width: 9,
    delay: 100,
    duration: 50,
    endDelay: 100,
    easing: 'easeInOutSine',
    autoplay: false
});
const reveal5Transit = anime({
    targets: '#svg-outcomes #_5-transit .mask',
    x: 885,
    width: 9,
    duration: 25,
    endDelay: 50,
    easing: 'easeInOutSine',
    autoplay: false
});
const reveal6Died = anime({
    targets: '#svg-outcomes #_6-died .mask',
    x: 841,
    width: 9,
    delay: 25,
    duration: 25,
    endDelay: 25,
    easing: 'easeInOutSine',
    autoplay: false
});
const reveal7Nsnr = anime({
    targets: '#svg-outcomes #_7-nsnr .mask',
    x: 841,
    width: 9,
    delay: 50,
    duration: 25,
    easing: 'easeInOutSine',
    autoplay: false
});

// create narratives after migrant outcomes viz
function createNarratives() {
    const narrativeTemplate = $(".step.lefty.active.template");
    narrativesData.forEach((item, i) => {
        const narrativeDiv = narrativeTemplate.clone();
        
        narrativeDiv.attr("id", "scene-" + i);
        
        if (item.hasOwnProperty("image")) {
            narrativeDiv.find(".scrollytelling-text").remove();

            narrativeDiv.find(".ribbon-image img").attr("src", "./img/outcomes/" + item.image);
            narrativeDiv.find("h2.scrollytelling").html(item.title);
            narrativeDiv.find("h3.description").html(item.description);
        }
        else {
            narrativeDiv.find(".ribbon-image").remove();
            narrativeDiv.find(".scrollytelling-caption").remove();

            narrativeDiv.find("h2.scrollytelling").html(item.title);
            narrativeDiv.find("h3.description").html(item.description);
        }

        narrativeDiv.find(".trigger").attr("id", "trigger-" + i);
        narrativeDiv.removeClass("template").appendTo(narrativeTemplate.parent());
    });

};
createNarratives();

$(document).ready(function() {
    // set stroke length
    const returnDestLength = document.querySelector("#svg-outcomes #_3-return-dest .stroke").getTotalLength();
    const returnDestPath = $("#svg-outcomes #_3-return-dest .stroke");
    returnDestPath.css({"stroke-dasharray": returnDestLength, "stroke-dashoffset": -returnDestLength});

    const returnOtherLength = document.querySelector("#svg-outcomes #_4-return-other .stroke").getTotalLength();
    const returnOtherPath = $("#svg-outcomes #_4-return-other .stroke");
    returnOtherPath.css({"stroke-dasharray": returnOtherLength, "stroke-dashoffset": returnOtherLength});

    const returnOtherMaskLength = document.querySelector("#svg-outcomes #_4-return-other .stroke-mask").getTotalLength();
    const returnOtherMaskPath = $("#svg-outcomes #_4-return-other .stroke-mask");
    returnOtherMaskPath.css({"stroke-dasharray": returnOtherMaskLength, "stroke-dashoffset": 0});

    // ScrollMagic
    const controller = new ScrollMagic.Controller();

    const sceneReside = new ScrollMagic.Scene({
        triggerElement: "#outcomes",
        duration: winHeight // scroll in px
    })
        .addTo(controller)
        .on("progress", e => {
            // console.log(e.progress * 150);
            reveal1ResideUS.seek(e.progress * 150);
            reveal2ResideOther.seek(e.progress * 150);

            if (e.progress >= 0.5) {
                $("#svg-outcomes #g-reside").fadeIn();
            }
            else {
                $("#svg-outcomes #g-reside").fadeOut();
            }
        })

    const sceneReturn = new ScrollMagic.Scene({
        triggerElement: "#narrative-scroll #scene-0 #trigger-0",
        duration: winHeight * 2.5 // scroll in px
    })
        .addTo(controller)
        // .on("start", function() {
            // $("#svg-outcomes #g-reside").fadeToggle();
            // $("#svg-outcomes #_1-reside-us .text").fadeToggle();
            // $("#svg-outcomes #_2-reside-other .text").fadeToggle();
            // $("#_1-reside-us").toggleClass("inactive");
            // $("#_2-reside-other").toggleClass("inactive");
            // returnDestPath.css("stroke-dashoffset", -returnDestLength);
            // returnOtherPath.css("stroke-dashoffset", returnOtherLength);
            // returnOtherMaskPath.css("stroke-dashoffset", 0);
        // })
        .on("progress", function(e) {
            // console.log(e.progress * 250);
            
            if (e.progress <= 0.2) {
                returnDestPath.css("stroke-dashoffset", (5 * e.progress * returnDestLength) - returnDestLength);
            }
            else {
                returnDestPath.css("stroke-dashoffset", 0);
            }

            if (e.progress <= 0.2) {
                returnOtherPath.css("stroke-dashoffset", returnOtherLength);
                returnOtherMaskPath.css("stroke-dashoffset", 0);
            }
            else if (0.2 <= e.progress && e.progress <= 0.4) {
                returnOtherPath.css("stroke-dashoffset", returnOtherLength - (5 * (e.progress - 0.2) * returnOtherLength));
                returnOtherMaskPath.css("stroke-dashoffset", - (5 * (e.progress - 0.2) * returnOtherMaskLength));
            }
            else {
                returnOtherPath.css("stroke-dashoffset", 0);
                returnOtherMaskPath.css("stroke-dashoffset", returnOtherMaskLength);
            }

            reveal34ReturnVolInv.seek(e.progress * 250);

            if (0.4 < e.progress) {
                $("#svg-outcomes #g-return").fadeIn();
            }
            else {
                $("#svg-outcomes #g-return").fadeOut();
            }

            if (0.6 < e.progress) {
                $("#svg-outcomes #g-return-vol-inv").fadeIn();
            }
            else {
                $("#svg-outcomes #g-return-vol-inv").fadeOut();
            }
        })
        .on("end", e => {
            returnDestPath.css("stroke-dashoffset", 0);
            returnOtherPath.css("stroke-dashoffset", 0);
            returnOtherMaskPath.css("stroke-dashoffset", returnOtherMaskLength);
        })

    const sceneOtherOutcomes = new ScrollMagic.Scene({
        triggerElement: "#narrative-scroll #scene-1 #trigger-1",
        duration: winHeight * 1.5 // scroll in px
    })
        .addTo(controller)
        // .on("start", e => {
        //     $("#svg-outcomes #g-return").fadeToggle();
        //     $("#svg-outcomes #g-return-vol-inv").fadeToggle();
        //     $("#svg-outcomes #_3-return-dest .text").fadeToggle();
        //     $("#svg-outcomes #_4-return-other .text").fadeToggle();
        //     $("#svg-outcomes #_34-return-vol-inv .text").fadeToggle();
        //     $("#_3-return-dest").toggleClass("inactive");
        //     $("#_4-return-other").toggleClass("inactive");
        //     $("#_34-return-vol-inv").toggleClass("inactive");
        // })
        .on("progress", e => {
            // console.log(e.progress * 150);
            reveal5Transit.seek(e.progress * 150);
            reveal6Died.seek(e.progress * 150);
            reveal7Nsnr.seek(e.progress * 150);
        })
        .on("end", e => {
            // update skip to viz shortcut button
            $("#shortcut a").attr("class", "text-white");
            $("#shortcut a").find("span").html("Skip to Visualization");
            $("#shortcut a").find(".arrow").css("border-color", "#fff").removeClass("arrow-up");
        })

    const sceneAllOutcomes = new ScrollMagic.Scene({
        triggerElement: "#narrative-scroll #scene-2 #trigger-2",
        duration: winHeight
    })
        .addTo(controller)
        .on("start", e => {
    //         $("#svg-outcomes #g-reside").fadeToggle();
    //         $("#svg-outcomes #g-return").fadeToggle();
    //         $("#svg-outcomes #g-return-vol-inv").fadeToggle();

    //         $("#svg-outcomes #_1-reside-us .text").fadeToggle();
    //         $("#svg-outcomes #_2-reside-other .text").fadeToggle();
    //         $("#svg-outcomes #_3-return-dest .text").fadeToggle();
    //         $("#svg-outcomes #_4-return-other .text").fadeToggle();
    //         $("#svg-outcomes #_34-return-vol-inv .text").fadeToggle();

    //         $("#_1-reside-us").toggleClass("inactive");
    //         $("#_2-reside-other").toggleClass("inactive");
    //         $("#_3-return-dest").toggleClass("inactive");
    //         $("#_4-return-other").toggleClass("inactive");
    //         $("#_34-return-vol-inv").toggleClass("inactive");

            // update skip to top shortcut button
            $("#shortcut a").attr("class", "text-pink top");
            $("#shortcut a").find("span").html("Back to Top");
            $("#shortcut a").find(".arrow").css("border-color", "#E23CAD").addClass("arrow-up");
        })
});