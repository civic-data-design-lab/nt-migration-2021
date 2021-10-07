var chapters = document.getElementsByClassName("page")
const grid = document.getElementById("book")
const defaultFractionsList = ["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]
const defaultFractions = "1fr 1fr 1fr 1fr 1fr 1fr"
var fractions = ["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]
const openedWindow = "50fr"
const midWindow = "3fr"
const closedWindow = "1fr"

for (let i = 0; i < chapters.length; i++) {
    
    var inputState =  grid.style.gridTemplateColumns


    //assign close id to all
    if (chapters[i].id == "") {
        chapters[i].id = "close"
    }

    // onclick function
    chapters[i].onclick = function () {

        if (chapters[i].id != "partial") {

            //resetGridCol()
            //reset the open window id
            var openedDoc = document.getElementById("partial")
            if (openedDoc != null) {
                openedDoc.id = "close"
            }

            //Set new ID as open
            chapters[i].id = "open"
            //changeGridCol(openedWindow)
        }
    }

    // hover function
    chapters[i].addEventListener('mouseover', function() {
        if (chapters[i].id == "close"){
            chapters[i].id = "hover"

            let opened = document.getElementById("open")
            if (opened != null) {
                opened.id = "partial"
            }
        }
    })

    // hover out
    chapters[i].addEventListener('mouseout', function() {
        if (chapters[i].id == "hover"){
            chapters[i].id = "close"

            let opened = document.getElementById("partial")
            if (opened != null) {
                opened.id = "open"
            }
        }
    })



}




