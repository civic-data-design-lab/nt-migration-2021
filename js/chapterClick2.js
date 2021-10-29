var allChapters = document.getElementsByClassName("chapter")
var chapterClass = document.getElementById("open").className

for (let i = 0; i < allChapters.length; i++) {
    console.log(allChapters[i].className)

    var startClass = allChapters[i].className

    if (allChapters[i].id != "open") {
        allChapters[i].className = startClass + " closed"
    }

}



//Delayed Redirect
let redirect_Page = (ele, link) => {

    let tID = setTimeout(function () {

        // redirect page.
        window.location.href = link;

        window.clearTimeout(tID);		// clear time out.

    }, 1000);	// call function after 5000 milliseconds or 5 seconds
}


//hover stuff
for (let i = 0; i < allChapters.length; i++) {

    if (allChapters[i].id == "") {
        // allChapters[i].id = "closed"
    }

    //mouseHoverIn
    allChapters[i].addEventListener('mouseenter', function () {
        var openChapters = document.getElementById("open")
        var map = document.getElementById("map")
        var story = document.getElementById("story")

        if ((allChapters[i].id != "open")) {

            // allChapters[i].id = "hover"

            var closedChapters = document.getElementsByClassName(chapterClass + " closed")
            console.log(closedChapters.length)

            for (let i = 0; i < closedChapters.length; i++) {
                closedChapters[i].className = chapterClass + " partial-closed"

            }



            if (map != null) {
                map.style.filter = "blur(0.25em)"
            }

            if (story != null) {
                story.style.filter = "blur(0.25em)"
            }
        }

        if (allChapters[i].id != "open") {
            // var newWidth = allChapters[i]
            // myLoop(i, newWidth)
        }

    });


    // mouseHoverOut
    allChapters[i].addEventListener('mouseleave', function () {
        var map = document.getElementById("map")
        var story = document.getElementById("story")

        if (allChapters[i].id == "hover") {
            // allChapters[i].id = "closed"

        }

        if (map != null) {
            map.style.filter = ""
        }

        if (story != null) {
            story.style.filter = ""
        }

        if (allChapters[i].id != "open") {
            // var newWidth = allChapters[i]
            // myLoop(i, newWidth)
        }

    });

    //Toggle Clicked Chapter
    allChapters[i].onclick = function (event) {
        var openChapters = document.getElementById("open")

        if (allChapters[i].id != "open") {

            // document.body.scrollTop = 0; // For Safari
            // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            openChapters.scrollTo({ top: 0, behavior: "smooth" });

            allChapters[i].id = "open"
            // openChapters.id = "closed"

        }

        else {
            //expand the chapter
            allChapters[i].id = "open"
        }
    }

}

