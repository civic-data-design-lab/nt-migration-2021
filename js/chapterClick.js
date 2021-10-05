var allChapters = document.getElementsByClassName("chapter")


for (let i = 0; i < allChapters.length; i++) {

    let startClass = allChapters[i].className

    if (allChapters[i].id == "")
    allChapters[i].id = "closed"

    //mouseHoverIn
    allChapters[i].addEventListener('mouseover', function() {
        var openChapters = document.getElementById("open")
        if((allChapters[i].id != "open") & (allChapters[i].id != "partial-open")){
            
            allChapters[i].id = "hover"   
            if ((openChapters != null))
            {
                openChapters.id = "partial-open"
            }     
    }});

    //mouseHoverOut
    allChapters[i].addEventListener('mouseout', function() {
        var openChapters = document.getElementById("open")
        var partialChapters = document.getElementById("partial-open")

        if(allChapters[i].id == "hover"){
            allChapters[i].id = "closed"
        
            if ((partialChapters != null))
            {
                partialChapters.id = "open";
            }
        
        }});

    //Toggle Clicked Chapter
     allChapters[i].onclick = function() {
        var openChapters = document.getElementById("open")
        var partialChapters = document.getElementById("partial-open")
        console.log(partialChapters)

        if ((partialChapters != null) & allChapters[i].id != "open"){
            partialChapters.id = "closed"
         }
        
        if ((allChapters[i].id == "open")){

        
        } else {
            //expand the chapter
             allChapters[i].id = "open"
        }
    }
    
}