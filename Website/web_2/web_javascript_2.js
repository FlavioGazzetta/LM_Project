```javascript
// JavaScript code to enhance website functionality

// Ensure the dark mode toggle works
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Feature: Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(sectionId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: 'smooth'
        });
    });
});

// Feature: Implement a responsive navigation bar toggle for smaller screens
const navToggle = document.querySelector('nav button');
const navMenu = document.querySelector('nav div');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
});

// Feature: Create a slider for the featured section
const sliderItems = document.querySelectorAll('.slider-item');
let currentSlide = 0;

const showSlide = (slideIndex) => {
    sliderItems.forEach(item => {
        item.style.display = 'none';
    });

    sliderItems[slideIndex].style.display = 'block';
};

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % sliderItems.length;
    showSlide(currentSlide);
};

// Initialize the slider
showSlide(currentSlide);

// Feature: Add automatic slide change in the featured section
let slideInterval = setInterval(nextSlide, 5000);

// Pause slideshow on hover
const featuredSection = document.querySelector('.featured-section');
featuredSection.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

featuredSection.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Feature: Add a back-to-top button for easy navigation
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded';
backToTopBtn.textContent = 'Back to Top';

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(backToTopBtn);
```