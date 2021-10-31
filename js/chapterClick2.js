var allChapters = document.getElementsByClassName("chapter")
var chapterClass = document.getElementById("open").className
var chapterTitles = document.getElementsByClassName("chapter-title")


for (let i = 0; i < allChapters.length; i++) {
    // console.log(allChapters[i].className)

    var startClass = allChapters[i].className

    if (allChapters[i].id != "open") {
        // allChapters[i].className = startClass + " closed"
        allChapters[i].id = "closed"
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

    //Toggle Clicked Chapter
    allChapters[i].onclick = function (event) {
        var openChapters = document.getElementById("open")

        if (allChapters[i].id != "open") {

            openChapters.id = "closed"
            openChapters.scrollTo({ top: 0, behavior: "smooth" });

            allChapters[i].id = "open"

        }

    }

}


//scroll position to move chapter bars
document.addEventListener('scroll', function (e) {
    lastKnownScrollPosition = window.scrollY;
    for (let i = 0; i < chapterTitles.length; i++) {

        if (chapterTitles[i].id != "open") {
            chapterTitles[i].style.transform = "translateY(" + window.scrollY + "px)"
        }

    }
});
