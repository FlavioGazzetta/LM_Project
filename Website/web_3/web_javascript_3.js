```javascript
// JavaScript for enhancing functionality

// Smooth scroll functionality for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
});

// Close mobile menu when a navigation link is clicked
document.querySelectorAll('.navigation a').forEach(item => {
    item.addEventListener('click', () => {
        navigation.classList.remove('active');
    });
});

// Carousel functionality for the featured section
let slideIndex = 0;
displaySlides();

function displaySlides() {
    let slides = document.querySelectorAll('.carousel-slide');
    for (let slide of slides) {
        slide.style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(displaySlides, 3000); // Change slide every 3 seconds
}
```