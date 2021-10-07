
var landingFont = document.getElementById("landing-trigger")

var backgroundImage = document.getElementById("image-carousel")

landingFont.addEventListener('mouseover', function() {
    backgroundImage.style.filter = "blur(0.5em) grayscale(25%) brightness(50%)"
  });

landingFont.addEventListener('mouseout', function() {
    backgroundImage.style.filter = "blur(0em) grayscale(0%) brightness(100%)"
  });
