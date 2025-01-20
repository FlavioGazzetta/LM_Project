```javascript
// Initializing document readiness
document.addEventListener('DOMContentLoaded', function() {
    // Functionality for Dark Mode
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save dark mode preference to localStorage
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled);
    });

    // Load dark mode preference from localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Smooth scrolling for internal links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Enhance carousel functionality
    const carouselElement = document.querySelector('#carouselExampleControls');
    const carouselIndicators = document.createElement('ol');
    carouselIndicators.className = 'carousel-indicators';
    carouselElement.prepend(carouselIndicators);

    const carouselItems = carouselElement.querySelectorAll('.carousel-item');
    carouselItems.forEach((item, index) => {
        const indicator = document.createElement('li');
        indicator.setAttribute('data-target', '#carouselExampleControls');
        indicator.setAttribute('data-slide-to', index);
        if (index === 0) indicator.classList.add('active');
        carouselIndicators.appendChild(indicator);
        // Add event listeners to indicators
        indicator.addEventListener('click', () => {
            $('#carouselExampleControls').carousel(index);
        });
    });

    // Form validation for newsletter subscription
    const newsletterForm = document.querySelector('.footer form');
    newsletterForm.addEventListener('submit', function(e) {
        const emailInput = this.querySelector('input[type="email"]');
        if (!validateEmail(emailInput.value)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    // Implementing "Back to Top" button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerText = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.display = 'none';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.zIndex = '1000';
    backToTopButton.style.padding = '10px 15px';
    backToTopButton.style.border = 'none';
    backToTopButton.style.backgroundColor = '#333';
    backToTopButton.style.color = '#fff';
    backToTopButton.style.cursor = 'pointer';
    document.body.appendChild(backToTopButton);

    // Show/hide back-to-top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Scroll to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
```