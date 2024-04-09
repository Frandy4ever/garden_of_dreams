
const nextBtn = document.querySelector('.next-btn'); 
const prevBtn = document.querySelector('.prev-btn');
const slides = document.querySelectorAll('.slide');
const numberOfSlides = slides.length;
let slideNumber = 0;
let intervalId;

// Retrieve last viewed slide from session storage if available
const lastViewedSlide = sessionStorage.getItem('lastViewedSlide');
if (lastViewedSlide !== null && !isNaN(parseInt(lastViewedSlide, 10))) {
  slideNumber = parseInt(lastViewedSlide, 10);
  showSlide(slideNumber);
}

nextBtn.onclick = () => {
  slideNumber = (slideNumber + 1) % numberOfSlides;
  showSlide(slideNumber);
};

prevBtn.onclick = () => {
  slideNumber = (slideNumber - 1 + numberOfSlides) % numberOfSlides;
  showSlide(slideNumber);
};

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');

  // Store the index of the last viewed slide in session storage
  sessionStorage.setItem('lastViewedSlide', index);
}

// Function to advance slide every 15 seconds
function autoAdvanceSlide() {
  slideNumber = (slideNumber + 1) % numberOfSlides;
  showSlide(slideNumber);
}

// Start automatic slide change every 15 seconds
intervalId = setInterval(autoAdvanceSlide, 15000);

// Pause automatic slide change when user interacts with buttons
function pauseAutoAdvance() {
  clearInterval(intervalId);
}

nextBtn.addEventListener('click', pauseAutoAdvance);
prevBtn.addEventListener('click', pauseAutoAdvance);
