```javascript
// Initialize Swiper 
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    }
});

// Toggle mobile menu visibility
document.getElementById('menu-toggle').addEventListener('click', function () {
    var menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Scroll smoothly to sections on link click
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Display a back-to-top button after scrolling a certain distance
var backToTopButton = document.createElement('button');
backToTopButton.innerText = '↑';
backToTopButton.className = 'fixed right-4 bottom-4 p-2 bg-indigo-600 text-white rounded-full shadow-lg opacity-0 transition-opacity';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('opacity-0');
    } else {
        backToTopButton.classList.add('opacity-0');
    }
});

backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add form validation for contact form
document.querySelector('form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        e.preventDefault();
        alert('Please fill out all fields!');
    } else {
        alert('Message sent successfully!');
    }
});

// Enhance the UI with animations on section entry
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    observer.observe(section);
});
```