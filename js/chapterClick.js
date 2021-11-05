var allChapters = document.getElementsByClassName("chapter")
var chapterClass = document.getElementById("open").className
var chapterTitles = document.getElementsByClassName("chapter-title")
var openChapter = document.getElementById("open")
var mapContainer = document.getElementById("map")
var story = document.getElementById("story")
var docHeight = document.getElementById("wrapper").offsetHeight
var contentBlock = document.getElementsByClassName("content-block")
var hamburgerMenu = document.getElementById("hamburger-menu")
var mobileMenu = document.getElementById("mobile-menu")
var mobileExit = document.getElementById("mobile-exit")
var mobileExit = document.getElementById("wrapper")


getComputedStyle(document.documentElement)
    .getPropertyValue('--blur-on'); // #999999

// var openWidth = document.querySelector(':root')

// getComputedStyle((':root'))

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

    //mouseHoverIn
    allChapters[i].addEventListener('mouseenter', function () {
        var openChapters = document.getElementById("open")

        if ((allChapters[i].id != "open") & (allChapters[i].id != "partial-open")) {

            if (openChapters != null) {
                openChapters.id = "partial-open" //change opened pane to partially open
            }

            // for (let i = 0; i < contentBlock.length; i++) {
                
               
            //     contentBlock[i].id = "blur"
                
            // }

            // if (map != null) {
            //     map.style.filter = "grayscale(1) blur(10px)"
            // }

            // if (story != null) {
            //     story.style.filter = "grayscale(1) blur(10px)"
            // }
        }

        if ((allChapters[i].id == 'partial-open') || (allChapters[i].id == 'open')) {
            allChapters[i].id = 'open'


            for (let i = 0; i < contentBlock.length; i++) {

                

                contentBlock[i].style.filter = ""
                
            }

            // if (map != null) {
            //     map.style.filter = ""
            // }

            // if (story != null) {
            //     story.style.filter = ""
            // }
        }
    });


    //Toggle Clicked Chapter
    allChapters[i].onclick = function (event) {
        var openChapters = document.getElementById("partial-open")

        if (allChapters[i].id != "open") {

            openChapters.id = "closed"
            openChapters.scrollTo({ top: 0, behavior: "smooth" });

            allChapters[i].id = "open"

        }

    }

}


//scroll position to move chapter bars
document.addEventListener('scroll', function (e) {

    for (let i = 0; i < chapterTitles.length; i++) {

        // console.log(window.scrollY)

        // if ((allChapters[i].id != "open") & (allChapters[i].id != "partial-open")) {
        //     allChapters[i].style.transform = "translateY(" + window.scrollY + "px)"
        // }

        // if ((allChapters[i].id == "open") || (allChapters[i].id == "partial-open")) {
        //     chapterTitles[i].style.transform = "translateY(" + window.scrollY + "px)"
        // }


        // if (window.scrollY) { // < docHeight

        //     if ((map != null)) { //& (window.scrollY > window.innerHeight)
        //         mapContainer.style.transform = "translateY(" + window.scrollY + "px)"
        //     }

        // }

    }
});


// // MOBILE MENU ENTER
// hamburgerMenu.onclick = function (event) {

//     if (mobileMenu != null)
//     {
//         mobileMenu.style.width = "100vw"
//     }

// }

// // MOBILE MENU EXIT
// mobileExit.onclick = function (event) {

//     if (mobileMenu != null)
//     {
//         mobileMenu.style.width = ""
//     }

// }


function toggleMenu(x) {
    x.classList.toggle("change");
    mobileMenu.classList.toggle ("mobile-open")

    // if(wrapper.style.overflow = "hidden"){
    //     wrapper.style.overflow = ""
    // }

    // if(wrapper.style.overflow = ""){
    //     wrapper.style.overflow = "hidden"
    // }
  }