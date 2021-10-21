var allChapters = document.getElementsByClassName("chapter")
var toggleHover = 1

let lastKnownScrollPosition = 0;
let ticking = false;

var list = []
var recorder = false

var startVar = 0



//scroll position to move chapter bars
document.addEventListener('scroll', function (e) {
    lastKnownScrollPosition = window.scrollY;
    for (let i = 0; i < allChapters.length; i++) {

        if (allChapters[i].id != "open") {
            allChapters[i].style.transform = "translateY(" + window.scrollY + "px)"
        }

    }
});



//Delayed Redirect
let redirect_Page = (ele, link) => {

    let tID = setTimeout(function () {

        // redirect page.
        window.location.href = link;

        window.clearTimeout(tID);		// clear time out.

    }, 1000);	// call function after 5000 milliseconds or 5 seconds
}


// proper hover stuff



for (let i = 0; i < allChapters.length; i++) {

    if (allChapters[i].id == "") {
        allChapters[i].id = "closed"
    }

    list.push(allChapters[i].clientWidth)

    //mouseHoverIn
    allChapters[i].addEventListener('mouseenter', function () {
        var openChapters = document.getElementById("open")
        var map = document.getElementById("map")
        var story = document.getElementById("story")

        if ((allChapters[i].id != "open") & (allChapters[i].id != "partial-open")) {

            allChapters[i].id = "hover"   //change to hover state for item the mouse is positioned on
            // myLoop(allChapters);

            if (openChapters != null) {
                openChapters.id = "partial-open" //change opened pane to partially open

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
        var partialChapters = document.getElementById("partial-open")
        var map = document.getElementById("map")
        var story = document.getElementById("story")

        if (allChapters[i].id == "hover") {
            allChapters[i].id = "closed"
            if ((partialChapters != null)) {
                partialChapters.id = "open";
            }

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
        var partialChapters = document.getElementById("partial-open")

        if ((partialChapters != null) & allChapters[i].id != "open") {

            // document.body.scrollTop = 0; // For Safari
            // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            partialChapters.scrollTo({ top: 0, behavior: "smooth" });


            partialChapters.id = "closed"

        }

        if ((allChapters[i].id == "open")) {


        } else {
            //expand the chapter
            allChapters[i].id = "open"
        }
    }

}





// console.log(sum  + "sum")



function resizeView(changeIndex, changeValue) {
    


    if (startVar == 0) {
        list.sort()
        list[5]= 0
        startVar = startVar + 1
    }

    list[changeIndex] = changeValue
    var sum = list.reduce((a, b) => a + b, 0)
    console.log(sum)
    var windowRemainder = window.innerWidth - sum

    var openChannel = document.getElementById("partial-open")

    if (openChannel != null) {
        openChannel.style.width = windowRemainder + 200 + "px"
        openChannel.style.transition = ""
    }

}


var i = 1;                  //  set your counter to 1

function myLoop(index, value) {         //  create a loop function
    setTimeout(function () {   //  call a 3s setTimeout when the loop is called

        var importIndex = index
        var importValue = value.clientWidth
        //my code

        // console.log(value.clientWidth + "value")
        resizeView(importIndex, importValue)



        //  my code

        i++;                    //  increment the counter
        if (i <= 20) {           //  if the counter < 10, call the loop function
            myLoop(importIndex, value);             //  ..  again which will trigger another 
            // console.log(i)

        }                       //  ..  setTimeout()
        if (i > 20) {
            i = 1
        }

    }, 50)
}

