```javascript
// // Toggle mobile menu visibility
document.getElementById('menu-toggle').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// // Initialize Swiper slider
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop: true,
});

// // Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// // Add sticky effect to the header on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('bg-opacity-90', 'backdrop-blur');
    } else {
        header.classList.remove('bg-opacity-90', 'backdrop-blur');
    }
});

// // Form submission event
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    // // Simple form validation for demonstration
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (name && email) {
        alert('Thank you for reaching out!');
        this.reset();
    } else {
        alert('Please fill out all required fields.');
    }
});

// // Improve accessibility by closing mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function () {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// // Feature Enhancement: Add to top button
const toTopButton = document.createElement('button');
toTopButton.textContent = '↑';
toTopButton.setAttribute('aria-label', 'Scroll to top');
toTopButton.classList.add('fixed', 'bottom-4', 'right-4', 'bg-indigo-600', 'text-white', 'p-2', 'rounded-full', 'shadow-lg', 'hidden');
document.body.appendChild(toTopButton);

toTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        toTopButton.classList.remove('hidden');
    } else {
        toTopButton.classList.add('hidden');
    }
});
```