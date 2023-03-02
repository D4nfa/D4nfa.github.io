const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const carousel = document.querySelector(".carousel-container");
const track = document.querySelector("#projectList");
var slides;
let offset = 606;
let width;


function alignProjects(){
	slides = Array.from(track.children);
	slides[0].classList.add('selected');
	width = slides[0].getBoundingClientRect().width + 2;

	slides.forEach((slide, index) => {
		slide.style.left = `${index * width}px`;
	})

	visibleButtons(track.querySelector('.selected'));
}

next.addEventListener("click", function (e) {
	e.preventDefault();
	let currentSlide = track.querySelector('.selected');
	let nextSlide = currentSlide.nextElementSibling;
	
	track.style.transform = `translateX(${offset + -parseInt(nextSlide.style.left, 10)}px)`;

	currentSlide.classList.remove('selected');
	nextSlide.classList.add('selected');
	
	visibleButtons(nextSlide);
});

prev.addEventListener("click", function () {
	let currentSlide = track.querySelector('.selected');
	let prevSlide = currentSlide.previousElementSibling;
	
	track.style.transform = `translateX(${offset + -parseInt(prevSlide.style.left, 10)}px)`;

	currentSlide.classList.remove('selected');
	prevSlide.classList.add('selected');

	visibleButtons(prevSlide);
});

function visibleButtons(currentSlide){
	if(currentSlide.previousElementSibling == null){
		prev.style.visibility = 'hidden';
	}
	else{
		prev.style.visibility = 'visible';
	}

	if(currentSlide.nextElementSibling == null){
		next.style.visibility = 'hidden';
	}
	else{
		next.style.visibility = 'visible';
	}
}