$(document).ready(function() {
    function getDivHeight(id) {
        return $(id).height();
    };

    // ScrollMagic
    const controller = new ScrollMagic.Controller();

    const profilesLastScene = new ScrollMagic.Scene({
        triggerElement: ".step1 .scrolly-container-profile",
        duration: getDivHeight(".step1 .scrolly-container-profile")
    })
        .addTo(controller)
        .on("start", e => {
            // console.log("start");
            // // update skip to viz shortcut button
            $("#shortcut a").attr("class", "text-white");
            $("#shortcut a").find("span").html("Skip to Visualization");
            $("#shortcut a").find(".arrow").css("border-color", "#fff").removeClass("arrow-up");
        })
        .on("end", e => {
            // console.log("end");
            // // update skip to top shortcut button
            $("#shortcut a").attr("class", "text-teal top");
            $("#shortcut a").find("span").html("Back to Top");
            $("#shortcut a").find(".arrow").css("border-color", "#2C8787").addClass("arrow-up");
        });
})