// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Slider functionality
let slides = document.querySelectorAll(".slide");
let currentIndex = 0;
const next = document.getElementById("next");
const prev = document.getElementById("prev");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

// Auto-slide every 5s
setInterval(nextSlide, 5000);