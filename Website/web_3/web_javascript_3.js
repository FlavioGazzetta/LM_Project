```javascript
// JavaScript to Enhance Website Functionality

// Function to toggle the mobile menu visibility
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Function to initiate Swiper.js for featured section slider
document.addEventListener('DOMContentLoaded', function() {
    new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

// Feature: Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Feature: Form validation feedback
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (!name.value || !email.value || !message.value) {
        event.preventDefault();
        alert('Please fill out all fields.');
    }
});

// Feature: Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerText = '↑';
backToTopButton.className = 'fixed bottom-4 right-4 p-2 bg-indigo-600 text-white rounded-full hidden';
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

// Feature: Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerText = '🌙';
darkModeToggle.className = 'fixed top-4 right-4 p-2 bg-gray-200 text-gray-800 rounded-full';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('bg-gray-800');
    document.body.classList.toggle('text-white');
});
```