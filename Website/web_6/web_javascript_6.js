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

// New feature: Dynamic Year Update in Footer
const footerYear = document.createElement('span');
footerYear.textContent = `© ${new Date().getFullYear()}`;
document.querySelector('.footer .container').appendChild(footerYear);

// New feature: Notification banner
const notificationBanner = document.createElement('div');
notificationBanner.textContent = 'Welcome to our website!';
notificationBanner.style.position = 'fixed';
notificationBanner.style.top = '0';
notificationBanner.style.width = '100%';
notificationBanner.style.backgroundColor = '#007bff';
notificationBanner.style.color = '#fff';
notificationBanner.style.padding = '10px';
notificationBanner.style.textAlign = 'center';
notificationBanner.style.zIndex = '1002';
notificationBanner.style.display = 'none';

// Show notification after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        notificationBanner.style.display = 'block';
        setTimeout(() => {
            notificationBanner.style.display = 'none';
        }, 5000); // Display for 5 seconds
    }, 1000); // Initial delay of 1 second
});

document.body.appendChild(notificationBanner);

// New feature: Local time display in Footer
const footerTime = document.createElement('div');
footerTime.style.marginTop = '10px';
footerTime.style.color = '#fff';
function updateTime() {
    const now = new Date();
    footerTime.textContent = `Local Time: ${now.toLocaleTimeString()}`;
    setTimeout(updateTime, 1000);
}
updateTime();

document.querySelector('.footer .container').appendChild(footerTime);
```