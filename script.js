var articles,
	storedArticles,
	currentSlide,
	nextSlide,
	currentSlideDisplay;

window.onload = intitialization;

function intitialization()
{
	var i;

	articles = document.getElementsByTagName("article");
	storedArticles = Array.from(articles);
	currentSlide = 0;
	nextSlide = 0;
	currentSlideDisplay = 1;
	totalSlides = articles.length;

	// display total number of slides
	document.getElementById("totalSlidesDisplay").innerHTML = "total: " + totalSlides;

	while(articles[1])
	{
		articles[1].parentNode.removeChild(articles[1]);
	}
}

function changeSlide(nextSlide)
{
	if (currentSlide !== nextSlide)
	{
		articles[0].parentNode.replaceChild(storedArticles[nextSlide], articles[0]);
		currentSlide = nextSlide;
		currentSlideDisplay.value = currentSlide + 1;
		changeSlideDisplay();
		console.log("slide changed");
	}
}

function changeSlideDisplay()
{
	var input;
	currentSlideDisplay = document.getElementById("currentSlideDisplay");
	input = currentSlideDisplay.value;
	// check for proper input
	if (1 <= input && input <= totalSlides)
	{	
		nextSlide = input - 1;
		changeSlide(nextSlide);
	}
	else
	{
		console.log("here");
		currentSlideDisplay.value = currentSlide + 1;
	}
}

function showPreviousSlide()
{
	nextSlide = (currentSlide - 1).mod(totalSlides);
	changeSlide(nextSlide);
}

function showNextSlide()
{
	nextSlide = (currentSlide + 1).mod(totalSlides);
	changeSlide(nextSlide);
}

function showFirstSlide()
{
	nextSlide = 0;
	changeSlide(nextSlide);
}

function showLastSlide()
{
	nextSlide = totalSlides - 1;
	changeSlide(nextSlide);
}

window.onkeydown = function(event)
{
	// left arrow
	if (event.keyCode == 37)
	{
		showPreviousSlide();
	}
	// down arrow
	if (event.keyCode == 40)
	{
		showFirstSlide();
	}
	// right arrow
	if (event.keyCode == 39)
	{
		showNextSlide();
	}
	// up arrow
	if (event.keyCode == 38)
	{
		showLastSlide();
	}
}

// fixed unexpected modulo behaviour in js
// see http://javascript.about.com/od/problemsolving/a/modulobug.htm
Number.prototype.mod = function(n)
{
	return ((this%n)+n)%n;
}
