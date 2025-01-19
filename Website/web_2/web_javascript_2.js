```javascript
// Dark Mode Toggle Functionality
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerText = '↑';
scrollToTopBtn.style.position = 'fixed';
scrollToTopBtn.style.bottom = '70px';
scrollToTopBtn.style.right = '4px';
scrollToTopBtn.style.padding = '10px';
scrollToTopBtn.style.backgroundColor = '#333';
scrollToTopBtn.style.color = '#fff';
scrollToTopBtn.style.border = 'none';
scrollToTopBtn.style.borderRadius = '50%';
scrollToTopBtn.style.display = 'none';
scrollToTopBtn.style.cursor = 'pointer';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Responsive Navigation Toggle
const navToggle = document.createElement('button');
navToggle.innerText = '☰';
navToggle.style.fontSize = '20px';
navToggle.style.position = 'absolute';
navToggle.style.top = '12px';
navToggle.style.right = '12px';
navToggle.style.display = 'block';
navToggle.style.cursor = 'pointer';
navToggle.className = 'md:hidden';
const navBar = document.querySelector('nav .md\\:block');
navBar.parentNode.insertBefore(navToggle, navBar);

navToggle.addEventListener('click', () => {
    navBar.classList.toggle('hidden');
});

// Hero Section CTA Button Effect
const heroButton = document.querySelector('header button');
heroButton.addEventListener('mouseover', () => {
    heroButton.style.transform = 'scale(1.1)';
});
heroButton.addEventListener('mouseout', () => {
    heroButton.style.transform = 'scale(1)';
});

// Featured Section Auto Slider
const sliderItems = document.querySelectorAll('.flex.overflow-x-scroll .w-1\\/3.flex-none');
let sliderIndex = 0;

function showSliderItem(index) {
    sliderItems.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    sliderIndex = (sliderIndex + 1) % sliderItems.length;
    showSliderItem(sliderIndex);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Show the first slide initially
showSliderItem(sliderIndex);
```