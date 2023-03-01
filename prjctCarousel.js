const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const carousel = document.querySelector(".carousel-container");
const track = document.querySelector("#projectList");
var slides;
let width;


function alignProjects(){
	slides = Array.from(track.children);
	slides[0].classList.add('selected');
	width = slides[0].getBoundingClientRect().width + 2;

	slides.forEach((slide, index) => {
		slide.style.left = `${index * width}px`;
	})

	
}

next.addEventListener("click", function (e) {
	e.preventDefault();
	let currentSlide = track.querySelector('.selected')
	let nextSlide = currentSlide.nextElementSibling;
	
	track.style.transform = `translateX(-${nextSlide.style.left}px)`;

	currentSlide.classList.remove('selected');
	nextSlide.classList.add('selected');
	console.log(currentSlide);
	console.log(nextSlide)
});

prev.addEventListener("click", function () {
  index--;
  
  next.classList.remove("hide");
  if (index === 0) {
	prev.classList.remove("show");
  }
  track.style.transform = "translateX(" + index * -width + "px)";
});
