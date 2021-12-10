$(document).ready(function() {
    function getDivHeight(id) {
        return $(id).height();
    };

    // ScrollMagic
    const controller = new ScrollMagic.Controller();

    const profilesLastScene = new ScrollMagic.Scene({
        triggerElement: "#last-scene",
        duration: getDivHeight("#last-scene")
    })
        .addTo(controller)
        .on("start", e => {
            // console.log("start");
            // update skip to viz shortcut button
            $("#shortcut a").attr("class", "text-white");
            $("#shortcut a").find("span").html("Skip to Visualization");
            $("#shortcut a").find(".arrow").css("border-color", "#fff").removeClass("arrow-up");
            
            // hide toolbar buttons
            $("#toolbar").removeClass("active");
        })
        .on("end", e => {
            // console.log("end");
            // update skip to top shortcut button
            $("#shortcut a").attr("class", "text-purple top");
            $("#shortcut a").find("span").html("Back to Top");
            $("#shortcut a").find(".arrow").css("border-color", "#662D91").addClass("arrow-up");

            // show toolbar buttons
            $("#toolbar").addClass("active");
        });
})