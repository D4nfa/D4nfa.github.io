const carouselContainer = document.querySelector('.carousel-container');
const carouselPrevBtn = document.querySelector('.carousel-prev');
const carouselNextBtn = document.querySelector('.carousel-next');
var carouselItemWidth;
let position = 0;

carouselPrevBtn.addEventListener('click', () => {
  if (position < 0) {
    position += carouselItemWidth + 20; // Adjust this value to match the margin-right of .carousel-item
    carouselContainer.style.transform = `translateX(${position}px)`;
  }
});

carouselNextBtn.addEventListener('click', () => {
  if (position > -(carouselItemWidth + 20) * 4) { // Adjust this value to match the number of items in the carousel
    position -= carouselItemWidth + 20;
    carouselContainer.style.transform = `translateX(${position}px)`;
  }
});