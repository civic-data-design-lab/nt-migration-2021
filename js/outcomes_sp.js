const narrativesData = [
    {
        title: "Poco más de la Mitad de los Migrantes (57%) Residen en el Destino Deseado",
        description: "La economía estadounidense depende de estos migrantes en industrias que tienen escasez de mano de obra, como la agricultura, la industria restaurantera y el trabajo doméstico. Los trabajadores nacidos en el extranjero representaban el 73% de todos los trabajadores agrícolas contratados en EE. UU. en el año fiscal 2016, y aproximadamente la mitad de todos los trabajadores agrícolas contratados eran inmigrantes no autorizados.",
        image: "out2.jpg",
        footnote: "*&emsp;USDOL. <span class='fs-italic'>Demographic and Employment Characteristics, Table 1.</span>, FY 2015-2016. <a class='text-white' href='https://www.dol.gov/agencies/eta/national-agricultural-workers-survey/research/data-tables' target='_blank'>[external reference]</a>"
    },
    {
        title: "Un Tercio (33%) de los Migrantes Regresan a Casa",
        description: "Si bien tanto los países de origen como los de destino se benefician económicamente de la migración el costo es absorbido, en gran medida, por los propios migrantes. Después de experimentar condiciones desagradables para migrar, regresar a casa involuntariamente conlleva la pérdida adicional de volver a recaudar los grandes fondos necesarios para pagar el viaje.",
        image: "out3.jpg"
    },
    {
        title: "Los Migrantes Envían Remesas a Casa para Satisfacer sus Necesidades Básicas",
        description: "Para el 29% de los hogares que informaron recibir regularmente asistencia en efectivo del exterior, las remesas brindan seguridad, ayudando principalmente a cubrir los costos de subsistencia básicos. Las remesas rara vez se utilizan (menos del 5%) para contribuir al ahorro o para invertir en proyectos personales o comunitarios, que comúnmente se etiquetan como catalizadores del desarrollo."
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

        if (item.hasOwnProperty("footnote")) {
            narrativeDiv.find(".footnote").html(item.footnote);
            narrativeDiv.find("h3.description").addClass("mb-5");
        }
        else {
            narrativeDiv.find(".footnote").remove();
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
            $("#shortcut a").find("span").html("Saltar a Visualización");
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