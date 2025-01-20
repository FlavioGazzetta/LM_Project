```javascript
// Functionality for Dark Mode
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

// Persist Dark Mode Setting
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Update local time every second
    const updateTime = () => {
        document.getElementById('localTime').textContent = `Local Time: ${new Date().toLocaleTimeString()}`;
    };
    setInterval(updateTime, 1000);
    updateTime();
});

// Implementing "Back to Top" button
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
        backToTopButton.style.opacity = '0.9'; // Added opacity for smooth appearance
    } else {
        backToTopButton.style.opacity = '0'; // Smooth disappearance
        setTimeout(() => {
            backToTopButton.style.display = 'none';
        }, 300); // Delay to match transition
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Carousel Auto-play Enhancement
$('.carousel').carousel({
    interval: 5000, // Auto-play interval
    pause: 'hover' // Pause on hover for better usability
});

// Navbar Shrink on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-shrink');
    } else {
        navbar.classList.remove('navbar-shrink');
    }
});

// Add smooth scroll to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle for Quick Access Icons
const quickAccessIcons = document.querySelector('.quick-access');
const toggleQuickAccess = document.createElement('button');
toggleQuickAccess.textContent = 'Toggle Quick Access';
toggleQuickAccess.style.position = 'fixed';
toggleQuickAccess.style.bottom = '60px';
toggleQuickAccess.style.right = '20px';
toggleQuickAccess.style.backgroundColor = '#333';
toggleQuickAccess.style.color = '#fff';
toggleQuickAccess.style.border = 'none';
toggleQuickAccess.style.padding = '10px 15px';
toggleQuickAccess.style.cursor = 'pointer';
toggleQuickAccess.style.zIndex = '1000';
toggleQuickAccess.addEventListener('click', () => {
    quickAccessIcons.classList.toggle('d-none');
});
document.body.appendChild(toggleQuickAccess);

// Ensure tooltips are initialized
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// Show Notification Banner
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.notification-banner').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.notification-banner').style.display = 'none';
        }, 5000); // Display for 5 seconds
    }, 1000); // Initial delay of 1 second
});

// New feature: Auto-hide Navbar on Scroll Down, Show on Scroll Up
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        navbar.style.top = '-70px'; // Hide on scroll down
    } else {
        navbar.style.top = '0'; // Show on scroll up
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

// New feature: Expandable Footer Sections
document.querySelectorAll('.footer h5').forEach(header => {
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        const nextElement = header.nextElementSibling;
        if (nextElement && nextElement.tagName === 'UL') {
            nextElement.classList.toggle('d-none');
        }
    });
});

// New feature: Random Background Color Button
const randomColorButton = document.createElement('button');
randomColorButton.textContent = 'Change Background Color';
randomColorButton.style.position = 'fixed';
randomColorButton.style.bottom = '100px';
randomColorButton.style.right = '20px';
randomColorButton.style.backgroundColor = '#333';
randomColorButton.style.color = '#fff';
randomColorButton.style.border = 'none';
randomColorButton.style.padding = '10px 15px';
randomColorButton.style.cursor = 'pointer';
randomColorButton.style.zIndex = '1000';
randomColorButton.addEventListener('click', () => {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
});
document.body.appendChild(randomColorButton);
```