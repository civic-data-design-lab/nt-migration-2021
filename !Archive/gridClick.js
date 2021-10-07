var chapters = document.getElementsByClassName("page")
const grid = document.getElementById("book")
const defaultFractionsList = ["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]
const defaultFractions = "1fr 1fr 1fr 1fr 1fr 1fr"
var fractions = ["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]
const openedWindow = "50fr"
const midWindow = "3fr"
const closedWindow = "1fr"


window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    console.log(scroll)
});

for (let i = 0; i < chapters.length; i++) {
    
    var inputState =  grid.style.gridTemplateColumns


    //assign close id to all
    if (chapters[i].id == "") {
        chapters[i].id = "close"
    }

    //change width to the one open panel
    if (chapters[i].id == "open") {
        changeGridCol(openedWindow)
    }



    // hover function
    chapters[i].addEventListener('mouseover', function() {
        console.log(grid.style.gridTemplateColumns)
        
    })

    // // hover function
    // chapters[i].addEventListener('mouseover', function() {
    //     if (chapters[i].id == "close"){
    //         chapters[i].style.gridColumn = "span 3"
    //     }
    // })

    // // hover out
    // chapters[i].addEventListener('mouseout', function() {
    //     if (chapters[i].id == "close"){
    //         chapters[i].style.gridColumn = "span 1"
    //     }
    // })



    // // hover out
    // chapters[i].addEventListener('mouseout', function() {
    //     grid.style.gridTemplateColumns = inputState
    //     if (chapters[i].id == "close"){
    //         changeGridCol(closedWindow)
    //     }
    // })


    // // hover function
    // chapters[i].addEventListener('mouseover', function() {
    //     var inputState =  grid.style.gridTemplateColumns
    //     if (chapters[i].id == "close"){
    //         changeGridCol(midWindow)
    //     }
    // })





    // onclick function
    chapters[i].onclick = function () {

        if (chapters[i].id != "open") {

            resetGridCol()
            //reset the open window id
            var openedDoc = document.getElementById("open")
            if (openedDoc != null) {
                openedDoc.id = "close"
            }

            //Set new ID as open
            chapters[i].id = "open"
            changeGridCol(openedWindow)
        }
    }

    function changeGridCol(newWidth){
        
        //reset width
        var startWidth = ["1fr", "1fr", "1fr", "1fr", "1fr", "1fr"]
        fractions = startWidth

        //apply new width to index
        fractions[i] = newWidth
        var stringFractions = fractions.toString()
        var formattedFractions = stringFractions.replace(/,/g, " ")
        grid.style.gridTemplateColumns = formattedFractions
        
        //reset width again
        fractions = startWidth
    }
    
    function resetGridCol(){
        grid.style.gridTemplateColumns = defaultFractions
        fractions = defaultFractionsList
    }


}




