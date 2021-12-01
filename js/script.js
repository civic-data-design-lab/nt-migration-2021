// title case
function titleCase(string) {
	string = string.toLowerCase();
	string = string.split(' ');
	for (var i = 0; i < string.length; i++) {
		string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
	}
	return string.join(' ');
};

// sentence case
function sentenceCase(string) {
	string = string.toLowerCase();
	string = string.split(' ');
	
    string[0] = string[0].charAt(0).toUpperCase() + string[0].slice(1);
	return string.join(' ');
};

// round accurately function
function roundAccurately(number, decimalPlaces) {
	return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);	
};

// round large figures with 000s
function roundLargeFigures(number, leadingFigures) {
    digitPlace = 10 ** (String(number).length - leadingFigures);
    return Math.round(number / digitPlace) * digitPlace;
};

// convert number to string with commas
function numberWithCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// wrap multi-line text spans
function wrapText(text, width) {
	text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.2,
			anchor = text.attr("text-anchor"),
			x = text.attr("x"),
			y = text.attr("y"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null)
				.append("tspan")
				.attr("text-anchor", anchor)
				.attr("x", x)
				.attr("y", y)
				.attr("dy", dy + "em");
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node().getComputedTextLength() > width) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan")
					.attr("text-anchor", anchor)
					.attr("x", x)
					.attr("y", y)
					.attr("dy", ++lineNumber * lineHeight + dy + "em")
					.text(word);
			}
		}
	})
};

// window resize
let winHeight = $(window).height();
let winWidth = $(window).width();

$(window).resize(function() {
	winHeight = $(window).height();
	winWidth = $(window).width();
});

// chapter look up
const chapterAttr = {
    origins: {color: "orange", hex: "#EB4927"},
    motivations: {color: "blue", hex: "#1540C4"},
    profiles: {color: "teal", hex: "#3BA7C9"},
    outcomes: {color: "pink", hex: "#E23CAD"},
    cost: {color: "purple", hex: "#662D91"}
};

// smooth anchor # scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// skip to viz/top shortcut
$("#shortcut a").on("click", function() {
    let chapterName = $(document).attr("title").toLocaleLowerCase();
    $(this).find(".arrow").toggleClass("arrow-up");

    if(!$(this).hasClass("top")) {
        document.querySelector("#open").scrollTop = document.querySelector("#open").scrollHeight;
        $(this).attr("class", "text-" + chapterAttr[chapterName].color);
        $(this).find(".arrow").css("border-color", chapterAttr[chapterName].hex);
        $(this).find("span").html("Back to Top");
        setTimeout(
            function() {
                $("#shortcut a").addClass("top");
            },
            50);
    }
    else {
        document.querySelector("#open").scrollTop = 0;
        $(this).attr("class", "text-white");
        $(this).find(".arrow").css("border-color", "#fff");
        $(this).find("span").html("Skip to Visualization");
        setTimeout(
            function() {
                $("#shortcut a").removeClass("top");
            },
            50);
    }
});

$(document).ready(function () {
    
})