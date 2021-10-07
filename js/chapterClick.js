var allChapters = document.getElementsByClassName("chapter")
var toggleHover = 1


//Delayed Redirect
let redirect_Page = (ele, link) => {
    	   
    let tID = setTimeout(function () {

        // redirect page.
        window.location.href = link;
        
        window.clearTimeout(tID);		// clear time out.
        
    }, 1000);	// call function after 5000 milliseconds or 5 seconds
}

let ignore_hover = (ele) => {
    
    toggleHover = 1 

    let timer = setTimeout(function(){
        toggleHover = 1       
        window.clearTimeout(timer)
        
    }, 1000)

    toggleHover = 0
}

var list = []

for (let i = 0; i < allChapters.length; i++) {




    if (allChapters[i].id == "")
    allChapters[i].id = "closed"

    if (allChapters[i].id == "closed"){

        list.push(allChapters[i].clientWidth)
        console.log(list + " list")
    }

    //mouseHoverIn
    allChapters[i].addEventListener('mouseover', function() {
        var openChapters = document.getElementById("open") 
        
            if((allChapters[i].id != "open") & (allChapters[i].id != "partial-open")){             
                
                allChapters[i].id = "hover"   //change to hover state for item the mouse is positioned on
                // myLoop(allChapters);


                if ((openChapters != null))
                {
                    openChapters.id = "partial-open" //change opened pane to partially open
                }            
            }     
    });

    // mouseHoverOut
    allChapters[i].addEventListener('mouseleave', function() {
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
     allChapters[i].onclick = function(event) {
        var openChapters = document.getElementById("open")
        var partialChapters = document.getElementById("partial-open")

        if ((partialChapters != null) & allChapters[i].id != "open"){

            // document.body.scrollTop = 0; // For Safari
            // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            partialChapters.scrollTo({top: 0, behavior:"smooth"});
  

            partialChapters.id = "closed"

         }
        
        if ((allChapters[i].id == "open")){

        
        } else {
            //expand the chapter
             allChapters[i].id = "open"
        }
    }
    
}

var sum = list.reduce((a, b) => a + b, 0)
var sumPercent = ((sum/window.innerWidth)*100)
var sumVW = ((window.innerWidth-sum))
console.log(sumVW + " sum VW")

var okOpen = document.getElementById("open")
if (okOpen != null)
{
    // okOpen.style.width = (95 - sumPercent) + "%"
    // okOpen.style.width = sumVW + "px"
    // console.log(window.screen.width + " totalW")
    // console.log(window.screen.width - sum + " subtract")

}

document.addEventListener("mousemove", function(ev){

    // console.log(`Movement X: ${ev.movementX}, Y: ${ev.movementY}`);
    
}, false);

var i = 1;                  //  set your counter to 1

function myLoop(page) {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    
    //my code
       list.push(page[i].clientWidth)
      // console.log(list + " list")
      //  my code
    i++;                    //  increment the counter
    if (i <= 20) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
      console.log(i)

    }                       //  ..  setTimeout()
    if (i > 20)
    {
        i = 1
    }

  }, 50)
}

