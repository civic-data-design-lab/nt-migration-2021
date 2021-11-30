var mobile = document.getElementById("mobile-button")
var myIndex = 0;

var images = [
    "./img/Headers/about.jpg",
    "./img/Headers/origins.jpg",
    "./img/Headers/motivations.jpg",
    "./img/Headers/profiles.jpg",
    "./img/Headers/outcomes.jpg",
    
]


const slidesContainer = document.createElement('div');
slidesContainer.className = 'mySlides'
mobile.appendChild(slidesContainer);


for (let i = 0; i < images.length; i++) {

    slidesContainer.className = 'slideShow'
    const slideDiv = document.createElement("div");
    slideDiv.className = 'mySlides mobile-backdrop' + [i]
    slidesContainer.appendChild(slideDiv)

}





carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}